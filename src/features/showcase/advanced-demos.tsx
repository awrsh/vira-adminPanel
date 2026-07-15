"use client";

import * as React from "react";
import { useTranslations, useLocale } from "next-intl";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { MoreHorizontal, Settings2, Trash2 } from "lucide-react";
import {
  AreaChart,
  BarChart,
  LineChart,
  PieChart,
} from "@/components/charts/charts";
import { DemoBlock } from "@/features/showcase/demo-block";
import { AnimatedCard } from "@/components/ui/animated-card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { DatePicker } from "@/components/ui/date-picker";
import { JalaliDatePicker } from "@/components/ui/jalali-date-picker";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { MiniMap } from "@/components/ui/map";
import { Skeleton } from "@/components/ui/skeleton";
import { Slider } from "@/components/ui/slider";
import { Switch } from "@/components/ui/switch";
import { Textarea } from "@/components/ui/textarea";
import { TimePicker } from "@/components/ui/time-picker";
import { Surface } from "@/components/ui/surface";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

const chartData = [
  { label: "Sat", value: 42 },
  { label: "Sun", value: 55 },
  { label: "Mon", value: 38 },
  { label: "Tue", value: 70 },
  { label: "Wed", value: 62 },
  { label: "Thu", value: 80 },
  { label: "Fri", value: 48 },
];

const pieData = [
  { label: "Organic", value: 42 },
  { label: "Ads", value: 28 },
  { label: "Referral", value: 18 },
  { label: "Social", value: 12 },
];

const tableRows = [
  { id: "1", name: "Atlas Pro", plan: "Pro", mrr: "$189" },
  { id: "2", name: "Nova Agency", plan: "Agency", mrr: "$420" },
  { id: "3", name: "Cedar Labs", plan: "Starter", mrr: "$49" },
];

export function MapDemos() {
  const t = useTranslations("showcase");
  return (
    <div className="space-y-4">
      <DemoBlock
        title={t("mapDefault")}
        description={t("mapHint")}
        previewClassName="flex-col items-stretch w-full"
        code={`<MiniMap
  height={320}
  center={[35.6892, 51.389]}
  zoom={12}
  markers={[
    { id: "hq", lat: 35.6892, lng: 51.389, label: "HQ" },
  ]}
/>`}
      >
        <MiniMap height={300} className="w-full" />
      </DemoBlock>
      <DemoBlock
        title={t("mapCompact")}
        previewClassName="flex-col items-stretch w-full max-w-md"
        code={`<MiniMap height={200} zoom={11} />`}
      >
        <MiniMap height={200} zoom={11} className="w-full" />
      </DemoBlock>
    </div>
  );
}

export function ChartsDemos() {
  const t = useTranslations("showcase");
  return (
    <div className="space-y-4">
      <DemoBlock
        title={t("chartArea")}
        previewClassName="flex-col items-stretch w-full"
        code={`<AreaChart data={data} height={200} showLegend={false} />`}
      >
        <AreaChart data={chartData} height={200} showLegend={false} />
      </DemoBlock>
      <DemoBlock
        title={t("chartBar")}
        previewClassName="flex-col items-stretch w-full"
        code={`<BarChart data={data} height={200} showLegend={false} />`}
      >
        <BarChart data={chartData} height={200} showLegend={false} />
      </DemoBlock>
      <DemoBlock
        title={t("chartLine")}
        previewClassName="flex-col items-stretch w-full"
        code={`<LineChart data={data} height={200} showLegend={false} />`}
      >
        <LineChart data={chartData} height={200} showLegend={false} />
      </DemoBlock>
      <DemoBlock
        title={t("chartPie")}
        previewClassName="flex-col items-stretch w-full"
        code={`<PieChart data={data} height={220} />`}
      >
        <PieChart data={pieData} height={220} />
      </DemoBlock>
    </div>
  );
}

const formSchema = z.object({
  name: z.string().min(2),
  email: z.string().email(),
  plan: z.string(),
  notes: z.string().optional(),
  notify: z.boolean(),
});

type FormValues = z.infer<typeof formSchema>;

export function FormsDemos() {
  const t = useTranslations("showcase");
  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      email: "",
      plan: "pro",
      notes: "",
      notify: true,
    },
  });

  return (
    <div className="space-y-4">
      <DemoBlock
        title={t("formMinimal")}
        description={t("formHint")}
        previewClassName="flex-col items-stretch w-full max-w-lg"
        code={`<form className="space-y-4">
  <div className="space-y-2">
    <Label>Name</Label>
    <Input {...register("name")} />
  </div>
  <Button type="submit">Save</Button>
</form>`}
      >
        <form
          className="w-full space-y-4 text-start"
          onSubmit={form.handleSubmit(() => undefined)}
        >
          <div className="space-y-2">
            <Label htmlFor="demo-name">{t("name")}</Label>
            <Input id="demo-name" {...form.register("name")} />
          </div>
          <div className="space-y-2">
            <Label htmlFor="demo-email">{t("email")}</Label>
            <Input id="demo-email" type="email" {...form.register("email")} />
          </div>
          <div className="space-y-2">
            <Label>{t("plan")}</Label>
            <Select
              value={form.watch("plan")}
              onValueChange={(v) => form.setValue("plan", v)}
            >
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="starter">Starter</SelectItem>
                <SelectItem value="pro">Pro</SelectItem>
                <SelectItem value="agency">Agency</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div className="space-y-2">
            <Label htmlFor="demo-notes">{t("notes")}</Label>
            <Textarea id="demo-notes" rows={3} {...form.register("notes")} />
          </div>
          <div className="flex items-center justify-between gap-3 rounded-xl border border-border/70 px-3 py-2.5">
            <Label htmlFor="demo-notify" className="text-sm font-normal">
              {t("notifications")}
            </Label>
            <Switch
              id="demo-notify"
              checked={form.watch("notify")}
              onCheckedChange={(v) => form.setValue("notify", v)}
            />
          </div>
          <Button type="submit" className="w-full sm:w-auto">
            {t("saveForm")}
          </Button>
        </form>
      </DemoBlock>
    </div>
  );
}

export function SliderDemos() {
  const t = useTranslations("showcase");
  const [value, setValue] = React.useState([40]);
  const [range, setRange] = React.useState([20, 70]);

  return (
    <div className="space-y-4">
      <DemoBlock
        title={t("sliderDefault")}
        previewClassName="flex-col items-stretch w-full max-w-md gap-4"
        code={`<Slider value={[40]} onValueChange={setValue} max={100} step={1} />`}
      >
        <Slider value={value} onValueChange={setValue} max={100} step={1} />
        <p className="text-xs text-muted-foreground" dir="ltr">
          {value[0]}%
        </p>
      </DemoBlock>
      <DemoBlock
        title={t("sliderRange")}
        previewClassName="flex-col items-stretch w-full max-w-md gap-4"
        code={`<Slider value={[20, 70]} max={100} step={1} />`}
      >
        <Slider value={range} onValueChange={setRange} max={100} step={1} />
        <p className="text-xs text-muted-foreground" dir="ltr">
          {range[0]} – {range[1]}
        </p>
      </DemoBlock>
      <DemoBlock
        title={t("sliderTones")}
        previewClassName="flex-col items-stretch w-full max-w-md gap-5"
        code={`<Slider tone="success" defaultValue={[65]} />
<Slider tone="danger" defaultValue={[35]} />
<Slider size="sm" defaultValue={[50]} />
<Slider size="lg" defaultValue={[50]} />`}
      >
        <Slider tone="success" defaultValue={[65]} />
        <Slider tone="danger" defaultValue={[35]} />
        <Slider size="sm" defaultValue={[50]} />
        <Slider size="lg" defaultValue={[50]} />
      </DemoBlock>
    </div>
  );
}

export function TableDemos() {
  const t = useTranslations("showcase");
  return (
    <div className="space-y-4">
      <DemoBlock
        title={t("tableMinimal")}
        description={t("tableHint")}
        previewClassName="flex-col items-stretch w-full overflow-x-auto"
        code={`<table className="w-full text-sm">
  <thead>…</thead>
  <tbody>…</tbody>
</table>`}
      >
        <div className="w-full overflow-hidden rounded-xl border border-border">
          <table className="w-full min-w-[28rem] text-sm">
            <thead className="bg-muted/50 text-muted-foreground">
              <tr className="text-start">
                <th className="px-3 py-2.5 font-medium">{t("customer")}</th>
                <th className="px-3 py-2.5 font-medium">{t("plan")}</th>
                <th className="px-3 py-2.5 font-medium">MRR</th>
                <th className="px-3 py-2.5 font-medium" />
              </tr>
            </thead>
            <tbody>
              {tableRows.map((row) => (
                <tr
                  key={row.id}
                  className="border-t border-border/70 text-start"
                >
                  <td className="px-3 py-2.5 font-medium">{row.name}</td>
                  <td className="px-3 py-2.5">
                    <Badge variant="secondary">{row.plan}</Badge>
                  </td>
                  <td className="px-3 py-2.5" dir="ltr">
                    {row.mrr}
                  </td>
                  <td className="px-3 py-2.5 text-end">
                    <Button size="icon-sm" variant="ghost" aria-label="more">
                      <MoreHorizontal className="size-4" />
                    </Button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </DemoBlock>

      <DemoBlock
        title={t("tableDense")}
        previewClassName="flex-col items-stretch w-full"
        code={`/* Dense rows with muted zebra */`}
      >
        <div className="w-full overflow-hidden rounded-xl border border-border">
          <table className="w-full text-xs">
            <thead>
              <tr className="border-b border-border text-start text-muted-foreground">
                <th className="px-3 py-2 font-medium">{t("customer")}</th>
                <th className="px-3 py-2 font-medium">{t("plan")}</th>
                <th className="px-3 py-2 font-medium">MRR</th>
              </tr>
            </thead>
            <tbody>
              {tableRows.map((row, i) => (
                <tr
                  key={row.id}
                  className={cnRow(i) + " border-t border-border/50 text-start"}
                >
                  <td className="px-3 py-1.5">{row.name}</td>
                  <td className="px-3 py-1.5">{row.plan}</td>
                  <td className="px-3 py-1.5" dir="ltr">
                    {row.mrr}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </DemoBlock>
    </div>
  );
}

function cnRow(i: number) {
  return i % 2 === 1 ? "bg-muted/30" : "";
}

export function SkeletonDemos() {
  const t = useTranslations("showcase");
  return (
    <div className="space-y-4">
      <DemoBlock
        title={t("skeletonCard")}
        previewClassName="flex-col items-stretch w-full max-w-sm gap-3"
        code={`<Skeleton className="h-40 w-full" />
<Skeleton className="h-4 w-2/3" />
<Skeleton className="h-4 w-1/2" />`}
      >
        <Skeleton className="h-36 w-full rounded-xl" />
        <Skeleton className="h-4 w-2/3" />
        <Skeleton className="h-4 w-1/2" />
      </DemoBlock>
      <DemoBlock
        title={t("skeletonList")}
        previewClassName="flex-col items-stretch w-full max-w-md gap-3"
        code={`{Array.from({ length: 3 }).map((_, i) => (
  <div key={i} className="flex items-center gap-3">
    <Skeleton className="size-10 rounded-full" />
    <div className="flex-1 space-y-2">
      <Skeleton className="h-3 w-1/2" />
      <Skeleton className="h-3 w-3/4" />
    </div>
  </div>
))}`}
      >
        {Array.from({ length: 3 }).map((_, i) => (
          <div key={i} className="flex w-full items-center gap-3">
            <Skeleton className="size-10 shrink-0 rounded-full" />
            <div className="flex flex-1 flex-col gap-2">
              <Skeleton className="h-3 w-1/2" />
              <Skeleton className="h-3 w-3/4" />
            </div>
          </div>
        ))}
      </DemoBlock>
    </div>
  );
}

export function DateTimeDemos() {
  const t = useTranslations("showcase");
  const locale = useLocale();
  const [date, setDate] = React.useState<Date | undefined>(new Date());
  const [time, setTime] = React.useState("09:30");
  const [time2, setTime2] = React.useState("14:00");

  return (
    <div className="space-y-4">
      <DemoBlock
        title={t("dateGregorian")}
        previewClassName="flex-col items-stretch w-full max-w-sm"
        code={`<DatePicker value={date} onChange={setDate} />`}
      >
        <DatePicker value={date} onChange={setDate} className="w-full" />
      </DemoBlock>
      <DemoBlock
        title={t("dateJalali")}
        description={t("dateJalaliHint")}
        previewClassName="flex-col items-stretch w-full max-w-sm"
        code={`<JalaliDatePicker value={date} onChange={setDate} />`}
      >
        <JalaliDatePicker
          value={date}
          onChange={setDate}
          className="w-full"
          placeholder={locale === "fa" ? "انتخاب تاریخ" : "Pick Jalali date"}
        />
      </DemoBlock>
      <DemoBlock
        title={t("timeNative")}
        previewClassName="flex-col items-stretch w-full max-w-sm"
        code={`<TimePicker value={time} onChange={setTime} />`}
      >
        <TimePicker value={time} onChange={setTime} className="w-full" />
      </DemoBlock>
      <DemoBlock
        title={t("timeSplit")}
        previewClassName="flex-col items-stretch w-full max-w-sm"
        code={`<TimePicker variant="split" value={time} onChange={setTime} />`}
      >
        <TimePicker
          variant="split"
          value={time2}
          onChange={setTime2}
          className="w-full"
        />
      </DemoBlock>
    </div>
  );
}

export function CardsDemos() {
  const t = useTranslations("showcase");
  return (
    <div className="space-y-4">
      <DemoBlock
        title={t("cardInteractive")}
        previewClassName="grid w-full gap-3 sm:grid-cols-2"
        code={`<AnimatedCard>
  <h3>Title</h3>
  <p>Minimal animated card</p>
</AnimatedCard>`}
      >
        <AnimatedCard className="text-start">
          <p className="text-sm font-medium">{t("cardTitle")}</p>
          <p className="mt-1 text-xs text-muted-foreground">
            {t("cardBody")}
          </p>
        </AnimatedCard>
        <AnimatedCard tone="soft" className="text-start">
          <p className="text-sm font-medium">{t("cardSoft")}</p>
          <p className="mt-1 text-xs text-muted-foreground">
            {t("cardBody")}
          </p>
        </AnimatedCard>
        <AnimatedCard tone="glass" className="text-start sm:col-span-2">
          <p className="text-sm font-medium">{t("cardGlass")}</p>
          <p className="mt-1 text-xs text-muted-foreground">
            {t("cardBody")}
          </p>
        </AnimatedCard>
      </DemoBlock>
    </div>
  );
}

export function ModalDemos() {
  const t = useTranslations("showcase");
  return (
    <div className="space-y-4">
      <DemoBlock
        title={t("modalDefault")}
        description={t("modalHint")}
        code={`<Dialog>
  <DialogTrigger asChild>
    <Button>Open</Button>
  </DialogTrigger>
  <DialogContent>
    <DialogHeader>
      <DialogTitle>Title</DialogTitle>
      <DialogDescription>Body</DialogDescription>
    </DialogHeader>
    <DialogFooter>
      <Button>Confirm</Button>
    </DialogFooter>
  </DialogContent>
</Dialog>`}
      >
        <Dialog>
          <DialogTrigger asChild>
            <Button>{t("openModal")}</Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>{t("modalTitle")}</DialogTitle>
              <DialogDescription>{t("modalBody")}</DialogDescription>
            </DialogHeader>
            <DialogFooter>
              <Button variant="outline">{t("cancel")}</Button>
              <Button>{t("confirm")}</Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </DemoBlock>
    </div>
  );
}

export function DropdownDemos() {
  const t = useTranslations("showcase");
  return (
    <div className="space-y-4">
      <DemoBlock
        title={t("dropdownDefault")}
        description={t("dropdownHint")}
        code={`<DropdownMenu>
  <DropdownMenuTrigger asChild>
    <Button variant="outline">Menu</Button>
  </DropdownMenuTrigger>
  <DropdownMenuContent align="start">
    <DropdownMenuLabel>Actions</DropdownMenuLabel>
    <DropdownMenuItem>Edit</DropdownMenuItem>
    <DropdownMenuSeparator />
    <DropdownMenuItem>Delete</DropdownMenuItem>
  </DropdownMenuContent>
</DropdownMenu>`}
      >
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="outline">{t("openMenu")}</Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="start" className="w-48">
            <DropdownMenuLabel>{t("actions")}</DropdownMenuLabel>
            <DropdownMenuItem>
              <Settings2 className="size-4" />
              {t("settings")}
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem className="text-destructive focus:text-destructive">
              <Trash2 className="size-4" />
              {t("delete")}
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>

        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button size="icon" variant="ghost" aria-label={t("openMenu")}>
              <MoreHorizontal />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" className="w-40">
            <DropdownMenuItem>{t("edit")}</DropdownMenuItem>
            <DropdownMenuItem>{t("duplicate")}</DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem className="text-destructive focus:text-destructive">
              {t("delete")}
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </DemoBlock>

      <Surface className="p-4 text-start text-xs text-muted-foreground">
        {t("dropdownRtlNote")}
      </Surface>
    </div>
  );
}
