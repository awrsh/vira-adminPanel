import { ROLE_PERMISSIONS } from "@/constants";
import { ApiError } from "@/lib/api/errors";
import { delay, maybeThrow } from "@/mocks/api/delay";
import { getState, setUsers } from "@/mocks/db/store";
import type { Permission, Role, SessionUser, User } from "@/types";

const DEMO_PASSWORD = "password";
const DEMO_OTP = "123456";
const ATLAS_DOMAIN = "@atlas.dev";

/** In-memory passwords for accounts created via register. */
const passwordStore = new Map<string, string>();

/** In-memory recovery sessions keyed by email. */
const recoverySessions = new Map<
  string,
  { otp: string; verified: boolean; expiresAt: number }
>();

function permissionsForRole(role: Role): Permission[] {
  return [...ROLE_PERMISSIONS[role]];
}

function toSessionUser(user: User): SessionUser {
  return {
    id: user.id,
    name: user.name,
    nameEn: user.nameEn,
    email: user.email,
    role: user.role,
    avatar: user.avatar,
    permissions: permissionsForRole(user.role),
  };
}

function normalizeEmail(email: string): string {
  return email.trim().toLowerCase();
}

function findUserByEmail(email: string): User | undefined {
  const normalized = normalizeEmail(email);
  return getState().users.find((user) => user.email.toLowerCase() === normalized);
}

function isAtlasEmail(email: string): boolean {
  return normalizeEmail(email).endsWith(ATLAS_DOMAIN);
}

function synthesizeAtlasUser(email: string): SessionUser {
  const local = email.split("@")[0] ?? "user";
  const role: Role =
    normalizeEmail(email) === "admin@atlas.dev" ? "admin" : "manager";
  const display = local
    .split(/[._-]/)
    .filter(Boolean)
    .map((part) => part.charAt(0).toUpperCase() + part.slice(1))
    .join(" ");

  return {
    id: `session-${local}`,
    name: display || "Atlas User",
    nameEn: display || "Atlas User",
    email: normalizeEmail(email),
    role,
    permissions: permissionsForRole(role),
  };
}

function latinizeName(name: string): string {
  return name.trim() || "New User";
}

export interface RegisterInput {
  name: string;
  email: string;
  password: string;
}

export interface AuthApi {
  login: (email: string, password: string) => Promise<SessionUser>;
  register: (input: RegisterInput) => Promise<SessionUser>;
  forgotPassword: (email: string) => Promise<{ email: string; demoOtp: string }>;
  verifyOtp: (email: string, code: string) => Promise<{ email: string }>;
  resendOtp: (email: string) => Promise<{ email: string; demoOtp: string }>;
  resetPassword: (
    email: string,
    password: string,
  ) => Promise<{ email: string }>;
  me: (userId: string) => Promise<SessionUser>;
  logout: () => Promise<void>;
}

export const authApi: AuthApi = {
  async login(email: string, password: string): Promise<SessionUser> {
    await delay();
    await maybeThrow();

    const trimmedEmail = email.trim();
    const normalized = normalizeEmail(trimmedEmail);
    const existing = findUserByEmail(trimmedEmail);
    const storedPassword = passwordStore.get(normalized);

    const passwordOk =
      storedPassword != null
        ? password === storedPassword
        : password === DEMO_PASSWORD;

    const allowed =
      passwordOk &&
      (Boolean(existing) ||
        normalized === "admin@atlas.dev" ||
        isAtlasEmail(trimmedEmail));

    if (!allowed) {
      throw new ApiError("Invalid email or password", {
        status: 401,
        code: "UNAUTHORIZED",
      });
    }

    if (existing) {
      return toSessionUser(existing);
    }

    return synthesizeAtlasUser(trimmedEmail);
  },

  async register(input: RegisterInput): Promise<SessionUser> {
    await delay();
    await maybeThrow();

    const email = normalizeEmail(input.email);
    if (findUserByEmail(email)) {
      throw new ApiError("An account with this email already exists", {
        status: 409,
        code: "CONFLICT",
      });
    }

    if (input.password.length < 6) {
      throw new ApiError("Password is too short", {
        status: 400,
        code: "VALIDATION_ERROR",
      });
    }

    const now = new Date().toISOString();
    const user: User = {
      id: `u-reg-${Date.now().toString(36)}`,
      name: input.name.trim(),
      nameEn: latinizeName(input.name),
      email,
      phone: "09120000000",
      nationalId: "0000000000",
      city: "تهران",
      cityEn: "Tehran",
      address: "—",
      role: "customer",
      status: "active",
      createdAt: now,
      lastLoginAt: now,
    };

    setUsers([user, ...getState().users]);
    passwordStore.set(email, input.password);
    return toSessionUser(user);
  },

  async forgotPassword(email: string) {
    await delay();
    await maybeThrow();

    const normalized = normalizeEmail(email);
    if (!normalized.includes("@")) {
      throw new ApiError("Invalid email", {
        status: 400,
        code: "VALIDATION_ERROR",
      });
    }

    recoverySessions.set(normalized, {
      otp: DEMO_OTP,
      verified: false,
      expiresAt: Date.now() + 15 * 60_000,
    });

    return { email: normalized, demoOtp: DEMO_OTP };
  },

  async verifyOtp(email: string, code: string) {
    await delay();
    await maybeThrow();

    const normalized = normalizeEmail(email);
    const session = recoverySessions.get(normalized);

    if (!session || session.expiresAt < Date.now()) {
      throw new ApiError("Verification code expired. Request a new one.", {
        status: 400,
        code: "VALIDATION_ERROR",
      });
    }

    if (code.trim() !== session.otp) {
      throw new ApiError("Invalid verification code", {
        status: 400,
        code: "VALIDATION_ERROR",
      });
    }

    recoverySessions.set(normalized, { ...session, verified: true });
    return { email: normalized };
  },

  async resendOtp(email: string) {
    await delay();
    await maybeThrow();

    const normalized = normalizeEmail(email);
    recoverySessions.set(normalized, {
      otp: DEMO_OTP,
      verified: false,
      expiresAt: Date.now() + 15 * 60_000,
    });

    return { email: normalized, demoOtp: DEMO_OTP };
  },

  async resetPassword(email: string, password: string) {
    await delay();
    await maybeThrow();

    const normalized = normalizeEmail(email);
    const session = recoverySessions.get(normalized);

    if (!session?.verified) {
      throw new ApiError("Verify the one-time code before resetting.", {
        status: 400,
        code: "VALIDATION_ERROR",
      });
    }

    if (password.length < 6) {
      throw new ApiError("Password is too short", {
        status: 400,
        code: "VALIDATION_ERROR",
      });
    }

    passwordStore.set(normalized, password);
    recoverySessions.delete(normalized);
    return { email: normalized };
  },

  async me(userId: string): Promise<SessionUser> {
    await delay();
    await maybeThrow();
    const user = getState().users.find((row) => row.id === userId);
    if (!user) {
      throw ApiError.notFound("User", userId);
    }
    return toSessionUser(user);
  },

  async logout(): Promise<void> {
    await delay(200);
  },
};

/** Demo OTP shared with UI copy — not a secret in this mock kit. */
export const AUTH_DEMO_OTP = DEMO_OTP;
export const AUTH_DEMO_PASSWORD = DEMO_PASSWORD;
