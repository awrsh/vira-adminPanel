"use client";

import { OtpForm } from "@/features/auth/otp-form";

export default function TwoFactorPage() {
  return (
    <main id="main-content">
      <OtpForm mode="twoFactor" />
    </main>
  );
}
