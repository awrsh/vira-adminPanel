import type { Company } from "@/types";
import { CITIES, COMPANY_NAMES, STREET_NAMES } from "@/mocks/data/persian";
import { INDUSTRIES } from "@/mocks/data/templates";
import {
  createSeededRandom,
  generateCompanyNationalId,
  generatePhone,
  padDigits,
  pick,
  toIsoDate,
  type Rng,
} from "@/mocks/factories/shared";

const STATUSES: readonly Company["status"][] = [
  "active",
  "active",
  "prospect",
  "inactive",
];

export function createCompanyFactory(rng: Rng) {
  return function createCompany(index: number): Company {
    const base =
      index <= COMPANY_NAMES.length
        ? COMPANY_NAMES[index - 1]!
        : {
            fa: `${pick(rng, COMPANY_NAMES).fa} ${index}`,
            en: `${pick(rng, COMPANY_NAMES).en} ${index}`,
          };
    const city = pick(rng, CITIES);
    const street = pick(rng, STREET_NAMES);
    const industry = pick(rng, INDUSTRIES);
    const slug = base.en.toLowerCase().replace(/\s+/g, "");

    return {
      id: `co-${padDigits(index, 3)}`,
      name: base.fa,
      nameEn: base.en,
      nationalId: generateCompanyNationalId(rng),
      registrationNumber: `ثبت-${padDigits(1000 + index, 5)}`,
      city: city.fa,
      cityEn: city.en,
      address: `${street.fa}، پلاک ${Math.floor(rng() * 180) + 1}`,
      phone: generatePhone(rng),
      email: `info@${slug}.ir`,
      website: `https://${slug}.ir`,
      industry: industry.fa,
      industryEn: industry.en,
      employeeCount: Math.floor(rng() * 480) + 8,
      status: pick(rng, STATUSES),
      createdAt: toIsoDate(Math.floor(rng() * 700) + 20, rng),
    };
  };
}

export function buildCompanies(count = 35, seed = 55): Company[] {
  const rng = createSeededRandom(seed);
  const createCompany = createCompanyFactory(rng);
  return Array.from({ length: count }, (_, i) => createCompany(i + 1));
}
