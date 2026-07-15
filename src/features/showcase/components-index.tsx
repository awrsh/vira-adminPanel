"use client";

import { useTranslations } from "next-intl";
import { PageHeader } from "@/components/shared/page-header";
import { Surface } from "@/components/ui/surface";
import { Link } from "@/i18n/navigation";
import { COMPONENT_DEMOS } from "@/features/showcase/catalog";

/** Index of UI component demos — `/showcase/components`. */
export function ComponentsIndexPage() {
  const t = useTranslations("showcase");

  return (
    <div className="space-y-6">
      <PageHeader
        title={t("componentsGroup")}
        description={t("componentsGroupHint")}
      />
      <div className="grid gap-3 sm:grid-cols-2 xl:grid-cols-3">
        {COMPONENT_DEMOS.map((item) => (
          <Link key={item.slug} href={`/showcase/components/${item.slug}`}>
            <Surface
              elevated
              className="h-full p-5 text-start transition-colors hover:bg-muted/40"
            >
              <p className="font-medium">{t(item.labelKey)}</p>
              <p className="mt-1 text-xs text-muted-foreground">
                {t("componentDemoHint")}
              </p>
            </Surface>
          </Link>
        ))}
      </div>
    </div>
  );
}
