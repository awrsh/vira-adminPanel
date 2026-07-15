"use client";

import * as React from "react";
import { useLocale, useTranslations } from "next-intl";
import { Download } from "lucide-react";
import { toast } from "sonner";
import { PageHeader } from "@/components/shared/page-header";
import { AreaChart, BarChart, PieChart } from "@/components/charts/charts";
import { Button } from "@/components/ui/button";
import { Surface } from "@/components/ui/surface";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { formatCurrency, formatNumber } from "@/utils";

function series(labels: string[], base: number) {
  return labels.map((label, i) => ({
    label,
    value: Math.round(base * (0.7 + i * 0.08) + (i % 3) * base * 0.04),
  }));
}

export function AnalyticsPageView() {
  const t = useTranslations("analytics");
  const locale = useLocale();
  const tag = locale === "fa" ? "fa-IR" : "en-US";
  const [range, setRange] = React.useState("30");
  const labels =
    locale === "fa"
      ? ["ه۱", "ه۲", "ه۳", "ه۴", "ه۵", "ه۶"]
      : ["W1", "W2", "W3", "W4", "W5", "W6"];
  const revenue = series(labels, 42_000_000);
  const users = series(labels, 1200);
  const traffic = [
    { label: t("organic"), value: 42 },
    { label: t("ads"), value: 28 },
    { label: t("referral"), value: 18 },
    { label: t("social"), value: 12 },
  ];
  const devices = [
    { label: t("desktop"), value: 55 },
    { label: t("mobile"), value: 38 },
    { label: t("tablet"), value: 7 },
  ];
  const funnel = [
    { label: t("funnelVisit"), value: 10000 },
    { label: t("funnelSignup"), value: 3200 },
    { label: t("funnelTrial"), value: 1800 },
    { label: t("funnelPaid"), value: 640 },
  ];
  const cohorts = [
    { cohort: "2026-01", w0: 100, w1: 62, w2: 48, w3: 41 },
    { cohort: "2026-02", w0: 100, w1: 58, w2: 44, w3: 39 },
    { cohort: "2026-03", w0: 100, w1: 65, w2: 51, w3: 45 },
  ];
  const geo = [
    { label: locale === "fa" ? "تهران" : "Tehran", value: 38 },
    { label: locale === "fa" ? "اصفهان" : "Isfahan", value: 18 },
    { label: locale === "fa" ? "مشهد" : "Mashhad", value: 14 },
    { label: locale === "fa" ? "سایر" : "Other", value: 30 },
  ];

  return (
    <div className="space-y-6">
      <PageHeader
        title={t("title")}
        description={t("subtitle")}
        actions={
          <div className="flex flex-wrap items-center gap-2">
            <Select value={range} onValueChange={setRange}>
              <SelectTrigger className="h-9 w-32">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="7">{t("range7")}</SelectItem>
                <SelectItem value="30">{t("range30")}</SelectItem>
                <SelectItem value="90">{t("range90")}</SelectItem>
              </SelectContent>
            </Select>
            <Button
              variant="outline"
              size="sm"
              onClick={() => toast.success(t("exported"))}
            >
              <Download className="size-4" />
              {t("export")}
            </Button>
          </div>
        }
      />

      <div className="grid grid-cols-12 gap-3 lg:gap-4">
        {(
          [
            {
              label: t("revenue"),
              value: formatCurrency(84_200_000, tag),
              hint: "+12.4%",
            },
            {
              label: t("activeUsers"),
              value: formatNumber(1840, tag),
              hint: "+6.1%",
            },
            { label: t("conversion"), value: "6.4%", hint: "+0.4%" },
            { label: t("retention"), value: "41%", hint: "+2%" },
          ] as const
        ).map((card) => (
          <Surface
            key={card.label}
            elevated
            className="col-span-6 p-4 lg:col-span-3"
          >
            <p className="text-xs text-muted-foreground">{card.label}</p>
            <p className="mt-1 text-2xl font-semibold tracking-tight">
              {card.value}
            </p>
            <p className="mt-1 text-xs text-success">{card.hint}</p>
          </Surface>
        ))}

        <Surface elevated className="col-span-12 p-4 sm:p-5 lg:col-span-8">
          <h3 className="mb-3 text-sm font-medium text-muted-foreground">
            {t("revenueTrend")}
          </h3>
          <AreaChart
            data={revenue}
            name={t("revenue")}
            showLegend={false}
            height={200}
          />
        </Surface>
        <Surface elevated className="col-span-12 p-4 sm:p-5 lg:col-span-4">
          <h3 className="mb-3 text-sm font-medium text-muted-foreground">
            {t("userGrowth")}
          </h3>
          <BarChart
            data={users}
            name={t("users")}
            showLegend={false}
            height={200}
          />
        </Surface>

        <Surface elevated className="col-span-12 p-4 sm:p-5 lg:col-span-4">
          <h3 className="mb-3 text-sm font-medium text-muted-foreground">
            {t("traffic")}
          </h3>
          <PieChart data={traffic} donut height={180} />
        </Surface>
        <Surface elevated className="col-span-12 p-4 sm:p-5 lg:col-span-4">
          <h3 className="mb-3 text-sm font-medium text-muted-foreground">
            {t("devices")}
          </h3>
          <PieChart data={devices} donut height={180} />
        </Surface>
        <Surface elevated className="col-span-12 p-4 sm:p-5 lg:col-span-4">
          <h3 className="mb-3 text-sm font-medium text-muted-foreground">
            {t("geo")}
          </h3>
          <BarChart
            data={geo}
            name={t("geo")}
            showLegend={false}
            height={180}
          />
        </Surface>

        <Surface elevated className="col-span-12 p-4 sm:p-5 lg:col-span-5">
          <h3 className="mb-3 text-sm font-medium text-muted-foreground">
            {t("funnel")}
          </h3>
          <BarChart
            data={funnel}
            name={t("funnel")}
            showLegend={false}
            height={200}
          />
        </Surface>

        <Surface elevated className="col-span-12 overflow-x-auto p-4 sm:p-5 lg:col-span-7">
          <h3 className="mb-3 text-sm font-medium text-muted-foreground">
            {t("cohorts")}
          </h3>
          <table className="w-full min-w-[28rem] text-sm">
            <thead>
              <tr className="border-b border-border text-muted-foreground">
                <th className="px-2 py-2 text-start font-medium">
                  {t("cohort")}
                </th>
                <th className="px-2 py-2 text-start font-medium">W0</th>
                <th className="px-2 py-2 text-start font-medium">W1</th>
                <th className="px-2 py-2 text-start font-medium">W2</th>
                <th className="px-2 py-2 text-start font-medium">W3</th>
              </tr>
            </thead>
            <tbody>
              {cohorts.map((row) => (
                <tr key={row.cohort} className="border-b border-border/60">
                  <td className="px-2 py-2">{row.cohort}</td>
                  <td className="px-2 py-2">{row.w0}%</td>
                  <td className="px-2 py-2">{row.w1}%</td>
                  <td className="px-2 py-2">{row.w2}%</td>
                  <td className="px-2 py-2">{row.w3}%</td>
                </tr>
              ))}
            </tbody>
          </table>
        </Surface>
      </div>
    </div>
  );
}
