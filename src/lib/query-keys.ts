import type { ListParams } from "@/types";

function resourceKeys(name: string) {
  const all = [name] as const;
  return {
    all,
    lists: () => [...all, "list"] as const,
    list: (params?: ListParams) => [...all, "list", params ?? {}] as const,
    details: () => [...all, "detail"] as const,
    detail: (id: string) => [...all, "detail", id] as const,
  };
}

export const queryKeys = {
  users: resourceKeys("users"),
  products: resourceKeys("products"),
  orders: resourceKeys("orders"),
  companies: resourceKeys("companies"),
  categories: resourceKeys("categories"),
  invoices: resourceKeys("invoices"),
  tasks: resourceKeys("tasks"),
  messages: resourceKeys("messages"),
  notifications: resourceKeys("notifications"),
  payments: resourceKeys("payments"),
  activities: resourceKeys("activities"),
  blogPosts: resourceKeys("blog-posts"),
  comments: resourceKeys("comments"),
  scrumCards: resourceKeys("scrum-cards"),
  dashboard: {
    all: ["dashboard"] as const,
    overview: () => [...queryKeys.dashboard.all, "overview"] as const,
  },
  auth: {
    all: ["auth"] as const,
    me: () => [...queryKeys.auth.all, "me"] as const,
  },
} as const;

export type QueryKeyFactory = typeof queryKeys;
export type ResourceQueryKeys = ReturnType<typeof resourceKeys>;
