import { Kanban } from "lucide-react";
import type { ModuleDefinition } from "@/types";

export const tasksModule: ModuleDefinition = {
  id: "tasks",
  permissions: ["tasks:view","tasks:create","tasks:edit","tasks:delete"],
  nav: [
    {
      id: "tasks",
      href: "/tasks",
      labelKey: "nav.tasks",
      icon: Kanban,
      order: 14,
      permissions: ["tasks:view"],
    },
  ],
  routes: [{ path: "/tasks", labelKey: "nav.tasks" }],
  commands: [
    {
      id: "go-tasks",
      labelKey: "command.goTasks",
      href: "/tasks",
      group: "pages",
      icon: Kanban,
      keywords: ["tasks"],
      permissions: ["tasks:view"],
    },
  ],
};
