import { Sparkles } from "lucide-react";
import type { ModuleDefinition } from "@/types";

export const influencersModule: ModuleDefinition = {
  id: "influencers",
  permissions: ["influencers:view"],
  nav: [
    {
      id: "influencers",
      href: "/influencers",
      labelKey: "nav.influencers",
      icon: Sparkles,
      order: 18,
      permissions: ["influencers:view"],
    },
  ],
  routes: [{ path: "/influencers", labelKey: "nav.influencers" }],
  commands: [
    {
      id: "go-influencers",
      labelKey: "command.goInfluencers",
      href: "/influencers",
      group: "pages",
      icon: Sparkles,
      keywords: ["influencers", "اینفلوئنسر"],
      permissions: ["influencers:view"],
    },
  ],
};
