import type { ListParams, PaginatedResult } from "@/types";
import { ApiError } from "@/lib/api/errors";
import { delay, maybeThrow } from "@/mocks/api/delay";

export interface CreateResourceApiOptions<T extends { id: string }> {
  getAll: () => T[];
  setAll: (items: T[]) => void;
  searchKeys?: (keyof T)[];
  defaultSort?: string;
  /** Optional error simulation rate (0–1). Default off. */
  errorRate?: number;
}

export interface ResourceApi<T extends { id: string }> {
  list: (params?: ListParams) => Promise<PaginatedResult<T>>;
  getById: (id: string) => Promise<T | null>;
  create: (input: Omit<T, "id"> & { id?: string }) => Promise<T>;
  update: (id: string, patch: Partial<T>) => Promise<T>;
  remove: (id: string) => Promise<void>;
  removeMany: (ids: string[]) => Promise<void>;
}

function toComparable(value: unknown): string | number | boolean {
  if (typeof value === "number" || typeof value === "boolean") {
    return value;
  }
  if (value == null) {
    return "";
  }
  return String(value);
}

function matchesSearch<T extends object>(
  item: T,
  search: string,
  keys: (keyof T)[],
): boolean {
  const query = search.trim().toLowerCase();
  if (!query) return true;
  return keys.some((key) => {
    const value = item[key];
    if (value == null) return false;
    return String(value).toLowerCase().includes(query);
  });
}

function matchesFilters<T extends object>(
  item: T,
  filters: Record<string, string | number | boolean | undefined> | undefined,
): boolean {
  if (!filters) return true;
  return Object.entries(filters).every(([key, expected]) => {
    if (expected === undefined) return true;
    const actual = (item as Record<string, unknown>)[key];
    return String(actual) === String(expected);
  });
}

function sortItems<T extends object>(
  items: T[],
  sortBy: string | undefined,
  sortOrder: "asc" | "desc" | undefined,
): T[] {
  if (!sortBy) return items;
  const order = sortOrder === "desc" ? -1 : 1;
  return [...items].sort((a, b) => {
    const aVal = toComparable((a as Record<string, unknown>)[sortBy]);
    const bVal = toComparable((b as Record<string, unknown>)[sortBy]);
    if (aVal < bVal) return -1 * order;
    if (aVal > bVal) return 1 * order;
    return 0;
  });
}

function generateId(): string {
  return `id-${Date.now().toString(36)}-${Math.floor(Math.random() * 1e6)}`;
}

export function createResourceApi<T extends { id: string }>(
  options: CreateResourceApiOptions<T>,
): ResourceApi<T> {
  const {
    getAll,
    setAll,
    searchKeys = [],
    defaultSort,
    errorRate = 0,
  } = options;

  return {
    async list(params: ListParams = {}): Promise<PaginatedResult<T>> {
      await delay();
      await maybeThrow(errorRate);

      const page = Math.max(1, params.page ?? 1);
      const pageSize = Math.max(1, params.pageSize ?? 10);
      const sortBy = params.sortBy ?? defaultSort;

      let items = getAll();

      if (params.search && searchKeys.length > 0) {
        items = items.filter((item) =>
          matchesSearch(item, params.search ?? "", searchKeys),
        );
      }

      items = items.filter((item) => matchesFilters(item, params.filters));
      items = sortItems(items, sortBy, params.sortOrder);

      const total = items.length;
      const totalPages = Math.max(1, Math.ceil(total / pageSize));
      const start = (page - 1) * pageSize;
      const data = items.slice(start, start + pageSize);

      return { data, total, page, pageSize, totalPages };
    },

    async getById(id: string): Promise<T | null> {
      await delay();
      await maybeThrow(errorRate);
      return getAll().find((item) => item.id === id) ?? null;
    },

    async create(input: Omit<T, "id"> & { id?: string }): Promise<T> {
      await delay();
      await maybeThrow(errorRate);
      const item = {
        ...input,
        id: input.id ?? generateId(),
      } as T;
      setAll([item, ...getAll()]);
      return item;
    },

    async update(id: string, patch: Partial<T>): Promise<T> {
      await delay();
      await maybeThrow(errorRate);
      const items = getAll();
      const index = items.findIndex((item) => item.id === id);
      if (index < 0) {
        throw ApiError.notFound("Resource", id);
      }
      const current = items[index];
      if (!current) {
        throw ApiError.notFound("Resource", id);
      }
      const updated = { ...current, ...patch, id } as T;
      const next = [...items];
      next[index] = updated;
      setAll(next);
      return updated;
    },

    async remove(id: string): Promise<void> {
      await delay();
      await maybeThrow(errorRate);
      setAll(getAll().filter((item) => item.id !== id));
    },

    async removeMany(ids: string[]): Promise<void> {
      await delay();
      await maybeThrow(errorRate);
      const idSet = new Set(ids);
      setAll(getAll().filter((item) => !idSet.has(item.id)));
    },
  };
}
