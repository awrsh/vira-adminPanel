import { CalendarDays } from "lucide-react";
import type { ModuleDefinition } from "@/types";

export const calendarModule: ModuleDefinition = {
  id: "calendar",
  permissions: ["calendar:view","calendar:create","calendar:edit","calendar:delete"],
  nav: [
    {
      id: "calendar",
      href: "/calendar",
      labelKey: "nav.calendar",
      icon: CalendarDays,
      order: 13,
      permissions: ["calendar:view"],
    },
  ],
  routes: [{ path: "/calendar", labelKey: "nav.calendar" }],
  commands: [
    {
      id: "go-calendar",
      labelKey: "command.goCalendar",
      href: "/calendar",
      group: "pages",
      icon: CalendarDays,
      keywords: ["calendar"],
      permissions: ["calendar:view"],
    },
  ],
};
