"use client";

import { use } from "react";
import { AuthDemoPage } from "@/features/showcase/auth-demo-page";

export default function ShowcaseAuthVariantPage({
  params,
}: {
  params: Promise<{ variant: string }>;
}) {
  const { variant } = use(params);
  return <AuthDemoPage slug={variant} />;
}
