"use client";

import { useTranslations } from "next-intl";
import { Link } from "@/i18n/navigation";
import { Button } from "@/components/ui/button";
import { Surface } from "@/components/ui/surface";

/** Locale-aware 404 inside `[locale]` shell (html/body already provided by layout). */
export default function LocaleNotFound() {
  const t = useTranslations("common");

  return (
    <main
      id="main-content"
      className="mx-auto flex min-h-[60dvh] max-w-lg flex-col items-start justify-center gap-4 px-4 py-16"
    >
      <Surface elevated className="w-full space-y-3 p-6 text-start">
        <p className="text-sm text-muted-foreground">404</p>
        <h1 className="text-2xl font-semibold">{t("notFoundTitle")}</h1>
        <p className="text-sm text-muted-foreground">{t("notFoundBody")}</p>
        <Button asChild>
          <Link href="/dashboard">{t("home")}</Link>
        </Button>
      </Surface>
    </main>
  );
}
