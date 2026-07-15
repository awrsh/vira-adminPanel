"use client";

import { motion } from "framer-motion";
import { ArrowUpRight, BookOpen } from "lucide-react";
import { useTranslations } from "next-intl";
import { Link } from "@/i18n/navigation";
import { Button } from "@/components/ui/button";
import { fadeUp, revealViewport } from "@/features/marketing/motion";

export function DocsCtaSection() {
  const t = useTranslations("landing");

  return (
    <section id="docs" className="mx-auto max-w-6xl px-4 py-20 sm:px-6">
      <motion.div
        initial="hidden"
        whileInView="show"
        viewport={revealViewport}
        variants={fadeUp}
        className="relative overflow-hidden rounded-surface border border-border bg-[linear-gradient(135deg,color-mix(in_oklab,var(--primary)_14%,var(--card)),var(--card)_58%)] px-6 py-10 sm:px-10 sm:py-12"
      >
        <div className="grid gap-8 lg:grid-cols-[1fr_auto] lg:items-end">
          <div className="max-w-2xl">
            <div className="mb-5 flex size-11 items-center justify-center rounded-2xl bg-primary-soft text-primary">
              <BookOpen className="size-5" aria-hidden />
            </div>
            <h2 className="text-2xl font-semibold tracking-tight sm:text-3xl">
              {t("docsCtaTitle")}
            </h2>
            <p className="mt-3 text-muted-foreground">{t("docsCtaSubtitle")}</p>
            <ul className="mt-6 flex flex-wrap gap-x-6 gap-y-2 text-sm text-foreground">
              <li>{t("docsDesign")}</li>
              <li>{t("docsModules")}</li>
              <li>{t("docsRtl")}</li>
            </ul>
          </div>

          <Link href="/design-system">
            <Button size="lg">
              {t("docsCtaButton")}
              <ArrowUpRight className="size-4" />
            </Button>
          </Link>
        </div>
      </motion.div>
    </section>
  );
}
