import { Rocket } from "lucide-react";
import type { ModuleDefinition } from "@/types";

export const onboardingModule: ModuleDefinition = {
  id: "onboarding",
  permissions: ["onboarding:view","onboarding:edit"],
  nav: [
    {
      id: "onboarding",
      href: "/onboarding",
      labelKey: "nav.onboarding",
      icon: Rocket,
      order: 20,
      permissions: ["onboarding:view"],
    },
  ],
  routes: [{ path: "/onboarding", labelKey: "nav.onboarding" }],
  commands: [
    {
      id: "go-onboarding",
      labelKey: "command.goOnboarding",
      href: "/onboarding",
      group: "pages",
      icon: Rocket,
      keywords: ["onboarding"],
      permissions: ["onboarding:view"],
    },
  ],
};
