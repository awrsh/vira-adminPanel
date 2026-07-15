import { FolderOpen } from "lucide-react";
import type { ModuleDefinition } from "@/types";

export const filesModule: ModuleDefinition = {
  id: "files",
  permissions: ["files:view","files:create","files:edit","files:delete"],
  nav: [
    {
      id: "files",
      href: "/files",
      labelKey: "nav.files",
      icon: FolderOpen,
      order: 11,
      permissions: ["files:view"],
    },
  ],
  routes: [{ path: "/files", labelKey: "nav.files" }],
  commands: [
    {
      id: "go-files",
      labelKey: "command.goFiles",
      href: "/files",
      group: "pages",
      icon: FolderOpen,
      keywords: ["files"],
      permissions: ["files:view"],
    },
  ],
};
