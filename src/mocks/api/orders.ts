import type { Order } from "@/types";
import { createResourceApi } from "@/mocks/api/create-resource-api";
import { getState, setOrders } from "@/mocks/db/store";

export const ordersApi = createResourceApi<Order>({
  getAll: () => getState().orders,
  setAll: setOrders,
  searchKeys: [
    "orderNumber",
    "customerName",
    "customerNameEn",
    "customerEmail",
    "city",
    "cityEn",
  ],
  defaultSort: "createdAt",
});
