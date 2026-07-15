"use client";

import * as React from "react";
import {
  addMonths,
  format as formatJalali,
  getMonth,
  getYear,
  startOfMonth,
} from "date-fns-jalali";
import { faIR } from "date-fns-jalali/locale";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { cn } from "@/utils";
import { Button, buttonVariants } from "@/components/ui/button";

const WEEKDAYS_FA = ["ش", "ی", "د", "س", "چ", "پ", "ج"] as const;

function startOfJalaliWeek(date: Date): Date {
  const day = date.getDay();
  const diff = (day + 1) % 7;
  const result = new Date(date);
  result.setDate(date.getDate() - diff);
  result.setHours(0, 0, 0, 0);
  return result;
}

function buildMonthGrid(monthDate: Date): Date[] {
  const start = startOfMonth(monthDate);
  const gridStart = startOfJalaliWeek(start);
  const days: Date[] = [];
  for (let i = 0; i < 42; i += 1) {
    const cell = new Date(gridStart);
    cell.setDate(gridStart.getDate() + i);
    days.push(cell);
  }
  return days;
}

function isSameDay(a: Date, b: Date) {
  return (
    a.getFullYear() === b.getFullYear() &&
    a.getMonth() === b.getMonth() &&
    a.getDate() === b.getDate()
  );
}

export interface JalaliCalendarProps {
  month: Date;
  onMonthChange?: (month: Date) => void;
  selected?: Date;
  onSelect?: (date: Date) => void;
  modifiers?: { highlight?: Date[] };
  className?: string;
}

/** Inline Jalali (Shamsi) month calendar for Persian locale. */
export function JalaliCalendar({
  month,
  onMonthChange,
  selected,
  onSelect,
  modifiers,
  className,
}: JalaliCalendarProps) {
  const days = React.useMemo(() => buildMonthGrid(month), [month]);
  const viewMonth = getMonth(month);
  const viewYear = getYear(month);
  const highlights = modifiers?.highlight ?? [];

  function isOutside(day: Date) {
    return getMonth(day) !== viewMonth || getYear(day) !== viewYear;
  }

  function isHighlight(day: Date) {
    return highlights.some((item) => isSameDay(item, day));
  }

  return (
    <div className={cn("p-2", className)} dir="rtl">
      <div className="relative mb-3 flex items-center justify-center">
        <Button
          type="button"
          variant="outline"
          size="icon-sm"
          aria-label="ماه قبل"
          className="absolute start-0"
          onClick={() => onMonthChange?.(addMonths(month, -1))}
        >
          <ChevronRight className="size-4" />
        </Button>
        <p className="text-sm font-medium">
          {formatJalali(month, "MMMM yyyy", { locale: faIR })}
        </p>
        <Button
          type="button"
          variant="outline"
          size="icon-sm"
          aria-label="ماه بعد"
          className="absolute end-0"
          onClick={() => onMonthChange?.(addMonths(month, 1))}
        >
          <ChevronLeft className="size-4" />
        </Button>
      </div>

      <div
        className="grid grid-cols-7 gap-1 text-center"
        role="grid"
        aria-label={formatJalali(month, "MMMM yyyy", { locale: faIR })}
      >
        {WEEKDAYS_FA.map((day) => (
          <div
            key={day}
            className="flex size-8 items-center justify-center text-[0.75rem] text-muted-foreground"
            role="columnheader"
          >
            {day}
          </div>
        ))}
        {days.map((day) => {
          const selectedDay = selected ? isSameDay(day, selected) : false;
          const outside = isOutside(day);
          const highlight = isHighlight(day);
          return (
            <button
              key={day.toISOString()}
              type="button"
              role="gridcell"
              aria-selected={selectedDay}
              className={cn(
                buttonVariants({ variant: "ghost" }),
                "size-8 p-0 text-sm font-normal aria-selected:opacity-100",
                selectedDay &&
                  "bg-primary text-primary-foreground hover:bg-primary hover:text-primary-foreground",
                !selectedDay &&
                  highlight &&
                  "bg-primary/15 font-medium text-primary",
                outside && "text-muted-foreground opacity-45",
              )}
              onClick={() => onSelect?.(day)}
            >
              {formatJalali(day, "d")}
            </button>
          );
        })}
      </div>
    </div>
  );
}
