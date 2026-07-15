import {
  authApi,
  type RegisterInput,
} from "@/mocks/api/auth";
import { ApiError } from "@/lib/api/errors";

async function run<T>(factory: () => Promise<T>): Promise<T> {
  try {
    return await factory();
  } catch (error) {
    throw ApiError.fromUnknown(error);
  }
}

export const authService = {
  login: (email: string, password: string) =>
    run(() => authApi.login(email, password)),
  register: (input: RegisterInput) => run(() => authApi.register(input)),
  forgotPassword: (email: string) => run(() => authApi.forgotPassword(email)),
  verifyOtp: (email: string, code: string) =>
    run(() => authApi.verifyOtp(email, code)),
  resendOtp: (email: string) => run(() => authApi.resendOtp(email)),
  resetPassword: (email: string, password: string) =>
    run(() => authApi.resetPassword(email, password)),
  me: (userId: string) => run(() => authApi.me(userId)),
  logout: () => run(() => authApi.logout()),
};

export type { RegisterInput };
