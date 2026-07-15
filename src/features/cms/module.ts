import { Newspaper } from "lucide-react";
import type { ModuleDefinition } from "@/types";

export const cmsModule: ModuleDefinition = {
  id: "cms",
  permissions: ["cms:view","cms:create","cms:edit","cms:delete"],
  nav: [
    {
      id: "cms",
      href: "/cms",
      labelKey: "nav.cms",
      icon: Newspaper,
      order: 18,
      permissions: ["cms:view"],
    },
  ],
  routes: [{ path: "/cms", labelKey: "nav.cms" }],
  commands: [
    {
      id: "go-cms",
      labelKey: "command.goCms",
      href: "/cms",
      group: "pages",
      icon: Newspaper,
      keywords: ["cms"],
      permissions: ["cms:view"],
    },
  ],
};
