"use client";

import React from "react";
import { motion, type Variants } from "framer-motion";
import { ShieldCheck, Leaf, Sparkles } from "lucide-react";
import Link from "next/link";

/** Variants bien typés (corrige l'erreur) */
const fadeScale = (delay = 0): Variants => ({
  hidden: { opacity: 0, scale: 0.95 },
  show: {
    opacity: 1,
    scale: 1,
    transition: { duration: 0.4, ease: "easeOut", delay },
  },
});

const fadeUp = (delay = 0): Variants => ({
  hidden: { opacity: 0, y: 16 },
  show: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.4, ease: "easeOut", delay },
  },
});

/** Petit badge “normes” qui utilisait variants={fadeScale()} */
const NormBadge = ({ children }: { children: React.ReactNode }) => (
  <motion.div
    variants={fadeScale()}
    className="flex items-center gap-2 px-3 py-2 rounded-lg border border-gray-200 bg-white shadow-sm text-sm dark:bg-neutral-900 dark:border-neutral-800"
  >
    <ShieldCheck className="w-4 h-4 text-emerald-600" />
    <span className="text-gray-700 dark:text-gray-200">{children}</span>
  </motion.div>
);

export default function HomePage() {
  return (
    <main className="min-h-screen bg-[#F7F9FC] text-[#111827] dark:bg-neutral-950 dark:text-neutral-100">
      {/* Header */}
      <header className="sticky top-0 z-30 bg-white/80 dark:bg-neutral-900/70 backdrop-blur border-b border-gray-200 dark:border-neutral-800">
        <div className="max-w-6xl mx-auto px-6 py-3 flex items-center justify-between">
          <Link href="/" className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-md border-2 border-dashed border-emerald-300 bg-emerald-50 dark:bg-emerald-900/20" />
            <span className="font-extrabold tracking-tight">EcoSwitch</span>
          </Link>

          <nav className="flex items-center gap-4 text-sm">
            <a href="#demo" className="hover:underline">
              Démo
            </a>
            <a href="#testeurs" className="hover:underline">
              Testeurs
            </a>
            <a
              href="#waitlist"
              className="px-3 py-2 rounded-lg border border-gray-200 bg-white shadow-sm hover:bg-gray-50 dark:bg-neutral-900 dark:border-neutral-800 dark:hover:bg-neutral-800 transition"
            >
              Rejoindre la liste
            </a>
          </nav>
        </div>
      </header>

      {/* Hero */}
      <section className="max-w-6xl mx-auto px-6 pt-16 pb-10">
        <motion.div
          initial="hidden"
          animate="show"
          variants={fadeUp()}
          className="text-center"
        >
          <div className="mx-auto mb-5 flex items-center justify-center gap-2">
            <NormBadge>Mesure & optimisation de l’énergie foyer</NormBadge>
          </div>

          <h1 className="text-4xl sm:text-5xl font-extrabold tracking-tight">
            Passez à une consommation <span className="text-emerald-600">plus
            sobre</span> sans sacrifier votre confort.
          </h1>

          <p className="mt-4 text-lg text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
            EcoSwitch vous aide à monitorer, comprendre et réduire vos usages
            énergétiques grâce à une approche scientifique et des recommandations
            adaptées à votre foyer.
          </p>

          <div className="mt-8 flex items-center justify-center gap-3">
            <a
              href="#waitlist"
              className="inline-flex items-center justify-center gap-2 px-6 py-3 rounded-xl font-semibold bg-emerald-600 text-white hover:bg-emerald-700 focus:outline-none focus:ring-2 focus:ring-emerald-400 transition"
            >
              Rejoindre la liste d’attente
            </a>
            <a
              href="#demo"
              className="inline-flex items-center justify-center gap-2 px-6 py-3 rounded-xl font-semibold border border-emerald-300 text-emerald-700 bg-white hover:bg-emerald-50 focus:outline-none focus:ring-2 focus:ring-emerald-300 dark:bg-neutral-900 dark:text-emerald-300 dark:border-neutral-700 dark:hover:bg-neutral-800 transition"
            >
              Voir la démo
            </a>
          </div>
        </motion.div>
      </section>

      {/* Valeurs */}
      <section id="demo" className="max-w-6xl mx-auto px-6 py-12">
        <div className="grid gap-6 sm:grid-cols-3">
          {[
            {
              icon: <Leaf className="w-6 h-6" />,
              title: "Sobriété mesurable",
              desc: "Suivez l’impact réel de vos actions grâce à des métriques claires.",
              d: 0,
            },
            {
              icon: <ShieldCheck className="w-6 h-6" />,
              title: "Confidentialité",
              desc: "Vos données restent privées, chiffrées et jamais revendues.",
              d: 0.1,
            },
            {
              icon: <Sparkles className="w-6 h-6" />,
              title: "Recos intelligentes",
              desc: "Des suggestions concrètes adaptées à votre équipement.",
              d: 0.2,
            },
          ].map((f, i) => (
            <motion.div
              key={i}
              variants={fadeScale(f.d)}
              initial="hidden"
              whileInView="show"
              viewport={{ once: true, amount: 0.3 }}
              className="rounded-2xl border border-gray-200 bg-white p-6 shadow-sm dark:bg-neutral-900 dark:border-neutral-800"
            >
              <div className="w-10 h-10 rounded-lg bg-emerald-100 text-emerald-700 dark:bg-emerald-900/30 dark:text-emerald-300 flex items-center justify-center mb-3">
                {f.icon}
              </div>
              <h3 className="font-semibold">{f.title}</h3>
              <p className="text-sm text-gray-600 dark:text-gray-300 mt-1">
                {f.desc}
              </p>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Testeurs */}
      <section id="testeurs" className="max-w-4xl mx-auto px-6 py-12">
        <motion.div
          variants={fadeUp(0.1)}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.3 }}
          className="rounded-2xl border border-gray-200 bg-white p-8 shadow-sm text-center dark:bg-neutral-900 dark:border-neutral-800"
        >
          <h2 className="text-2xl font-bold">Devenir foyer testeur</h2>
          <p className="mt-2 text-gray-600 dark:text-gray-300">
            Rejoignez le programme pilote pour accéder en avant-première aux
            fonctionnalités et contribuer à améliorer EcoSwitch.
          </p>
          <a
            href="#waitlist"
            className="mt-6 inline-flex items-center justify-center gap-2 px-6 py-3 rounded-xl font-semibold bg-emerald-600 text-white hover:bg-emerald-700 focus:outline-none focus:ring-2 focus:ring-emerald-400 transition"
          >
            Je veux participer
          </a>
        </motion.div>
      </section>

      {/* Waitlist */}
      <section id="waitlist" className="max-w-3xl mx-auto px-6 pb-20">
        <motion.div
          variants={fadeScale(0.1)}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.3 }}
          className="rounded-2xl border border-gray-200 bg-white p-8 shadow-sm dark:bg-neutral-900 dark:border-neutral-800"
        >
          <h2 className="text-2xl font-bold text-center">Rejoindre la liste</h2>
          <p className="mt-2 text-center text-gray-600 dark:text-gray-300">
            Laissez votre email pour être informé(e) du lancement et des étapes
            clés (programme testeur, démo, etc.).
          </p>

          {/* Placeholder formulaire – branche-le plus tard sur ton backend / action */}
          <form
            onSubmit={(e) => e.preventDefault()}
            className="mt-6 grid gap-3 sm:grid-cols-[1fr_auto]"
          >
            <input
              type="email"
              required
              placeholder="votre@email.com"
              className="w-full rounded-xl border border-gray-300 bg-white px-4 py-3 text-sm outline-none focus:ring-2 focus:ring-emerald-400 dark:bg-neutral-950 dark:border-neutral-800"
            />
            <button
              className="rounded-xl bg-emerald-600 px-6 py-3 text-sm font-semibold text-white hover:bg-emerald-700 focus:outline-none focus:ring-2 focus:ring-emerald-400"
            >
              S’inscrire
            </button>
          </form>

          <p className="text-xs text-gray-500 mt-4 text-center dark:text-gray-500">
            Aucune donnée n’est partagée avec des tiers. Désinscription en un
            clic à tout moment.
          </p>
        </motion.div>
      </section>

      {/* Footer */}
      <footer className="border-t border-gray-200 dark:border-neutral-800 py-8">
        <div className="max-w-6xl mx-auto px-6 text-sm text-gray-500 dark:text-gray-400 flex flex-col sm:flex-row items-center justify-between gap-3">
          <div>© {new Date().getFullYear()} EcoSwitch</div>
          <div className="flex items-center gap-4">
            <Link href="/merci" className="hover:underline">Merci</Link>
            <a href="#waitlist" className="hover:underline">Waitlist</a>
            <a href="#demo" className="hover:underline">Démo</a>
          </div>
        </div>
      </footer>
    </main>
  );
}
