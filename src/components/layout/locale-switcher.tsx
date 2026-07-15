"use client";

import { useLocale, useTranslations } from "next-intl";
import { Link, usePathname } from "@/i18n/navigation";
import { LOCALES } from "@/constants";
import type { Locale } from "@/types";
import { cn } from "@/utils";
import { buttonVariants } from "@/components/ui/button";

/** Language switcher — mirrors the full layout via locale + `dir`. */
export function LanguageSwitcher() {
  const t = useTranslations("common");
  const locale = useLocale() as Locale;
  const pathname = usePathname();

  return (
    <div
      className="inline-flex items-center gap-0.5 rounded-xl bg-muted/70 p-0.5"
      role="group"
      aria-label={t("language")}
    >
      {LOCALES.map((code) => {
        const active = code === locale;
        return (
          <Link
            key={code}
            href={pathname}
            locale={code}
            aria-current={active ? "true" : undefined}
            className={cn(
              buttonVariants({ variant: "ghost", size: "sm" }),
              "h-7 min-w-9 px-2 text-xs font-medium uppercase transition-colors",
              active && "bg-card text-foreground shadow-float-sm",
            )}
          >
            {code}
          </Link>
        );
      })}
    </div>
  );
}

/** @deprecated Prefer LanguageSwitcher */
export { LanguageSwitcher as LocaleSwitcher };
