"use client";

import * as React from "react";
import { Eye, EyeOff } from "lucide-react";
import { useTranslations } from "next-intl";
import { cn } from "@/utils";
import { Button } from "@/components/ui/button";

export interface PasswordFieldProps
  extends Omit<React.ComponentProps<"input">, "type"> {
  floatingLabel: string;
  error?: string;
}

/** Floating-label password input with show/hide toggle. */
export const PasswordField = React.forwardRef<
  HTMLInputElement,
  PasswordFieldProps
>(function PasswordField(
  { className, floatingLabel, error, id, ...props },
  ref,
) {
  const t = useTranslations("auth");
  const [visible, setVisible] = React.useState(false);
  const inputId =
    id ?? `password-${floatingLabel.replace(/\s+/g, "-").toLowerCase()}`;

  return (
    <div className="relative w-full">
      <input
        id={inputId}
        ref={ref}
        type={visible ? "text" : "password"}
        placeholder=" "
        className={cn(
          "peer h-12 w-full rounded-md border border-input bg-card pe-11 ps-3.5 pt-4 text-sm shadow-float-sm outline-none transition-colors placeholder:text-transparent focus-visible:border-ring disabled:cursor-not-allowed disabled:opacity-50",
          error && "border-destructive focus-visible:border-destructive",
          className,
        )}
        {...props}
      />
      <label
        htmlFor={inputId}
        className="pointer-events-none absolute start-3.5 top-1/2 z-10 origin-[0] -translate-y-1/2 text-sm text-muted-foreground transition-all peer-focus:top-2.5 peer-focus:translate-y-0 peer-focus:scale-75 peer-focus:text-primary peer-[:not(:placeholder-shown)]:top-2.5 peer-[:not(:placeholder-shown)]:translate-y-0 peer-[:not(:placeholder-shown)]:scale-75"
      >
        {floatingLabel}
      </label>
      <Button
        type="button"
        variant="ghost"
        size="icon-sm"
        className="absolute end-1.5 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground"
        onClick={() => setVisible((v) => !v)}
        aria-label={visible ? t("hidePassword") : t("showPassword")}
        tabIndex={-1}
      >
        {visible ? <EyeOff /> : <Eye />}
      </Button>
      {error ? (
        <p className="mt-1.5 text-xs text-destructive">{error}</p>
      ) : null}
    </div>
  );
});
