import { ApiError } from "@/lib/api/errors";
import type { CreatePayload, UpdatePayload } from "@/lib/api/config";
import type { Repository } from "@/repositories/types";
import type { ListParams } from "@/types";

/**
 * Service layer: thin, typed facade over a repository.
 * Keeps feature code free of data-access details and normalizes errors.
 */
export function createResourceService<T extends { id: string }>(
  repository: Repository<T>,
) {
  return {
    list: (params?: ListParams) => run(() => repository.list(params)),
    getById: (id: string) => run(() => repository.getById(id)),
    create: (input: CreatePayload<T>) => run(() => repository.create(input)),
    update: (id: string, patch: UpdatePayload<T>) =>
      run(() => repository.update(id, patch)),
    remove: (id: string) => run(() => repository.remove(id)),
    removeMany: (ids: string[]) => run(() => repository.removeMany(ids)),
  };
}

export type ResourceService<T extends { id: string }> = ReturnType<
  typeof createResourceService<T>
>;

async function run<T>(factory: () => Promise<T>): Promise<T> {
  try {
    return await factory();
  } catch (error) {
    throw ApiError.fromUnknown(error);
  }
}
