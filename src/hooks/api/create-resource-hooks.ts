"use client";

import {
  useMutation,
  useQuery,
  useQueryClient,
  type MutationFunctionContext,
  type QueryKey,
  type UseMutationOptions,
  type UseQueryOptions,
} from "@tanstack/react-query";
import type { CreatePayload, UpdatePayload } from "@/lib/api/config";
import { ApiError } from "@/lib/api/errors";
import type { ResourceQueryKeys } from "@/lib/query-keys";
import type { ResourceService } from "@/services/create-service";
import type { ListParams, PaginatedResult } from "@/types";

type UpdateVariables<T> = { id: string; patch: UpdatePayload<T> };

interface OptimisticListContext<T> {
  previousLists: Array<[QueryKey, PaginatedResult<T> | undefined]>;
  previousDetail?: [QueryKey, T | undefined];
}

type MutationOpts<TData, TVariables, TContext> = Omit<
  UseMutationOptions<TData, ApiError, TVariables, TContext>,
  "mutationFn"
>;

export interface CreateResourceHooksOptions<T extends { id: string }> {
  keys: ResourceQueryKeys;
  service: ResourceService<T>;
  resourceLabel: string;
  /** Enable optimistic cache updates (default true). */
  optimistic?: boolean;
}

/**
 * Factory for strongly typed list/detail/CRUD hooks wired to TanStack Query.
 * Includes loading/error states via Query/Mutation results and optional optimistic updates.
 */
export function createResourceHooks<T extends { id: string }>(
  options: CreateResourceHooksOptions<T>,
) {
  const { keys, service, resourceLabel, optimistic = true } = options;

  function useList(
    params?: ListParams,
    queryOptions?: Omit<
      UseQueryOptions<PaginatedResult<T>, ApiError>,
      "queryKey" | "queryFn"
    >,
  ) {
    return useQuery<PaginatedResult<T>, ApiError>({
      ...queryOptions,
      queryKey: keys.list(params),
      queryFn: () => service.list(params),
    });
  }

  function useItem(
    id: string,
    queryOptions?: Omit<UseQueryOptions<T, ApiError>, "queryKey" | "queryFn">,
  ) {
    return useQuery<T, ApiError>({
      ...queryOptions,
      queryKey: keys.detail(id),
      queryFn: async () => {
        const item = await service.getById(id);
        if (!item) throw ApiError.notFound(resourceLabel, id);
        return item;
      },
      enabled: Boolean(id) && (queryOptions?.enabled ?? true),
    });
  }

  function useCreate(
    mutationOptions?: MutationOpts<
      T,
      CreatePayload<T>,
      OptimisticListContext<T>
    >,
  ) {
    const queryClient = useQueryClient();

    return useMutation<
      T,
      ApiError,
      CreatePayload<T>,
      OptimisticListContext<T>
    >({
      ...mutationOptions,
      mutationFn: (input) => service.create(input),
      onMutate: async (input, mutationContext) => {
        await mutationOptions?.onMutate?.(input, mutationContext);

        if (!optimistic) {
          return { previousLists: [] };
        }

        await queryClient.cancelQueries({ queryKey: keys.all });
        const previousLists = queryClient.getQueriesData<PaginatedResult<T>>({
          queryKey: keys.lists(),
        });

        const optimisticItem = {
          ...(input as object),
          id: input.id ?? `optimistic-${Date.now()}`,
        } as T;

        queryClient.setQueriesData<PaginatedResult<T>>(
          { queryKey: keys.lists() },
          (current) => {
            if (!current) return current;
            return {
              ...current,
              data: [optimisticItem, ...current.data],
              total: current.total + 1,
            };
          },
        );

        return { previousLists };
      },
      onError: (error, variables, onMutateResult, context) => {
        if (onMutateResult?.previousLists) {
          for (const [key, data] of onMutateResult.previousLists) {
            queryClient.setQueryData(key, data);
          }
        }
        mutationOptions?.onError?.(error, variables, onMutateResult, context);
      },
      onSuccess: (data, variables, onMutateResult, context) => {
        void queryClient.invalidateQueries({ queryKey: keys.all });
        mutationOptions?.onSuccess?.(data, variables, onMutateResult, context);
      },
      onSettled: (data, error, variables, onMutateResult, context) => {
        void queryClient.invalidateQueries({ queryKey: keys.all });
        mutationOptions?.onSettled?.(
          data,
          error,
          variables,
          onMutateResult,
          context,
        );
      },
    });
  }

  function useUpdate(
    mutationOptions?: MutationOpts<
      T,
      UpdateVariables<T>,
      OptimisticListContext<T>
    >,
  ) {
    const queryClient = useQueryClient();

    return useMutation<T, ApiError, UpdateVariables<T>, OptimisticListContext<T>>(
      {
        ...mutationOptions,
        mutationFn: ({ id, patch }) => service.update(id, patch),
        onMutate: async (variables, mutationContext) => {
          await mutationOptions?.onMutate?.(variables, mutationContext);

          if (!optimistic) {
            return { previousLists: [] };
          }

          await queryClient.cancelQueries({ queryKey: keys.all });
          const previousLists = queryClient.getQueriesData<PaginatedResult<T>>({
            queryKey: keys.lists(),
          });
          const detailKey = keys.detail(variables.id);
          const previousDetailData = queryClient.getQueryData<T>(detailKey);

          queryClient.setQueriesData<PaginatedResult<T>>(
            { queryKey: keys.lists() },
            (current) => {
              if (!current) return current;
              return {
                ...current,
                data: current.data.map((item) =>
                  item.id === variables.id
                    ? ({ ...item, ...variables.patch, id: item.id } as T)
                    : item,
                ),
              };
            },
          );

          if (previousDetailData) {
            queryClient.setQueryData<T>(detailKey, {
              ...previousDetailData,
              ...variables.patch,
              id: previousDetailData.id,
            });
          }

          return {
            previousLists,
            previousDetail: [detailKey, previousDetailData] as [
              QueryKey,
              T | undefined,
            ],
          };
        },
        onError: (error, variables, onMutateResult, context) => {
          if (onMutateResult?.previousLists) {
            for (const [key, data] of onMutateResult.previousLists) {
              queryClient.setQueryData(key, data);
            }
          }
          if (onMutateResult?.previousDetail) {
            const [key, data] = onMutateResult.previousDetail;
            queryClient.setQueryData(key, data);
          }
          mutationOptions?.onError?.(error, variables, onMutateResult, context);
        },
        onSuccess: (data, variables, onMutateResult, context) => {
          void queryClient.invalidateQueries({ queryKey: keys.all });
          mutationOptions?.onSuccess?.(data, variables, onMutateResult, context);
        },
        onSettled: (data, error, variables, onMutateResult, context) => {
          void queryClient.invalidateQueries({ queryKey: keys.all });
          mutationOptions?.onSettled?.(
            data,
            error,
            variables,
            onMutateResult,
            context,
          );
        },
      },
    );
  }

  function useRemove(
    mutationOptions?: MutationOpts<void, string, OptimisticListContext<T>>,
  ) {
    const queryClient = useQueryClient();

    return useMutation<void, ApiError, string, OptimisticListContext<T>>({
      ...mutationOptions,
      mutationFn: (id) => service.remove(id),
      onMutate: async (id, mutationContext) => {
        await mutationOptions?.onMutate?.(id, mutationContext);

        if (!optimistic) {
          return { previousLists: [] };
        }

        await queryClient.cancelQueries({ queryKey: keys.all });
        const previousLists = queryClient.getQueriesData<PaginatedResult<T>>({
          queryKey: keys.lists(),
        });
        const detailKey = keys.detail(id);
        const previousDetailData = queryClient.getQueryData<T>(detailKey);

        queryClient.setQueriesData<PaginatedResult<T>>(
          { queryKey: keys.lists() },
          (current) => {
            if (!current) return current;
            return {
              ...current,
              data: current.data.filter((item) => item.id !== id),
              total: Math.max(0, current.total - 1),
            };
          },
        );
        queryClient.removeQueries({ queryKey: detailKey });

        return {
          previousLists,
          previousDetail: [detailKey, previousDetailData] as [
            QueryKey,
            T | undefined,
          ],
        };
      },
      onError: (error, variables, onMutateResult, context) => {
        if (onMutateResult?.previousLists) {
          for (const [key, data] of onMutateResult.previousLists) {
            queryClient.setQueryData(key, data);
          }
        }
        if (onMutateResult?.previousDetail) {
          const [key, data] = onMutateResult.previousDetail;
          queryClient.setQueryData(key, data);
        }
        mutationOptions?.onError?.(error, variables, onMutateResult, context);
      },
      onSuccess: (data, variables, onMutateResult, context) => {
        void queryClient.invalidateQueries({ queryKey: keys.all });
        mutationOptions?.onSuccess?.(data, variables, onMutateResult, context);
      },
      onSettled: (data, error, variables, onMutateResult, context) => {
        void queryClient.invalidateQueries({ queryKey: keys.all });
        mutationOptions?.onSettled?.(
          data,
          error,
          variables,
          onMutateResult,
          context,
        );
      },
    });
  }

  function useRemoveMany(
    mutationOptions?: MutationOpts<void, string[], OptimisticListContext<T>>,
  ) {
    const queryClient = useQueryClient();

    return useMutation<void, ApiError, string[], OptimisticListContext<T>>({
      ...mutationOptions,
      mutationFn: (ids) => service.removeMany(ids),
      onMutate: async (ids, mutationContext) => {
        await mutationOptions?.onMutate?.(ids, mutationContext);

        if (!optimistic) {
          return { previousLists: [] };
        }

        await queryClient.cancelQueries({ queryKey: keys.all });
        const previousLists = queryClient.getQueriesData<PaginatedResult<T>>({
          queryKey: keys.lists(),
        });
        const idSet = new Set(ids);

        queryClient.setQueriesData<PaginatedResult<T>>(
          { queryKey: keys.lists() },
          (current) => {
            if (!current) return current;
            const data = current.data.filter((item) => !idSet.has(item.id));
            return {
              ...current,
              data,
              total: Math.max(
                0,
                current.total - (current.data.length - data.length),
              ),
            };
          },
        );

        for (const id of ids) {
          queryClient.removeQueries({ queryKey: keys.detail(id) });
        }

        return { previousLists };
      },
      onError: (error, variables, onMutateResult, context) => {
        if (onMutateResult?.previousLists) {
          for (const [key, data] of onMutateResult.previousLists) {
            queryClient.setQueryData(key, data);
          }
        }
        mutationOptions?.onError?.(error, variables, onMutateResult, context);
      },
      onSuccess: (data, variables, onMutateResult, context) => {
        void queryClient.invalidateQueries({ queryKey: keys.all });
        mutationOptions?.onSuccess?.(data, variables, onMutateResult, context);
      },
      onSettled: (data, error, variables, onMutateResult, context) => {
        void queryClient.invalidateQueries({ queryKey: keys.all });
        mutationOptions?.onSettled?.(
          data,
          error,
          variables,
          onMutateResult,
          context,
        );
      },
    });
  }

  return {
    useList,
    useItem,
    useCreate,
    useUpdate,
    useRemove,
    useRemoveMany,
  };
}

export type ResourceHooks<T extends { id: string }> = ReturnType<
  typeof createResourceHooks<T>
>;

export type { MutationFunctionContext, OptimisticListContext };
