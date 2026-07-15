import { Newspaper } from "lucide-react";
import type { ModuleDefinition } from "@/types";

export const blogModule: ModuleDefinition = {
  id: "blog",
  permissions: ["blog:view", "blog:create", "blog:edit", "blog:delete"],
  nav: [
    {
      id: "blog",
      href: "/blog",
      labelKey: "nav.blog",
      icon: Newspaper,
      order: 17,
      permissions: ["blog:view"],
    },
  ],
  routes: [{ path: "/blog", labelKey: "nav.blog" }],
  commands: [
    {
      id: "go-blog",
      labelKey: "command.goBlog",
      href: "/blog",
      group: "pages",
      icon: Newspaper,
      keywords: ["blog", "posts", "articles", "بلاگ", "مقاله"],
      permissions: ["blog:view"],
    },
  ],
};
