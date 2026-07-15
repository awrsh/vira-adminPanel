import { CreditCard } from "lucide-react";
import type { ModuleDefinition } from "@/types";

export const billingModule: ModuleDefinition = {
  id: "billing",
  permissions: ["billing:view","billing:edit"],
  nav: [
    {
      id: "billing",
      href: "/billing",
      labelKey: "nav.billing",
      icon: CreditCard,
      order: 8,
      permissions: ["billing:view"],
    },
  ],
  routes: [{ path: "/billing", labelKey: "nav.billing" }],
  commands: [
    {
      id: "go-billing",
      labelKey: "command.goBilling",
      href: "/billing",
      group: "pages",
      icon: CreditCard,
      keywords: ["billing"],
      permissions: ["billing:view"],
    },
  ],
};
