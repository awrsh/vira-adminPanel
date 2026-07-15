"use client";

import Image from "next/image";
import { useLocale, useTranslations } from "next-intl";
import { Surface } from "@/components/ui/surface";
import { STOCK_IMAGES } from "@/lib/stock-images";

const MINI = [
  { name: "سارا", nameEn: "Sara", img: STOCK_IMAGES.portrait1 },
  { name: "آرمان", nameEn: "Arman", img: STOCK_IMAGES.portrait2 },
  { name: "مریم", nameEn: "Maryam", img: STOCK_IMAGES.portrait3 },
];

export function ContactsWidget(_props: {
  colSpan?: number;
  rowSpan?: number;
}) {
  const t = useTranslations("contacts");
  const locale = useLocale();

  return (
    <div className="flex h-full flex-col gap-3">
      <p className="text-sm font-medium">{t("widgetTitle")}</p>
      <div className="flex flex-1 flex-col gap-2">
        {MINI.map((c) => (
          <Surface key={c.nameEn} className="flex items-center gap-3 p-2.5">
            <div className="relative size-9 shrink-0 overflow-hidden rounded-full">
              <Image src={c.img} alt="" fill className="object-cover" sizes="36px" />
            </div>
            <span className="text-sm">
              {locale === "fa" ? c.name : c.nameEn}
            </span>
          </Surface>
        ))}
      </div>
    </div>
  );
}
