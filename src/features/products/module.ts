import { Package } from "lucide-react";
import type { ModuleDefinition } from "@/types";

export const productsModule: ModuleDefinition = {
  id: "products",
  permissions: [
    "products:view",
    "products:create",
    "products:edit",
    "products:delete",
  ],
  nav: [
    {
      id: "products",
      href: "/products",
      labelKey: "nav.products",
      icon: Package,
      order: 3,
      permissions: ["products:view"],
    },
  ],
  routes: [{ path: "/products", labelKey: "nav.products" }],
  commands: [
    {
      id: "go-products",
      labelKey: "command.goProducts",
      href: "/products",
      group: "pages",
      icon: Package,
      keywords: ["products", "catalog", "محصولات"],
      permissions: ["products:view"],
    },
    {
      id: "create-product",
      labelKey: "products.add",
      href: "/products?action=create",
      group: "commands",
      icon: Package,
      action: "products:create",
      keywords: ["create", "new product", "محصول جدید"],
      permissions: ["products:create"],
    },
  ],
};
