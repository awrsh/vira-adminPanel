"use client";

import { useTranslations } from "next-intl";
import { Link } from "@/i18n/navigation";
import { Button } from "@/components/ui/button";
import { LocaleSwitcher } from "@/components/layout/locale-switcher";
import { ThemeToggle } from "@/components/layout/theme-toggle";

const navItems = [
  { href: "#features", labelKey: "navFeatures" as const },
  { href: "#ui-showcase", labelKey: "navShowcase" as const },
  { href: "#pricing", labelKey: "navPricing" as const },
  { href: "#faq", labelKey: "navFaq" as const },
] as const;

export function MarketingHeader() {
  const t = useTranslations("landing");

  return (
    <header className="sticky top-0 z-30 border-b border-transparent bg-background/70 backdrop-blur-xl supports-[backdrop-filter]:bg-background/55">
      <div className="mx-auto flex max-w-6xl items-center justify-between gap-4 px-4 py-4 sm:px-6">
        <Link
          href="/"
          className="font-persian text-sm font-semibold tracking-tight text-foreground"
        >
          {t("brandShort")}
        </Link>

        <nav
          className="hidden items-center gap-7 text-sm text-muted-foreground lg:flex"
          aria-label={t("navLabel")}
        >
          {navItems.map((item) => (
            <a
              key={item.href}
              href={item.href}
              className="transition-colors hover:text-foreground"
            >
              {t(item.labelKey)}
            </a>
          ))}
          <Link
            href="/design-system"
            className="transition-colors hover:text-foreground"
          >
            {t("navDocs")}
          </Link>
        </nav>

        <div className="flex items-center gap-2">
          <LocaleSwitcher />
          <ThemeToggle />
          <Link href="/login" className="hidden sm:inline-flex">
            <Button size="sm" variant="outline">
              {t("navLogin")}
            </Button>
          </Link>
        </div>
      </div>
    </header>
  );
}
