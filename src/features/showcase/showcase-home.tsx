"use client";

import { useTranslations } from "next-intl";
import { PageHeader } from "@/components/shared/page-header";
import { Surface } from "@/components/ui/surface";
import { Link } from "@/i18n/navigation";
import {
  AUTH_DEMOS,
  COMPONENT_DEMOS,
} from "@/features/showcase/catalog";

export function ShowcaseHomePage() {
  const t = useTranslations("showcase");

  return (
    <div className="space-y-6">
      <PageHeader title={t("title")} description={t("subtitle")} />
      <div className="grid gap-3 md:grid-cols-2">
        <Surface elevated className="space-y-3 p-5 text-start">
          <h2 className="font-medium">{t("authGroup")}</h2>
          <p className="text-sm text-muted-foreground">{t("authGroupHint")}</p>
          <ul className="space-y-1.5">
            {AUTH_DEMOS.map((item) => (
              <li key={item.slug}>
                <Link
                  href={`/showcase/auth/${item.slug}`}
                  className="text-sm text-primary underline-offset-2 hover:underline"
                >
                  {t(item.labelKey)}
                </Link>
              </li>
            ))}
          </ul>
        </Surface>
        <Surface elevated className="space-y-3 p-5 text-start">
          <h2 className="font-medium">{t("componentsGroup")}</h2>
          <p className="text-sm text-muted-foreground">
            {t("componentsGroupHint")}
          </p>
          <ul className="grid grid-cols-2 gap-1.5">
            {COMPONENT_DEMOS.map((item) => (
              <li key={item.slug}>
                <Link
                  href={`/showcase/components/${item.slug}`}
                  className="text-sm text-primary underline-offset-2 hover:underline"
                >
                  {t(item.labelKey)}
                </Link>
              </li>
            ))}
          </ul>
        </Surface>
      </div>
    </div>
  );
}
