import { Code2 } from "lucide-react";
import type { ModuleDefinition } from "@/types";

export const developersModule: ModuleDefinition = {
  id: "developers",
  permissions: ["developers:view","developers:edit"],
  nav: [
    {
      id: "developers",
      href: "/developers",
      labelKey: "nav.developers",
      icon: Code2,
      order: 17,
      permissions: ["developers:view"],
    },
  ],
  routes: [{ path: "/developers", labelKey: "nav.developers" }],
  commands: [
    {
      id: "go-developers",
      labelKey: "command.goDevelopers",
      href: "/developers",
      group: "pages",
      icon: Code2,
      keywords: ["developers"],
      permissions: ["developers:view"],
    },
  ],
};
