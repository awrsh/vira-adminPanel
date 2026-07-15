"use client";

import { motion } from "framer-motion";
import { Mail } from "lucide-react";
import { useTranslations } from "next-intl";
import { Button } from "@/components/ui/button";
import { fadeUp, revealViewport } from "@/features/marketing/motion";

export function ContactCtaSection() {
  const t = useTranslations("landing");

  return (
    <section id="contact" className="mx-auto max-w-6xl px-4 pb-24 sm:px-6">
      <motion.div
        initial="hidden"
        whileInView="show"
        viewport={revealViewport}
        variants={fadeUp}
        className="grid gap-8 rounded-surface border border-border bg-card px-6 py-10 shadow-float-sm sm:px-10 sm:py-12 lg:grid-cols-[1.2fr_0.8fr] lg:items-center"
      >
        <div>
          <h2 className="text-2xl font-semibold tracking-tight sm:text-3xl">
            {t("contactTitle")}
          </h2>
          <p className="mt-3 max-w-lg text-muted-foreground">
            {t("contactSubtitle")}
          </p>
        </div>

        <div className="flex flex-col gap-3 sm:items-end">
          <Button size="lg" asChild>
            <a href={`mailto:${t("contactEmail")}`}>
              <Mail className="size-4" />
              {t("contactButton")}
            </a>
          </Button>
          <p className="text-sm text-muted-foreground">{t("contactEmail")}</p>
          <p className="text-xs text-muted-foreground">{t("contactNote")}</p>
        </div>
      </motion.div>
    </section>
  );
}
