"use client";

import { motion } from "framer-motion";
import { useTranslations } from "next-intl";
import { ProductChrome } from "@/features/marketing/product-chrome";
import { fadeUp, revealViewport } from "@/features/marketing/motion";

export function RtlShowcaseSection() {
  const t = useTranslations("landing");

  return (
    <section id="rtl" className="border-y border-border bg-muted/25 py-24">
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <motion.div
          initial="hidden"
          whileInView="show"
          viewport={revealViewport}
          variants={fadeUp}
          className="mb-12 max-w-2xl"
        >
          <h2 className="text-3xl font-semibold tracking-tight sm:text-4xl">
            {t("rtlShowcaseTitle")}
          </h2>
          <p className="mt-3 text-muted-foreground">{t("rtlShowcaseSubtitle")}</p>
        </motion.div>

        <div className="grid gap-6 lg:grid-cols-2">
          <motion.div
            initial="hidden"
            whileInView="show"
            viewport={revealViewport}
            variants={fadeUp}
            className="space-y-3"
          >
            <p className="text-xs font-medium tracking-[0.16em] text-muted-foreground uppercase">
              {t("rtlFaLabel")}
            </p>
            <ProductChrome dir="rtl" title={t("rtlFaPanel")} />
          </motion.div>

          <motion.div
            initial="hidden"
            whileInView="show"
            viewport={revealViewport}
            variants={fadeUp}
            className="space-y-3 lg:mt-10"
          >
            <p className="text-xs font-medium tracking-[0.16em] text-muted-foreground uppercase">
              {t("rtlEnLabel")}
            </p>
            <ProductChrome dir="ltr" title={t("rtlEnPanel")} />
          </motion.div>
        </div>

        <p className="mt-10 max-w-2xl text-sm text-muted-foreground">
          {t("rtlShowcaseNote")}
        </p>
      </div>
    </section>
  );
}
