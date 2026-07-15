export type ApiErrorCode =
  | "NETWORK_ERROR"
  | "NOT_FOUND"
  | "VALIDATION_ERROR"
  | "UNAUTHORIZED"
  | "FORBIDDEN"
  | "CONFLICT"
  | "SERVER_ERROR"
  | "SIMULATED_ERROR"
  | "UNKNOWN";

export class ApiError extends Error {
  readonly status: number;
  readonly code: ApiErrorCode;
  readonly details?: unknown;

  constructor(
    message: string,
    options?: {
      status?: number;
      code?: ApiErrorCode;
      details?: unknown;
      cause?: unknown;
    },
  ) {
    super(message, options?.cause ? { cause: options.cause } : undefined);
    this.name = "ApiError";
    this.status = options?.status ?? 500;
    this.code = options?.code ?? "UNKNOWN";
    this.details = options?.details;
  }

  static fromUnknown(error: unknown, fallback = "Request failed"): ApiError {
    if (error instanceof ApiError) return error;
    if (error instanceof Error) {
      return new ApiError(error.message || fallback, {
        status: 500,
        code: "SERVER_ERROR",
        cause: error,
      });
    }
    return new ApiError(fallback, { status: 500, code: "UNKNOWN", details: error });
  }

  static notFound(resource: string, id?: string): ApiError {
    const suffix = id ? `: ${id}` : "";
    return new ApiError(`${resource} not found${suffix}`, {
      status: 404,
      code: "NOT_FOUND",
    });
  }
}

/** @deprecated Prefer ApiError — kept for existing service wrappers. */
export { ApiError as HttpError };
