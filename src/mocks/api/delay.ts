import { createSeededRandom } from "@/mocks/factories/shared";
import { getMockApiConfig } from "@/lib/api/config";
import { ApiError } from "@/lib/api/errors";

const delayRng = createSeededRandom(Date.now() % 10_000);

/**
 * Simulate network latency using global mock API config (or an explicit ms override).
 */
export async function delay(ms?: number): Promise<void> {
  const { delayMin, delayMax } = getMockApiConfig();
  const duration =
    ms ??
    Math.floor(delayMin + delayRng() * Math.max(delayMax - delayMin, 0));
  await new Promise<void>((resolve) => {
    setTimeout(resolve, duration);
  });
}

/**
 * Optionally throw a simulated API error.
 * Pass an explicit rate, otherwise uses global `errorRate` from mock config.
 */
export async function maybeThrow(rate?: number): Promise<void> {
  const effective = rate ?? getMockApiConfig().errorRate;
  if (effective <= 0) return;
  if (delayRng() < effective) {
    throw new ApiError("Simulated API error", {
      status: 500,
      code: "SIMULATED_ERROR",
    });
  }
}
