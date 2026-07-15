"use client";

import { useTranslations } from "next-intl";
import { PageHeader } from "@/components/shared/page-header";
import { Surface } from "@/components/ui/surface";
import { Link } from "@/i18n/navigation";
import { AUTH_DEMOS } from "@/features/showcase/catalog";

/** Index of auth layout demos — `/showcase/auth`. */
export function AuthIndexPage() {
  const t = useTranslations("showcase");

  return (
    <div className="space-y-6">
      <PageHeader title={t("authGroup")} description={t("authGroupHint")} />
      <div className="grid gap-3 sm:grid-cols-2 xl:grid-cols-3">
        {AUTH_DEMOS.map((item) => (
          <Link key={item.slug} href={`/showcase/auth/${item.slug}`}>
            <Surface
              elevated
              className="h-full p-5 text-start transition-colors hover:bg-muted/40"
            >
              <p className="font-medium">{t(item.labelKey)}</p>
              <p className="mt-1 text-xs text-muted-foreground">
                {t("authDemoHint")}
              </p>
            </Surface>
          </Link>
        ))}
      </div>
    </div>
  );
}
