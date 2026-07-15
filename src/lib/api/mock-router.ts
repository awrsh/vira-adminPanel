import type { ResourceApi } from "@/mocks/api/create-resource-api";
import type { ListParams } from "@/types";
import type { BulkDeletePayload, CreatePayload } from "@/lib/api/config";
import { ApiError } from "@/lib/api/errors";

export type MockHttpMethod = "GET" | "POST" | "PATCH" | "PUT" | "DELETE";

export interface MockRouteMatch {
  resource: string;
  id?: string;
  action?: "bulk-delete";
}

type ResourceRegistry = Record<string, ResourceApi<{ id: string }>>;

const registry: ResourceRegistry = {};

export function registerMockResource<T extends { id: string }>(
  resource: string,
  api: ResourceApi<T>,
): void {
  registry[resource] = api as unknown as ResourceApi<{ id: string }>;
}

export function getRegisteredResources(): string[] {
  return Object.keys(registry);
}

export function parseMockPath(path: string): MockRouteMatch | null {
  const cleaned = path.replace(/^\/+/, "").replace(/\/+$/, "");
  const parts = cleaned.split("/").filter(Boolean);
  if (parts.length === 0) return null;

  const resource = parts[0];
  if (!resource) return null;

  if (parts.length === 1) {
    return { resource };
  }

  if (parts.length === 2 && parts[1] === "bulk-delete") {
    return { resource, action: "bulk-delete" };
  }

  if (parts.length === 2 && parts[1]) {
    return { resource, id: parts[1] };
  }

  return null;
}

function toListParams(params: Record<string, unknown> | undefined): ListParams {
  if (!params) return {};

  const filtersRaw = params.filters;
  let filters: ListParams["filters"];
  if (typeof filtersRaw === "string") {
    try {
      filters = JSON.parse(filtersRaw) as ListParams["filters"];
    } catch {
      filters = undefined;
    }
  } else if (filtersRaw && typeof filtersRaw === "object") {
    filters = filtersRaw as ListParams["filters"];
  }

  return {
    page: params.page != null ? Number(params.page) : undefined,
    pageSize: params.pageSize != null ? Number(params.pageSize) : undefined,
    search: params.search != null ? String(params.search) : undefined,
    sortBy: params.sortBy != null ? String(params.sortBy) : undefined,
    sortOrder:
      params.sortOrder === "asc" || params.sortOrder === "desc"
        ? params.sortOrder
        : undefined,
    filters,
  };
}

export async function dispatchMockRequest(options: {
  method: MockHttpMethod;
  path: string;
  params?: Record<string, unknown>;
  data?: unknown;
}): Promise<unknown> {
  const match = parseMockPath(options.path);
  if (!match) {
    throw new ApiError(`Unknown mock route: ${options.path}`, {
      status: 404,
      code: "NOT_FOUND",
    });
  }

  const api = registry[match.resource];
  if (!api) {
    throw new ApiError(`Mock resource not registered: ${match.resource}`, {
      status: 404,
      code: "NOT_FOUND",
    });
  }

  const method = options.method.toUpperCase() as MockHttpMethod;

  if (match.action === "bulk-delete") {
    if (method !== "POST" && method !== "DELETE") {
      throw new ApiError("Method not allowed for bulk-delete", {
        status: 405,
        code: "VALIDATION_ERROR",
      });
    }
    const payload = options.data as BulkDeletePayload | undefined;
    await api.removeMany(payload?.ids ?? []);
    return null;
  }

  if (!match.id) {
    if (method === "GET") {
      return api.list(toListParams(options.params));
    }
    if (method === "POST") {
      return api.create(
        (options.data ?? {}) as CreatePayload<{ id: string }>,
      );
    }
    throw new ApiError(`Method ${method} not allowed on collection`, {
      status: 405,
      code: "VALIDATION_ERROR",
    });
  }

  if (method === "GET") {
    const item = await api.getById(match.id);
    if (!item) {
      throw ApiError.notFound(match.resource, match.id);
    }
    return item;
  }

  if (method === "PATCH" || method === "PUT") {
    try {
      return await api.update(
        match.id,
        (options.data ?? {}) as Partial<{ id: string }>,
      );
    } catch (error) {
      throw ApiError.fromUnknown(error, `${match.resource} update failed`);
    }
  }

  if (method === "DELETE") {
    await api.remove(match.id);
    return null;
  }

  throw new ApiError(`Method ${method} not allowed on item`, {
    status: 405,
    code: "VALIDATION_ERROR",
  });
}
