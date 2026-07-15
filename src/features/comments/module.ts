import { MessagesSquare } from "lucide-react";
import type { ModuleDefinition } from "@/types";

export const commentsModule: ModuleDefinition = {
  id: "comments",
  permissions: [
    "comments:view",
    "comments:create",
    "comments:edit",
    "comments:delete",
  ],
  nav: [
    {
      id: "comments",
      href: "/comments",
      labelKey: "nav.comments",
      icon: MessagesSquare,
      order: 16,
      permissions: ["comments:view"],
    },
  ],
  routes: [{ path: "/comments", labelKey: "nav.comments" }],
  commands: [
    {
      id: "go-comments",
      labelKey: "command.goComments",
      href: "/comments",
      group: "pages",
      icon: MessagesSquare,
      keywords: ["comments", "reviews", "testimonials", "کامنت", "نظر"],
      permissions: ["comments:view"],
    },
  ],
};
