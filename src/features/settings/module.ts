import { Settings } from "lucide-react";
import type { ModuleDefinition } from "@/types";

export const settingsModule: ModuleDefinition = {
  id: "settings",
  permissions: ["settings:view", "settings:edit"],
  nav: [
    {
      id: "settings",
      href: "/settings",
      labelKey: "nav.settings",
      icon: Settings,
      order: 50,
      permissions: ["settings:view"],
    },
  ],
  routes: [{ path: "/settings", labelKey: "nav.settings" }],
  commands: [
    {
      id: "go-settings",
      labelKey: "command.goSettings",
      href: "/settings",
      group: "pages",
      icon: Settings,
      keywords: ["settings", "تنظیمات", "preferences"],
      permissions: ["settings:view"],
    },
    {
      id: "toggle-theme",
      labelKey: "command.toggleTheme",
      group: "commands",
      icon: Settings,
      action: "theme:toggle",
      keywords: ["theme", "dark", "light", "تم"],
    },
  ],
};
