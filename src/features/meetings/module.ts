import { Video } from "lucide-react";
import type { ModuleDefinition } from "@/types";

export const meetingsModule: ModuleDefinition = {
  id: "meetings",
  permissions: ["meetings:view"],
  nav: [
    {
      id: "meetings",
      href: "/meetings",
      labelKey: "nav.meetings",
      icon: Video,
      order: 21,
      permissions: ["meetings:view"],
    },
  ],
  routes: [{ path: "/meetings", labelKey: "nav.meetings" }],
  commands: [
    {
      id: "go-meetings",
      labelKey: "command.goMeetings",
      href: "/meetings",
      group: "pages",
      icon: Video,
      keywords: ["meetings", "جلسات"],
      permissions: ["meetings:view"],
    },
  ],
};
