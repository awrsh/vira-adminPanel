import { Contact } from "lucide-react";
import type { ModuleDefinition } from "@/types";

export const contactsModule: ModuleDefinition = {
  id: "contacts",
  permissions: ["contacts:view"],
  nav: [
    {
      id: "contacts",
      href: "/contacts",
      labelKey: "nav.contacts",
      icon: Contact,
      order: 23,
      permissions: ["contacts:view"],
    },
  ],
  routes: [{ path: "/contacts", labelKey: "nav.contacts" }],
  commands: [
    {
      id: "go-contacts",
      labelKey: "command.goContacts",
      href: "/contacts",
      group: "pages",
      icon: Contact,
      keywords: ["contacts", "مخاطب"],
      permissions: ["contacts:view"],
    },
  ],
  widgets: [
    {
      id: "contacts",
      component: "ContactsWidget",
      colSpan: 4,
      rowSpan: 1,
      order: 20,
      permissions: ["contacts:view"],
    },
  ],
};
