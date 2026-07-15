import { Contact } from "lucide-react";
import type { ModuleDefinition } from "@/types";

export const crmModule: ModuleDefinition = {
  id: "crm",
  permissions: ["crm:view","crm:create","crm:edit","crm:delete"],
  nav: [
    {
      id: "crm",
      href: "/crm",
      labelKey: "nav.crm",
      icon: Contact,
      order: 12,
      permissions: ["crm:view"],
    },
  ],
  routes: [{ path: "/crm", labelKey: "nav.crm" }],
  commands: [
    {
      id: "go-crm",
      labelKey: "command.goCrm",
      href: "/crm",
      group: "pages",
      icon: Contact,
      keywords: ["crm"],
      permissions: ["crm:view"],
    },
  ],
};
