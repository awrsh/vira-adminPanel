"use client";

import { use } from "react";
import { ComponentDemoPage } from "@/features/showcase/component-demo-page";

export default function ShowcaseComponentPage({
  params,
}: {
  params: Promise<{ name: string }>;
}) {
  const { name } = use(params);
  return <ComponentDemoPage slug={name} />;
}
