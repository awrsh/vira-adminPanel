"use client";

import { useMemo, useState } from "react";
import { useLocale, useTranslations } from "next-intl";
import {
  Package,
  Settings2,
  ShoppingCart,
  Users,
} from "lucide-react";
import { Link } from "@/i18n/navigation";
import { useDashboardOverview } from "@/features/dashboard/hooks";
import { WidgetShell } from "@/features/dashboard/widget-shell";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import { JalaliCalendar } from "@/components/ui/jalali-calendar";

export function CalendarWidget({
  colSpan = 5,
  rowSpan = 2,
}: {
  colSpan?: number;
  rowSpan?: number;
}) {
  const t = useTranslations("dashboard");
  const locale = useLocale();
  const [month, setMonth] = useState<Date>(new Date());
  const { data, isLoading, isError, refetch } = useDashboardOverview();

  const highlightDates = useMemo(
    () =>
      (data?.highlightDates ?? []).map((value) => {
        const [year, monthPart, day] = value.split("-").map(Number);
        return new Date(year!, (monthPart ?? 1) - 1, day ?? 1);
      }),
    [data?.highlightDates],
  );

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
      {locale === "fa" ? (
        <JalaliCalendar
          month={month}
          onMonthChange={setMonth}
          selected={new Date()}
          modifiers={{ highlight: highlightDates }}
          className="rounded-2xl border border-border/50 bg-muted/20"
        />
      ) : (
        <Calendar
          mode="single"
          month={month}
          onMonthChange={setMonth}
          selected={new Date()}
          modifiers={{ highlight: highlightDates }}
          modifiersClassNames={{
            highlight: "bg-primary/15 text-primary font-medium",
          }}
          className="rounded-2xl border border-border/50 bg-muted/20"
        />
      )}
    </WidgetShell>
  );
}

export function QuickActionsWidget({
  colSpan = 4,
}: {
  colSpan?: number;
  rowSpan?: number;
}) {
  const t = useTranslations("dashboard");

  const actions = [
    { href: "/users", label: t("actionUsers"), icon: Users },
    { href: "/products", label: t("actionProducts"), icon: Package },
    { href: "/orders", label: t("actionOrders"), icon: ShoppingCart },
    { href: "/settings", label: t("actionSettings"), icon: Settings2 },
  ] as const;

  return (
    <WidgetShell title={t("quickActions")} colSpan={colSpan}>
      <div className="grid grid-cols-2 gap-2.5">
        {actions.map((action) => (
          <Link key={action.href} href={action.href} className="block">
            <Button
              variant="outline"
              className="h-auto w-full flex-col items-start gap-2.5 rounded-2xl px-3.5 py-3.5 text-start shadow-none"
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
