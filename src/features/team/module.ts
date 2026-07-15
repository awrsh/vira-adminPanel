import { UsersRound } from "lucide-react";
import type { ModuleDefinition } from "@/types";

export const teamModule: ModuleDefinition = {
  id: "team",
  permissions: ["team:view","team:create","team:edit","team:delete"],
  nav: [
    {
      id: "team",
      href: "/team",
      labelKey: "nav.team",
      icon: UsersRound,
      order: 7,
      permissions: ["team:view"],
    },
  ],
  routes: [{ path: "/team", labelKey: "nav.team" }],
  commands: [
    {
      id: "go-team",
      labelKey: "command.goTeam",
      href: "/team",
      group: "pages",
      icon: UsersRound,
      keywords: ["team"],
      permissions: ["team:view"],
    },
  ],
};
