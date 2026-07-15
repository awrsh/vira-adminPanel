import type { CreatePayload, UpdatePayload } from "@/lib/api/config";
import type { ListParams, PaginatedResult } from "@/types";

/**
 * Generic repository contract for CRUD resources.
 * Implementations may use the mock HTTP client or a real backend later.
 */
export interface Repository<T extends { id: string }> {
  list: (params?: ListParams) => Promise<PaginatedResult<T>>;
  getById: (id: string) => Promise<T | null>;
  create: (input: CreatePayload<T>) => Promise<T>;
  update: (id: string, patch: UpdatePayload<T>) => Promise<T>;
  remove: (id: string) => Promise<void>;
  removeMany: (ids: string[]) => Promise<void>;
}

export type RepositoryResource =
  | "users"
  | "products"
  | "orders"
  | "companies"
  | "categories"
  | "invoices"
  | "tasks"
  | "messages"
  | "notifications"
  | "payments"
  | "activities"
  | "blog-posts"
  | "comments"
  | "scrum-cards";
