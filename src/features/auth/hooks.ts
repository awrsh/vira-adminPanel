"use client";

import {
  useMutation,
  type UseMutationOptions,
} from "@tanstack/react-query";
import { ApiError } from "@/lib/api/errors";
import { authService, type RegisterInput } from "@/services/auth";
import { useAuthStore } from "@/stores/auth-store";
import { useAuthFlowStore } from "@/features/auth/auth-flow-store";
import type { SessionUser } from "@/types";

export interface LoginInput {
  email: string;
  password: string;
  remember?: boolean;
}

export function useLogin(
  options?: UseMutationOptions<SessionUser, ApiError, LoginInput>,
) {
  const setSession = useAuthStore((state) => state.setSession);

  return useMutation({
    ...options,
    mutationFn: ({ email, password }) => authService.login(email, password),
    onSuccess: async (user, variables, onMutateResult, context) => {
      setSession(user, variables.remember ?? true);
      await options?.onSuccess?.(user, variables, onMutateResult, context);
    },
  });
}

export function useRegister(
  options?: UseMutationOptions<SessionUser, ApiError, RegisterInput>,
) {
  const setSession = useAuthStore((state) => state.setSession);

  return useMutation({
    ...options,
    mutationFn: (input) => authService.register(input),
    onSuccess: async (user, variables, onMutateResult, context) => {
      setSession(user, true);
      await options?.onSuccess?.(user, variables, onMutateResult, context);
    },
  });
}

export function useForgotPassword(
  options?: UseMutationOptions<
    { email: string; demoOtp: string },
    ApiError,
    { email: string }
  >,
) {
  const setRecoveryEmail = useAuthFlowStore((s) => s.setRecoveryEmail);

  return useMutation({
    ...options,
    mutationFn: ({ email }) => authService.forgotPassword(email),
    onSuccess: async (data, variables, onMutateResult, context) => {
      setRecoveryEmail(data.email);
      await options?.onSuccess?.(data, variables, onMutateResult, context);
    },
  });
}

export function useVerifyOtp(
  options?: UseMutationOptions<
    { email: string },
    ApiError,
    { email: string; code: string }
  >,
) {
  return useMutation({
    ...options,
    mutationFn: ({ email, code }) => authService.verifyOtp(email, code),
  });
}

export function useResendOtp(
  options?: UseMutationOptions<
    { email: string; demoOtp: string },
    ApiError,
    { email: string }
  >,
) {
  return useMutation({
    ...options,
    mutationFn: ({ email }) => authService.resendOtp(email),
  });
}

export function useResetPassword(
  options?: UseMutationOptions<
    { email: string },
    ApiError,
    { email: string; password: string }
  >,
) {
  const clear = useAuthFlowStore((s) => s.clear);

  return useMutation({
    ...options,
    mutationFn: ({ email, password }) =>
      authService.resetPassword(email, password),
    onSuccess: async (data, variables, onMutateResult, context) => {
      clear();
      await options?.onSuccess?.(data, variables, onMutateResult, context);
    },
  });
}

export function useLogout(options?: UseMutationOptions<void, ApiError, void>) {
  const logout = useAuthStore((state) => state.logout);

  return useMutation({
    ...options,
    mutationFn: () => authService.logout(),
    onSuccess: async (data, variables, onMutateResult, context) => {
      logout();
      await options?.onSuccess?.(data, variables, onMutateResult, context);
    },
  });
}
