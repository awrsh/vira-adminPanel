"use client";

import { motion } from "framer-motion";
import {
  Boxes,
  Command,
  Database,
  Fingerprint,
  Languages,
  LayoutTemplate,
} from "lucide-react";
import { useTranslations } from "next-intl";
import { fadeUp, revealViewport } from "@/features/marketing/motion";

const features = [
  { key: "Design", icon: LayoutTemplate },
  { key: "Rtl", icon: Languages },
  { key: "Mock", icon: Database },
  { key: "Modules", icon: Boxes },
  { key: "Cmdk", icon: Command },
  { key: "Auth", icon: Fingerprint },
] as const;

export function FeaturesSection() {
  const t = useTranslations("landing");

  return (
    <section id="features" className="mx-auto max-w-6xl px-4 py-24 sm:px-6">
      <motion.div
        initial="hidden"
        whileInView="show"
        viewport={revealViewport}
        variants={fadeUp}
        className="mb-14 max-w-2xl"
      >
        <h2 className="text-3xl font-semibold tracking-tight sm:text-4xl">
          {t("featuresTitle")}
        </h2>
        <p className="mt-3 text-muted-foreground">{t("featuresSubtitle")}</p>
      </motion.div>

      <div className="divide-y divide-border border-y border-border">
        {features.map(({ key, icon: Icon }, index) => (
          <motion.div
            key={key}
            initial="hidden"
            whileInView="show"
            viewport={revealViewport}
            variants={fadeUp}
            className="grid gap-4 py-8 sm:grid-cols-[3rem_1fr_1.2fr] sm:items-start sm:gap-8"
          >
            <div className="flex size-11 items-center justify-center rounded-2xl bg-primary-soft text-primary">
              <Icon className="size-5" aria-hidden />
            </div>
            <div>
              <p className="text-xs font-medium tracking-[0.16em] text-muted-foreground uppercase">
                {String(index + 1).padStart(2, "0")}
              </p>
              <h3 className="mt-2 text-lg font-semibold tracking-tight">
                {t(`feature${key}`)}
              </h3>
            </div>
            <p className="text-sm leading-relaxed text-muted-foreground sm:pt-7">
              {t(`feature${key}Desc`)}
            </p>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
