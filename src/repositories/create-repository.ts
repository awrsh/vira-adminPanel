import { apiClient } from "@/lib/api/client";
import { ApiError } from "@/lib/api/errors";
import type { CreatePayload, UpdatePayload } from "@/lib/api/config";
import type { ResourceApi } from "@/mocks/api/create-resource-api";
import type { ListParams, PaginatedResult } from "@/types";
import type { Repository, RepositoryResource } from "@/repositories/types";

/**
 * Repository backed by the typed API client (mock adapter by default).
 * Swap `useMockAdapter` off and point Axios at a real API when ready.
 */
export function createHttpRepository<T extends { id: string }>(
  resource: RepositoryResource,
): Repository<T> {
  return {
    list: (params?: ListParams) =>
      apiClient.resources.list<T>(resource, params),

    getById: async (id: string) => {
      try {
        return await apiClient.resources.getById<T>(resource, id);
      } catch (error) {
        if (error instanceof ApiError && error.status === 404) {
          return null;
        }
        throw error;
      }
    },

    create: (input: CreatePayload<T>) =>
      apiClient.resources.create<T>(resource, input),

    update: (id: string, patch: UpdatePayload<T>) =>
      apiClient.resources.update<T>(resource, id, patch),

    remove: (id: string) => apiClient.resources.remove(resource, id),

    removeMany: (ids: string[]) =>
      apiClient.resources.removeMany(resource, ids),
  };
}

/**
 * Repository that talks directly to an in-memory ResourceApi
 * (useful for tests or bypassing HTTP).
 */
export function createDirectRepository<T extends { id: string }>(
  api: ResourceApi<T>,
): Repository<T> {
  return {
    list: (params) => api.list(params),
    getById: (id) => api.getById(id),
    create: (input) => api.create(input),
    update: (id, patch) => api.update(id, patch),
    remove: (id) => api.remove(id),
    removeMany: (ids) => api.removeMany(ids),
  };
}

/** Ensure list results are always well-typed. */
export function emptyPage<T>(params?: ListParams): PaginatedResult<T> {
  const page = params?.page ?? 1;
  const pageSize = params?.pageSize ?? 10;
  return { data: [], total: 0, page, pageSize, totalPages: 1 };
}
