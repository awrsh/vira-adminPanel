"use client";

import { motion } from "framer-motion";
import { AlertTriangle, CheckCircle2, Server } from "lucide-react";
import Image from "next/image";
import { useTranslations } from "next-intl";
import { AreaChart } from "@/components/charts/charts";
import { PageHeader } from "@/components/shared/page-header";
import { Badge } from "@/components/ui/badge";
import { Surface } from "@/components/ui/surface";
import { STOCK_IMAGES } from "@/lib/stock-images";

const METRICS = [
  { label: "CPU", value: "34%", status: "ok" },
  { label: "Memory", value: "61%", status: "warn" },
  { label: "API", value: "99.9%", status: "ok" },
  { label: "Queue", value: "12", status: "ok" },
];

const chartData = [
  { label: "00", value: 22 },
  { label: "04", value: 18 },
  { label: "08", value: 45 },
  { label: "12", value: 38 },
  { label: "16", value: 52 },
  { label: "20", value: 41 },
];

export function MonitoringPage() {
  const t = useTranslations("monitoring");

  return (
    <div className="space-y-6">
      <PageHeader title={t("title")} description={t("subtitle")} />

      <div className="relative overflow-hidden rounded-surface border border-border">
        <Image
          src={STOCK_IMAGES.monitor}
          alt=""
          width={1200}
          height={280}
          className="h-40 w-full object-cover opacity-90"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-background via-background/40 to-transparent" />
        <div className="absolute bottom-4 start-4 end-4 flex flex-wrap gap-2">
          <Badge variant="secondary" className="gap-1">
            <CheckCircle2 className="size-3.5 text-emerald-500" />
            {t("allSystems")}
          </Badge>
          <Badge variant="outline" className="gap-1">
            <Server className="size-3.5" />
            {t("region")}
          </Badge>
        </div>
      </div>

      <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
        {METRICS.map((m, i) => (
          <motion.div
            key={m.label}
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.05 }}
          >
            <Surface elevated className="p-4">
              <p className="text-xs text-muted-foreground">{m.label}</p>
              <p className="mt-1 text-2xl font-semibold">{m.value}</p>
              {m.status === "warn" ? (
                <p className="mt-1 flex items-center gap-1 text-xs text-amber-600">
                  <AlertTriangle className="size-3.5" />
                  {t("elevated")}
                </p>
              ) : (
                <p className="mt-1 text-xs text-emerald-600">{t("normal")}</p>
              )}
            </Surface>
          </motion.div>
        ))}
      </div>

      <Surface elevated className="p-4 sm:p-5">
        <h3 className="mb-3 text-sm font-medium">{t("traffic")}</h3>
        <AreaChart data={chartData} height={200} showLegend={false} />
      </Surface>
    </div>
  );
}
