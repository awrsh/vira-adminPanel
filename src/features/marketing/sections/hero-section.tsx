"use client";

import { motion } from "framer-motion";
import { ArrowUpRight } from "lucide-react";
import { useTranslations } from "next-intl";
import { Link } from "@/i18n/navigation";
import { Button } from "@/components/ui/button";
import { ProductChrome } from "@/features/marketing/product-chrome";
import { fadeUp } from "@/features/marketing/motion";

export function HeroSection() {
  const t = useTranslations("landing");

  return (
    <section className="relative isolate overflow-hidden">
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_80%_55%_at_50%_-10%,color-mix(in_oklab,var(--primary)_22%,transparent),transparent_60%)]"
      />
      <div
        aria-hidden
        className="pointer-events-none absolute inset-x-0 bottom-0 h-40 bg-gradient-to-t from-background to-transparent"
      />

      <div className="relative mx-auto flex min-h-[min(92dvh,920px)] max-w-6xl flex-col justify-end gap-12 px-4 pb-10 pt-16 sm:px-6 lg:justify-center lg:pb-16 lg:pt-20">
        <motion.div
          initial="hidden"
          animate="show"
          variants={fadeUp}
          className="max-w-2xl text-start"
        >
          <p className="font-persian mb-4 text-sm font-medium tracking-[0.14em] text-primary uppercase">
            {t("brand")}
          </p>
          <h1 className="text-balance text-4xl font-semibold tracking-tight text-foreground sm:text-5xl lg:text-[3.5rem] lg:leading-[1.08]">
            {t("headline")}
          </h1>
          <p className="mt-5 max-w-lg text-pretty text-base text-muted-foreground sm:text-lg">
            {t("subheadline")}
          </p>
          <div className="mt-8 flex flex-wrap gap-3">
            <Link href="/register">
              <Button size="lg">{t("ctaPrimary")}</Button>
            </Link>
            <Link href="/dashboard">
              <Button size="lg" variant="outline">
                {t("ctaSecondary")}
                <ArrowUpRight className="size-4" />
              </Button>
            </Link>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 28 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.12, duration: 0.55, ease: [0.16, 1, 0.3, 1] }}
          className="w-full"
        >
          <ProductChrome className="mx-auto w-full max-w-5xl" />
        </motion.div>
      </div>
    </section>
  );
}
