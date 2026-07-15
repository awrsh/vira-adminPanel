import { FileBarChart } from "lucide-react";
import type { ModuleDefinition } from "@/types";

export const reportsModule: ModuleDefinition = {
  id: "reports",
  permissions: ["reports:view","reports:create","reports:edit","reports:delete"],
  nav: [
    {
      id: "reports",
      href: "/reports",
      labelKey: "nav.reports",
      icon: FileBarChart,
      order: 6,
      permissions: ["reports:view"],
    },
  ],
  routes: [{ path: "/reports", labelKey: "nav.reports" }],
  commands: [
    {
      id: "go-reports",
      labelKey: "command.goReports",
      href: "/reports",
      group: "pages",
      icon: FileBarChart,
      keywords: ["reports"],
      permissions: ["reports:view"],
    },
  ],
};
