export { ordersModule } from "@/features/orders/module";
export {
  useOrders,
  useOrder,
  useCreateOrder,
  useUpdateOrder,
  useDeleteOrder,
  useDeleteOrders,
} from "@/features/orders/hooks";
export { OrdersPageView } from "@/features/orders/orders-page";
export { OrderFormDrawer } from "@/features/orders/order-form-drawer";
export { OrderDetailsDrawer } from "@/features/orders/order-details-drawer";
export {
  createOrderSchema,
  ORDER_STATUSES,
  PAYMENT_STATUSES,
  type OrderFormValues,
} from "@/features/orders/schemas";
