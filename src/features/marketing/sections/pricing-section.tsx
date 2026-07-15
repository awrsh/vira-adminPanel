"use client";

import { motion } from "framer-motion";
import { Check } from "lucide-react";
import { useTranslations } from "next-intl";
import { Link } from "@/i18n/navigation";
import { Button } from "@/components/ui/button";
import { fadeUp, revealViewport } from "@/features/marketing/motion";

const plans = [
  {
    id: "Starter" as const,
    featured: false,
    features: ["planStarterF1", "planStarterF2", "planStarterF3"] as const,
  },
  {
    id: "Pro" as const,
    featured: true,
    features: ["planProF1", "planProF2", "planProF3", "planProF4"] as const,
  },
  {
    id: "Agency" as const,
    featured: false,
    features: ["planAgencyF1", "planAgencyF2", "planAgencyF3"] as const,
  },
];

export function PricingSection() {
  const t = useTranslations("landing");

  return (
    <section id="pricing" className="border-y border-border bg-muted/20 py-24">
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <motion.div
          initial="hidden"
          whileInView="show"
          viewport={revealViewport}
          variants={fadeUp}
          className="mb-14 max-w-2xl"
        >
          <h2 className="text-3xl font-semibold tracking-tight sm:text-4xl">
            {t("pricingTitle")}
          </h2>
          <p className="mt-3 text-muted-foreground">{t("pricingSubtitle")}</p>
        </motion.div>

        <div className="grid gap-6 lg:grid-cols-3">
          {plans.map((plan) => (
            <motion.div
              key={plan.id}
              initial="hidden"
              whileInView="show"
              viewport={revealViewport}
              variants={fadeUp}
              className={`flex flex-col rounded-surface border p-6 sm:p-7 ${
                plan.featured
                  ? "border-primary/35 bg-card shadow-float-lg lg:-translate-y-2"
                  : "border-border bg-card/60"
              }`}
            >
              <div className="flex items-baseline justify-between gap-3">
                <h3 className="text-lg font-semibold">{t(`plan${plan.id}`)}</h3>
                {plan.featured ? (
                  <span className="text-xs font-medium text-primary">
                    {t("featured")}
                  </span>
                ) : null}
              </div>
              <p className="mt-5 text-3xl font-semibold tracking-tight">
                {t(`plan${plan.id}Price`)}
              </p>
              <p className="mt-2 text-sm text-muted-foreground">
                {t(`plan${plan.id}Desc`)}
              </p>
              <ul className="mt-6 flex-1 space-y-3 text-sm text-muted-foreground">
                {plan.features.map((feature) => (
                  <li key={feature} className="flex gap-2.5">
                    <Check
                      className="mt-0.5 size-4 shrink-0 text-primary"
                      aria-hidden
                    />
                    <span>{t(feature)}</span>
                  </li>
                ))}
              </ul>
              <Link href="/register" className="mt-8 block">
                <Button
                  className="w-full"
                  variant={plan.featured ? "default" : "outline"}
                >
                  {t("buyNow")}
                </Button>
              </Link>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
