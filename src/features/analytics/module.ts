import { BarChart3 } from "lucide-react";
import type { ModuleDefinition } from "@/types";

export const analyticsModule: ModuleDefinition = {
  id: "analytics",
  permissions: ["analytics:view"],
  nav: [
    {
      id: "analytics",
      href: "/analytics",
      labelKey: "nav.analytics",
      icon: BarChart3,
      order: 5,
      permissions: ["analytics:view"],
    },
  ],
  routes: [{ path: "/analytics", labelKey: "nav.analytics" }],
  commands: [
    {
      id: "go-analytics",
      labelKey: "command.goAnalytics",
      href: "/analytics",
      group: "pages",
      icon: BarChart3,
      keywords: ["analytics"],
      permissions: ["analytics:view"],
    },
  ],
};
