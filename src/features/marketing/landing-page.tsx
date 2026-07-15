"use client";

import { MarketingHeader } from "@/features/marketing/sections/marketing-header";
import { HeroSection } from "@/features/marketing/sections/hero-section";
import { FeaturesSection } from "@/features/marketing/sections/features-section";
import { BenefitsSection } from "@/features/marketing/sections/benefits-section";
import { UiShowcaseSection } from "@/features/marketing/sections/ui-showcase-section";
import { RtlShowcaseSection } from "@/features/marketing/sections/rtl-showcase-section";
import { DarkModeShowcaseSection } from "@/features/marketing/sections/dark-mode-showcase-section";
import { PricingSection } from "@/features/marketing/sections/pricing-section";
import { FaqSection } from "@/features/marketing/sections/faq-section";
import { TestimonialsSection } from "@/features/marketing/sections/testimonials-section";
import { DocsCtaSection } from "@/features/marketing/sections/docs-cta-section";
import { ContactCtaSection } from "@/features/marketing/sections/contact-cta-section";
import { MarketingFooter } from "@/features/marketing/sections/marketing-footer";

/** Commercial marketing site for Persian SaaS Starter Kit Pro. */
export function LandingPage() {
  return (
    <div className="relative min-h-dvh bg-background text-foreground">
      <MarketingHeader />
      <main id="main-content">
        <HeroSection />
        <FeaturesSection />
        <BenefitsSection />
        <UiShowcaseSection />
        <RtlShowcaseSection />
        <DarkModeShowcaseSection />
        <PricingSection />
        <FaqSection />
        <TestimonialsSection />
        <DocsCtaSection />
        <ContactCtaSection />
      </main>
      <MarketingFooter />
    </div>
  );
}
