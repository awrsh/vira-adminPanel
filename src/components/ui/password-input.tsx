"use client";

import * as React from "react";
import { Eye, EyeOff } from "lucide-react";
import { cn } from "@/utils";
import { Input, type InputProps } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

export interface PasswordInputProps extends Omit<InputProps, "type"> {
  /** Show/hide toggle. Defaults to true. */
  revealable?: boolean;
}

/** Password field with optional visibility toggle. RTL-aware control placement. */
const PasswordInput = React.forwardRef<HTMLInputElement, PasswordInputProps>(
  ({ className, revealable = true, disabled, floatingLabel, ...props }, ref) => {
    const [visible, setVisible] = React.useState(false);

    if (!revealable) {
      return (
        <Input
          ref={ref}
          type="password"
          className={className}
          disabled={disabled}
          floatingLabel={floatingLabel}
          autoComplete={props.autoComplete ?? "current-password"}
          {...props}
        />
      );
    }

    return (
      <div className="relative w-full">
        <Input
          ref={ref}
          type={visible ? "text" : "password"}
          className={cn("pe-11", className)}
          disabled={disabled}
          floatingLabel={floatingLabel}
          autoComplete={props.autoComplete ?? "current-password"}
          {...props}
        />
        <Button
          type="button"
          variant="ghost"
          size="icon-sm"
          className="absolute end-1.5 top-1/2 -translate-y-1/2"
          disabled={disabled}
          aria-label={visible ? "Hide password" : "Show password"}
          aria-pressed={visible}
          onClick={() => setVisible((v) => !v)}
        >
          {visible ? <EyeOff className="size-4" /> : <Eye className="size-4" />}
        </Button>
      </div>
    );
  },
);
PasswordInput.displayName = "PasswordInput";

export { PasswordInput };
