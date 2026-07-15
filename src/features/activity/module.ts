import { Activity } from "lucide-react";
import type { ModuleDefinition } from "@/types";

export const activityModule: ModuleDefinition = {
  id: "activity",
  permissions: ["activity:view"],
  nav: [
    {
      id: "activity",
      href: "/activity",
      labelKey: "nav.activity",
      icon: Activity,
      order: 10,
      permissions: ["activity:view"],
    },
  ],
  routes: [{ path: "/activity", labelKey: "nav.activity" }],
  commands: [
    {
      id: "go-activity",
      labelKey: "command.goActivity",
      href: "/activity",
      group: "pages",
      icon: Activity,
      keywords: ["activity"],
      permissions: ["activity:view"],
    },
  ],
};
