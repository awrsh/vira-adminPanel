export function formatNumber(
  value: number,
  locale: string = "fa-IR",
): string {
  return new Intl.NumberFormat(locale).format(value);
}

export function formatCurrency(
  value: number,
  locale: string = "fa-IR",
  currency: string = "IRR",
): string {
  if (currency === "IRR" || currency === "IRT") {
    return `${formatNumber(value, locale)} تومان`;
  }
  return new Intl.NumberFormat(locale, {
    style: "currency",
    currency,
    maximumFractionDigits: 0,
  }).format(value);
}

export function formatDate(
  value: string | Date,
  locale: string = "fa-IR",
  options?: Intl.DateTimeFormatOptions,
): string {
  const date = typeof value === "string" ? new Date(value) : value;
  return new Intl.DateTimeFormat(locale, {
    year: "numeric",
    month: "short",
    day: "numeric",
    ...options,
  }).format(date);
}
