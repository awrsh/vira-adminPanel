import { ShoppingCart } from "lucide-react";
import type { ModuleDefinition } from "@/types";

export const ordersModule: ModuleDefinition = {
  id: "orders",
  permissions: ["orders:view", "orders:create", "orders:edit", "orders:delete"],
  nav: [
    {
      id: "orders",
      href: "/orders",
      labelKey: "nav.orders",
      icon: ShoppingCart,
      order: 4,
      permissions: ["orders:view"],
    },
  ],
  routes: [{ path: "/orders", labelKey: "nav.orders" }],
  commands: [
    {
      id: "go-orders",
      labelKey: "command.goOrders",
      href: "/orders",
      group: "pages",
      icon: ShoppingCart,
      keywords: ["orders", "سفارش", "sales"],
      permissions: ["orders:view"],
    },
    {
      id: "create-order",
      labelKey: "orders.add",
      href: "/orders?action=create",
      group: "commands",
      icon: ShoppingCart,
      action: "orders:create",
      keywords: ["create", "new order", "سفارش جدید"],
      permissions: ["orders:create"],
    },
  ],
};
