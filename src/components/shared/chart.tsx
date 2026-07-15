"use client";

import * as React from "react";
import dynamic from "next/dynamic";
import type { EChartsOption } from "echarts";
import { cn } from "@/utils";
import { Skeleton } from "@/components/ui/skeleton";

const ReactECharts = dynamic(() => import("echarts-for-react"), {
  ssr: false,
  loading: () => <Skeleton className="h-full min-h-[220px] w-full" />,
});

function readCssVar(name: string, fallback: string): string {
  if (typeof window === "undefined") return fallback;
  const value = getComputedStyle(document.documentElement)
    .getPropertyValue(name)
    .trim();
  return value || fallback;
}

export function useChartThemeColors() {
  const [colors, setColors] = React.useState({
    chart1: "#5b55e0",
    chart2: "#0d9488",
    chart3: "#db2777",
    chart4: "#ca8a04",
    chart5: "#6366f1",
    foreground: "#111827",
    muted: "#6b7280",
    border: "rgb(17 24 39 / 0.08)",
    card: "#ffffff",
  });

  React.useEffect(() => {
    const sync = () => {
      setColors({
        chart1: readCssVar("--chart-1", "#5b55e0"),
        chart2: readCssVar("--chart-2", "#0d9488"),
        chart3: readCssVar("--chart-3", "#db2777"),
        chart4: readCssVar("--chart-4", "#ca8a04"),
        chart5: readCssVar("--chart-5", "#6366f1"),
        foreground: readCssVar("--foreground", "#111827"),
        muted: readCssVar("--muted-foreground", "#6b7280"),
        border: readCssVar("--border", "rgb(17 24 39 / 0.08)"),
        card: readCssVar("--card", "#ffffff"),
      });
    };

    sync();

    const observer = new MutationObserver(sync);
    observer.observe(document.documentElement, {
      attributes: true,
      attributeFilter: ["class", "style", "data-theme"],
    });

    return () => observer.disconnect();
  }, []);

  return colors;
}

export interface ChartProps {
  option: EChartsOption;
  className?: string;
  height?: number | string;
  loading?: boolean;
}

function Chart({ option, className, height = 280, loading = false }: ChartProps) {
  const theme = useChartThemeColors();

  const themedOption = React.useMemo<EChartsOption>(() => {
    const colorPalette = [
      theme.chart1,
      theme.chart2,
      theme.chart3,
      theme.chart4,
      theme.chart5,
    ];

    return {
      color: colorPalette,
      backgroundColor: "transparent",
      textStyle: {
        color: theme.foreground,
        fontFamily: "inherit",
      },
      ...option,
      tooltip: {
        backgroundColor: theme.card,
        borderWidth: 0,
        borderColor: "transparent",
        padding: [8, 12],
        textStyle: { color: theme.foreground, fontSize: 12 },
        extraCssText: "box-shadow: var(--shadow-float-sm); border-radius: 12px;",
        ...option.tooltip,
      },
      legend: option.legend
        ? {
            textStyle: { color: theme.muted, fontSize: 11 },
            itemWidth: 8,
            itemHeight: 8,
            ...option.legend,
          }
        : { show: false },
      grid: {
        left: 4,
        right: 4,
        top: 12,
        bottom: 4,
        containLabel: true,
        ...option.grid,
      },
    };
  }, [option, theme]);

  if (loading) {
    return (
      <Skeleton
        className={cn("w-full", className)}
        style={{ height }}
      />
    );
  }

  return (
    <div className={cn("w-full", className)} style={{ height }}>
      <ReactECharts
        option={themedOption}
        style={{ height: "100%", width: "100%" }}
        opts={{ renderer: "canvas" }}
        notMerge
        lazyUpdate
      />
    </div>
  );
}

export { Chart };
