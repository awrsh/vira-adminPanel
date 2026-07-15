"use client";

import { useTranslations } from "next-intl";
import { Link } from "@/i18n/navigation";

export function MarketingFooter() {
  const t = useTranslations("landing");

  return (
    <footer className="border-t border-border">
      <div className="mx-auto flex max-w-6xl flex-col gap-6 px-4 py-10 sm:flex-row sm:items-center sm:justify-between sm:px-6">
        <div>
          <p className="font-persian text-sm font-semibold">{t("brandShort")}</p>
          <p className="mt-1 text-xs text-muted-foreground">{t("footerTagline")}</p>
        </div>
        <nav
          className="flex flex-wrap gap-x-5 gap-y-2 text-sm text-muted-foreground"
          aria-label={t("footerNavLabel")}
        >
          <a href="#pricing" className="hover:text-foreground">
            {t("navPricing")}
          </a>
          <a href="#faq" className="hover:text-foreground">
            {t("navFaq")}
          </a>
          <Link href="/design-system" className="hover:text-foreground">
            {t("navDocs")}
          </Link>
          <a href="#contact" className="hover:text-foreground">
            {t("navContact")}
          </a>
          <Link href="/login" className="hover:text-foreground">
            {t("navLogin")}
          </Link>
        </nav>
      </div>
      <div className="border-t border-border">
        <p className="mx-auto max-w-6xl px-4 py-4 text-xs text-muted-foreground sm:px-6">
          {t("footerRights")}
        </p>
      </div>
    </footer>
  );
}
