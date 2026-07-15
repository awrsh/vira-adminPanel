"use client";

import { motion } from "framer-motion";
import { Share2, TrendingUp, Users } from "lucide-react";
import Image from "next/image";
import { useLocale, useTranslations } from "next-intl";
import { PageHeader } from "@/components/shared/page-header";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Surface } from "@/components/ui/surface";
import { STOCK_IMAGES } from "@/lib/stock-images";

const INFLUENCERS = [
  {
    id: "1",
    name: "سارا نوری",
    nameEn: "Sara Nouri",
    niche: "Tech & SaaS",
    nicheFa: "فناوری و SaaS",
    followers: "128K",
    growth: "+12%",
    img: STOCK_IMAGES.portrait1,
  },
  {
    id: "2",
    name: "آرمان کیانی",
    nameEn: "Arman Kiani",
    niche: "Design",
    nicheFa: "طراحی",
    followers: "89K",
    growth: "+8%",
    img: STOCK_IMAGES.portrait2,
  },
  {
    id: "3",
    name: "مریم حسینی",
    nameEn: "Maryam Hosseini",
    niche: "Business",
    nicheFa: "کسب‌وکار",
    followers: "210K",
    growth: "+18%",
    img: STOCK_IMAGES.portrait3,
  },
  {
    id: "4",
    name: "رضا محمدی",
    nameEn: "Reza Mohammadi",
    niche: "Dev",
    nicheFa: "توسعه",
    followers: "56K",
    growth: "+5%",
    img: STOCK_IMAGES.portrait4,
  },
];

export function InfluencersPage() {
  const t = useTranslations("influencers");
  const locale = useLocale();

  return (
    <div className="space-y-6">
      <PageHeader title={t("title")} description={t("subtitle")} />

      <div className="grid gap-3 sm:grid-cols-2 xl:grid-cols-4">
        {INFLUENCERS.map((item, i) => (
          <motion.div
            key={item.id}
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.06 }}
          >
            <Surface elevated className="overflow-hidden p-0">
              <div className="relative h-36 w-full">
                <Image
                  src={item.img}
                  alt=""
                  fill
                  className="object-cover"
                  sizes="(max-width: 768px) 100vw, 25vw"
                />
                <Badge className="absolute end-2 top-2 bg-background/80 backdrop-blur-sm">
                  {item.growth}
                </Badge>
              </div>
              <div className="space-y-2 p-4 text-start">
                <p className="font-medium">
                  {locale === "fa" ? item.name : item.nameEn}
                </p>
                <p className="text-xs text-muted-foreground">
                  {locale === "fa" ? item.nicheFa : item.niche}
                </p>
                <div className="flex items-center justify-between text-xs">
                  <span className="flex items-center gap-1 text-muted-foreground">
                    <Users className="size-3.5" />
                    {item.followers}
                  </span>
                  <span className="flex items-center gap-1 text-emerald-600 dark:text-emerald-400">
                    <TrendingUp className="size-3.5" />
                    {t("growth")}
                  </span>
                </div>
                <Button size="sm" variant="outline" className="w-full gap-1.5">
                  <Share2 className="size-4" />
                  {t("viewProfile")}
                </Button>
              </div>
            </Surface>
          </motion.div>
        ))}
      </div>
    </div>
  );
}
