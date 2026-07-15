import { delay, maybeThrow } from "@/mocks/api/delay";
import { getState } from "@/mocks/db/store";
import type { DashboardOverview } from "@/features/dashboard/types";

const MONTH_KEYS = ["m1", "m2", "m3", "m4", "m5", "m6"] as const;

function sum(values: number[]): number {
  return values.reduce((acc, n) => acc + n, 0);
}

/**
 * Aggregate dashboard overview from the in-memory store.
 * Deterministic shape with realistic Persian SaaS metrics.
 */
export async function fetchDashboardOverview(): Promise<DashboardOverview> {
  await delay();
  await maybeThrow();

  const { orders, payments, activities } = getState();

  const paidOrders = orders.filter((o) => o.paymentStatus === "paid");
  const revenueTotal = sum(paidOrders.map((o) => o.total));
  const salesTotal = orders.filter((o) => o.status !== "cancelled").length;

  const revenueSeries = MONTH_KEYS.map((key, index) => {
    const slice = paidOrders.slice(index * 8, index * 8 + 12);
    return {
      label: key,
      value: slice.length
        ? sum(slice.map((o) => o.total))
        : Math.round(revenueTotal * (0.12 + index * 0.02)),
    };
  });

  const salesSeries = MONTH_KEYS.map((key, index) => ({
    label: key,
    value: Math.max(
      12,
      orders.slice(index * 10, index * 10 + 14).length * 18 + index * 7,
    ),
  }));

  const visitorsSeries = MONTH_KEYS.map((key, index) => ({
    label: key,
    value: 1800 + index * 420 + (index % 2 === 0 ? 210 : -90),
  }));

  const paymentSum = sum(
    payments.filter((p) => p.status === "success").map((p) => p.amount),
  );

  const highlightDates = activities.slice(0, 8).map((a) => a.createdAt.slice(0, 10));

  return {
    revenue: {
      total: revenueTotal || paymentSum || 428_500_000,
      changePercent: 14.2,
      series: revenueSeries,
    },
    sales: {
      total: salesTotal || 1842,
      changePercent: 8.6,
      series: salesSeries,
    },
    visitors: {
      total: sum(visitorsSeries.map((d) => d.value)),
      changePercent: 12.4,
      series: visitorsSeries,
    },
    storage: {
      usedGb: 136,
      totalGb: 200,
    },
    traffic: [
      { label: "organic", value: 42 },
      { label: "ads", value: 28 },
      { label: "referral", value: 18 },
      { label: "social", value: 12 },
    ],
    highlightDates: [...new Set(highlightDates)],
  };
}

export const dashboardApi = {
  getOverview: fetchDashboardOverview,
};
