"use client";

import * as React from "react";
import { format as formatJalali } from "date-fns-jalali";
import { faIR } from "date-fns-jalali/locale";
import { CalendarIcon } from "lucide-react";
import { cn } from "@/utils";
import { Button } from "@/components/ui/button";
import { JalaliCalendar } from "@/components/ui/jalali-calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";

export interface JalaliDatePickerProps {
  value?: Date;
  onChange?: (date: Date | undefined) => void;
  placeholder?: string;
  disabled?: boolean;
  className?: string;
  "aria-label"?: string;
}

/**
 * Persian (Jalali) date picker.
 * Uses date-fns-jalali for month/year math and display.
 */
function JalaliDatePicker({
  value,
  onChange,
  placeholder = "انتخاب تاریخ",
  disabled = false,
  className,
  "aria-label": ariaLabel = "انتخاب تاریخ جلالی",
}: JalaliDatePickerProps) {
  const [open, setOpen] = React.useState(false);
  const [view, setView] = React.useState<Date>(value ?? new Date());

  React.useEffect(() => {
    if (value) setView(value);
  }, [value]);

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button
          type="button"
          variant="outline"
          disabled={disabled}
          aria-label={ariaLabel}
          className={cn(
            "w-full justify-start gap-2 text-start font-normal",
            !value && "text-muted-foreground",
            className,
          )}
        >
          <CalendarIcon className="size-4 opacity-70" />
          {value
            ? formatJalali(value, "d MMMM yyyy", { locale: faIR })
            : placeholder}
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-auto p-1" align="start">
        <JalaliCalendar
          month={view}
          onMonthChange={setView}
          selected={value}
          onSelect={(day) => {
            onChange?.(day);
            setOpen(false);
          }}
        />
        <div className="flex justify-end border-t border-border px-2 pb-2 pt-1">
          <Button
            type="button"
            variant="ghost"
            size="sm"
            onClick={() => {
              const today = new Date();
              setView(today);
              onChange?.(today);
              setOpen(false);
            }}
          >
            امروز
          </Button>
        </div>
      </PopoverContent>
    </Popover>
  );
}

export { JalaliDatePicker };
