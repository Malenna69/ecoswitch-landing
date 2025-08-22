"use client";

import Link from "next/link";

export default function LandingA() {
  return (
    <main className="min-h-screen bg-black text-white">
      {/* Header */}
      <header className="fixed top-0 inset-x-0 z-40 border-b border-white/10 bg-black/40 backdrop-blur">
        <div className="mx-auto max-w-6xl px-6 h-14 flex items-center justify-between">
          <Link href="/" className="font-bold tracking-widest">ECOSWITCH</Link>
          <nav className="flex items-center gap-6 text-sm">
            <a href="#features" className="hover:opacity-80">Fonctionnalités</a>
            <a href="#demo" className="hover:opacity-80">Démo</a>
            <a
              href="#waitlist"
              className="rounded-full border border-white/20 px-4 py-1.5 hover:bg-white hover:text-black transition"
            >
              Rejoindre
            </a>
          </nav>
        </div>
      </header>

      {/* HERO */}
      <section className="relative h-[100svh] flex items-center">
        <div className="mx-auto max-w-6xl px-6 w-full">
          <div className="max-w-2xl">
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold leading-tight tracking-tight">
              L’Assistant Énergie qui
              <br />
              <span className="inline-block bg-clip-text text-transparent bg-gradient-to-r from-white to-white/60">
                optimise votre foyer
              </span>.
            </h1>
            <p className="mt-5 text-white/70 text-lg">
              Mesurez, comprenez, réduisez. Des recommandations neutres, chiffrées,
              adaptées à votre habitat.
            </p>
            <div className="mt-8 flex gap-3">
              <a
                href="#waitlist"
                className="rounded-full bg-white text-black px-6 py-3 font-semibold hover:bg-white/90 transition"
              >
                Rejoindre la liste
              </a>
              <a
                href="#demo"
                className="rounded-full border border-white/30 px-6 py-3 font-semibold hover:bg-white/10 transition"
              >
                Voir la démo
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* FEATURES */}
      <section id="features" className="scroll-mt-20 py-20 border-t border-white/10">
        <div className="mx-auto max-w-6xl px-6 grid sm:grid-cols-3 gap-6">
          {[
            ["Mesure temps réel", "Suivi clair : kWh, € et CO₂."],
            ["Reco neutre", "PAC seule, hybride, ou conservation chaudière."],
            ["Confidentialité", "Données privées, non revendues."],
          ].map(([title, desc], i) => (
            <div key={i} className="rounded-2xl border border-white/10 bg-white/[0.02] p-6">
              <h3 className="font-semibold">{title}</h3>
              <p className="mt-2 text-sm text-white/70">{desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* DEMO */}
      <section id="demo" className="scroll-mt-20 py-20 border-t border-white/10">
        <div className="mx-auto max-w-6xl px-6 grid md:grid-cols-2 gap-8 items-center">
          <div>
            <h2 className="text-3xl font-bold">Démo pédagogique</h2>
            <p className="mt-3 text-white/70">
              Comparez scénarios, coûts et ROI. Visualisez l’impact réel des changements.
            </p>
            <a
              href="#waitlist"
              className="mt-6 inline-block rounded-full bg-white text-black px-6 py-3 font-semibold hover:bg-white/90 transition"
            >
              Accéder en avant‑première
            </a>
          </div>
          <div className="rounded-2xl border border-white/10 bg-white/[0.02] p-6">
            <div className="aspect-[16/9] rounded-xl bg-gradient-to-br from-white/10 to-emerald-400/10" />
            <p className="text-xs text-white/60 mt-3">
              Aperçu — courbes, comparatifs, verdict 🟢/🔵/🟠
            </p>
          </div>
        </div>
      </section>

      {/* WAITLIST */}
      <section id="waitlist" className="scroll-mt-20 py-20 border-t border-white/10">
        <div className="mx-auto max-w-3xl px-6 text-center">
          <h2 className="text-3xl font-bold">Rejoindre la liste d’attente</h2>
          <p className="mt-3 text-white/70">
            Soyez informé(e) du pilote, des mises à jour de la démo et du lancement.
          </p>
          <form onSubmit={(e) => e.preventDefault()} className="mt-6 grid gap-3 sm:grid-cols-[1fr_auto]">
            <input
              type="email"
              required
              placeholder="votre@email.com"
              className="w-full rounded-full border border-white/20 bg-white/5 px-5 py-3 text-sm outline-none placeholder-white/40 focus:ring-2 focus:ring-white/40"
            />
            <button className="rounded-full bg-white text-black px-6 py-3 text-sm font-semibold hover:bg-white/90 transition">
              S’inscrire
            </button>
          </form>
          <p className="text-xs text-white/50 mt-4">
            Aucune donnée partagée avec des tiers. Désinscription en un clic.
          </p>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-white/10 py-10">
        <div className="mx-auto max-w-6xl px-6 text-sm text-white/60 flex flex-col sm:flex-row items-center justify-between gap-3">
          <div>© {new Date().getFullYear()} EcoSwitch</div>
          <div className="flex items-center gap-4">
            <Link href="/" className="hover:text-white/80">Accueil</Link>
            <Link href="/merci" className="hover:text-white/80">Merci</Link>
          </div>
        </div>
      </footer>
    </main>
  );
}
