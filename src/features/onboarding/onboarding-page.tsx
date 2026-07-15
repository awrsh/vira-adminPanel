"use client";

import * as React from "react";
import { useTranslations } from "next-intl";
import { Check } from "lucide-react";
import { toast } from "sonner";
import { PageHeader } from "@/components/shared/page-header";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Surface } from "@/components/ui/surface";
import { Link } from "@/i18n/navigation";
import { cn } from "@/utils";

const STEPS = ["workspace", "profile", "invite", "settings", "done"] as const;

export function OnboardingPageView() {
  const t = useTranslations("onboarding");
  const [step, setStep] = React.useState(0);
  const [workspace, setWorkspace] = React.useState("");
  const [name, setName] = React.useState("");
  const [invite, setInvite] = React.useState("");

  const current = STEPS[step];

  function next() {
    if (step < STEPS.length - 1) setStep((s) => s + 1);
  }

  function back() {
    if (step > 0) setStep((s) => s - 1);
  }

  return (
    <div className="mx-auto max-w-2xl space-y-6">
      <PageHeader title={t("title")} description={t("subtitle")} />

      <div className="flex flex-wrap gap-2">
        {STEPS.map((id, index) => (
          <div
            key={id}
            className={cn(
              "flex items-center gap-2 rounded-full px-3 py-1.5 text-xs",
              index <= step
                ? "bg-primary/10 text-primary"
                : "bg-muted text-muted-foreground",
            )}
          >
            {index < step ? <Check className="size-3.5" /> : null}
            {t(`step_${id}`)}
          </div>
        ))}
      </div>

      <Surface elevated className="space-y-5 p-6">
        {current === "workspace" ? (
          <div className="space-y-3">
            <h2 className="text-lg font-semibold">{t("workspaceTitle")}</h2>
            <p className="text-sm text-muted-foreground">
              {t("workspaceHint")}
            </p>
            <div className="space-y-2">
              <Label>{t("workspaceName")}</Label>
              <Input
                value={workspace}
                onChange={(e) => setWorkspace(e.target.value)}
              />
            </div>
          </div>
        ) : null}

        {current === "profile" ? (
          <div className="space-y-3">
            <h2 className="text-lg font-semibold">{t("profileTitle")}</h2>
            <div className="space-y-2">
              <Label>{t("displayName")}</Label>
              <Input value={name} onChange={(e) => setName(e.target.value)} />
            </div>
          </div>
        ) : null}

        {current === "invite" ? (
          <div className="space-y-3">
            <h2 className="text-lg font-semibold">{t("inviteTitle")}</h2>
            <p className="text-sm text-muted-foreground">{t("inviteHint")}</p>
            <div className="space-y-2">
              <Label>{t("inviteEmail")}</Label>
              <Input
                value={invite}
                onChange={(e) => setInvite(e.target.value)}
                placeholder="teammate@company.com"
              />
            </div>
          </div>
        ) : null}

        {current === "settings" ? (
          <div className="space-y-3">
            <h2 className="text-lg font-semibold">{t("settingsTitle")}</h2>
            <p className="text-sm text-muted-foreground">
              {t("settingsHint")}
            </p>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li>• {t("settingRtl")}</li>
              <li>• {t("settingTheme")}</li>
              <li>• {t("settingBilling")}</li>
            </ul>
          </div>
        ) : null}

        {current === "done" ? (
          <div className="space-y-4 text-center">
            <h2 className="text-lg font-semibold">{t("doneTitle")}</h2>
            <p className="text-sm text-muted-foreground">{t("doneHint")}</p>
            <Button asChild>
              <Link href="/dashboard">{t("goDashboard")}</Link>
            </Button>
          </div>
        ) : null}

        {current !== "done" ? (
          <div className="flex justify-between gap-3 pt-2">
            <Button variant="outline" onClick={back} disabled={step === 0}>
              {t("back")}
            </Button>
            <Button
              onClick={() => {
                if (current === "settings") toast.success(t("saved"));
                next();
              }}
            >
              {t("next")}
            </Button>
          </div>
        ) : null}
      </Surface>
    </div>
  );
}
