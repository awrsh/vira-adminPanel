import type { ListParams, PaginatedResult } from "@/types";

/** Global mock API behavior (latency + optional error simulation). */
export interface MockApiConfig {
  /** Minimum artificial delay in ms. */
  delayMin: number;
  /** Maximum artificial delay in ms. */
  delayMax: number;
  /** Probability (0–1) of throwing a simulated error per request. */
  errorRate: number;
  /** When true, the Axios client routes through the in-memory mock adapter. */
  useMockAdapter: boolean;
}

const defaults: MockApiConfig = {
  delayMin: 400,
  delayMax: 700,
  errorRate: 0,
  useMockAdapter: true,
};

let config: MockApiConfig = { ...defaults };

export function getMockApiConfig(): Readonly<MockApiConfig> {
  return config;
}

export function configureMockApi(partial: Partial<MockApiConfig>): void {
  config = { ...config, ...partial };
}

export function resetMockApiConfig(): void {
  config = { ...defaults };
}

/** Payload shapes used by the typed API client. */
export type CreatePayload<T extends { id: string }> = Omit<T, "id"> &
  Partial<Pick<T, "id">>;

export type UpdatePayload<T> = Partial<T>;

export interface BulkDeletePayload {
  ids: string[];
}

export interface ApiSuccess<T> {
  data: T;
  ok: true;
}

export interface ApiFailure {
  ok: false;
  error: {
    message: string;
    status: number;
    code?: string;
  };
}

export type ApiResult<T> = ApiSuccess<T> | ApiFailure;

export type { ListParams, PaginatedResult };
