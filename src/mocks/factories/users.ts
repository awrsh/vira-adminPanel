import type { Role, User } from "@/types";
import {
  CITIES,
  EMAIL_DOMAINS,
  FIRST_NAMES,
  LAST_NAMES,
  STREET_NAMES,
} from "@/mocks/data/persian";
import {
  createSeededRandom,
  generateNationalId,
  generatePhone,
  padDigits,
  pick,
  toIsoDate,
  type Rng,
} from "@/mocks/factories/shared";

const ROLES: readonly Role[] = [
  "admin",
  "manager",
  "editor",
  "support",
  "customer",
];

const STATUSES: readonly User["status"][] = [
  "active",
  "active",
  "active",
  "inactive",
  "pending",
];

export function createUserFactory(rng: Rng) {
  return function createUser(index: number): User {
    const first = pick(rng, FIRST_NAMES);
    const last = pick(rng, LAST_NAMES);
    const city = pick(rng, CITIES);
    const street = pick(rng, STREET_NAMES);
    const domain = pick(rng, EMAIL_DOMAINS);
    const role = pick(rng, ROLES);
    const status = pick(rng, STATUSES);
    const slug = `${first.en.toLowerCase()}.${last.en.toLowerCase()}${index}`;
    const hasLogin = status === "active" && rng() > 0.2;

    return {
      id: `u-${padDigits(index, 4)}`,
      name: `${first.fa} ${last.fa}`,
      nameEn: `${first.en} ${last.en}`,
      email: `${slug}@${domain}`,
      phone: generatePhone(rng),
      nationalId: generateNationalId(rng),
      city: city.fa,
      cityEn: city.en,
      address: `${street.fa}، پلاک ${Math.floor(rng() * 200) + 1}`,
      role,
      status,
      createdAt: toIsoDate(Math.floor(rng() * 365) + 1, rng),
      lastLoginAt: hasLogin
        ? toIsoDate(Math.floor(rng() * 30), rng)
        : undefined,
    };
  };
}

export function buildUsers(count = 80, seed = 42): User[] {
  const rng = createSeededRandom(seed);
  const createUser = createUserFactory(rng);
  const users: User[] = [
    {
      id: "u-admin",
      name: "آرش محمدی",
      nameEn: "Arash Mohammadi",
      email: "admin@atlas.dev",
      phone: "09121234567",
      nationalId: "0012345678",
      city: "تهران",
      cityEn: "Tehran",
      address: "خیابان ولیعصر، پلاک ۱۲",
      role: "admin",
      status: "active",
      createdAt: toIsoDate(400, rng),
      lastLoginAt: toIsoDate(1, rng),
    },
  ];

  for (let i = 2; i <= count; i += 1) {
    users.push(createUser(i));
  }
  return users;
}
