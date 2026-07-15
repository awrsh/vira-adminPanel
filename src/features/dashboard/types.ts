import type { ChartDatum } from "@/components/charts/charts";

export interface DashboardMetricSeries {
  total: number;
  changePercent: number;
  series: ChartDatum[];
}

export interface DashboardStorage {
  usedGb: number;
  totalGb: number;
}

export interface DashboardOverview {
  revenue: DashboardMetricSeries;
  sales: DashboardMetricSeries;
  visitors: DashboardMetricSeries;
  storage: DashboardStorage;
  traffic: ChartDatum[];
  /** ISO date strings for calendar highlights */
  highlightDates: string[];
}

export type DashboardWidgetId =
  | "revenue"
  | "sales"
  | "visitors"
  | "orders"
  | "activity"
  | "calendar"
  | "tasks"
  | "quick-actions"
  | "notifications"
  | "storage"
  | "traffic"
  | "payments";
