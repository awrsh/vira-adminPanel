import { z } from "zod";
import type { Role, User } from "@/types";

export const USER_ROLES: readonly Role[] = [
  "admin",
  "manager",
  "editor",
  "support",
  "customer",
] as const;

export const USER_STATUSES: readonly User["status"][] = [
  "active",
  "inactive",
  "pending",
] as const;

export interface UserValidationMessages {
  nameRequired: string;
  nameMin: string;
  nameEnRequired: string;
  emailRequired: string;
  emailInvalid: string;
  phoneRequired: string;
  phoneMin: string;
  nationalIdRequired: string;
  nationalIdMin: string;
  cityRequired: string;
  cityEnRequired: string;
  addressRequired: string;
  roleRequired: string;
  statusRequired: string;
}

export function createUserSchema(messages: UserValidationMessages) {
  return z.object({
    name: z.string().min(1, messages.nameRequired).min(2, messages.nameMin),
    nameEn: z
      .string()
      .min(1, messages.nameEnRequired)
      .min(2, messages.nameMin),
    email: z
      .string()
      .min(1, messages.emailRequired)
      .email(messages.emailInvalid),
    phone: z
      .string()
      .min(1, messages.phoneRequired)
      .min(8, messages.phoneMin),
    nationalId: z
      .string()
      .min(1, messages.nationalIdRequired)
      .min(8, messages.nationalIdMin),
    city: z.string().min(1, messages.cityRequired).min(2, messages.cityRequired),
    cityEn: z
      .string()
      .min(1, messages.cityEnRequired)
      .min(2, messages.cityEnRequired),
    address: z
      .string()
      .min(1, messages.addressRequired)
      .min(2, messages.addressRequired),
    role: z.enum(["admin", "manager", "editor", "support", "customer"], {
      message: messages.roleRequired,
    }),
    status: z.enum(["active", "inactive", "pending"], {
      message: messages.statusRequired,
    }),
  });
}

export type UserFormValues = z.infer<ReturnType<typeof createUserSchema>>;
