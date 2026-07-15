import { dashboardApi } from "@/mocks/api/dashboard";
import { ApiError } from "@/lib/api/errors";

export const dashboardService = {
  getOverview: async () => {
    try {
      return await dashboardApi.getOverview();
    } catch (error) {
      throw ApiError.fromUnknown(error);
    }
  },
};
