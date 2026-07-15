"use client";

import { motion } from "framer-motion";
import { Clock, Video } from "lucide-react";
import Image from "next/image";
import { useLocale, useTranslations } from "next-intl";
import { PageHeader } from "@/components/shared/page-header";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Surface } from "@/components/ui/surface";
import { STOCK_IMAGES } from "@/lib/stock-images";

const MEETINGS = [
  {
    id: "1",
    title: "اسپرینت پلنینگ",
    titleEn: "Sprint planning",
    time: "10:30",
    attendees: ["SN", "AK"],
    img: STOCK_IMAGES.meeting,
  },
  {
    id: "2",
    title: "بازبینی UI",
    titleEn: "UI review",
    time: "14:00",
    attendees: ["MH", "RM"],
    img: STOCK_IMAGES.workspace,
  },
  {
    id: "3",
    title: "جلسه مشتری",
    titleEn: "Client sync",
    time: "16:30",
    attendees: ["SN", "MH", "AK"],
    img: STOCK_IMAGES.city,
  },
];

export function MeetingsPage() {
  const t = useTranslations("meetings");
  const locale = useLocale();

  return (
    <div className="space-y-6">
      <PageHeader
        title={t("title")}
        description={t("subtitle")}
        actions={
          <Button size="sm">
            <Video className="size-4" />
            {t("start")}
          </Button>
        }
      />

      <div className="space-y-3">
        {MEETINGS.map((m, i) => (
          <motion.div
            key={m.id}
            initial={{ opacity: 0, x: locale === "fa" ? 12 : -12 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: i * 0.07 }}
          >
            <Surface elevated className="flex flex-col gap-4 overflow-hidden p-0 sm:flex-row">
              <div className="relative h-32 w-full shrink-0 sm:h-auto sm:w-44">
                <Image src={m.img} alt="" fill className="object-cover" sizes="176px" />
              </div>
              <div className="flex flex-1 flex-col justify-between gap-3 p-4 text-start">
                <div>
                  <p className="font-medium">
                    {locale === "fa" ? m.title : m.titleEn}
                  </p>
                  <p className="mt-1 flex items-center gap-1.5 text-xs text-muted-foreground">
                    <Clock className="size-3.5" />
                    {m.time}
                  </p>
                </div>
                <div className="flex items-center justify-between gap-2">
                  <div className="flex -space-x-2 rtl:space-x-reverse">
                    {m.attendees.map((a) => (
                      <Avatar key={a} className="size-8 border-2 border-background">
                        <AvatarImage src="" alt="" />
                        <AvatarFallback className="text-[10px]">{a}</AvatarFallback>
                      </Avatar>
                    ))}
                  </div>
                  <Badge variant="secondary">{t("today")}</Badge>
                </div>
              </div>
            </Surface>
          </motion.div>
        ))}
      </div>
    </div>
  );
}
