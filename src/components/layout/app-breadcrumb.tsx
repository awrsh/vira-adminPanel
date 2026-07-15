"use client";

import { useTranslations } from "next-intl";
import { Link, usePathname } from "@/i18n/navigation";
import { getNavItems } from "@/lib/modules/registry";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import type { NavItemConfig } from "@/types";

function flattenNav(items: NavItemConfig[]): NavItemConfig[] {
  return items.flatMap((item) => [
    ...(item.href ? [item] : []),
    ...flattenNav(item.children ?? []),
  ]);
}

/** Path-aware app breadcrumb using the module registry. */
export function AppBreadcrumb() {
  const t = useTranslations();
  const pathname = usePathname();
  const items = flattenNav(getNavItems());

  const match = items
    .slice()
    .sort((a, b) => (b.href?.length ?? 0) - (a.href?.length ?? 0))
    .find(
      (item) =>
        !!item.href &&
        (pathname === item.href || pathname.startsWith(`${item.href}/`)),
    );

  const currentLabel = match
    ? t(match.labelKey as "nav.dashboard")
    : t("common.home");

  return (
    <Breadcrumb>
      <BreadcrumbList>
        <BreadcrumbItem>
          <BreadcrumbLink asChild>
            <Link href="/dashboard">{t("common.home")}</Link>
          </BreadcrumbLink>
        </BreadcrumbItem>
        {match && match.href !== "/dashboard" ? (
          <>
            <BreadcrumbSeparator />
            <BreadcrumbItem>
              <BreadcrumbPage>{currentLabel}</BreadcrumbPage>
            </BreadcrumbItem>
          </>
        ) : match?.href === "/dashboard" ? (
          <>
            <BreadcrumbSeparator />
            <BreadcrumbItem>
              <BreadcrumbPage>{currentLabel}</BreadcrumbPage>
            </BreadcrumbItem>
          </>
        ) : pathname !== "/dashboard" ? (
          <>
            <BreadcrumbSeparator />
            <BreadcrumbItem>
              <BreadcrumbPage>{currentLabel}</BreadcrumbPage>
            </BreadcrumbItem>
          </>
        ) : null}
      </BreadcrumbList>
    </Breadcrumb>
  );
}
