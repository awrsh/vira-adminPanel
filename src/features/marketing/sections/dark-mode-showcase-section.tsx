"use client";

import { motion } from "framer-motion";
import { useTranslations } from "next-intl";
import { ProductChrome } from "@/features/marketing/product-chrome";
import { fadeUp, revealViewport } from "@/features/marketing/motion";

export function DarkModeShowcaseSection() {
  const t = useTranslations("landing");

  return (
    <section id="themes" className="mx-auto max-w-6xl px-4 py-24 sm:px-6">
      <motion.div
        initial="hidden"
        whileInView="show"
        viewport={revealViewport}
        variants={fadeUp}
        className="mb-12 max-w-2xl"
      >
        <h2 className="text-3xl font-semibold tracking-tight sm:text-4xl">
          {t("themeShowcaseTitle")}
        </h2>
        <p className="mt-3 text-muted-foreground">{t("themeShowcaseSubtitle")}</p>
      </motion.div>

      <div className="grid gap-5 md:grid-cols-2">
        <motion.div
          initial="hidden"
          whileInView="show"
          viewport={revealViewport}
          variants={fadeUp}
          className="space-y-3"
        >
          <p className="text-xs font-medium tracking-[0.16em] text-muted-foreground uppercase">
            {t("themeLightLabel")}
          </p>
          <ProductChrome tone="light" title={t("themeLightPanel")} />
        </motion.div>

        <motion.div
          initial="hidden"
          whileInView="show"
          viewport={revealViewport}
          variants={fadeUp}
          className="space-y-3"
        >
          <p className="text-xs font-medium tracking-[0.16em] text-muted-foreground uppercase">
            {t("themeDarkLabel")}
          </p>
          <ProductChrome tone="dark" title={t("themeDarkPanel")} />
        </motion.div>
      </div>
    </section>
  );
}
