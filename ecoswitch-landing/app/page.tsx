"use client";

import { useEffect, useMemo, useState } from "react";
import {
  ChevronRight,
  FlaskConical,
  ShieldCheck,
  Cpu,
  Mail,
  Beaker,
  Users,
  Sun,
  Moon,
  Timer,
  Plus,
  Minus,
} from "lucide-react";
import { motion, useReducedMotion } from "framer-motion";

/**
 * EcoSwitch – Landing "Démo Scientifique v10.2"
 * - Animations Framer Motion (reveal/stagger/hover/pulse)
 * - Scroll progress bar
 * - Compteurs (CountUp)
 * - Countdown offre (persistant localStorage)
 * - Theme switch (dark/light, persistant)
 * - FAQ accordéon
 * - Sticky CTA mobile
 * - Waitlist avec handleSubmit -> /api/waitlist (Zod, rate-limit, honeypot)
 */

/* ---------------- Variants (animations) ---------------- */
const fadeUp = (delay = 0) => ({
  hidden: { opacity: 0, y: 12 },
  show: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.45, ease: "easeOut", delay },
  },
});

const fadeScale = (delay = 0) => ({
  hidden: { opacity: 0, scale: 0.98 },
  show: {
    opacity: 1,
    scale: 1,
    transition: { duration: 0.5, ease: "easeOut", delay },
  },
});

const fadeLeft = (delay = 0) => ({
  hidden: { opacity: 0, x: -12 },
  show: { opacity: 1, x: 0, transition: { duration: 0.4, ease: "easeOut", delay } },
});

const fadeRight = (delay = 0) => ({
  hidden: { opacity: 0, x: 12 },
  show: { opacity: 1, x: 0, transition: { duration: 0.42, ease: "easeOut", delay } },
});

/* ---------------- CountUp (sans lib externe) ---------------- */
function CountUp({
  to,
  duration = 1200,
  prefix = "",
  suffix = "",
  decimals = 0,
  className = "",
}: {
  to: number;
  duration?: number; // ms
  prefix?: string;
  suffix?: string;
  decimals?: number;
  className?: string;
}) {
  const [val, setVal] = useState(0);

  useEffect(() => {
    let raf = 0;
    const start = performance.now();
    const tick = (t: number) => {
      const p = Math.min(1, (t - start) / duration);
      const eased = 1 - Math.pow(1 - p, 3); // easeOutCubic
      setVal(to * eased);
      if (p < 1) raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [to, duration]);

  const formatted = new Intl.NumberFormat("fr-FR", {
    minimumFractionDigits: decimals,
    maximumFractionDigits: decimals,
  }).format(val);

  return <span className={className}>{prefix}{formatted}{suffix}</span>;
}

/* ---------------- Norm Badge ---------------- */
const NormBadge = ({ children }: { children: React.ReactNode }) => (
  <motion.div
    variants={fadeScale()}
    className="flex items-center gap-2 px-3 py-2 rounded-lg border border-gray-200 bg-white shadow-sm text-sm dark:bg-neutral-900 dark:border-neutral-800"
  >
    <ShieldCheck className="w-4 h-4 text-emerald-600" />
    <span className="font-medium">{children}</span>
  </motion.div>
);

/* ---------------- Placeholder 3D (SVG) ---------------- */
const BOITIER_SVG = `data:image/svg+xml;utf8,${encodeURIComponent(
  `<svg xmlns='http://www.w3.org/2000/svg' width='880' height='520'>
    <defs>
      <linearGradient id='g' x1='0' y1='0' x2='1' y2='1'>
        <stop offset='0' stop-color='#e7f8f1'/>
        <stop offset='1' stop-color='#ffffff'/>
      </linearGradient>
    </defs>
    <rect rx='32' ry='32' x='160' y='90' width='560' height='360' fill='url(#g)' stroke='#96e6c4' stroke-width='3'/>
    <circle cx='650' cy='140' r='8' fill='#22c55e' />
    <rect x='190' y='130' width='500' height='280' rx='18' fill='white' stroke='#d1d5db'/>
    <text x='205' y='170' font-size='24' font-family='Inter,Arial' fill='#111827'>EcoSwitch™ Core v10.2</text>
  </svg>`
)} `;

/* ---------------- Scroll progress bar ---------------- */
function useScrollProgress() {
  const [progress, setProgress] = useState(0);
  useEffect(() => {
    const onScroll = () => {
      const scrollTop = window.scrollY;
      const docH = document.documentElement.scrollHeight - window.innerHeight;
      setProgress(docH > 0 ? scrollTop / docH : 0);
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);
  return progress;
}

/* ---------------- Theme Switch (persistant) ---------------- */
function useTheme() {
  const [theme, setTheme] = useState<"light" | "dark">("light");
  useEffect(() => {
    const stored = localStorage.getItem("theme");
    const preferred =
      stored ?? (window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light");
    setTheme(preferred as "light" | "dark");
    document.documentElement.classList.toggle("dark", preferred === "dark");
  }, []);
  const toggle = () => {
    setTheme((prev) => {
      const next = prev === "light" ? "dark" : "light";
      localStorage.setItem("theme", next);
      document.documentElement.classList.toggle("dark", next === "dark");
      return next;
    });
  };
  return { theme, toggle };
}

/* ---------------- Countdown offre (persistant) ---------------- */
function useCountdown(hoursDefault = 72) {
  const [endsAt, setEndsAt] = useState<number>(() => {
    if (typeof window === "undefined") return Date.now() + hoursDefault * 3600_000;
    const saved = localStorage.getItem("offerEndsAt");
    if (saved) return parseInt(saved, 10);
    const t = Date.now() + hoursDefault * 3600_000;
    localStorage.setItem("offerEndsAt", String(t));
    return t;
  });
  const [now, setNow] = useState<number>(Date.now());

  useEffect(() => {
    const id = setInterval(() => setNow(Date.now()), 1000);
    return () => clearInterval(id);
  }, []);

  const remaining = Math.max(0, endsAt - now);
  const percent = Math.max(0, Math.min(1, remaining / (hoursDefault * 3600_000)));

  const hrs = Math.floor(remaining / 3600_000);
  const mins = Math.floor((remaining % 3600_000) / 60_000);
  const secs = Math.floor((remaining % 60_000) / 1000);

  return { hrs, mins, secs, percent, remaining, setEndsAt };
}

/* ---------------- FAQ data ---------------- */
const FAQ = [
  {
    q: "Est-ce que mes données partent dans le cloud ?",
    a: "Non. L’Assistant EcoSwitch collecte et traite localement les données nécessaires au diagnostic. Vous restez propriétaire de vos données.",
  },
  {
    q: "Et si je ne change pas de chaudière ?",
    a: "Vous obtenez tout de même un bilan complet de performance : rendement mesuré, confort, trajectoires possibles (conserver, hybride, PAC) avec chiffres à l’appui.",
  },
  {
    q: "Combien de temps faut-il pour avoir un verdict ?",
    a: "Une saison de chauffe permet de capter vos usages et les conditions réelles. À l’issue de l’hiver, vous recevez un rapport clair et actionnable.",
  },
  {
    q: "L’appareil est-il difficile à installer ?",
    a: "Non, l’installation est simple : branchement du boîtier et pose de capteurs sur la chaudière. Un guide pas-à-pas est fourni.",
  },
];

function FaqItem({ q, a }: { q: string; a: string }) {
  const [open, setOpen] = useState(false);
  const reduce = useReducedMotion();
  return (
    <div className="border-b border-gray-200 dark:border-neutral-800">
      <button
        onClick={() => setOpen((o) => !o)}
        className="w-full flex items-center justify-between py-4 text-left"
        aria-expanded={open}
      >
        <span className="font-medium">{q}</span>
        {open ? <Minus className="w-4 h-4 text-emerald-600" /> : <Plus className="w-4 h-4 text-emerald-600" />}
      </button>
      <motion.div
        initial={false}
        animate={{ height: open ? "auto" : 0, opacity: open ? 1 : 0 }}
        transition={{ duration: reduce ? 0.12 : 0.24, ease: "easeOut" }}
        className="overflow-hidden"
      >
        <p className="pb-4 text-gray-700 dark:text-gray-300">{a}</p>
      </motion.div>
    </div>
  );
}

/* ---------------- Page ---------------- */
export default function Page() {
  const reduce = useReducedMotion();
  const progress = useScrollProgress();
  const { theme, toggle } = useTheme();
  const countdown = useCountdown(72);

  // Waitlist states
  const [email, setEmail] = useState("");
  const [formState, setFormState] =
    useState<"idle" | "submitting" | "success" | "error">("idle");
  const [formError, setFormError] = useState<string | null>(null);

  // Pulse control (hero halo)
  const pulseAnim = useMemo(
    () =>
      reduce
        ? {}
        : {
            animate: { opacity: [0.9, 1, 0.9] as any },
            transition: { duration: 6, repeat: Infinity },
          },
    [reduce]
  );

  const pad = (n: number) => String(n).padStart(2, "0");

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (formState === "submitting") return;
    setFormError(null);
    setFormState("submitting");
    try {
      const form = e.currentTarget;
      const hp = (form.querySelector("#hp") as HTMLInputElement)?.value || "";

      const res = await fetch("/api/waitlist", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, hp }),
      });
      const data = await res.json();
      if (!res.ok || !data.ok) {
        setFormState("error");
        setFormError(data.error || "Erreur d’envoi. Réessayez.");
        return;
      }
      setFormState("success");
    } catch {
      setFormState("error");
      setFormError("Erreur réseau. Réessayez.");
    }
  }

  return (
    <div className="bg-[#F7F9FC] text-[#111827] min-h-screen font-sans dark:bg-neutral-950 dark:text-neutral-100">
      {/* Global smooth scroll */}
      <style jsx global>{`
        html { scroll-behavior: smooth; }
      `}</style>

      {/* Scroll progress bar */}
      <div
        style={{ transform: `scaleX(${progress})` }}
        className="fixed top-0 left-0 h-0.5 w-full origin-left bg-emerald-600 z-40"
        aria-hidden
      />

      {/* Header */}
      <header className="sticky top-0 z-30 bg-white/80 dark:bg-neutral-900/70 backdrop-blur supports-[backdrop-filter]:bg-white/70 dark:supports-[backdrop-filter]:bg-neutral-900/60 border-b border-gray-200 dark:border-neutral-800">
        <div className="max-w-6xl mx-auto px-6 py-3 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-md border-2 border-dashed border-emerald-300 bg-emerald-50 dark:bg-emerald-900/20" />
            <span className="font-extrabold tracking-tight">EcoSwitch</span>
          </div>
          <nav className="hidden md:flex items-center gap-5 text-sm">
            <a href="#demo" className="hover:text-emerald-700 dark:hover:text-emerald-400 transition-colors duration-200">
              Démo v10.2
            </a>
            <a href="#testeurs" className="hover:text-emerald-700 dark:hover:text-emerald-400 transition-colors duration-200">
              Programme testeur
            </a>
            <a href="#waitlist" className="hover:text-emerald-700 dark:hover:text-emerald-400 transition-colors duration-200">
              Lancement 2026
            </a>
          </nav>
          <button
            onClick={toggle}
            className="ml-4 inline-flex items-center gap-2 px-3 py-2 rounded-lg border border-gray-200 dark:border-neutral-800 bg-white dark:bg-neutral-900 shadow-sm text-sm hover:bg-gray-50 dark:hover:bg-neutral-800 transition-colors"
            aria-label="Basculer le thème"
          >
            {theme === "dark" ? <Sun className="w-4 h-4" /> : <Moon className="w-4 h-4" />}
            <span className="hidden sm:inline">{theme === "dark" ? "Clair" : "Sombre"}</span>
          </button>
        </div>

        {/* Countdown bar sous le header */}
        <div className="border-t border-gray-200 dark:border-neutral-800">
          <div className="max-w-6xl mx-auto px-6 py-2 flex items-center justify-between text-sm">
            <div className="flex items-center gap-2">
              <Timer className="w-4 h-4 text-emerald-600" />
              <span>
                Offre de lancement <span className="font-semibold">199€</span>{" "}
                <span className="text-xs text-gray-500 line-through ml-1">249€</span>
              </span>
            </div>
            <div className="flex items-center gap-3">
              <span className="font-mono tabular-nums">
                {pad(countdown.hrs)}:{pad(countdown.mins)}:{pad(countdown.secs)}
              </span>
              <div className="w-32 h-1.5 rounded-full bg-gray-200 dark:bg-neutral-800 overflow-hidden">
                <div
                  className="h-full bg-emerald-600 transition-[width] duration-500"
                  style={{ width: `${Math.max(0, Math.min(100, countdown.percent * 100))}%` }}
                />
              </div>
            </div>
          </div>
        </div>
      </header>

      {/* Hero */}
      <section className="max-w-6xl mx-auto px-6 py-16 grid lg:grid-cols-2 gap-10 items-center">
        <div>
          <motion.div
            variants={fadeUp(0.08)}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, amount: 0.6 }}
            className="inline-flex items-center gap-2 text-xs font-semibold text-emerald-700 bg-emerald-100 px-3 py-1 rounded-full dark:text-emerald-300 dark:bg-emerald-900/30"
          >
            <Beaker className="w-4 h-4" /> Démo scientifique v10.2
          </motion.div>

          <motion.h1
            variants={fadeScale(0.12)}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true }}
            className="text-4xl md:text-5xl font-extrabold leading-tight mt-3"
          >
            Arrêtez de deviner.
            <br />
            Mesurez votre performance énergétique.
          </motion.h1>

          <motion.p
            variants={fadeUp(0.18)}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true }}
            className="mt-4 text-gray-600 text-lg dark:text-gray-300"
          >
            Découvrez EcoSwitch, le premier coach énergétique qui analyse votre chauffage en{" "}
            <strong>conditions réelles</strong> pendant une saison de chauffe et recommande,{" "}
            <strong>scientifiquement</strong>, la solution la plus rentable.
          </motion.p>

          <motion.div
            variants={fadeUp(0.24)}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true }}
            className="mt-6 flex flex-wrap gap-3"
          >
            <motion.a
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.98 }}
              href="#demo"
              className="inline-flex items-center gap-2 bg-emerald-600 text-white px-6 py-3 rounded-xl font-semibold shadow hover:bg-emerald-700 focus:outline-none focus:ring-2 focus:ring-emerald-400 transition-colors duration-200"
            >
              🚀 Explorer la démo scientifique <ChevronRight className="w-5 h-5" />
            </motion.a>
            <motion.a
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.98 }}
              href="#testeurs"
              className="inline-flex items-center gap-2 bg-white text-emerald-700 px-6 py-3 rounded-xl font-semibold border border-emerald-300 shadow hover:bg-emerald-50 focus:outline-none focus:ring-2 focus:ring-emerald-300 transition-colors duration-200 dark:bg-neutral-900 dark:text-emerald-300 dark:border-neutral-700 dark:hover:bg-neutral-800"
            >
              👨‍🔬 Devenir l&apos;un des 50 foyers testeurs
            </motion.a>
          </motion.div>

          <div className="mt-4 text-xs text-gray-500 dark:text-gray-400">
            Aucune donnée envoyée dans le cloud • Méthode transparente • Rapport actionnable
          </div>

          {/* Badge stock (optionnel) */}
          <div className="mt-3 text-xs text-emerald-700 font-semibold bg-emerald-100 inline-flex items-center px-2.5 py-1 rounded-full dark:text-emerald-300 dark:bg-emerald-900/30">
            Offre de lancement : <span className="ml-1">30 unités</span> — <span className="ml-1">stock restant : 17</span>
          </div>
        </div>

        {/* Boîtier + halo */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="relative w-full h-72 rounded-3xl border border-emerald-100 shadow-inner overflow-hidden dark:border-emerald-900/30"
          style={{
            background:
              "linear-gradient(135deg, rgba(236,253,245,1) 0%, rgba(255,255,255,1) 100%)",
          }}
        >
          {!reduce && (
            <motion.div
              animate={{ opacity: [0.9, 1, 0.9] }}
              transition={{ duration: 6, repeat: Infinity }}
              className="absolute -inset-6 rounded-[2rem] bg-emerald-200/30 blur-xl"
              aria-hidden
            />
          )}
          <img
            src={BOITIER_SVG}
            alt="Rendu 3D du boîtier EcoSwitch (placeholder)"
            loading="lazy"
            className="relative z-10 w-full h-full object-contain"
          />
        </motion.div>
      </section>

      {/* Problème */}
      <section className="max-w-6xl mx-auto px-6 py-14 grid lg:grid-cols-2 gap-10 items-start">
        <motion.div
          variants={fadeLeft()}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.4 }}
        >
          <h2 className="text-2xl font-extrabold mb-3">❌ Le problème aujourd’hui</h2>
          <ul className="list-disc list-inside space-y-2 text-gray-700 dark:text-gray-300">
            <li>Les simulateurs en ligne se basent sur des moyennes, pas sur votre maison.</li>
            <li>Les devis d’installateurs reflètent aussi leurs propres intérêts commerciaux.</li>
            <li>Résultat : recommandations approximatives, investissements parfois mal dimensionnés.</li>
          </ul>
        </motion.div>

        <motion.div
          variants={fadeUp(0.1)}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.4 }}
          className="bg-white p-6 rounded-2xl border border-gray-200 shadow-sm dark:bg-neutral-900 dark:border-neutral-800"
        >
          <div className="font-semibold mb-2">Le cœur du problème</div>
          <p className="text-gray-700 dark:text-gray-300">
            Sans <strong>données mesurées</strong> chez vous (hiver réel, usage réel), on compare des hypothèses.
            EcoSwitch part de votre réalité, pas de déclaratif.
          </p>
        </motion.div>
      </section>

      {/* Solution */}
      <section className="max-w-6xl mx-auto px-6 py-14">
        <motion.h2
          variants={fadeUp()}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true }}
          className="text-2xl font-extrabold mb-6"
        >
          ✅ La différence EcoSwitch
        </motion.h2>

        <div className="grid lg:grid-cols-3 gap-6">
          <motion.div
            variants={fadeUp(0.05)}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, amount: 0.5 }}
            className="bg-white p-6 rounded-2xl border border-gray-200 shadow-sm dark:bg-neutral-900 dark:border-neutral-800"
          >
            <Cpu className="w-6 h-6 text-emerald-600" />
            <div className="font-semibold mt-3">Installation facile</div>
            <p className="text-gray-700 text-sm mt-1 dark:text-gray-300">
              Branchez le boîtier. Posez les capteurs sur la chaudière. C’est tout.
            </p>
          </motion.div>

          <motion.div
            variants={fadeUp(0.12)}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, amount: 0.5 }}
            className="bg-white p-6 rounded-2xl border border-gray-200 shadow-sm dark:bg-neutral-900 dark:border-neutral-800"
          >
            <FlaskConical className="w-6 h-6 text-emerald-600" />
            <div className="font-semibold mt-3">Diagnostic autonome (1 saison)</div>
            <p className="text-gray-700 text-sm mt-1 dark:text-gray-300">
              EcoSwitch Core™ capture et analyse des milliers de points : rendement, cycles, déperditions, confort.
            </p>
          </motion.div>

          <motion.div
            variants={fadeUp(0.18)}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, amount: 0.5 }}
            className="bg-white p-6 rounded-2xl border border-gray-200 shadow-sm dark:bg-neutral-900 dark:border-neutral-800"
          >
            <ShieldCheck className="w-6 h-6 text-emerald-600" />
            <div className="font-semibold mt-3">Verdict scientifique</div>
            <p className="text-gray-700 text-sm mt-1 dark:text-gray-300">
              À la fin de l’hiver : une LED + un <strong>rapport détaillé</strong> recommandent 🟠 Conserver, 🔵 Hybride ou 🟢 PAC.
            </p>
          </motion.div>
        </div>
      </section>

      {/* --- Chiffres clés (compteurs) --- */}
      <section className="max-w-6xl mx-auto px-6 py-14">
        <motion.h2
          variants={fadeUp()}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true }}
          className="text-2xl font-extrabold mb-6"
        >
          Ce que change EcoSwitch, en chiffres
        </motion.h2>

        <div className="grid sm:grid-cols-3 gap-6">
          <motion.div
            variants={fadeScale()}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, amount: 0.6 }}
            className="bg-white rounded-2xl border border-gray-200 shadow-sm p-6 text-center dark:bg-neutral-900 dark:border-neutral-800"
          >
            <div className="text-sm text-gray-500 dark:text-gray-400">Économies estimées / an*</div>
            <CountUp to={720} duration={1400} suffix=" €" className="block text-4xl font-extrabold mt-1 text-emerald-600" />
            <div className="text-xs text-gray-500 mt-2 dark:text-gray-500">*selon profil type observé</div>
          </motion.div>

          <motion.div
            variants={fadeScale()}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, amount: 0.6 }}
            className="bg-white rounded-2xl border border-gray-200 shadow-sm p-6 text-center dark:bg-neutral-900 dark:border-neutral-800"
          >
            <div className="text-sm text-gray-500 dark:text-gray-400">CO₂ évité / an*</div>
            <CountUp to={1.4} duration={1500} suffix=" t" decimals={1} className="block text-4xl font-extrabold mt-1 text-emerald-600" />
            <div className="text-xs text-gray-500 mt-2 dark:text-gray-500">*par rapport à un usage gaz seul</div>
          </motion.div>

          <motion.div
            variants={fadeScale()}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, amount: 0.6 }}
            className="bg-white rounded-2xl border border-gray-200 shadow-sm p-6 text-center dark:bg-neutral-900 dark:border-neutral-800"
          >
            <div className="text-sm text-gray-500 dark:text-gray-400">Données analysées par saison</div>
            <CountUp to={8760} duration={1600} suffix=" h" className="block text-4xl font-extrabold mt-1 text-emerald-600" />
            <div className="text-xs text-gray-500 mt-2 dark:text-gray-500">capteurs & cycles réels</div>
          </motion.div>
        </div>
      </section>

      {/* Noyau scientifique */}
      <section className="max-w-6xl mx-auto px-6 py-14">
        <motion.div
          variants={fadeScale()}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.5 }}
          className="bg-white p-6 rounded-2xl border border-gray-200 shadow-sm dark:bg-neutral-900 dark:border-neutral-800"
        >
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
            <div>
              <h3 className="text-xl font-extrabold">
                Un moteur de calcul digne d’un laboratoire, dans un boîtier de 95 mm.
              </h3>
              <p className="text-gray-700 mt-1 dark:text-gray-300">
                EcoSwitch Core™ <span className="font-semibold">v10.2</span> applique des normes reconnues pour garantir
                une comparaison juste et reproductible.
              </p>
            </div>
            <motion.div
              variants={fadeRight()}
              className="flex items-center gap-2 text-xs font-semibold text-emerald-700 bg-emerald-100 px-3 py-1 rounded-full w-max dark:text-emerald-300 dark:bg-emerald-900/30"
            >
              <ShieldCheck className="w-4 h-4" /> Méthode validée scientifiquement
            </motion.div>
          </div>

          <motion.div
            initial="hidden"
            whileInView="show"
            viewport={{ once: true }}
            className="grid sm:grid-cols-2 lg:grid-cols-4 gap-3 mt-5"
          >
            <NormBadge>[ISO 52016] Modèle thermique du bâtiment</NormBadge>
            <NormBadge>[EN 14825] Performance Pompe à Chaleur</NormBadge>
            <NormBadge>[EN 15316] Rendement Chaudière Gaz</NormBadge>
            <NormBadge>[RGPD] Données locales, sans cloud</NormBadge>
          </motion.div>
        </motion.div>
      </section>

      {/* Démo scientifique */}
      <section id="demo" className="max-w-6xl mx-auto px-6 py-14">
        <motion.h2
          variants={fadeUp()}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true }}
          className="text-2xl font-extrabold mb-3"
        >
          Explorez la Démo v10.2 en direct
        </motion.h2>
        <motion.p
          variants={fadeUp(0.08)}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true }}
          className="text-gray-700 mb-4 dark:text-gray-300"
        >
          Interagissez avec les résultats d’un foyer témoin déjà analysé : parcourez le rapport final, ajustez quelques
          paramètres, comprenez la profondeur de l’analyse.
        </motion.p>

        <motion.div
          variants={fadeScale()}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.6 }}
          className="rounded-2xl border border-gray-200 bg-white shadow-sm overflow-hidden dark:bg-neutral-900 dark:border-neutral-800"
        >
          <div className="p-4 text-sm text-gray-600 dark:text-gray-400">Intégration Streamlit (aperçu)</div>
          <div className="aspect-[16/9] bg-gray-100 dark:bg-neutral-800 flex items-center justify-center text-gray-500 dark:text-gray-400">
            <span>
              Iframe Streamlit ici — ex : <code>https://demo-ecoswitch.streamlit.app</code>
            </span>
          </div>
        </motion.div>

        <motion.ol
          variants={fadeUp(0.12)}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true }}
          className="mt-6 list-decimal list-inside space-y-2 text-gray-700 dark:text-gray-300"
        >
          <li>Ouvrez l’onglet « Rapport » et visualisez les économies et le CO₂ évité.</li>
          <li>Modifiez le climat (froid/doux) pour voir l’impact sur la recommandation.</li>
          <li>Comparez Gaz vs Hybride vs PAC avec les hypothèses de prix actuelles.</li>
        </motion.ol>
      </section>

      {/* Programme testeur */}
      <section id="testeurs" className="max-w-6xl mx-auto px-6 py-14 grid lg:grid-cols-2 gap-10 items-start">
        <motion.div
          variants={fadeLeft()}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.5 }}
        >
          <h2 className="text-2xl font-extrabold mb-2">
            Participez à la révolution : devenez l’un de nos 50 foyers testeurs.
          </h2>
          <p className="text-gray-700 dark:text-gray-300">
            Nous recherchons 50 foyers équipés d’une chaudière gaz pour tester EcoSwitch durant l’hiver 2025-2026.
            Recevez le boîtier en avant-première, profitez d’une analyse scientifique gratuite et contribuez à fixer un
            nouveau standard du conseil énergétique.
          </p>
          <motion.a
            whileHover={{ scale: 1.03 }}
            whileTap={{ scale: 0.98 }}
            href="https://forms.gle/your-form"
            target="_blank"
            rel="noreferrer"
            className="inline-flex items-center gap-2 mt-4 bg-emerald-600 text-white px-6 py-3 rounded-xl font-semibold shadow hover:bg-emerald-700 focus:outline-none focus:ring-2 focus:ring-emerald-400 transition-colors duration-200"
          >
            <Users className="w-5 h-5" /> Je postule au programme testeur
          </motion.a>
          <p className="text-xs text-gray-500 mt-2 dark:text-gray-400">
            Sélection sur dossier (type de logement, usage, motivation). Réponse sous 7 jours.
          </p>
        </motion.div>

        <motion.div
          variants={fadeUp(0.06)}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.5 }}
          className="bg-white p-6 rounded-2xl border border-gray-200 shadow-sm dark:bg-neutral-900 dark:border-neutral-800"
        >
          <div className="font-semibold mb-2">Ce que vous recevrez</div>
          <ul className="list-disc list-inside space-y-2 text-gray-700 dark:text-gray-300">
            <li>Le boîtier EcoSwitch + capteurs</li>
            <li>Un accompagnement d’installation</li>
            <li>Un rapport scientifique détaillé en fin de saison</li>
          </ul>
        </motion.div>
      </section>

      {/* FAQ */}
      <section className="max-w-6xl mx-auto px-6 py-14">
        <motion.h2
          variants={fadeUp()}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true }}
          className="text-2xl font-extrabold mb-4"
        >
          Questions fréquentes
        </motion.h2>
        <div className="bg-white rounded-2xl border border-gray-200 shadow-sm p-2 dark:bg-neutral-900 dark:border-neutral-800">
          <div className="divide-y divide-gray-200 dark:divide-neutral-800">
            {FAQ.map((item, i) => (
              <FaqItem key={i} q={item.q} a={item.a} />
            ))}
          </div>
        </div>
      </section>

      {/* Waitlist */}
      <section id="waitlist" className="max-w-6xl mx-auto px-6 py-14">
        <motion.div
          variants={fadeScale()}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.5 }}
          className="bg-white p-6 rounded-2xl border border-gray-200 shadow-sm dark:bg-neutral-900 dark:border-neutral-800"
        >
          <h2 className="text-2xl font-extrabold mb-2">
            Intéressé(e) par le lancement commercial en juin 2026 ?
          </h2>
          <p className="text-gray-700 dark:text-gray-300">
            Laissez votre email pour être prévenu(e) du lancement officiel et bénéficier d’une offre spéciale Early Bird.
          </p>

          <form
            onSubmit={handleSubmit}
            className="mt-4 grid sm:grid-cols-[1fr_auto] gap-3"
            aria-live="polite"
          >
            <label htmlFor="email" className="sr-only">Votre email</label>
            <input
              id="email"
              type="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="votre@email.fr"
              aria-invalid={formState === "error" ? true : undefined}
              className="px-4 py-3 rounded-xl border border-gray-300 focus:outline-none focus:ring-2 focus:ring-emerald-400 dark:border-neutral-700 dark:bg-neutral-900"
            />
            {/* Honeypot anti-bot */}
            <input id="hp" name="hp" type="text" tabIndex={-1}
              className="absolute left-[-9999px] top-auto" aria-hidden="true" />

            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              disabled={formState === "submitting" || formState === "success"}
              className={`inline-flex items-center justify-center gap-2 px-6 py-3 rounded-xl font-semibold shadow focus:outline-none focus:ring-2 focus:ring-emerald-400 transition-colors duration-200 ${
                formState === "success"
                  ? "bg-emerald-100 text-emerald-700 border border-emerald-300 dark:bg-emerald-900/20 dark:text-emerald-300 dark:border-emerald-900"
                  : "bg-emerald-600 text-white hover:bg-emerald-700"
              }`}
            >
              <Mail className="w-5 h-5" />
              {formState === "submitting"
                ? "Envoi…"
                : formState === "success"
                ? "Inscription confirmée"
                : "Me tenir informé(e)"}
            </motion.button>
          </form>

          {formState === "success" && (
            <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="text-sm text-emerald-700 mt-2 dark:text-emerald-300">
              Merci ! Vous êtes bien inscrit(e). Nous vous préviendrons dès l’ouverture.
            </motion.p>
          )}
          {formState === "error" && (
            <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="text-sm text-rose-600 mt-2">
              {formError || "Oups, une erreur est survenue. Réessayez."}
            </motion.p>
          )}
          <p className="text-xs text-gray-500 mt-2 dark:text-gray-500">Nous n’envoyons pas de spam. Désinscription en 1 clic.</p>
        </motion.div>
      </section>

      {/* Footer */}
      <footer className="text-center text-sm text-gray-500 py-10 dark:text-gray-400">
        Méthodologie • Sécurité des données • Contact • Mentions légales • CGU
      </footer>

      {/* Sticky CTA mobile */}
      <div className="fixed bottom-0 inset-x-0 z-40 md:hidden">
        <div className="mx-4 mb-4 rounded-2xl shadow-lg border border-emerald-200 bg-white/95 backdrop-blur p-3 flex items-center justify-between dark:bg-neutral-900/95 dark:border-neutral-800">
          <div>
            <div className="text-[13px] text-gray-500 leading-tight dark:text-gray-400">Offre de lancement (30 premières unités)</div>
            <div className="text-[15px] font-semibold">
              <span className="text-emerald-700 dark:text-emerald-300">199€</span>
              <span className="text-gray-400 line-through ml-1">249€</span>
            </div>
          </div>
          <a
            href="#waitlist"
            className="inline-flex items-center gap-2 bg-emerald-600 text-white px-4 py-2.5 rounded-xl font-semibold shadow hover:bg-emerald-700 focus:outline-none focus:ring-2 focus:ring-emerald-400 transition-colors duration-200"
          >
            Réserver
            <ChevronRight className="w-4 h-4" />
          </a>
        </div>
      </div>
    </div>
  );
}
