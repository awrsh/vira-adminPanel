"use client";

import { useQuery, type UseQueryOptions } from "@tanstack/react-query";
import { ApiError } from "@/lib/api/errors";
import { queryKeys } from "@/lib/query-keys";
import { dashboardService } from "@/services/dashboard";
import type { DashboardOverview } from "@/features/dashboard/types";

export function useDashboardOverview(
  options?: Omit<
    UseQueryOptions<DashboardOverview, ApiError>,
    "queryKey" | "queryFn"
  >,
) {
  return useQuery({
    ...options,
    queryKey: queryKeys.dashboard.overview(),
    queryFn: () => dashboardService.getOverview(),
  });
}
