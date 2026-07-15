"use client";

import { useTranslations } from "next-intl";
import { NavMenu } from "@/components/layout/nav-menu";
import {
  Drawer,
  DrawerContent,
  DrawerDescription,
  DrawerHeader,
  DrawerTitle,
} from "@/components/ui/drawer";

export interface MobileNavProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

/**
 * Mobile navigation drawer.
 * Slides from inline-start (right in Persian RTL, left in English LTR).
 */
export function MobileNav({ open, onOpenChange }: MobileNavProps) {
  const t = useTranslations();

  return (
    <Drawer open={open} onOpenChange={onOpenChange}>
      <DrawerContent className="max-w-[18rem]">
        <DrawerHeader className="text-start">
          <DrawerTitle>{t("shell.brand")}</DrawerTitle>
          <DrawerDescription>{t("common.appNameShort")}</DrawerDescription>
        </DrawerHeader>
        <div className="px-4 pb-8">
          <NavMenu onNavigate={() => onOpenChange(false)} />
        </div>
      </DrawerContent>
    </Drawer>
  );
}
