"use client";

import * as React from "react";
import { Clock } from "lucide-react";
import { cn } from "@/utils";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

export interface TimePickerProps {
  value?: string;
  onChange?: (value: string) => void;
  className?: string;
  disabled?: boolean;
  /** `native` = HTML time input, `split` = hour/minute selects */
  variant?: "native" | "split";
  "aria-label"?: string;
}

function pad(n: number) {
  return String(n).padStart(2, "0");
}

function TimePicker({
  value = "09:00",
  onChange,
  className,
  disabled,
  variant = "native",
  "aria-label": ariaLabel = "Time",
}: TimePickerProps) {
  const [hour, minute] = value.split(":");
  const hours = React.useMemo(
    () => Array.from({ length: 24 }, (_, i) => pad(i)),
    [],
  );
  const minutes = React.useMemo(
    () => Array.from({ length: 12 }, (_, i) => pad(i * 5)),
    [],
  );

  if (variant === "split") {
    return (
      <div
        dir="ltr"
        className={cn("flex items-center gap-2", className)}
        aria-label={ariaLabel}
      >
        <Clock className="size-4 shrink-0 text-muted-foreground" />
        <Select
          value={hour}
          disabled={disabled}
          onValueChange={(h) => onChange?.(`${h}:${minute ?? "00"}`)}
        >
          <SelectTrigger className="w-[4.5rem]">
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            {hours.map((h) => (
              <SelectItem key={h} value={h}>
                {h}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
        <span className="text-muted-foreground">:</span>
        <Select
          value={minute ?? "00"}
          disabled={disabled}
          onValueChange={(m) => onChange?.(`${hour ?? "00"}:${m}`)}
        >
          <SelectTrigger className="w-[4.5rem]">
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            {minutes.map((m) => (
              <SelectItem key={m} value={m}>
                {m}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>
    );
  }

  return (
    <div className={cn("relative", className)}>
      <Clock className="pointer-events-none absolute start-3 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" />
      <Input
        type="time"
        dir="ltr"
        value={value}
        disabled={disabled}
        aria-label={ariaLabel}
        onChange={(e) => onChange?.(e.target.value)}
        className="ps-9"
      />
    </div>
  );
}

export { TimePicker };
