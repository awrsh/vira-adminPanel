"use client";

import { useMemo } from "react";
import { useForm, useWatch } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useTranslations } from "next-intl";
import { toast } from "sonner";
import {
  useCreateUser,
  useUpdateUser,
} from "@/features/users/hooks";
import {
  USER_ROLES,
  USER_STATUSES,
  createUserSchema,
  type UserFormValues,
} from "@/features/users/schemas";
import { useUserValidationMessages } from "@/features/users/use-user-validation";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
} from "@/components/ui/drawer";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Label } from "@/components/ui/label";
import type { Role, User } from "@/types";

interface UserFormDrawerProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  user: User | null;
}

export function UserFormDrawer({
  open,
  onOpenChange,
  user,
}: UserFormDrawerProps) {
  const t = useTranslations();
  const messages = useUserValidationMessages();
  const schema = useMemo(() => createUserSchema(messages), [messages]);
  const createUser = useCreateUser();
  const updateUser = useUpdateUser();
  const editing = Boolean(user);

  const form = useForm<UserFormValues>({
    resolver: zodResolver(schema),
    values: user
      ? {
          name: user.name,
          nameEn: user.nameEn,
          email: user.email,
          phone: user.phone,
          nationalId: user.nationalId,
          city: user.city,
          cityEn: user.cityEn,
          address: user.address,
          role: user.role,
          status: user.status,
        }
      : {
          name: "",
          nameEn: "",
          email: "",
          phone: "",
          nationalId: "",
          city: "",
          cityEn: "",
          address: "",
          role: "customer",
          status: "active",
        },
  });

  async function onSubmit(values: UserFormValues) {
    try {
      if (user) {
        await updateUser.mutateAsync({ id: user.id, patch: values });
      } else {
        await createUser.mutateAsync({
          ...values,
          createdAt: new Date().toISOString(),
        });
      }
      toast.success(t("users.saved"));
      onOpenChange(false);
    } catch {
      toast.error(t("common.errorDescription"));
    }
  }

  const roleValue = useWatch({ control: form.control, name: "role" });
  const statusValue = useWatch({ control: form.control, name: "status" });

  return (
    <Drawer open={open} onOpenChange={onOpenChange}>
      <DrawerContent>
        <DrawerHeader>
          <DrawerTitle>
            {editing ? t("users.editTitle") : t("users.createTitle")}
          </DrawerTitle>
          <DrawerDescription>{t("users.formHint")}</DrawerDescription>
        </DrawerHeader>

        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="flex flex-1 flex-col overflow-hidden"
          noValidate
        >
          <div className="flex-1 space-y-4 overflow-y-auto px-6 pb-4">
            <Input
              floatingLabel={t("users.name")}
              autoComplete="name"
              error={form.formState.errors.name?.message}
              {...form.register("name")}
            />
            <Input
              floatingLabel={t("users.nameEn")}
              error={form.formState.errors.nameEn?.message}
              {...form.register("nameEn")}
            />
            <Input
              floatingLabel={t("users.email")}
              type="email"
              autoComplete="email"
              error={form.formState.errors.email?.message}
              {...form.register("email")}
            />
            <Input
              floatingLabel={t("users.phone")}
              autoComplete="tel"
              error={form.formState.errors.phone?.message}
              {...form.register("phone")}
            />
            <Input
              floatingLabel={t("users.nationalId")}
              error={form.formState.errors.nationalId?.message}
              {...form.register("nationalId")}
            />
            <Input
              floatingLabel={t("users.city")}
              error={form.formState.errors.city?.message}
              {...form.register("city")}
            />
            <Input
              floatingLabel={t("users.cityEn")}
              error={form.formState.errors.cityEn?.message}
              {...form.register("cityEn")}
            />
            <Input
              floatingLabel={t("users.address")}
              error={form.formState.errors.address?.message}
              {...form.register("address")}
            />

            <div className="space-y-2">
              <Label>{t("users.role")}</Label>
              <Select
                value={roleValue}
                onValueChange={(value) =>
                  form.setValue("role", value as Role, {
                    shouldValidate: true,
                    shouldDirty: true,
                  })
                }
              >
                <SelectTrigger aria-invalid={Boolean(form.formState.errors.role)}>
                  <SelectValue placeholder={t("users.role")} />
                </SelectTrigger>
                <SelectContent>
                  {USER_ROLES.map((role) => (
                    <SelectItem key={role} value={role}>
                      {t(`users.roles.${role}`)}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              {form.formState.errors.role?.message ? (
                <p className="text-xs text-destructive">
                  {form.formState.errors.role.message}
                </p>
              ) : null}
            </div>

            <div className="space-y-2">
              <Label>{t("common.status")}</Label>
              <Select
                value={statusValue}
                onValueChange={(value) =>
                  form.setValue("status", value as User["status"], {
                    shouldValidate: true,
                    shouldDirty: true,
                  })
                }
              >
                <SelectTrigger
                  aria-invalid={Boolean(form.formState.errors.status)}
                >
                  <SelectValue placeholder={t("common.status")} />
                </SelectTrigger>
                <SelectContent>
                  {USER_STATUSES.map((status) => (
                    <SelectItem key={status} value={status}>
                      {t(`users.statuses.${status}`)}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              {form.formState.errors.status?.message ? (
                <p className="text-xs text-destructive">
                  {form.formState.errors.status.message}
                </p>
              ) : null}
            </div>
          </div>

          <DrawerFooter>
            <Button
              type="submit"
              loading={createUser.isPending || updateUser.isPending}
            >
              {t("common.save")}
            </Button>
            <DrawerClose asChild>
              <Button type="button" variant="outline">
                {t("common.cancel")}
              </Button>
            </DrawerClose>
          </DrawerFooter>
        </form>
      </DrawerContent>
    </Drawer>
  );
}
