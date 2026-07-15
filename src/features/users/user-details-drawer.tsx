"use client";

import { useLocale, useTranslations } from "next-intl";
import { Pencil, Trash2 } from "lucide-react";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
} from "@/components/ui/drawer";
import { Separator } from "@/components/ui/separator";
import { formatDate } from "@/utils";
import type { User } from "@/types";

interface UserDetailsDrawerProps {
  user: User | null;
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onEdit?: (user: User) => void;
  onDelete?: (user: User) => void;
  canEdit?: boolean;
  canDelete?: boolean;
}

function DetailRow({ label, value }: { label: string; value: React.ReactNode }) {
  return (
    <div className="flex items-start justify-between gap-4 py-2.5">
      <dt className="shrink-0 text-sm text-muted-foreground">{label}</dt>
      <dd className="min-w-0 text-end text-sm font-medium text-foreground">
        {value}
      </dd>
    </div>
  );
}

export function UserDetailsDrawer({
  user,
  open,
  onOpenChange,
  onEdit,
  onDelete,
  canEdit = true,
  canDelete = true,
}: UserDetailsDrawerProps) {
  const t = useTranslations();
  const locale = useLocale();

  if (!user) {
    return (
      <Drawer open={open} onOpenChange={onOpenChange}>
        <DrawerContent className="sm:max-w-md" />
      </Drawer>
    );
  }

  const displayName = locale === "fa" ? user.name : user.nameEn;
  const displayCity = locale === "fa" ? user.city : user.cityEn;

  return (
    <Drawer open={open} onOpenChange={onOpenChange}>
      <DrawerContent className="sm:max-w-md">
        <DrawerHeader>
          <div className="flex items-center gap-3">
            <Avatar className="size-12">
              <AvatarFallback className="text-base">
                {displayName.slice(0, 2)}
              </AvatarFallback>
            </Avatar>
            <div className="min-w-0 text-start">
              <DrawerTitle className="truncate">{displayName}</DrawerTitle>
              <DrawerDescription className="truncate">
                {user.email}
              </DrawerDescription>
            </div>
          </div>
        </DrawerHeader>

        <div className="flex-1 overflow-y-auto px-6 pb-2">
          <div className="mb-4 flex flex-wrap gap-2">
            <Badge variant="secondary">{t(`users.roles.${user.role}`)}</Badge>
            <Badge
              variant={
                user.status === "active"
                  ? "success"
                  : user.status === "pending"
                    ? "warning"
                    : "outline"
              }
            >
              {t(`users.statuses.${user.status}`)}
            </Badge>
          </div>

          <Separator className="mb-2" />

          <dl>
            <DetailRow label={t("users.phone")} value={user.phone} />
            <DetailRow
              label={t("users.nationalId")}
              value={user.nationalId}
            />
            <DetailRow label={t("users.city")} value={displayCity} />
            <DetailRow label={t("users.address")} value={user.address} />
            <DetailRow
              label={t("users.createdAt")}
              value={formatDate(
                user.createdAt,
                locale === "fa" ? "fa-IR" : "en-US",
              )}
            />
            <DetailRow
              label={t("users.lastLogin")}
              value={
                user.lastLoginAt
                  ? formatDate(
                      user.lastLoginAt,
                      locale === "fa" ? "fa-IR" : "en-US",
                    )
                  : t("users.neverLoggedIn")
              }
            />
          </dl>
        </div>

        <DrawerFooter>
          {canEdit && onEdit ? (
            <Button type="button" onClick={() => onEdit(user)}>
              <Pencil className="size-4" />
              {t("common.edit")}
            </Button>
          ) : null}
          {canDelete && onDelete ? (
            <Button
              type="button"
              variant="destructive"
              onClick={() => onDelete(user)}
            >
              <Trash2 className="size-4" />
              {t("common.delete")}
            </Button>
          ) : null}
          <DrawerClose asChild>
            <Button type="button" variant="outline">
              {t("common.close")}
            </Button>
          </DrawerClose>
        </DrawerFooter>
      </DrawerContent>
    </Drawer>
  );
}
