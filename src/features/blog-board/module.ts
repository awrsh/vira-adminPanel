import { LayoutGrid } from "lucide-react";
import type { ModuleDefinition } from "@/types";

export const blogBoardModule: ModuleDefinition = {
  id: "blog-board",
  permissions: ["blog-board:view"],
  nav: [
    {
      id: "blog-board",
      href: "/blog-board",
      labelKey: "nav.blogBoard",
      icon: LayoutGrid,
      order: 19,
      permissions: ["blog-board:view"],
    },
  ],
  routes: [{ path: "/blog-board", labelKey: "nav.blogBoard" }],
  commands: [
    {
      id: "go-blog-board",
      labelKey: "command.goBlogBoard",
      href: "/blog-board",
      group: "pages",
      icon: LayoutGrid,
      keywords: ["blog", "board", "بورد"],
      permissions: ["blog-board:view"],
    },
  ],
};
