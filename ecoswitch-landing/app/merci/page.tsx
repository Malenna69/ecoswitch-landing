// app/page.tsx
"use client";

import React from "react";
import Link from "next/link";
import { motion, type Variants } from "framer-motion";
import { ShieldCheck, ArrowRight } from "lucide-react";

/**
 * Animation helpers — bien typés pour Framer Motion
 */
const fadeScale = (delay = 0): Variants => ({
  hidden: { opacity: 0, scale: 0.95 },
  show: {
    opacity: 1,
    scale: 1,
    transition: { duration: 0.4, ease: "easeOut", delay },
  },
});

const fadeUp = (delay = 0): Variants => ({
  hidden: { opacity: 0, y: 8 },
  show: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.4, ease: "easeOut", delay },
  },
});

const containerStagger: Variants = {
  hidden: {},
  show: {
    transition: { staggerChildren: 0.08 },
  },
};

/**
 * Badge avec animation
 */
const NormBadge = ({ children }: { children: React.ReactNode }) => (
  <motion.div
    variants={fadeScale(0)}
    className="flex items-center gap-2 px-3 py-2 rounded-lg border border-gray-200 bg-white shadow-sm text-sm dark:bg-neutral-900 dark:border-neutral-800"
  >
    <ShieldCheck className="w-4 h-4 text-emerald-600" />
    {children}
  </motion.div>
);

/**
 * Page principale (exemple sobre mais prêt prod)
 * — Tu peux réinjecter tes sections ici, l’important est que
 *   les `variants` soient bien typés et qu’un parent gère
 *   `initial="hidden"` et `animate="show"` si besoin.
 */
export default function HomePage() {
  return (
    <main className="min-h-screen bg-[#F7F9FC] text-[#111827] dark:bg-neutral-950 dark:text-neutral-100">
      {/* HEADER */}
      <header className="sticky top-0 z-30 bg-white/80 dark:bg-neutral-900/70 backdrop-blur border-b border-gray-200 dark:border-neutral-800">
        <div className="max-w-5xl mx-auto px-6 py-3 flex items-center justify-between">
          <Link href="/" className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-md border-2 border-dashed border-emerald-300 bg-emerald-50 dark:bg-emerald-900/20" />
            <span className="font-extrabold tracking-tight">EcoSwitch</span>
          </Link>

          <nav className="flex items-center gap-2">
            <Link
              href="/#demo"
              className="text-sm px-3 py-2 rounded-lg border border-gray-200 bg-white shadow-sm hover:bg-gray-50 dark:bg-neutral-900 dark:border-neutral-800 dark:hover:bg-neutral-800 transition-colors"
            >
              Démo
            </Link>
            <Link
              href="/#waitlist"
              className="text-sm px-3 py-2 rounded-lg border border-emerald-300 text-emerald-700 bg-white hover:bg-emerald-50 dark:bg-neutral-900 dark:text-emerald-300 dark:border-neutral-700 dark:hover:bg-neutral-800 transition-colors"
            >
              Waitlist
            </Link>
          </nav>
        </div>
      </header>

      {/* HERO */}
      <section className="max-w-5xl mx-auto px-6 py-16">
        {/* Le parent gère initial/animate, les enfants n'ont que `variants` */}
        <motion.div
          variants={containerStagger}
          initial="hidden"
          animate="show"
          className="grid md:grid-cols-2 gap-8 items-center"
        >
          <motion.div variants={fadeUp(0)}>
            <h1 className="text-4xl md:text-5xl font-extrabold leading-tight">
              Réduisez votre facture d’énergie
              <span className="text-emerald-600"> intelligemment</span>.
            </h1>
            <p className="mt-4 text-gray-600 dark:text-gray-300">
              EcoSwitch optimise vos usages en temps réel et vous guide vers les
              meilleurs choix d’économie, sans compromis sur le confort.
            </p>

            <div className="mt-6 flex flex-wrap items-center gap-3">
              <Link
                href="/#waitlist"
                className="inline-flex items-center justify-center gap-2 px-5 py-3 rounded-xl font-semibold bg-emerald-600 text-white hover:bg-emerald-700 focus:outline-none focus:ring-2 focus:ring-emerald-400 transition-colors"
              >
                Rejoindre la liste d’attente
                <ArrowRight className="w-4 h-4" />
              </Link>

              <Link
                href="/#demo"
                className="inline-flex items-center justify-center gap-2 px-5 py-3 rounded-xl font-semibold border border-gray-200 text-gray-800 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-gray-300 dark:bg-neutral-900 dark:text-neutral-100 dark:border-neutral-800 dark:hover:bg-neutral-800 transition-colors"
              >
                Voir la démo
              </Link>
            </div>

            <div className="mt-6">
              <NormBadge>Conforme aux normes européennes</NormBadge>
            </div>
          </motion.div>

          <motion.div
            variants={fadeScale(0.1)}
            className="bg-white dark:bg-neutral-900 rounded-2xl border border-gray-200 dark:border-neutral-800 shadow-sm p-6"
          >
            <div className="aspect-[16/10] w-full rounded-xl bg-gradient-to-br from-emerald-100 to-emerald-50 dark:from-emerald-900/20 dark:to-emerald-900/10" />
            <p className="text-sm text-gray-500 mt-3 dark:text-gray-400">
              Aperçu interface — courbes de consommation, recommandations,
              simulation d’économies.
            </p>
          </motion.div>
        </motion.div>
      </section>

      {/* FOOTER */}
      <footer className="border-t border-gray-200 dark:border-neutral-800">
        <div className="max-w-5xl mx-auto px-6 py-10 text-sm text-gray-500 dark:text-gray-400">
          © {new Date().getFullYear()} EcoSwitch. Tous droits réservés.
        </div>
      </footer>
    </main>
  );
}
