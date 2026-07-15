import { Users } from "lucide-react";
import type { ModuleDefinition } from "@/types";

export const usersModule: ModuleDefinition = {
  id: "users",
  permissions: ["users:view", "users:create", "users:edit", "users:delete"],
  nav: [
    {
      id: "users",
      href: "/users",
      labelKey: "nav.users",
      icon: Users,
      order: 2,
      permissions: ["users:view"],
    },
  ],
  routes: [{ path: "/users", labelKey: "nav.users" }],
  commands: [
    {
      id: "go-users",
      labelKey: "command.goUsers",
      href: "/users",
      group: "pages",
      icon: Users,
      keywords: ["users", "کاربران", "team"],
      permissions: ["users:view"],
    },
    {
      id: "create-user",
      labelKey: "users.add",
      href: "/users?action=create",
      group: "commands",
      icon: Users,
      action: "users:create",
      keywords: ["create", "new user", "کاربر جدید"],
      permissions: ["users:create"],
    },
  ],
};
