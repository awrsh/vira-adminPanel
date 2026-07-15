import { ApiError } from "@/lib/api/errors";

/**
 * Thin HTTP-style wrapper — prefer ApiError from @/lib/api.
 * Kept for backward compatibility with older imports.
 */
export { ApiError as HttpError, ApiError };

export async function http<T>(factory: () => Promise<T>): Promise<T> {
  try {
    return await factory();
  } catch (error) {
    throw ApiError.fromUnknown(error);
  }
}
