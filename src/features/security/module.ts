import { ShieldCheck } from "lucide-react";
import type { ModuleDefinition } from "@/types";

export const securityModule: ModuleDefinition = {
  id: "security",
  permissions: ["security:view","security:edit"],
  nav: [
    {
      id: "security",
      href: "/security",
      labelKey: "nav.security",
      icon: ShieldCheck,
      order: 19,
      permissions: ["security:view"],
    },
  ],
  routes: [{ path: "/security", labelKey: "nav.security" }],
  commands: [
    {
      id: "go-security",
      labelKey: "command.goSecurity",
      href: "/security",
      group: "pages",
      icon: ShieldCheck,
      keywords: ["security"],
      permissions: ["security:view"],
    },
  ],
};
