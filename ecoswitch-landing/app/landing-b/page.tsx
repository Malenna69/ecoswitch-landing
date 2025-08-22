"use client";

import Link from "next/link";

export default function LandingB() {
  return (
    <main className="min-h-screen bg-[#F7F9FC] text-[#111827] dark:bg-neutral-950 dark:text-neutral-100">
      {/* Header */}
      <header className="sticky top-0 z-30 bg-white/80 dark:bg-neutral-900/70 backdrop-blur border-b border-gray-200 dark:border-neutral-800">
        <div className="max-w-6xl mx-auto px-6 py-3 flex items-center justify-between">
          <Link href="/" className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-md border-2 border-dashed border-emerald-300 bg-emerald-50 dark:bg-emerald-900/20" />
            <span className="font-extrabold tracking-tight">EcoSwitch</span>
          </Link>
          <nav className="flex items-center gap-3">
            <a href="#demo" className="text-sm px-3 py-2 rounded-lg border border-gray-200 bg-white shadow-sm hover:bg-gray-50 dark:bg-neutral-900 dark:border-neutral-800 dark:hover:bg-neutral-800 transition">
              Démo
            </a>
            <a href="#waitlist" className="text-sm px-3 py-2 rounded-lg border border-emerald-300 text-emerald-700 bg-white hover:bg-emerald-50 dark:bg-neutral-900 dark:text-emerald-300 dark:border-neutral-700 dark:hover:bg-neutral-800 transition">
              Waitlist
            </a>
          </nav>
        </div>
      </header>

      {/* Hero */}
      <section className="max-w-6xl mx-auto px-6 py-16">
        <h1 className="text-4xl md:text-5xl font-extrabold leading-tight">
          Ne devinez plus — <span className="text-emerald-600">mesurez</span>.
        </h1>
        <p className="mt-4 text-gray-600 dark:text-gray-300 max-w-2xl">
          L’Assistant Énergie qui compare en local <b>PAC seule</b>, <b>PAC hybride</b> ou
          <b> chaudière conservée</b> et recommande objectivement la meilleure solution
          (économie & CO₂).
        </p>
        <div className="mt-6 flex flex-wrap items-center gap-3">
          <a href="#waitlist" className="inline-flex items-center justify-center gap-2 px-5 py-3 rounded-xl font-semibold bg-emerald-600 text-white hover:bg-emerald-700 focus:outline-none focus:ring-2 focus:ring-emerald-400 transition">
            Rejoindre la liste d’attente
          </a>
          <a href="#demo" className="inline-flex items-center justify-center gap-2 px-5 py-3 rounded-xl font-semibold border border-gray-200 text-gray-800 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-gray-300 dark:bg-neutral-900 dark:text-neutral-100 dark:border-neutral-800 dark:hover:bg-neutral-800 transition">
            Voir la démo
          </a>
        </div>
      </section>

      {/* Démo */}
      <section id="demo" className="max-w-6xl mx-auto px-6 py-12">
        <div className="rounded-2xl border border-gray-200 bg-white p-6 shadow-sm dark:bg-neutral-900 dark:border-neutral-800">
          <div className="aspect-[16/9] w-full rounded-xl bg-gradient-to-br from-emerald-100 to-emerald-50 dark:from-emerald-900/20 dark:to-emerald-900/10" />
          <p className="text-sm text-gray-500 mt-3 dark:text-gray-400">
            Aperçu interface — courbes de consommation, recommandations, simulation d’économies.
          </p>
        </div>
      </section>

      {/* Waitlist */}
      <section id="waitlist" className="max-w-3xl mx-auto px-6 pb-20">
        <div className="rounded-2xl border border-gray-200 bg-white p-8 shadow-sm dark:bg-neutral-900 dark:border-neutral-800">
          <h2 className="text-2xl font-bold text-center">Rejoindre la liste</h2>
          <p className="mt-2 text-center text-gray-600 dark:text-gray-300">
            Laissez votre email pour être informé(e) du lancement et des étapes clés (programme testeur, démo, etc.).
          </p>
          <form onSubmit={(e) => e.preventDefault()} className="mt-6 grid gap-3 sm:grid-cols-[1fr_auto]">
            <input
              type="email"
              required
              placeholder="votre@email.com"
              className="w-full rounded-xl border border-gray-300 bg-white px-4 py-3 text-sm outline-none focus:ring-2 focus:ring-emerald-400 dark:bg-neutral-950 dark:border-neutral-800"
            />
            <button className="rounded-xl bg-emerald-600 px-6 py-3 text-sm font-semibold text-white hover:bg-emerald-700 focus:outline-none focus:ring-2 focus:ring-emerald-400">
              S’inscrire
            </button>
          </form>
          <p className="text-xs text-gray-500 mt-4 text-center dark:text-gray-500">
            Aucune donnée n’est partagée avec des tiers. Désinscription en un clic à tout moment.
          </p>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-gray-200 dark:border-neutral-800 py-8">
        <div className="max-w-6xl mx-auto px-6 text-sm text-gray-500 dark:text-gray-400 flex flex-col sm:flex-row items-center justify-between gap-3">
          <div>© {new Date().getFullYear()} EcoSwitch</div>
          <div className="flex items-center gap-4">
            <Link href="/" className="hover:underline">Accueil</Link>
            <Link href="/merci" className="hover:underline">Merci</Link>
          </div>
        </div>
      </footer>
    </main>
  );
}
