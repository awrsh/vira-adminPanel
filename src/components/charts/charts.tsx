"use client";

import * as React from "react";
import type { EChartsOption } from "echarts";
import {
  Chart,
  useChartThemeColors,
  type ChartProps,
} from "@/components/shared/chart";
import { cn } from "@/utils";

export interface ChartDatum {
  label: string;
  value: number;
}

export interface SeriesChartProps extends Omit<ChartProps, "option"> {
  data: ChartDatum[];
  /** Optional series name for tooltips/legend */
  name?: string;
  showLegend?: boolean;
}

function baseAxisLabels(data: ChartDatum[]) {
  return data.map((d) => d.label);
}

function baseValues(data: ChartDatum[]) {
  return data.map((d) => d.value);
}

const quietAxisLabel = {
  color: "var(--muted-foreground)",
  fontSize: 10,
  margin: 8,
};

/** Themed line chart — minimal editorial stroke. */
function LineChart({
  data,
  name = "Series",
  showLegend = false,
  ...props
}: SeriesChartProps) {
  const option = React.useMemo<EChartsOption>(
    () => ({
      legend: showLegend ? { top: 0, itemWidth: 10, itemHeight: 6 } : undefined,
      grid: { top: 12, right: 4, bottom: 4, left: 4, containLabel: true },
      xAxis: {
        type: "category",
        data: baseAxisLabels(data),
        axisLine: { show: false },
        axisTick: { show: false },
        axisLabel: quietAxisLabel,
      },
      yAxis: {
        type: "value",
        axisLine: { show: false },
        axisTick: { show: false },
        axisLabel: { ...quietAxisLabel, showMaxLabel: false },
        splitLine: {
          lineStyle: { type: "solid", opacity: 0.08, width: 1 },
        },
        splitNumber: 3,
      },
      series: [
        {
          name,
          type: "line",
          smooth: 0.35,
          showSymbol: false,
          lineStyle: { width: 1.75 },
          data: baseValues(data),
        },
      ],
    }),
    [data, name, showLegend],
  );

  return <Chart option={option} {...props} />;
}

/** Themed bar chart — thin rounded bars. */
function BarChart({
  data,
  name = "Series",
  showLegend = false,
  ...props
}: SeriesChartProps) {
  const option = React.useMemo<EChartsOption>(
    () => ({
      legend: showLegend ? { top: 0, itemWidth: 10, itemHeight: 6 } : undefined,
      grid: { top: 12, right: 4, bottom: 4, left: 4, containLabel: true },
      xAxis: {
        type: "category",
        data: baseAxisLabels(data),
        axisLine: { show: false },
        axisTick: { show: false },
        axisLabel: quietAxisLabel,
      },
      yAxis: {
        type: "value",
        axisLine: { show: false },
        axisTick: { show: false },
        axisLabel: { ...quietAxisLabel, showMaxLabel: false },
        splitLine: {
          lineStyle: { type: "solid", opacity: 0.08, width: 1 },
        },
        splitNumber: 3,
      },
      series: [
        {
          name,
          type: "bar",
          barMaxWidth: 14,
          barGap: "40%",
          data: baseValues(data),
          itemStyle: {
            borderRadius: [6, 6, 2, 2],
            opacity: 0.9,
          },
        },
      ],
    }),
    [data, name, showLegend],
  );

  return <Chart option={option} {...props} />;
}

/** Themed area chart — soft fill, no symbols. */
function AreaChart({
  data,
  name = "Series",
  showLegend = false,
  ...props
}: SeriesChartProps) {
  const option = React.useMemo<EChartsOption>(
    () => ({
      legend: showLegend ? { top: 0, itemWidth: 10, itemHeight: 6 } : undefined,
      grid: { top: 12, right: 4, bottom: 4, left: 4, containLabel: true },
      xAxis: {
        type: "category",
        boundaryGap: false,
        data: baseAxisLabels(data),
        axisLine: { show: false },
        axisTick: { show: false },
        axisLabel: quietAxisLabel,
      },
      yAxis: {
        type: "value",
        axisLine: { show: false },
        axisTick: { show: false },
        axisLabel: { ...quietAxisLabel, showMaxLabel: false },
        splitLine: {
          lineStyle: { type: "solid", opacity: 0.08, width: 1 },
        },
        splitNumber: 3,
      },
      series: [
        {
          name,
          type: "line",
          smooth: 0.4,
          areaStyle: { opacity: 0.1 },
          lineStyle: { width: 1.75 },
          showSymbol: false,
          data: baseValues(data),
        },
      ],
    }),
    [data, name, showLegend],
  );

  return <Chart option={option} {...props} />;
}

export interface PieChartProps extends Omit<ChartProps, "option"> {
  data: ChartDatum[];
  donut?: boolean;
  showLegend?: boolean;
}

/** Themed pie / donut — HTML legend for proper RTL icon+label order. */
function PieChart({
  data,
  donut = false,
  showLegend = true,
  height = 220,
  className,
  ...props
}: PieChartProps) {
  const theme = useChartThemeColors();
  const palette = [
    theme.chart1,
    theme.chart2,
    theme.chart3,
    theme.chart4,
    theme.chart5,
  ];

  const option = React.useMemo<EChartsOption>(
    () => ({
      legend: { show: false },
      series: [
        {
          type: "pie",
          radius: donut ? ["52%", "74%"] : ["0%", "74%"],
          center: ["50%", "50%"],
          avoidLabelOverlap: true,
          label: { show: false },
          labelLine: { show: false },
          itemStyle: { borderWidth: 2, borderColor: "transparent" },
          data: data.map((d) => ({ name: d.label, value: d.value })),
        },
      ],
    }),
    [data, donut],
  );

  const chartHeight =
    typeof height === "number" && showLegend ? height - 36 : height;

  return (
    <div className={cn("flex w-full flex-col gap-3", className)}>
      <Chart option={option} height={chartHeight} {...props} />
      {showLegend ? (
        <ul className="flex flex-wrap items-center justify-center gap-x-4 gap-y-2">
          {data.map((item, index) => (
            <li
              key={item.label}
              className="inline-flex items-center gap-1.5 text-xs text-muted-foreground"
            >
              <span
                className="size-2 shrink-0 rounded-full"
                style={{ backgroundColor: palette[index % palette.length] }}
                aria-hidden
              />
              <span>{item.label}</span>
            </li>
          ))}
        </ul>
      ) : null}
    </div>
  );
}

export { LineChart, BarChart, AreaChart, PieChart };
