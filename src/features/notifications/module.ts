import { Bell } from "lucide-react";
import type { ModuleDefinition } from "@/types";

export const notificationsModule: ModuleDefinition = {
  id: "notifications",
  permissions: ["notifications:view","notifications:edit"],
  nav: [
    {
      id: "notifications",
      href: "/notifications",
      labelKey: "nav.notifications",
      icon: Bell,
      order: 9,
      permissions: ["notifications:view"],
    },
  ],
  routes: [{ path: "/notifications", labelKey: "nav.notifications" }],
  commands: [
    {
      id: "go-notifications",
      labelKey: "command.goNotifications",
      href: "/notifications",
      group: "pages",
      icon: Bell,
      keywords: ["notifications"],
      permissions: ["notifications:view"],
    },
  ],
};
