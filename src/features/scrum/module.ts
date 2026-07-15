import { Columns3 } from "lucide-react";
import type { ModuleDefinition } from "@/types";

export const scrumModule: ModuleDefinition = {
  id: "scrum",
  permissions: [
    "scrum:view",
    "scrum:create",
    "scrum:edit",
    "scrum:delete",
  ],
  nav: [
    {
      id: "scrum",
      href: "/scrum",
      labelKey: "nav.scrum",
      icon: Columns3,
      order: 15,
      permissions: ["scrum:view"],
    },
  ],
  routes: [{ path: "/scrum", labelKey: "nav.scrum" }],
  commands: [
    {
      id: "go-scrum",
      labelKey: "command.goScrum",
      href: "/scrum",
      group: "pages",
      icon: Columns3,
      keywords: ["scrum", "kanban", "board", "drag", "اسکرام", "بورد"],
      permissions: ["scrum:view"],
    },
  ],
};
