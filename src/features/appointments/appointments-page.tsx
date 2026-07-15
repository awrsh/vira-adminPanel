"use client";

import { motion } from "framer-motion";
import { Scissors, Stethoscope } from "lucide-react";
import Image from "next/image";
import { useLocale, useTranslations } from "next-intl";
import { PageHeader } from "@/components/shared/page-header";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Surface } from "@/components/ui/surface";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { STOCK_IMAGES } from "@/lib/stock-images";

const REQUESTS = {
  doctor: [
    {
      id: "d1",
      name: "علی رضایی",
      nameEn: "Ali Rezaei",
      slot: "۱۴:۳۰",
      slotEn: "2:30 PM",
      status: "pending",
    },
    {
      id: "d2",
      name: "نگار احمدی",
      nameEn: "Negar Ahmadi",
      slot: "۱۶:۰۰",
      slotEn: "4:00 PM",
      status: "confirmed",
    },
  ],
  barber: [
    {
      id: "b1",
      name: "کاوه مرادی",
      nameEn: "Kaveh Moradi",
      slot: "۱۱:۰۰",
      slotEn: "11:00 AM",
      status: "pending",
    },
    {
      id: "b2",
      name: "سمیه کریمی",
      nameEn: "Samira Karimi",
      slot: "۱۳:۳۰",
      slotEn: "1:30 PM",
      status: "confirmed",
    },
  ],
};

export function AppointmentsPage() {
  const t = useTranslations("appointments");
  const locale = useLocale();

  function renderList(type: "doctor" | "barber") {
    const img = type === "doctor" ? STOCK_IMAGES.doctor : STOCK_IMAGES.salon;
    return (
      <div className="grid gap-3 lg:grid-cols-2">
        <div className="relative h-48 overflow-hidden rounded-surface border border-border lg:h-auto lg:min-h-[16rem]">
          <Image src={img} alt="" fill className="object-cover" sizes="50vw" />
        </div>
        <div className="space-y-2">
          {REQUESTS[type].map((req, i) => (
            <motion.div
              key={req.id}
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.06 }}
            >
              <Surface className="flex flex-wrap items-center justify-between gap-3 p-4 text-start">
                <div>
                  <p className="text-sm font-medium">
                    {locale === "fa" ? req.name : req.nameEn}
                  </p>
                  <p className="text-xs text-muted-foreground">
                    {locale === "fa" ? req.slot : req.slotEn}
                  </p>
                </div>
                <div className="flex items-center gap-2">
                  <Badge
                    variant={
                      req.status === "confirmed" ? "default" : "secondary"
                    }
                  >
                    {t(`status.${req.status}`)}
                  </Badge>
                  <Button size="sm" variant="outline">
                    {t("approve")}
                  </Button>
                </div>
              </Surface>
            </motion.div>
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <PageHeader title={t("title")} description={t("subtitle")} />
      <Tabs defaultValue="doctor">
        <TabsList>
          <TabsTrigger value="doctor" className="gap-1.5">
            <Stethoscope className="size-4" />
            {t("doctor")}
          </TabsTrigger>
          <TabsTrigger value="barber" className="gap-1.5">
            <Scissors className="size-4" />
            {t("barber")}
          </TabsTrigger>
        </TabsList>
        <TabsContent value="doctor" className="mt-4">
          {renderList("doctor")}
        </TabsContent>
        <TabsContent value="barber" className="mt-4">
          {renderList("barber")}
        </TabsContent>
      </Tabs>
    </div>
  );
}
