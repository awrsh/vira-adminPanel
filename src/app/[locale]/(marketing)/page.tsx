import { LandingPage } from "@/features/marketing/landing-page";

interface PageProps {
  params: Promise<{ locale: string }>;
}

export default async function MarketingPage({ params }: PageProps) {
  await params;
  return <LandingPage />;
}
