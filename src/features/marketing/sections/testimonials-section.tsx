"use client";

import { motion } from "framer-motion";
import { useTranslations } from "next-intl";
import { fadeUp, revealViewport } from "@/features/marketing/motion";

const quotes = [1, 2, 3] as const;

export function TestimonialsSection() {
  const t = useTranslations("landing");

  return (
    <section id="testimonials" className="overflow-hidden py-24">
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <motion.div
          initial="hidden"
          whileInView="show"
          viewport={revealViewport}
          variants={fadeUp}
          className="mb-14 max-w-xl"
        >
          <h2 className="text-3xl font-semibold tracking-tight sm:text-4xl">
            {t("testimonialsTitle")}
          </h2>
          <p className="mt-3 text-muted-foreground">
            {t("testimonialsSubtitle")}
          </p>
        </motion.div>

        <div className="grid gap-10 md:grid-cols-12">
          {quotes.map((n, index) => (
            <motion.blockquote
              key={n}
              initial="hidden"
              whileInView="show"
              viewport={revealViewport}
              variants={fadeUp}
              className={
                index === 0
                  ? "md:col-span-7 border-s-2 border-primary ps-6"
                  : index === 1
                    ? "md:col-span-5 md:pt-16 border-s-2 border-border ps-6"
                    : "md:col-span-8 md:col-start-5 border-s-2 border-border ps-6"
              }
            >
              <p className="text-lg leading-relaxed text-foreground sm:text-xl">
                “{t(`t${n}quote`)}”
              </p>
              <footer className="mt-6">
                <cite className="not-italic">
                  <span className="block text-sm font-medium">
                    {t(`t${n}name`)}
                  </span>
                  <span className="mt-0.5 block text-xs text-muted-foreground">
                    {t(`t${n}role`)}
                  </span>
                </cite>
              </footer>
            </motion.blockquote>
          ))}
        </div>
      </div>
    </section>
  );
}
