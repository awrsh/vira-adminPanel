import { CalendarClock } from "lucide-react";
import type { ModuleDefinition } from "@/types";

export const appointmentsModule: ModuleDefinition = {
  id: "appointments",
  permissions: ["appointments:view"],
  nav: [
    {
      id: "appointments",
      href: "/appointments",
      labelKey: "nav.appointments",
      icon: CalendarClock,
      order: 22,
      permissions: ["appointments:view"],
    },
  ],
  routes: [{ path: "/appointments", labelKey: "nav.appointments" }],
  commands: [
    {
      id: "go-appointments",
      labelKey: "command.goAppointments",
      href: "/appointments",
      group: "pages",
      icon: CalendarClock,
      keywords: ["appointments", "نوبت"],
      permissions: ["appointments:view"],
    },
  ],
};
