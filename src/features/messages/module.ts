import { MessageSquare } from "lucide-react";
import type { ModuleDefinition } from "@/types";

export const messagesModule: ModuleDefinition = {
  id: "messages",
  permissions: ["messages:view","messages:create","messages:edit","messages:delete"],
  nav: [
    {
      id: "messages",
      href: "/messages",
      labelKey: "nav.messages",
      icon: MessageSquare,
      order: 15,
      permissions: ["messages:view"],
    },
  ],
  routes: [{ path: "/messages", labelKey: "nav.messages" }],
  commands: [
    {
      id: "go-messages",
      labelKey: "command.goMessages",
      href: "/messages",
      group: "pages",
      icon: MessageSquare,
      keywords: ["messages"],
      permissions: ["messages:view"],
    },
  ],
};
