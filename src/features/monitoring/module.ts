import { Activity } from "lucide-react";
import type { ModuleDefinition } from "@/types";

export const monitoringModule: ModuleDefinition = {
  id: "monitoring",
  permissions: ["monitoring:view"],
  nav: [
    {
      id: "monitoring",
      href: "/monitoring",
      labelKey: "nav.monitoring",
      icon: Activity,
      order: 20,
      permissions: ["monitoring:view"],
    },
  ],
  routes: [{ path: "/monitoring", labelKey: "nav.monitoring" }],
  commands: [
    {
      id: "go-monitoring",
      labelKey: "command.goMonitoring",
      href: "/monitoring",
      group: "pages",
      icon: Activity,
      keywords: ["monitoring", "مانیتورینگ"],
      permissions: ["monitoring:view"],
    },
  ],
};
