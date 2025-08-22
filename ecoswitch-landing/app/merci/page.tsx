import Link from "next/link";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Merci – EcoSwitch",
  description:
    "Inscription confirmée. Nous vous tiendrons informé(e) du lancement EcoSwitch.",
  robots: { index: false, follow: false }, // page utilitaire
};

function Badge({
  children,
  tone = "success",
}: {
  children: React.ReactNode;
  tone?: "success" | "info";
}) {
  const map = {
    success:
      "bg-emerald-50 text-emerald-700 border-emerald-200 dark:bg-emerald-900/20 dark:text-emerald-300 dark:border-emerald-900",
    info: "bg-blue-50 text-blue-700 border-blue-200 dark:bg-blue-900/20 dark:text-blue-300 dark:border-blue-900",
  } as const;
  return (
    <span className={`inline-flex items-center gap-2 px-3 py-1.5 rounded-full border text-sm ${map[tone]}`}>
      {children}
    </span>
  );
}

export default function MerciPage({
  searchParams,
}: {
  searchParams?: { doi?: string; already?: string };
}) {
  const isDoi = searchParams?.doi === "1";        // ?doi=1 si Double Opt-In confirmé
  const isAlready = searchParams?.already === "1"; // ?already=1 si email déjà présent

  return (
    <main className="min-h-screen bg-[#F7F9FC] text-[#111827] dark:bg-neutral-950 dark:text-neutral-100">
      <header className="sticky top-0 z-30 bg-white/80 dark:bg-neutral-900/70 backdrop-blur border-b border-gray-200 dark:border-neutral-800">
        <div className="max-w-4xl mx-auto px-6 py-3 flex items-center justify-between">
          <Link href="/" className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-md border-2 border-dashed border-emerald-300 bg-emerald-50 dark:bg-emerald-900/20" />
            <span className="font-extrabold tracking-tight">EcoSwitch</span>
          </Link>
          <Link
            href="/#waitlist"
            className="text-sm px-3 py-2 rounded-lg border border-gray-200 bg-white shadow-sm hover:bg-gray-50 dark:bg-neutral-900 dark:border-neutral-800 dark:hover:bg-neutral-800 transition-colors"
          >
            Retour
          </Link>
        </div>
      </header>

      <section className="max-w-3xl mx-auto px-6 py-16">
        <div className="bg-white rounded-2xl border border-gray-200 shadow-sm p-8 text-center dark:bg-neutral-900 dark:border-neutral-800">
          {/* Icône “check” en SVG, no-deps */}
          <div className="mx-auto mb-4 w-14 h-14 rounded-full flex items-center justify-center bg-emerald-100 text-emerald-700 dark:bg-emerald-900/30 dark:text-emerald-300">
            <svg width="28" height="28" viewBox="0 0 24 24" fill="none" aria-hidden>
              <path d="M20 7L9 18l-5-5" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </div>

          <h1 className="text-3xl font-extrabold">Merci, votre inscription est confirmée.</h1>

          <p className="mt-3 text-gray-600 dark:text-gray-300">
            Nous vous tiendrons informé(e) des étapes clés : ouverture du programme testeur,
            mises à jour de la démo scientifique et lancement commercial.
          </p>

          <div className="mt-5 flex flex-col items-center gap-2">
            {isDoi ? (
              <Badge>
                ✅ Double Opt-In confirmé — email vérifié
              </Badge>
            ) : (
              <Badge tone="info">ℹ️ Inscription enregistrée</Badge>
            )}

            {isAlready && (
              <Badge tone="info">Vous étiez déjà inscrit(e) — profil à jour</Badge>
            )}
          </div>

          <div className="mt-8 grid sm:grid-cols-2 gap-3">
            <Link
              href="/#demo"
              className="inline-flex items-center justify-center gap-2 px-6 py-3 rounded-xl font-semibold bg-emerald-600 text-white hover:bg-emerald-700 focus:outline-none focus:ring-2 focus:ring-emerald-400 transition-colors"
            >
              Explorer la démo scientifique
            </Link>
            <Link
              href="/#testeurs"
              className="inline-flex items-center justify-center gap-2 px-6 py-3 rounded-xl font-semibold border border-emerald-300 text-emerald-700 bg-white hover:bg-emerald-50 focus:outline-none focus:ring-2 focus:ring-emerald-300 dark:bg-neutral-900 dark:text-emerald-300 dark:border-neutral-700 dark:hover:bg-neutral-800 transition-colors"
            >
              Devenir foyer testeur
            </Link>
          </div>

          <p className="text-xs text-gray-500 mt-6 dark:text-gray-500">
            Aucune donnée n’est partagée avec des tiers. Désinscription en un clic à tout moment.
          </p>
        </div>
      </section>
    </main>
  );
}
