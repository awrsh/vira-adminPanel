"use client";

import { useMemo, useState } from "react";
import { useLocale, useTranslations } from "next-intl";
import {
  Package,
  Settings,
  ShoppingCart,
  Users,
} from "lucide-react";
import { Link } from "@/i18n/navigation";
import { useDashboardOverview } from "@/features/dashboard/hooks";
import { WidgetShell } from "@/features/dashboard/widget-shell";
import { Calendar } from "@/components/ui/calendar";
import { Button } from "@/components/ui/button";

export function CalendarWidget({
  colSpan = 5,
  rowSpan = 2,
}: {
  colSpan?: number;
  rowSpan?: number;
}) {
  const t = useTranslations("dashboard");
  const locale = useLocale();
  const { data, isLoading, isError, refetch } =
    useDashboardOverview();
  const [month, setMonth] = useState<Date>(new Date());

  const modifiers = useMemo(() => {
    const dates =
      data?.highlightDates.map((iso) => {
        const [y, m, d] = iso.split("-").map(Number);
        return new Date(y ?? 2024, (m ?? 1) - 1, d ?? 1);
      }) ?? [];
    return { highlight: dates };
  }, [data?.highlightDates]);

  return (
    <WidgetShell
      title={t("calendar")}
      description={t("calendarHint")}
      colSpan={colSpan}
      rowSpan={rowSpan}
      isLoading={isLoading}
      isError={isError}
      onRetry={() => void refetch()}
      bodyClassName="items-center"
    >
      <Calendar
        mode="single"
        month={month}
        onMonthChange={setMonth}
        locale={locale === "fa" ? undefined : undefined}
        modifiers={modifiers}
        modifiersClassNames={{
          highlight:
            "bg-primary/15 text-primary font-medium after:absolute after:bottom-1 after:start-1/2 after:size-1 after:-translate-x-1/2 after:rounded-full after:bg-primary",
        }}
        className="rounded-2xl border border-border/50 bg-muted/20"
      />
    </WidgetShell>
  );
}

export function QuickActionsWidget({
  colSpan = 5,
}: {
  colSpan?: number;
  rowSpan?: number;
}) {
  const t = useTranslations("dashboard");

  const actions = [
    {
      href: "/users",
      label: t("actions.users"),
      icon: Users,
    },
    {
      href: "/products",
      label: t("actions.products"),
      icon: Package,
    },
    {
      href: "/orders",
      label: t("actions.orders"),
      icon: ShoppingCart,
    },
    {
      href: "/settings",
      label: t("actions.settings"),
      icon: Settings,
    },
  ] as const;

  return (
    <WidgetShell title={t("quickActions")} colSpan={colSpan}>
      <div className="grid grid-cols-2 gap-3">
        {actions.map((action) => (
          <Link key={action.href} href={action.href} className="block">
            <Button
              variant="outline"
              className="h-auto w-full flex-col items-start gap-3 rounded-2xl px-4 py-4 text-start shadow-none"
            >
              <action.icon className="size-4 text-primary" />
              <span className="text-sm font-medium">{action.label}</span>
            </Button>
          </Link>
        ))}
      </div>
    </WidgetShell>
  );
}
