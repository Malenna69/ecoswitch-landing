"use client";

import React, { useEffect, useState } from "react";

/**
 * EcoSwitch — Landing "Starlink-like" (React/Tailwind v4)
 * — Thème clair/sombre via classe .dark sur <html> + persistance localStorage
 * — Compatible App Router (Next 15+) & Tailwind v4 (config 100% CSS)
 */

export default function EcoSwitchLanding() {
  // --- Thème (dark par défaut) ---------------------------------------------
  const [isDark, setIsDark] = useState(true);

  // Initialise à partir de localStorage ou de la préférence OS
  useEffect(() => {
    // côté client uniquement
    const stored = localStorage.getItem("ecoswitch-theme");
    if (stored === "dark") setIsDark(true);
    else if (stored === "light") setIsDark(false);
    else {
      const prefersDark =
        window.matchMedia &&
        window.matchMedia("(prefers-color-scheme: dark)").matches;
      setIsDark(prefersDark);
    }
  }, []);

  // Applique la classe .dark sur <html> et persiste
  useEffect(() => {
    document.documentElement.classList.toggle("dark", isDark);
    localStorage.setItem("ecoswitch-theme", isDark ? "dark" : "light");
  }, [isDark]);

  const toggleTheme = () => setIsDark((v) => !v);

  // --- UI -------------------------------------------------------------------
  return (
    <main className="min-h-screen bg-white text-neutral-900 dark:bg-neutral-950 dark:text-neutral-50 font-sans transition-colors">
      {/* Header */}
      <header className="sticky top-0 z-50 backdrop-blur supports-[backdrop-filter]:bg-white/70 dark:supports-[backdrop-filter]:bg-neutral-950/70 border-b border-black/10 dark:border-white/10 transition-colors">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
          <a href="#" className="flex items-center gap-3 group" aria-label="Accueil EcoSwitch">
            <div className="h-8 w-8 rounded-xl bg-gradient-to-br from-emerald-400 to-cyan-400 shadow-lg shadow-emerald-500/20" />
            <span className="text-lg tracking-tight font-semibold group-hover:opacity-90">EcoSwitch</span>
          </a>

          <nav className="hidden md:flex items-center gap-8 text-sm text-neutral-600 dark:text-neutral-300" aria-label="Navigation principale">
            <a href="#comment-ca-marche" className="hover:text-neutral-950 dark:hover:text-white">Comment ça marche</a>
            <a href="#preuves" className="hover:text-neutral-950 dark:hover:text-white">Preuves</a>
            <a href="#prix" className="hover:text-neutral-950 dark:hover:text-white">Tarif</a>
            <a href="#faq" className="hover:text-neutral-950 dark:hover:text-white">FAQ</a>
          </nav>

          <div className="flex items-center gap-2">
            <button
              onClick={toggleTheme}
              aria-label={isDark ? "Passer au thème clair" : "Passer au thème sombre"}
              className="inline-flex items-center justify-center h-10 w-10 rounded-xl border border-black/10 dark:border-white/15 hover:bg-black/[0.04] dark:hover:bg-white/[0.06] transition-colors"
            >
              {/* Icône Sun/Moon minimaliste */}
              {isDark ? (
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" className="text-white" aria-hidden="true">
                  <path d="M12 18a6 6 0 1 0 0-12 6 6 0 0 0 0 12Z" stroke="currentColor" strokeWidth="1.5"/>
                  <path d="M12 2v2m0 16v2M4.93 4.93l1.41 1.41m11.32 11.32 1.41 1.41M2 12h2m16 0h2M4.93 19.07l1.41-1.41m11.32-11.32 1.41-1.41" stroke="currentColor" strokeWidth="1.5"/>
                </svg>
              ) : (
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" className="text-neutral-900" aria-hidden="true">
                  <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79Z" stroke="currentColor" strokeWidth="1.5"/>
                </svg>
              )}
            </button>

            <a
              href="#simulateur"
              className="hidden md:inline-flex items-center justify-center rounded-xl bg-emerald-500 px-4 py-2 text-sm font-semibold text-neutral-950 shadow-lg shadow-emerald-500/30 hover:bg-emerald-400 focus:outline-none focus:ring-2 focus:ring-emerald-300"
            >
              Simuler ma maison
            </a>
          </div>
        </div>
      </header>

      {/* Hero */}
      <section className="relative overflow-hidden">
        <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(60%_40%_at_50%_-10%,rgba(16,185,129,0.18),rgba(0,0,0,0))] dark:bg-[radial-gradient(60%_40%_at_50%_-10%,rgba(16,185,129,0.25),rgba(0,0,0,0))] transition-colors" />
        <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-20 md:py-28">
          <div className="max-w-3xl">
            <h1 className="text-4xl sm:text-5xl font-semibold tracking-tight leading-[1.1]">
              Découvrez en chiffres réels si une <span className="text-emerald-600 dark:text-emerald-400">PAC</span> est rentable chez vous.
            </h1>
            <p className="mt-5 text-neutral-700 dark:text-neutral-300 text-lg">
              L’<strong>Assistant Énergie EcoSwitch</strong> compare en continu <em>PAC seule</em>, <em>PAC hybride</em> et <em>chaudière conservée</em>, puis vous indique la solution la plus pertinente — <span className="text-neutral-900 dark:text-neutral-100 font-medium">sans parti pris</span>.
            </p>
            <div className="mt-8 flex flex-col sm:flex-row gap-3 sm:items-center">
              <a id="simulateur" href="#prix" className="inline-flex items-center justify-center rounded-2xl bg-emerald-500 px-6 py-3 text-base font-semibold text-neutral-950 shadow-xl shadow-emerald-500/30 hover:bg-emerald-400 focus:outline-none focus:ring-2 focus:ring-emerald-300">
                Simuler ma maison
              </a>
              <a href="#preuves" className="inline-flex items-center justify-center rounded-2xl border border-black/10 dark:border-white/20 px-6 py-3 text-base font-semibold text-neutral-900 dark:text-white hover:border-black/20 dark:hover:border-white/40">
                Voir la méthode (ISO / EN)
              </a>
            </div>

            {/* Metrics */}
            <dl className="mt-10 grid grid-cols-2 sm:grid-cols-4 gap-4">
              {[
                { k: "Économies", v: "jusqu’à 62%*" },
                { k: "CO₂ évité", v: "−1,4 t/an*" },
                { k: "ROI", v: "3 à 6 ans*" },
                { k: "Local", v: "100% hors‑cloud" },
              ].map((m) => (
                <div key={m.k} className="rounded-2xl border border-black/10 dark:border-white/10 p-4 bg-white/50 dark:bg-transparent">
                  <dt className="text-sm text-neutral-600 dark:text-neutral-400">{m.k}</dt>
                  <dd className="text-xl font-semibold">{m.v}</dd>
                </div>
              ))}
            </dl>
            <p className="mt-3 text-xs text-neutral-500 dark:text-neutral-500">*Estimations indicatives selon profil, météo et tarifs locaux.</p>
          </div>
        </div>
      </section>

      {/* Bandeau bénéfices rapides */}
      <section className="border-y border-black/10 dark:border-white/10 bg-neutral-50/70 dark:bg-neutral-900/40 transition-colors">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-8 grid grid-cols-1 sm:grid-cols-3 gap-4">
          {[
            { t: "Décision objective", d: "Comparatif chiffré PAC / hybride / chaudière, sans biais." },
            { t: "Pédagogie", d: "Vous comprenez le pourquoi du verdict, pas seulement la réponse." },
            { t: "Confidentialité", d: "Données traitées localement, pas de cloud ni de pub." },
          ].map((b) => (
            <div key={b.t} className="rounded-2xl border border-black/10 dark:border-white/10 p-5 bg-white/60 dark:bg-transparent">
              <h3 className="text-base font-semibold">{b.t}</h3>
              <p className="mt-1 text-sm text-neutral-700 dark:text-neutral-300">{b.d}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Comment ça marche */}
      <section id="comment-ca-marche" className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-16">
        <div className="max-w-3xl">
          <h2 className="text-2xl sm:text-3xl font-semibold tracking-tight">Comment ça marche ?</h2>
          <p className="mt-3 text-neutral-700 dark:text-neutral-300">Parcours simple, résultats exploitables par votre installateur.</p>
        </div>
        <ol className="mt-8 grid gap-4 sm:grid-cols-3">
          {[
            { n: "1", t: "Audit rapide", d: "Surface, isolation, émetteurs, code postal (météo locale)" },
            { n: "2", t: "Simulation neutre", d: "Comparaison dynamique des coûts et du COP selon ISO/EN" },
            { n: "3", t: "Recommandation claire", d: "PAC seule, hybride ou chaudière — avec ROI & puissance recommandée" },
          ].map((s) => (
            <li key={s.n} className="relative rounded-2xl border border-black/10 dark:border-white/10 p-6">
              <span className="absolute -top-3 left-6 inline-flex h-8 w-8 items-center justify-center rounded-full bg-black/5 dark:bg-white/10 text-sm font-semibold">{s.n}</span>
              <h3 className="mt-4 font-semibold">{s.t}</h3>
              <p className="mt-1 text-sm text-neutral-700 dark:text-neutral-300">{s.d}</p>
            </li>
          ))}
        </ol>
      </section>

      {/* Preuves sociales */}
      <section className="border-y border-black/10 dark:border-white/10 bg-neutral-50/70 dark:bg-neutral-900/40 transition-colors">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-10">
          <p className="text-center text-sm uppercase tracking-wider text-neutral-500 dark:text-white/60">Démo validée avec</p>
          <div className="mt-6 grid grid-cols-2 sm:grid-cols-4 gap-4 opacity-90">
            {["ADEME","CETIAT","GRDF","Installateurs"].map((logo) => (
              <div key={logo} className="rounded-xl border border-black/10 dark:border-white/10 px-4 py-6 text-center text-neutral-600 dark:text-white/80 bg-white/60 dark:bg-transparent">
                {logo}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Méthode & crédibilité */}
      <section id="preuves" className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid lg:grid-cols-2 gap-10 items-start">
          <div>
            <h2 className="text-2xl sm:text-3xl font-semibold tracking-tight">Méthode scientifique transparente</h2>
            <ul className="mt-6 space-y-3 text-sm text-neutral-700 dark:text-neutral-300 list-disc pl-5">
              <li>Modèle thermique inspiré <span className="font-medium">ISO 52016‑1</span></li>
              <li>COP PAC conforme <span className="font-medium">EN 14825</span> (pénalités température départ)</li>
              <li>Dimensionnement conforme <span className="font-medium">EN 12831</span> (puissance recommandée)</li>
              <li>Rendement chaudière saisonnier <span className="font-medium">EN 15316</span></li>
              <li>Tarifs dynamiques (HP/HC, Tempo) et calcul CO₂ horaire (RTE/CRE)</li>
            </ul>
            <p className="mt-4 text-xs text-neutral-500">Le détail des équations est disponible dans la documentation technique EcoSwitch v10.2.</p>
          </div>
          <div className="rounded-2xl border border-black/10 dark:border-white/10 p-6 bg-white/60 dark:bg-neutral-900/60 transition-colors">
            <h3 className="font-semibold">Résumé client (grand public)</h3>
            <ul className="mt-3 text-sm text-neutral-700 dark:text-neutral-300 space-y-2">
              <li>• Économies attendues (€) et ROI.</li>
              <li>• Recommandation : PAC seule / PAC hybride / chaudière conservée.</li>
              <li>• Puissance PAC recommandée (kW) et conditions de pose.</li>
              <li>• Gains CO₂ (t/an) et confort thermique.</li>
            </ul>
            <div className="mt-6 h-px bg-black/10 dark:bg-white/10" />
            <h3 className="mt-6 font-semibold">Détails experts</h3>
            <ul className="mt-3 text-sm text-neutral-700 dark:text-neutral-300 space-y-2">
              <li>• Hypothèses météo locales, courbes COP, η chaudière, UA normatif.</li>
              <li>• Scénarios tarifaires (Base/HP‑HC/Tempo) et sensibilité.</li>
              <li>• Hystérésis de bascule PAC/chaudière, EcoScore pondéré.</li>
            </ul>
          </div>
        </div>
      </section>

      {/* Pricing */}
      <section id="prix" className="border-y border-black/10 dark:border-white/10 bg-neutral-50/70 dark:bg-neutral-900/40 transition-colors">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-16">
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="text-2xl sm:text-3xl font-semibold tracking-tight">Commencer la simulation</h2>
            <p className="mt-3 text-neutral-700 dark:text-neutral-300">Pack démo + rapport pédagogique local.</p>
          </div>

          <div className="mt-8 grid sm:grid-cols-2 gap-6 max-w-5xl mx-auto">
            {/* Plan Démo */}
            <div className="rounded-2xl border border-black/10 dark:border-white/10 p-6 bg-white/70 dark:bg-neutral-950/60 transition-colors">
              <h3 className="text-lg font-semibold">Simulation immédiate</h3>
              <p className="mt-1 text-sm text-neutral-700 dark:text-neutral-300">Sans capteurs — données locales simulées</p>
              <div className="mt-4 flex items-end gap-2">
                <span className="text-4xl font-semibold">Gratuite</span>
                <span className="text-sm text-neutral-500 dark:text-neutral-400">/ essai</span>
              </div>
              <ul className="mt-6 space-y-2 text-sm text-neutral-700 dark:text-neutral-300">
                <li>• Verdict neutre (PAC / hybride / chaudière)</li>
                <li>• Estimation économies & CO₂</li>
                <li>• Puissance PAC indicative</li>
              </ul>
              <a href="#simulateur" className="mt-6 inline-flex w-full items-center justify-center rounded-xl bg-emerald-500 px-4 py-3 text-sm font-semibold text-neutral-950 shadow-lg shadow-emerald-500/30 hover:bg-emerald-400">Lancer la simulation</a>
            </div>

            {/* Plan Assistant Énergie */}
            <div className="rounded-2xl border border-black/10 dark:border-white/10 p-6 bg-white/70 dark:bg-neutral-900/60 transition-colors">
              <div className="inline-flex items-center gap-2 rounded-full border border-emerald-600/30 dark:border-emerald-400/30 px-3 py-1 text-xs text-emerald-700 dark:text-emerald-300">Recommandé</div>
              <h3 className="mt-3 text-lg font-semibold">Assistant Énergie — Phase 1</h3>
              <p className="mt-1 text-sm text-neutral-700 dark:text-neutral-300">Diagnostic local sans cloud</p>
              <div className="mt-4 flex items-end gap-2">
                <span className="text-4xl font-semibold">199€</span>
                <span className="text-sm text-neutral-500 dark:text-neutral-400">prix public conseillé</span>
              </div>
              <ul className="mt-6 space-y-2 text-sm text-neutral-700 dark:text-neutral-300">
                <li>• Mesures locales + rapport détaillé</li>
                <li>• Tarifs dynamiques & ROI</li>
                <li>• Export installateur (préconisation technique)</li>
              </ul>
              <button className="mt-6 inline-flex w-full items-center justify-center rounded-xl border border-black/10 dark:border-white/20 px-4 py-3 text-sm font-semibold text-neutral-900 dark:text-white hover:bg-black/[0.04] dark:hover:border-white/40">Être recontacté</button>
              <p className="mt-3 text-xs text-neutral-500">Option : prime installateur possible (remboursement partiel ou total).</p>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section id="faq" className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-16">
        <div className="max-w-3xl">
          <h2 className="text-2xl sm:text-3xl font-semibold tracking-tight">Questions fréquentes</h2>
          <div className="mt-6 divide-y divide-black/10 dark:divide-white/10 border border-black/10 dark:border-white/10 rounded-2xl transition-colors">
            {[
              { q: "Votre recommandation est‑elle vraiment neutre ?", a: "Oui. Le moteur EcoSwitch compare objectivement les coûts et performances PAC/hybride/chaudière, selon des normes reconnues (ISO/EN)." },
              { q: "Mes données quittent‑elles mon domicile ?", a: "Non. Le traitement est local, sans cloud. Vous gardez le contrôle de vos données." },
              { q: "Que contient le rapport ?", a: "Un résumé clair (économies, ROI, CO₂), une recommandation, et des annexes techniques pour l’installateur." },
              { q: "Puis‑je conserver ma chaudière ?", a: "Oui, EcoSwitch propose aussi la configuration hybride (PAC en relève) si c’est le meilleur choix." },
            ].map((f) => (
              <details key={f.q} className="group p-5 open:bg-black/[0.03] dark:open:bg-white/5 transition-colors">
                <summary className="flex cursor-pointer items-center justify-between text-sm font-medium">
                  <span>{f.q}</span>
                  <span className="ml-4 text-neutral-500 dark:text-neutral-400 group-open:rotate-180 transition" aria-hidden="true">⌃</span>
                </summary>
                <p className="mt-3 text-sm text-neutral-700 dark:text-neutral-300">{f.a}</p>
              </details>
            ))}
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-black/10 dark:border-white/10 py-10 text-sm text-neutral-600 dark:text-neutral-400 transition-colors">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 flex flex-col md:flex-row items-center justify-between gap-4">
          <p aria-label="Copyright">© {new Date().getFullYear()} EcoSwitch — Tous droits réservés.</p>
          <div className="flex items-center gap-6">
            <a href="#" className="hover:text-neutral-900 dark:hover:text-white">Mentions légales</a>
            <a href="#" className="hover:text-neutral-900 dark:hover:text-white">Confidentialité</a>
            <a href="#" className="hover:text-neutral-900 dark:hover:text-white">Contact</a>
          </div>
        </div>
      </footer>

      {/* CTA flottant mobile */}
      <div className="fixed inset-x-0 bottom-4 px-4 sm:hidden z-50">
        <a href="#prix" className="block w-full text-center rounded-2xl bg-emerald-500 px-6 py-4 text-base font-semibold text-neutral-950 shadow-xl shadow-emerald-500/30 hover:bg-emerald-400">
          Simuler ma maison
        </a>
      </div>
    </main>
  );
}
