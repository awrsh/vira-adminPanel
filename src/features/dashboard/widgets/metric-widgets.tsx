"use client";

import { useLocale, useTranslations } from "next-intl";
import {
  AreaChart,
  BarChart,
  LineChart,
  PieChart,
  type ChartDatum,
} from "@/components/charts/charts";
import { useDashboardOverview } from "@/features/dashboard/hooks";
import { WidgetShell } from "@/features/dashboard/widget-shell";
import { formatCurrency, formatNumber } from "@/utils";

function useMonthLabels(): Record<string, string> {
  const t = useTranslations("dashboard.months");
  return {
    m1: t("m1"),
    m2: t("m2"),
    m3: t("m3"),
    m4: t("m4"),
    m5: t("m5"),
    m6: t("m6"),
  };
}

function localizeSeries(
  series: ChartDatum[],
  labels: Record<string, string>,
): ChartDatum[] {
  return series.map((point) => ({
    ...point,
    label: labels[point.label] ?? point.label,
  }));
}

function Trend({ value }: { value: number }) {
  const positive = value >= 0;
  return (
    <span
      className={
        positive ? "text-sm text-success" : "text-sm text-destructive"
      }
    >
      {positive ? "+" : ""}
      {value.toFixed(1)}%
    </span>
  );
}

export function RevenueWidget({
  colSpan = 7,
  rowSpan = 2,
}: {
  colSpan?: number;
  rowSpan?: number;
}) {
  const t = useTranslations("dashboard");
  const locale = useLocale();
  const months = useMonthLabels();
  const { data, isLoading, isError, refetch } =
    useDashboardOverview();

  const series = data ? localizeSeries(data.revenue.series, months) : [];

  return (
    <WidgetShell
      title={t("revenue")}
      description={t("revenueHint")}
      colSpan={colSpan}
      rowSpan={rowSpan}
      isLoading={isLoading}
      isError={isError}
      isEmpty={!isLoading && !isError && series.length === 0}
      onRetry={() => void refetch()}
    >
      {data ? (
        <div className="flex h-full flex-col justify-between gap-4">
          <div className="flex flex-wrap items-end justify-between gap-3">
            <p className="text-3xl font-semibold tracking-tight sm:text-4xl">
              {formatCurrency(
                data.revenue.total,
                locale === "fa" ? "fa-IR" : "en-US",
              )}
            </p>
            <Trend value={data.revenue.changePercent} />
          </div>
          <AreaChart
            data={series}
            name={t("revenue")}
            showLegend={false}
            height={180}
          />
        </div>
      ) : null}
    </WidgetShell>
  );
}

export function SalesWidget({
  colSpan = 5,
}: {
  colSpan?: number;
  rowSpan?: number;
}) {
  const t = useTranslations("dashboard");
  const locale = useLocale();
  const months = useMonthLabels();
  const { data, isLoading, isError, refetch } =
    useDashboardOverview();
  const series = data ? localizeSeries(data.sales.series, months) : [];

  return (
    <WidgetShell
      title={t("sales")}
      description={t("salesHint")}
      colSpan={colSpan}
      isLoading={isLoading}
      isError={isError}
      isEmpty={!isLoading && !isError && series.length === 0}
      onRetry={() => void refetch()}
    >
      {data ? (
        <div className="space-y-4">
          <div className="flex items-end justify-between gap-3">
            <p className="text-3xl font-semibold tracking-tight">
              {formatNumber(
                data.sales.total,
                locale === "fa" ? "fa-IR" : "en-US",
              )}
            </p>
            <Trend value={data.sales.changePercent} />
          </div>
          <BarChart
            data={series}
            name={t("sales")}
            showLegend={false}
            height={140}
          />
        </div>
      ) : null}
    </WidgetShell>
  );
}

export function VisitorsWidget({
  colSpan = 5,
}: {
  colSpan?: number;
  rowSpan?: number;
}) {
  const t = useTranslations("dashboard");
  const locale = useLocale();
  const months = useMonthLabels();
  const { data, isLoading, isError, refetch } =
    useDashboardOverview();
  const series = data ? localizeSeries(data.visitors.series, months) : [];

  return (
    <WidgetShell
      title={t("visitors")}
      description={t("visitorsHint")}
      colSpan={colSpan}
      isLoading={isLoading}
      isError={isError}
      isEmpty={!isLoading && !isError && series.length === 0}
      onRetry={() => void refetch()}
    >
      {data ? (
        <div className="space-y-4">
          <div className="flex items-end justify-between gap-3">
            <p className="text-3xl font-semibold tracking-tight">
              {formatNumber(
                data.visitors.total,
                locale === "fa" ? "fa-IR" : "en-US",
              )}
            </p>
            <Trend value={data.visitors.changePercent} />
          </div>
          <LineChart
            data={series}
            name={t("visitors")}
            showLegend={false}
            height={140}
          />
        </div>
      ) : null}
    </WidgetShell>
  );
}

export function StorageWidget({
  colSpan = 4,
}: {
  colSpan?: number;
  rowSpan?: number;
}) {
  const t = useTranslations("dashboard");
  const locale = useLocale();
  const { data, isLoading, isError, refetch } =
    useDashboardOverview();

  const used = data?.storage.usedGb ?? 0;
  const total = data?.storage.totalGb ?? 1;
  const pct = Math.round((used / total) * 100);

  return (
    <WidgetShell
      title={t("storage")}
      colSpan={colSpan}
      isLoading={isLoading}
      isError={isError}
      onRetry={() => void refetch()}
    >
      {data ? (
        <div className="flex h-full flex-col justify-center gap-2.5">
          <p className="text-2xl font-semibold tracking-tight">{pct}%</p>
          <div className="h-1.5 overflow-hidden rounded-full bg-muted">
            <div
              className="h-full rounded-full bg-chart-2 transition-all"
              style={{ width: `${pct}%` }}
            />
          </div>
          <p className="text-xs text-muted-foreground">
            {formatNumber(used, locale === "fa" ? "fa-IR" : "en-US")} GB /{" "}
            {formatNumber(total, locale === "fa" ? "fa-IR" : "en-US")} GB
          </p>
        </div>
      ) : null}
    </WidgetShell>
  );
}

export function TrafficWidget({
  colSpan = 5,
  rowSpan = 1,
}: {
  colSpan?: number;
  rowSpan?: number;
}) {
  const t = useTranslations("dashboard");
  const { data, isLoading, isError, refetch } =
    useDashboardOverview();

  const series =
    data?.traffic.map((item) => ({
      label: t(`trafficSources.${item.label}` as "trafficSources.organic"),
      value: item.value,
    })) ?? [];

  return (
    <WidgetShell
      title={t("traffic")}
      description={t("trafficHint")}
      colSpan={colSpan}
      rowSpan={rowSpan}
      isLoading={isLoading}
      isError={isError}
      isEmpty={!isLoading && !isError && series.length === 0}
      onRetry={() => void refetch()}
    >
      <PieChart data={series} donut height={170} showLegend />
    </WidgetShell>
  );
}
