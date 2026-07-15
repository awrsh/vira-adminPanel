export {
  configureMockApi,
  getMockApiConfig,
  resetMockApiConfig,
  type MockApiConfig,
  type CreatePayload,
  type UpdatePayload,
  type BulkDeletePayload,
  type ApiResult,
} from "@/lib/api/config";
export { ApiError, HttpError, type ApiErrorCode } from "@/lib/api/errors";
export { apiClient, axiosClient, type ApiClient } from "@/lib/api/client";
export {
  registerMockResource,
  dispatchMockRequest,
  parseMockPath,
  getRegisteredResources,
} from "@/lib/api/mock-router";
