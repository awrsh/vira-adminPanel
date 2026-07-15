import axios, {
  type AxiosInstance,
  type AxiosRequestConfig,
  type AxiosResponse,
  type InternalAxiosRequestConfig,
} from "axios";
import type { ListParams, PaginatedResult } from "@/types";
import {
  getMockApiConfig,
  type CreatePayload,
  type UpdatePayload,
} from "@/lib/api/config";
import { ApiError } from "@/lib/api/errors";
import {
  dispatchMockRequest,
  type MockHttpMethod,
} from "@/lib/api/mock-router";

function serializeParams(params: ListParams | undefined): Record<string, unknown> {
  if (!params) return {};
  const { filters, ...rest } = params;
  return {
    ...rest,
    ...(filters ? { filters: JSON.stringify(filters) } : {}),
  };
}

function mockAdapter(
  config: InternalAxiosRequestConfig,
): Promise<AxiosResponse> {
  const method = (config.method ?? "get").toUpperCase() as MockHttpMethod;
  const rawUrl = config.url ?? "/";
  const path = rawUrl
    .replace(/^\/api\/?/i, "")
    .replace(/^\//, "")
    .split("?")[0]
    ?? "";

  let data = config.data as unknown;
  if (typeof data === "string") {
    try {
      data = JSON.parse(data) as unknown;
    } catch {
      // keep raw string
    }
  }

  return dispatchMockRequest({
    method,
    path,
    params: config.params as Record<string, unknown> | undefined,
    data,
  })
    .then((payload) => ({
      data: payload,
      status: method === "POST" ? 201 : method === "DELETE" ? 204 : 200,
      statusText: "OK",
      headers: {},
      config,
    }))
    .catch((error: unknown) => {
      const apiError = ApiError.fromUnknown(error);
      return Promise.reject(apiError);
    });
}

function createAxiosClient(): AxiosInstance {
  const instance = axios.create({
    baseURL: "/api",
    timeout: 30_000,
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
  });

  instance.interceptors.request.use((config) => {
    if (getMockApiConfig().useMockAdapter) {
      config.adapter = mockAdapter;
    }
    return config;
  });

  instance.interceptors.response.use(
    (response) => response,
    (error: unknown) => {
      if (error instanceof ApiError) {
        return Promise.reject(error);
      }
      if (axios.isAxiosError(error)) {
        const status = error.response?.status ?? 0;
        const message =
          (error.response?.data as { message?: string } | undefined)?.message ??
          error.message ??
          "Network request failed";
        return Promise.reject(
          new ApiError(message, {
            status: status || 500,
            code: status === 0 ? "NETWORK_ERROR" : "SERVER_ERROR",
            details: error.response?.data,
            cause: error,
          }),
        );
      }
      return Promise.reject(ApiError.fromUnknown(error));
    },
  );

  return instance;
}

export const axiosClient = createAxiosClient();

/**
 * Typed REST-style API client.
 * In mock mode, requests are served by the in-memory ResourceApi registry.
 */
export const apiClient = {
  raw: axiosClient,

  async get<T>(url: string, config?: AxiosRequestConfig): Promise<T> {
    const response = await axiosClient.get<T>(url, config);
    return response.data;
  },

  async post<T>(url: string, data?: unknown, config?: AxiosRequestConfig): Promise<T> {
    const response = await axiosClient.post<T>(url, data, config);
    return response.data;
  },

  async patch<T>(url: string, data?: unknown, config?: AxiosRequestConfig): Promise<T> {
    const response = await axiosClient.patch<T>(url, data, config);
    return response.data;
  },

  async put<T>(url: string, data?: unknown, config?: AxiosRequestConfig): Promise<T> {
    const response = await axiosClient.put<T>(url, data, config);
    return response.data;
  },

  async delete<T = void>(url: string, config?: AxiosRequestConfig): Promise<T> {
    const response = await axiosClient.delete<T>(url, config);
    return response.data;
  },

  /** Convenience helpers for standard resource REST routes. */
  resources: {
    list<T>(resource: string, params?: ListParams): Promise<PaginatedResult<T>> {
      return apiClient.get<PaginatedResult<T>>(`/${resource}`, {
        params: serializeParams(params),
      });
    },

    getById<T>(resource: string, id: string): Promise<T> {
      return apiClient.get<T>(`/${resource}/${id}`);
    },

    create<T extends { id: string }>(
      resource: string,
      data: CreatePayload<T>,
    ): Promise<T> {
      return apiClient.post<T>(`/${resource}`, data);
    },

    update<T>(resource: string, id: string, data: UpdatePayload<T>): Promise<T> {
      return apiClient.patch<T>(`/${resource}/${id}`, data);
    },

    remove(resource: string, id: string): Promise<void> {
      return apiClient.delete(`/${resource}/${id}`);
    },

    removeMany(resource: string, ids: string[]): Promise<void> {
      return apiClient.post(`/${resource}/bulk-delete`, { ids });
    },
  },
};

export type ApiClient = typeof apiClient;
