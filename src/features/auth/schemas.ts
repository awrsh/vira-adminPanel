import { z } from "zod";

export interface AuthValidationMessages {
  emailRequired: string;
  emailInvalid: string;
  passwordRequired: string;
  passwordMin: string;
  confirmRequired: string;
  passwordsMismatch: string;
  nameRequired: string;
  nameMin: string;
  otpRequired: string;
  otpLength: string;
}

export function createLoginSchema(messages: AuthValidationMessages) {
  return z.object({
    email: z
      .string()
      .min(1, messages.emailRequired)
      .email(messages.emailInvalid),
    password: z
      .string()
      .min(1, messages.passwordRequired)
      .min(6, messages.passwordMin),
    remember: z.boolean(),
  });
}

export function createRegisterSchema(messages: AuthValidationMessages) {
  return z
    .object({
      name: z
        .string()
        .min(1, messages.nameRequired)
        .min(2, messages.nameMin),
      email: z
        .string()
        .min(1, messages.emailRequired)
        .email(messages.emailInvalid),
      password: z
        .string()
        .min(1, messages.passwordRequired)
        .min(6, messages.passwordMin),
      confirmPassword: z.string().min(1, messages.confirmRequired),
    })
    .refine((data) => data.password === data.confirmPassword, {
      path: ["confirmPassword"],
      message: messages.passwordsMismatch,
    });
}

export function createForgotPasswordSchema(messages: AuthValidationMessages) {
  return z.object({
    email: z
      .string()
      .min(1, messages.emailRequired)
      .email(messages.emailInvalid),
  });
}

export function createResetPasswordSchema(messages: AuthValidationMessages) {
  return z
    .object({
      password: z
        .string()
        .min(1, messages.passwordRequired)
        .min(6, messages.passwordMin),
      confirmPassword: z.string().min(1, messages.confirmRequired),
    })
    .refine((data) => data.password === data.confirmPassword, {
      path: ["confirmPassword"],
      message: messages.passwordsMismatch,
    });
}

export function createOtpSchema(messages: AuthValidationMessages) {
  return z.object({
    code: z
      .string()
      .min(1, messages.otpRequired)
      .length(6, messages.otpLength)
      .regex(/^\d{6}$/, messages.otpLength),
  });
}

export type LoginFormValues = z.infer<ReturnType<typeof createLoginSchema>>;
export type RegisterFormValues = z.infer<
  ReturnType<typeof createRegisterSchema>
>;
export type ForgotPasswordFormValues = z.infer<
  ReturnType<typeof createForgotPasswordSchema>
>;
export type ResetPasswordFormValues = z.infer<
  ReturnType<typeof createResetPasswordSchema>
>;
export type OtpFormValues = z.infer<ReturnType<typeof createOtpSchema>>;
