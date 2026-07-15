"use client";

import { motion } from "framer-motion";
import { useTranslations } from "next-intl";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { fadeUp, revealViewport } from "@/features/marketing/motion";

const faqs = [1, 2, 3, 4, 5, 6] as const;

export function FaqSection() {
  const t = useTranslations("landing");

  return (
    <section id="faq" className="mx-auto max-w-6xl px-4 py-24 sm:px-6">
      <div className="grid gap-12 lg:grid-cols-[minmax(0,0.85fr)_minmax(0,1.15fr)]">
        <motion.div
          initial="hidden"
          whileInView="show"
          viewport={revealViewport}
          variants={fadeUp}
        >
          <h2 className="text-3xl font-semibold tracking-tight sm:text-4xl">
            {t("faqTitle")}
          </h2>
          <p className="mt-3 max-w-sm text-muted-foreground">
            {t("faqSubtitle")}
          </p>
        </motion.div>

        <motion.div
          initial="hidden"
          whileInView="show"
          viewport={revealViewport}
          variants={fadeUp}
        >
          <Accordion type="single" collapsible className="w-full">
            {faqs.map((n) => (
              <AccordionItem key={n} value={`faq-${n}`}>
                <AccordionTrigger>{t(`faq${n}q`)}</AccordionTrigger>
                <AccordionContent>{t(`faq${n}a`)}</AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </motion.div>
      </div>
    </section>
  );
}
