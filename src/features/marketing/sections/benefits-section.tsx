"use client";

import { motion } from "framer-motion";
import { useTranslations } from "next-intl";
import { fadeUp, revealViewport } from "@/features/marketing/motion";

const benefits = ["Ship", "Rtl", "Scale"] as const;

export function BenefitsSection() {
  const t = useTranslations("landing");

  return (
    <section id="benefits" className="relative overflow-hidden py-24">
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_start,color-mix(in_oklab,var(--primary)_10%,transparent),transparent_55%)]"
      />

      <div className="relative mx-auto max-w-6xl px-4 sm:px-6">
        <motion.div
          initial="hidden"
          whileInView="show"
          viewport={revealViewport}
          variants={fadeUp}
          className="mb-16 max-w-xl"
        >
          <h2 className="text-3xl font-semibold tracking-tight sm:text-4xl">
            {t("benefitsTitle")}
          </h2>
          <p className="mt-3 text-muted-foreground">{t("benefitsSubtitle")}</p>
        </motion.div>

        <div className="space-y-16 md:space-y-24">
          {benefits.map((key, index) => (
            <motion.article
              key={key}
              initial="hidden"
              whileInView="show"
              viewport={revealViewport}
              variants={fadeUp}
              className={`grid gap-6 md:grid-cols-12 md:items-end ${
                index % 2 === 1 ? "md:text-end" : ""
              }`}
            >
              <div
                className={
                  index % 2 === 1
                    ? "md:col-span-5 md:col-start-8"
                    : "md:col-span-5"
                }
              >
                <p className="font-persian text-5xl font-semibold tracking-tight text-primary/25 sm:text-6xl">
                  {String(index + 1).padStart(2, "0")}
                </p>
                <h3 className="mt-2 text-2xl font-semibold tracking-tight">
                  {t(`benefit${key}Title`)}
                </h3>
              </div>
              <p
                className={`max-w-md text-muted-foreground ${
                  index % 2 === 1
                    ? "md:col-span-6 md:col-start-1 md:row-start-1 md:ms-auto"
                    : "md:col-span-6 md:col-start-7"
                }`}
              >
                {t(`benefit${key}Desc`)}
              </p>
            </motion.article>
          ))}
        </div>
      </div>
    </section>
  );
}
