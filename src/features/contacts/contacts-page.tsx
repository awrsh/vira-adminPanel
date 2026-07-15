"use client";

import { motion } from "framer-motion";
import { Mail, Phone } from "lucide-react";
import Image from "next/image";
import { useLocale, useTranslations } from "next-intl";
import { PageHeader } from "@/components/shared/page-header";
import { Badge } from "@/components/ui/badge";
import { Surface } from "@/components/ui/surface";
import { STOCK_IMAGES } from "@/lib/stock-images";

const CONTACTS = [
  {
    id: "1",
    name: "سارا نوری",
    nameEn: "Sara Nouri",
    role: "Product",
    roleFa: "محصول",
    email: "sara@atlas.io",
    img: STOCK_IMAGES.portrait1,
  },
  {
    id: "2",
    name: "آرمان کیانی",
    nameEn: "Arman Kiani",
    role: "Engineering",
    roleFa: "فنی",
    email: "arman@atlas.io",
    img: STOCK_IMAGES.portrait2,
  },
  {
    id: "3",
    name: "مریم حسینی",
    nameEn: "Maryam Hosseini",
    role: "Design",
    roleFa: "طراحی",
    email: "maryam@atlas.io",
    img: STOCK_IMAGES.portrait3,
  },
];

export function ContactsPage() {
  const t = useTranslations("contacts");
  const locale = useLocale();

  return (
    <div className="space-y-6">
      <PageHeader title={t("title")} description={t("subtitle")} />
      <div className="grid gap-3 md:grid-cols-3">
        {CONTACTS.map((c, i) => (
          <motion.div
            key={c.id}
            initial={{ opacity: 0, scale: 0.98 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: i * 0.06 }}
          >
            <Surface elevated className="overflow-hidden p-0 text-start">
              <div className="relative h-28">
                <Image src={c.img} alt="" fill className="object-cover" sizes="33vw" />
              </div>
              <div className="space-y-2 p-4">
                <p className="font-medium">
                  {locale === "fa" ? c.name : c.nameEn}
                </p>
                <Badge variant="secondary" className="text-[10px]">
                  {locale === "fa" ? c.roleFa : c.role}
                </Badge>
                <p className="flex items-center gap-1.5 text-xs text-muted-foreground">
                  <Mail className="size-3.5" />
                  {c.email}
                </p>
                <p className="flex items-center gap-1.5 text-xs text-muted-foreground">
                  <Phone className="size-3.5" />
                  +98 912 000 0000
                </p>
              </div>
            </Surface>
          </motion.div>
        ))}
      </div>
    </div>
  );
}
