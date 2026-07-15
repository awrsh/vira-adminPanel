import { createNavigation } from "next-intl/navigation";
import { routing } from "@/i18n/routing";

/** Locale-aware navigation primitives for App Router. */
export const { Link, redirect, usePathname, useRouter, getPathname } =
  createNavigation(routing);
