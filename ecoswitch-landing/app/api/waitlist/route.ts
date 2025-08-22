// src/app/api/waitlist/route.ts
import { NextResponse } from "next/server";
import { z } from "zod";

/** ------- Validation d'entrée ------- */
const Body = z.object({
  email: z.string().email(),
  hp: z.string().optional(), // honeypot anti-bot
});

/** ------- Rate-limit simple (mémoire) ------- */
const hits = new Map<string, { count: number; ts: number }>();
const WINDOW_MS = 60_000; // 1 min
const MAX_HITS = 10;

function rateLimit(ip: string) {
  const now = Date.now();
  const rec = hits.get(ip);
  if (!rec || now - rec.ts > WINDOW_MS) {
    hits.set(ip, { count: 1, ts: now });
    return false;
  }
  rec.count++;
  return rec.count > MAX_HITS;
}

/** ------- Config Brevo (+ modes fallback) ------- */
function getEnv() {
  const apiKey = process.env.BREVO_API_KEY || "";
  const listId = Number(process.env.BREVO_LIST_ID || 0);
  const templateIdRaw = process.env.BREVO_TEMPLATE_ID;
  const templateId = templateIdRaw ? Number(templateIdRaw) : 0; // 0 = pas de DOI
  const redirectionUrl =
    process.env.BREVO_REDIRECT_URL || "http://localhost:3000/merci";

  // mock si pas d'apiKey ou pas de listId
  const mock = !apiKey || !listId;

  return { apiKey, listId, templateId, redirectionUrl, mock };
}

/** ------- Appels REST Brevo ------- */
// 1) Double Opt-In natif Brevo
async function createDoiContact({
  apiKey,
  email,
  listId,
  templateId,
  redirectionUrl,
}: {
  apiKey: string;
  email: string;
  listId: number;
  templateId: number;
  redirectionUrl: string;
}) {
  const res = await fetch("https://api.brevo.com/v3/contacts/doubleOptinConfirmation", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "api-key": apiKey,
    },
    body: JSON.stringify({
      email,
      includeListIds: [listId],
      templateId,
      redirectionUrl,
      attributes: { SOURCE: "Landing v10.2" },
    }),
  });
  if (!res.ok) {
    const text = await res.text();
    const err = new Error(`DOI failed: ${res.status} ${text}`);
    // @ts-ignore
    err.status = res.status;
    throw err;
  }
  return true;
}

// 2) Fallback: ajout direct en liste (simple opt-in)
async function createContact({
  apiKey,
  email,
  listId,
}: {
  apiKey: string;
  email: string;
  listId: number;
}) {
  const res = await fetch("https://api.brevo.com/v3/contacts", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "api-key": apiKey,
    },
    body: JSON.stringify({
      email,
      listIds: [listId],
      attributes: { SOURCE: "Landing v10.2" },
      updateEnabled: true, // si déjà présent, on met à jour
    }),
  });

  if (res.ok) return { ok: true, already: false };

  // Gestion duplicata
  const text = await res.text();
  if (res.status === 400 || res.status === 409) {
    const lower = text.toLowerCase();
    const duplicate =
      lower.includes("already exist") ||
      lower.includes("duplicate") ||
      lower.includes("already exists");
    if (duplicate) return { ok: true, already: true };
  }

  throw new Error(`createContact failed: ${res.status} ${text}`);
}

/** ------- Handler POST ------- */
export async function POST(req: Request) {
  try {
    const ip =
      req.headers.get("x-forwarded-for")?.split(",")[0]?.trim() ||
      (req as any).ip ||
      "local";

    if (rateLimit(ip)) {
      return NextResponse.json(
        { ok: false, error: "Trop de requêtes" },
        { status: 429 }
      );
    }

    const json = await req.json().catch(() => null);
    const parsed = Body.safeParse(json);
    if (!parsed.success) {
      return NextResponse.json(
        { ok: false, error: "Email invalide" },
        { status: 400 }
      );
    }

    // Honeypot: OK silencieux
    if (parsed.data.hp) {
      return NextResponse.json({ ok: true });
    }

    const { email } = parsed.data;
    const { apiKey, listId, templateId, redirectionUrl, mock } = getEnv();

    // --- MOCK MODE : avance sans Brevo ---
    if (mock) {
      console.warn("[WAITLIST] MOCK MODE — pas d'API key ou pas de LIST_ID. Email:", email);
      return NextResponse.json({ ok: true, mock: true });
    }

    // --- Si pas de templateId => on saute le DOI et on ajoute direct en liste ---
    if (!templateId) {
      try {
        const r = await createContact({ apiKey, email, listId });
        return NextResponse.json({ ok: true, doi: false, already: r.already });
      } catch (e2: any) {
        const msg2 = String(e2?.message || "");
        // Cas IP non autorisée → succès mock pour ne pas casser l’UX
        if (msg2.includes("unrecognised IP address")) {
          console.warn("[WAITLIST] IP non autorisée (simple opt-in). Succès mock.", msg2);
          return NextResponse.json({ ok: true, mock: true, reason: "ip_not_authorized" });
        }
        console.error("[WAITLIST] createContact error:", msg2);
        return NextResponse.json({ ok: false, error: "ESP error" }, { status: 500 });
      }
    }

    // --- Sinon : essayer DOI, puis fallback simple opt-in ---
    try {
      await createDoiContact({ apiKey, email, listId, templateId, redirectionUrl });
      return NextResponse.json({ ok: true, doi: true });
    } catch (e: any) {
      const msg = String(e?.message || "");
      if (msg.includes("unrecognised IP address")) {
        console.warn("[WAITLIST] IP non autorisée (DOI). Succès mock.", msg);
        return NextResponse.json({ ok: true, mock: true, reason: "ip_not_authorized" });
      }
      console.warn("[WAITLIST] DOI failed, fallback to createContact:", msg);
      try {
        const r = await createContact({ apiKey, email, listId });
        return NextResponse.json({ ok: true, doi: false, already: r.already });
      } catch (e2: any) {
        const msg2 = String(e2?.message || "");
        if (msg2.includes("unrecognised IP address")) {
          console.warn("[WAITLIST] IP non autorisée (fallback). Succès mock.", msg2);
          return NextResponse.json({ ok: true, mock: true, reason: "ip_not_authorized" });
        }
        console.error("[WAITLIST] createContact error:", msg2);
        return NextResponse.json({ ok: false, error: "ESP error" }, { status: 500 });
      }
    }
  } catch (e) {
    console.error("[WAITLIST] server error:", e);
    return NextResponse.json(
      { ok: false, error: "Erreur serveur" },
      { status: 500 }
    );
  }
}
