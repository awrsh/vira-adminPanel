import { Sparkles } from "lucide-react";
import type { ModuleDefinition } from "@/types";

export const aiModule: ModuleDefinition = {
  id: "ai",
  permissions: ["ai:view"],
  nav: [
    {
      id: "ai",
      href: "/ai",
      labelKey: "nav.ai",
      icon: Sparkles,
      order: 16,
      permissions: ["ai:view"],
    },
  ],
  routes: [{ path: "/ai", labelKey: "nav.ai" }],
  commands: [
    {
      id: "go-ai",
      labelKey: "command.goAi",
      href: "/ai",
      group: "pages",
      icon: Sparkles,
      keywords: ["ai"],
      permissions: ["ai:view"],
    },
  ],
};
