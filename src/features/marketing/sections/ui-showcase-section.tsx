"use client";

import { motion } from "framer-motion";
import { useTranslations } from "next-intl";
import { ProductChrome } from "@/features/marketing/product-chrome";
import { fadeUp, revealViewport } from "@/features/marketing/motion";

export function UiShowcaseSection() {
  const t = useTranslations("landing");

  return (
    <section id="ui-showcase" className="mx-auto max-w-6xl px-4 py-24 sm:px-6">
      <div className="grid items-center gap-12 lg:grid-cols-[minmax(0,0.9fr)_minmax(0,1.1fr)]">
        <motion.div
          initial="hidden"
          whileInView="show"
          viewport={revealViewport}
          variants={fadeUp}
        >
          <h2 className="text-3xl font-semibold tracking-tight sm:text-4xl">
            {t("uiShowcaseTitle")}
          </h2>
          <p className="mt-4 text-muted-foreground">{t("uiShowcaseSubtitle")}</p>
          <ul className="mt-8 space-y-4 text-sm text-muted-foreground">
            {(["uiPoint1", "uiPoint2", "uiPoint3"] as const).map((key) => (
              <li key={key} className="flex gap-3">
                <span
                  aria-hidden
                  className="mt-2 size-1.5 shrink-0 rounded-full bg-primary"
                />
                <span>{t(key)}</span>
              </li>
            ))}
          </ul>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, scale: 0.98 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={revealViewport}
          transition={{ duration: 0.55, ease: [0.16, 1, 0.3, 1] }}
        >
          <ProductChrome title={t("uiShowcasePanel")} />
        </motion.div>
      </div>
    </section>
  );
}
