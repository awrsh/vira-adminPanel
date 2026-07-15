"use client";

import * as React from "react";
import { useTranslations } from "next-intl";
import { notFound } from "next/navigation";
import {
  Check,
  Mail,
  Search,
  Settings2,
  Sparkles,
  UserRound,
} from "lucide-react";
import { PageHeader } from "@/components/shared/page-header";
import { DemoBlock } from "@/features/showcase/demo-block";
import {
  COMPONENT_DEMOS,
  isComponentDemoSlug,
  type ComponentDemoSlug,
} from "@/features/showcase/catalog";
import { Alert } from "@/components/ui/alert";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Switch } from "@/components/ui/switch";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Textarea } from "@/components/ui/textarea";
import { cn } from "@/utils";
import {
  CardsDemos,
  ChartsDemos,
  DateTimeDemos,
  DropdownDemos,
  FormsDemos,
  MapDemos,
  ModalDemos,
  SkeletonDemos,
  SliderDemos,
  TableDemos,
} from "@/features/showcase/advanced-demos";
import {
  CarouselDemos,
  DrawerDemos,
  FileUploadDemos,
  HooksDemos,
  RichTextDemos,
  TooltipDemos,
  ValidationDemos,
} from "@/features/showcase/extended-showcase-demos";

function ButtonDemos() {
  const t = useTranslations("showcase");
  return (
    <div className="space-y-4">
      <DemoBlock
        title={t("styleVariants")}
        description={t("buttonVariantsHint")}
        code={`<Button>Primary</Button>
<Button variant="secondary">Secondary</Button>
<Button variant="outline">Outline</Button>
<Button variant="ghost">Ghost</Button>
<Button variant="link">Link</Button>
<Button variant="success">Success</Button>
<Button variant="destructive">Destructive</Button>
<Button loading>Loading</Button>`}
      >
        <Button>{t("primary")}</Button>
        <Button variant="secondary">{t("secondary")}</Button>
        <Button variant="outline">{t("outline")}</Button>
        <Button variant="ghost">{t("ghost")}</Button>
        <Button variant="link">{t("link")}</Button>
        <Button variant="success">{t("success")}</Button>
        <Button variant="destructive">{t("destructive")}</Button>
        <Button loading>{t("loading")}</Button>
      </DemoBlock>
      <DemoBlock
        title={t("sizes")}
        code={`<Button size="sm">Small</Button>
<Button>Default</Button>
<Button size="lg">Large</Button>
<Button size="icon" aria-label="settings"><Settings2 /></Button>
<Button size="icon-sm" aria-label="settings"><Settings2 /></Button>`}
      >
        <Button size="sm">{t("small")}</Button>
        <Button>{t("default")}</Button>
        <Button size="lg">{t("large")}</Button>
        <Button size="icon" aria-label={t("settings")}>
          <Settings2 />
        </Button>
        <Button size="icon-sm" aria-label={t("settings")}>
          <Settings2 />
        </Button>
      </DemoBlock>
      <DemoBlock
        title={t("withIcon")}
        code={`<Button><Mail /> Email</Button>
<Button variant="outline"><Sparkles /> Upgrade</Button>`}
      >
        <Button>
          <Mail /> {t("email")}
        </Button>
        <Button variant="outline">
          <Sparkles /> {t("upgrade")}
        </Button>
      </DemoBlock>
    </div>
  );
}

function InputDemos() {
  const t = useTranslations("showcase");
  return (
    <div className="space-y-4">
      <DemoBlock
        title={t("styleDefault")}
        description={t("inputHint")}
        previewClassName="flex-col items-stretch gap-3 sm:max-w-md"
        code={`<Input placeholder="Email" />
<Input floatingLabel="Search" />
<Input disabled defaultValue="Disabled" />
<Input error="Required field" />`}
      >
        <Input placeholder={t("email")} />
        <Input floatingLabel={t("search")} />
        <Input disabled defaultValue={t("disabled")} />
        <Input error={t("requiredField")} />
      </DemoBlock>
      <DemoBlock
        title={t("styleSoft")}
        previewClassName="flex-col items-stretch gap-3 sm:max-w-md"
        code={`<Input className="border-transparent bg-muted shadow-none" placeholder="Soft" />
<Input className="h-11 rounded-xl" placeholder="Rounded" />
<div className="relative">
  <Search className="absolute start-3 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" />
  <Input className="ps-9" placeholder="With icon" />
</div>`}
      >
        <Input
          className="border-transparent bg-muted shadow-none"
          placeholder={t("styleSoft")}
        />
        <Input className="h-11 rounded-xl" placeholder={t("styleRounded")} />
        <div className="relative">
          <Search className="pointer-events-none absolute start-3 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" />
          <Input className="ps-9" placeholder={t("withIcon")} />
        </div>
      </DemoBlock>
    </div>
  );
}

function SwitchDemos() {
  const t = useTranslations("showcase");
  const [states, setStates] = React.useState({
    a: true,
    b: false,
    c: true,
    d: true,
    e: false,
  });

  function toggle(key: keyof typeof states) {
    setStates((prev) => ({ ...prev, [key]: !prev[key] }));
  }

  return (
    <div className="space-y-4">
      <DemoBlock
        title={t("styleDefault")}
        description={t("switchHint")}
        previewClassName="flex-col items-stretch gap-4 sm:max-w-md"
        code={`<Switch checked={on} onCheckedChange={setOn} />
<Switch size="sm" />
<Switch size="lg" />
<Switch disabled checked />`}
      >
        <div className="flex items-center justify-between gap-3">
          <Label>{t("notifications")}</Label>
          <Switch checked={states.a} onCheckedChange={() => toggle("a")} />
        </div>
        <div className="flex items-center justify-between gap-3">
          <Label>{t("sizeSm")}</Label>
          <Switch
            size="sm"
            checked={states.b}
            onCheckedChange={() => toggle("b")}
          />
        </div>
        <div className="flex items-center justify-between gap-3">
          <Label>{t("sizeLg")}</Label>
          <Switch
            size="lg"
            checked={states.c}
            onCheckedChange={() => toggle("c")}
          />
        </div>
        <div className="flex items-center justify-between gap-3 opacity-60">
          <Label>{t("disabled")}</Label>
          <Switch disabled checked />
        </div>
      </DemoBlock>

      <DemoBlock
        title={t("styleTones")}
        description={t("switchTonesHint")}
        previewClassName="flex-col items-stretch gap-4 sm:max-w-md"
        code={`<Switch tone="default" />
<Switch tone="soft" />
<Switch tone="success" />
<Switch tone="danger" />`}
      >
        {(
          [
            ["default", "toneDefault"],
            ["soft", "toneSoft"],
            ["success", "toneSuccess"],
            ["danger", "toneDanger"],
          ] as const
        ).map(([tone, labelKey]) => (
          <div
            key={tone}
            className="flex items-center justify-between gap-3"
          >
            <Label>{t(labelKey)}</Label>
            <Switch tone={tone} defaultChecked={tone !== "danger"} />
          </div>
        ))}
      </DemoBlock>

      <DemoBlock
        title={t("styleCard")}
        previewClassName="flex-col items-stretch gap-3 sm:max-w-lg"
        code={`<label className="flex items-start justify-between gap-4 rounded-xl border border-border bg-card p-4">
  <div>
    <p className="text-sm font-medium">Marketing</p>
    <p className="text-xs text-muted-foreground">Weekly digest emails</p>
  </div>
  <Switch />
</label>`}
      >
        <label className="flex cursor-pointer items-start justify-between gap-4 rounded-xl border border-border bg-card p-4">
          <div className="text-start">
            <p className="text-sm font-medium">{t("marketing")}</p>
            <p className="mt-0.5 text-xs text-muted-foreground">
              {t("marketingHint")}
            </p>
          </div>
          <Switch
            checked={states.d}
            onCheckedChange={() => toggle("d")}
          />
        </label>
        <label className="flex cursor-pointer items-start justify-between gap-4 rounded-xl border border-border/70 bg-muted/40 p-4">
          <div className="text-start">
            <p className="text-sm font-medium">{t("securityAlerts")}</p>
            <p className="mt-0.5 text-xs text-muted-foreground">
              {t("securityAlertsHint")}
            </p>
          </div>
          <Switch
            tone="success"
            checked={states.e}
            onCheckedChange={() => toggle("e")}
          />
        </label>
      </DemoBlock>
    </div>
  );
}

function CheckboxDemos() {
  const t = useTranslations("showcase");
  return (
    <div className="space-y-4">
      <DemoBlock
        title={t("styleDefault")}
        previewClassName="flex-col items-start gap-3"
        code={`<Checkbox defaultChecked />
<Checkbox size="sm" />
<Checkbox size="lg" />
<Checkbox disabled />`}
      >
        <div className="flex items-center gap-2">
          <Checkbox id="cb-def" defaultChecked />
          <Label htmlFor="cb-def">{t("remember")}</Label>
        </div>
        <div className="flex items-center gap-2">
          <Checkbox id="cb-sm" size="sm" />
          <Label htmlFor="cb-sm">{t("sizeSm")}</Label>
        </div>
        <div className="flex items-center gap-2">
          <Checkbox id="cb-lg" size="lg" defaultChecked />
          <Label htmlFor="cb-lg">{t("sizeLg")}</Label>
        </div>
        <div className="flex items-center gap-2 opacity-60">
          <Checkbox id="cb-dis" disabled />
          <Label htmlFor="cb-dis">{t("disabled")}</Label>
        </div>
      </DemoBlock>

      <DemoBlock
        title={t("styleAppearances")}
        previewClassName="flex-col items-start gap-3"
        code={`<Checkbox appearance="default" />
<Checkbox appearance="soft" />
<Checkbox appearance="outline" />`}
      >
        <div className="flex items-center gap-2">
          <Checkbox id="cb-a1" appearance="default" defaultChecked />
          <Label htmlFor="cb-a1">{t("toneDefault")}</Label>
        </div>
        <div className="flex items-center gap-2">
          <Checkbox id="cb-a2" appearance="soft" defaultChecked />
          <Label htmlFor="cb-a2">{t("toneSoft")}</Label>
        </div>
        <div className="flex items-center gap-2">
          <Checkbox id="cb-a3" appearance="outline" defaultChecked />
          <Label htmlFor="cb-a3">{t("styleOutline")}</Label>
        </div>
      </DemoBlock>

      <DemoBlock
        title={t("styleCard")}
        previewClassName="flex-col items-stretch gap-3 sm:max-w-lg"
        code={`<label className="flex items-start gap-3 rounded-xl border border-border p-4 has-[[data-state=checked]]:border-primary has-[[data-state=checked]]:bg-primary-soft">
  <Checkbox />
  <div>
    <p className="text-sm font-medium">Title</p>
    <p className="text-xs text-muted-foreground">Description</p>
  </div>
</label>`}
      >
        {(
          [
            ["cb-card-1", "marketing", "marketingHint", true],
            ["cb-card-2", "notifications", "securityAlertsHint", false],
          ] as const
        ).map(([id, titleKey, hintKey, checked]) => (
          <label
            key={id}
            className="flex cursor-pointer items-start gap-3 rounded-xl border border-border bg-card p-4 transition-colors has-[[data-state=checked]]:border-primary has-[[data-state=checked]]:bg-primary-soft"
          >
            <Checkbox id={id} defaultChecked={checked} className="mt-0.5" />
            <div className="text-start">
              <p className="text-sm font-medium">{t(titleKey)}</p>
              <p className="mt-0.5 text-xs text-muted-foreground">
                {t(hintKey)}
              </p>
            </div>
          </label>
        ))}
      </DemoBlock>
    </div>
  );
}

function RadioDemos() {
  const t = useTranslations("showcase");
  return (
    <div className="space-y-4">
      <DemoBlock
        title={t("styleList")}
        previewClassName="flex-col items-stretch sm:max-w-sm"
        code={`<RadioGroup defaultValue="pro" className="gap-3">
  <div className="flex items-center gap-2">
    <RadioGroupItem value="starter" id="r1" />
    <Label htmlFor="r1">Starter</Label>
  </div>
</RadioGroup>`}
      >
        <RadioGroup defaultValue="pro" className="gap-3">
          {(["starter", "pro", "agency"] as const).map((plan) => (
            <div key={plan} className="flex items-center gap-2">
              <RadioGroupItem value={plan} id={`list-${plan}`} />
              <Label htmlFor={`list-${plan}`} className="capitalize">
                {plan}
              </Label>
            </div>
          ))}
        </RadioGroup>
      </DemoBlock>

      <DemoBlock
        title={t("styleHorizontal")}
        code={`<RadioGroup defaultValue="fa" className="flex flex-wrap gap-4">…</RadioGroup>`}
      >
        <RadioGroup defaultValue="fa" className="flex flex-wrap gap-4">
          <div className="flex items-center gap-2">
            <RadioGroupItem value="fa" id="h-fa" />
            <Label htmlFor="h-fa">فارسی</Label>
          </div>
          <div className="flex items-center gap-2">
            <RadioGroupItem value="en" id="h-en" />
            <Label htmlFor="h-en">English</Label>
          </div>
        </RadioGroup>
      </DemoBlock>

      <DemoBlock
        title={t("styleCard")}
        previewClassName="flex-col items-stretch gap-3 sm:max-w-lg"
        code={`<RadioGroup className="grid gap-3">
  <label className="flex items-start gap-3 rounded-xl border p-4 has-[[data-state=checked]]:border-primary">
    <RadioGroupItem value="a" />
    …
  </label>
</RadioGroup>`}
      >
        <RadioGroup defaultValue="pro" className="grid gap-3">
          {(
            [
              ["starter", "planStarter", "planStarterHint"],
              ["pro", "planPro", "planProHint"],
              ["agency", "planAgency", "planAgencyHint"],
            ] as const
          ).map(([value, titleKey, hintKey]) => (
            <label
              key={value}
              className="flex cursor-pointer items-start gap-3 rounded-xl border border-border bg-card p-4 transition-colors has-[[data-state=checked]]:border-primary has-[[data-state=checked]]:bg-primary-soft"
            >
              <RadioGroupItem value={value} id={`card-${value}`} className="mt-0.5" />
              <div className="text-start">
                <p className="text-sm font-medium">{t(titleKey)}</p>
                <p className="mt-0.5 text-xs text-muted-foreground">
                  {t(hintKey)}
                </p>
              </div>
            </label>
          ))}
        </RadioGroup>
      </DemoBlock>

      <DemoBlock
        title={t("stylePill")}
        code={`<RadioGroup className="flex flex-wrap gap-2">
  <label className="rounded-full border px-3 py-1.5 has-[[data-state=checked]]:bg-primary has-[[data-state=checked]]:text-primary-foreground">
    <RadioGroupItem className="sr-only" />
    Label
  </label>
</RadioGroup>`}
      >
        <RadioGroup defaultValue="week" className="flex flex-wrap gap-2">
          {(
            [
              ["day", "rangeDay"],
              ["week", "rangeWeek"],
              ["month", "rangeMonth"],
            ] as const
          ).map(([value, labelKey]) => (
            <label
              key={value}
              className="inline-flex cursor-pointer items-center rounded-full border border-border bg-card px-3.5 py-1.5 text-sm transition-colors has-[[data-state=checked]]:border-primary has-[[data-state=checked]]:bg-primary has-[[data-state=checked]]:text-primary-foreground"
            >
              <RadioGroupItem value={value} className="sr-only" />
              {t(labelKey)}
            </label>
          ))}
        </RadioGroup>
      </DemoBlock>
    </div>
  );
}

function SelectDemos() {
  const t = useTranslations("showcase");
  return (
    <div className="space-y-4">
      <DemoBlock
        title={t("styleDefault")}
        previewClassName="flex-col items-stretch gap-3 sm:max-w-sm"
        code={`<Select defaultValue="fa">
  <SelectTrigger>
    <SelectValue placeholder="Locale" />
  </SelectTrigger>
  <SelectContent>
    <SelectItem value="fa">فارسی</SelectItem>
    <SelectItem value="en">English</SelectItem>
  </SelectContent>
</Select>`}
      >
        <Select defaultValue="fa">
          <SelectTrigger className="w-full">
            <SelectValue placeholder={t("locale")} />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="fa">فارسی</SelectItem>
            <SelectItem value="en">English</SelectItem>
          </SelectContent>
        </Select>
      </DemoBlock>

      <DemoBlock
        title={t("sizes")}
        previewClassName="flex-col items-stretch gap-3 sm:max-w-sm"
        code={`<SelectTrigger className="h-8 text-xs">…</SelectTrigger>
<SelectTrigger>Default</SelectTrigger>
<SelectTrigger className="h-12 text-base">…</SelectTrigger>`}
      >
        <Select defaultValue="sm">
          <SelectTrigger className="h-8 w-full text-xs">
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="sm">{t("sizeSm")}</SelectItem>
          </SelectContent>
        </Select>
        <Select defaultValue="md">
          <SelectTrigger className="w-full">
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="md">{t("default")}</SelectItem>
          </SelectContent>
        </Select>
        <Select defaultValue="lg">
          <SelectTrigger className="h-12 w-full text-base">
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="lg">{t("sizeLg")}</SelectItem>
          </SelectContent>
        </Select>
      </DemoBlock>

      <DemoBlock
        title={t("styleSoft")}
        previewClassName="flex-col items-stretch gap-3 sm:max-w-sm"
        code={`<SelectTrigger className="border-transparent bg-muted shadow-none">…
<SelectTrigger className="rounded-full">…`}
      >
        <Select defaultValue="soft">
          <SelectTrigger className="w-full border-transparent bg-muted shadow-none">
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="soft">{t("toneSoft")}</SelectItem>
            <SelectItem value="a">Option A</SelectItem>
          </SelectContent>
        </Select>
        <Select defaultValue="pill">
          <SelectTrigger className="w-full rounded-full px-4">
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="pill">{t("stylePill")}</SelectItem>
            <SelectItem value="b">Option B</SelectItem>
          </SelectContent>
        </Select>
      </DemoBlock>

      <DemoBlock
        title={t("withIcon")}
        previewClassName="sm:max-w-sm"
        code={`<SelectTrigger>
  <span className="flex items-center gap-2">
    <UserRound className="size-4" />
    <SelectValue />
  </span>
</SelectTrigger>`}
      >
        <Select defaultValue="sara">
          <SelectTrigger className="w-full">
            <span className="flex items-center gap-2">
              <UserRound className="size-4 text-muted-foreground" />
              <SelectValue />
            </span>
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="sara">Sara Ahmadi</SelectItem>
            <SelectItem value="reza">Reza Karimi</SelectItem>
          </SelectContent>
        </Select>
      </DemoBlock>
    </div>
  );
}

function TextareaDemos() {
  const t = useTranslations("showcase");
  return (
    <div className="space-y-4">
      <DemoBlock
        title={t("styleDefault")}
        previewClassName="w-full flex-col items-stretch gap-3 sm:max-w-lg"
        code={`<Textarea rows={4} placeholder="…" />
<Textarea rows={3} disabled defaultValue="Disabled" />`}
      >
        <Textarea rows={4} placeholder={t("notes")} className="w-full" />
        <Textarea
          rows={3}
          disabled
          defaultValue={t("disabled")}
          className="w-full"
        />
      </DemoBlock>
      <DemoBlock
        title={t("styleSoft")}
        previewClassName="w-full flex-col items-stretch gap-3 sm:max-w-lg"
        code={`<Textarea className="border-transparent bg-muted shadow-none" />
<Textarea className="min-h-32 rounded-2xl" />`}
      >
        <Textarea
          rows={3}
          className="w-full border-transparent bg-muted shadow-none"
          placeholder={t("toneSoft")}
        />
        <Textarea
          className="min-h-32 w-full rounded-2xl"
          placeholder={t("styleRounded")}
        />
      </DemoBlock>
    </div>
  );
}

function BadgeDemos() {
  const t = useTranslations("showcase");
  return (
    <div className="space-y-4">
      <DemoBlock
        title={t("styleVariants")}
        code={`<Badge>Default</Badge>
<Badge variant="secondary">Secondary</Badge>
<Badge variant="outline">Outline</Badge>
<Badge variant="success">Success</Badge>
<Badge variant="warning">Warning</Badge>
<Badge variant="destructive">Destructive</Badge>`}
      >
        <Badge>{t("default")}</Badge>
        <Badge variant="secondary">{t("secondary")}</Badge>
        <Badge variant="outline">{t("outline")}</Badge>
        <Badge variant="success">{t("success")}</Badge>
        <Badge variant="warning">{t("warning")}</Badge>
        <Badge variant="destructive">{t("destructive")}</Badge>
      </DemoBlock>
      <DemoBlock
        title={t("withIcon")}
        code={`<Badge className="gap-1"><Check className="size-3" /> Done</Badge>`}
      >
        <Badge className="gap-1">
          <Check className="size-3" /> {t("success")}
        </Badge>
        <Badge variant="outline" className="gap-1 rounded-full px-3">
          {t("stylePill")}
        </Badge>
        <Badge variant="secondary" className="rounded-sm">
          {t("styleSoft")}
        </Badge>
      </DemoBlock>
    </div>
  );
}

function AlertDemos() {
  const t = useTranslations("showcase");
  return (
    <div className="space-y-4">
      <DemoBlock
        title={t("styleVariants")}
        previewClassName="flex-col items-stretch w-full gap-3"
        code={`<Alert title="Default">…</Alert>
<Alert variant="info" title="Info">…</Alert>
<Alert variant="success" title="Success">…</Alert>
<Alert variant="warning" title="Warning">…</Alert>
<Alert variant="danger" title="Error">…</Alert>`}
      >
        <Alert title={t("default")}>{t("alertInfoBody")}</Alert>
        <Alert variant="info" title={t("info")}>
          {t("alertInfoBody")}
        </Alert>
        <Alert variant="success" title={t("success")}>
          {t("alertInfoBody")}
        </Alert>
        <Alert variant="warning" title={t("warning")}>
          {t("alertInfoBody")}
        </Alert>
        <Alert variant="danger" title={t("error")}>
          {t("alertErrorBody")}
        </Alert>
      </DemoBlock>
      <DemoBlock
        title={t("styleCompact")}
        previewClassName="flex-col items-stretch w-full"
        code={`<Alert hideIcon title="Compact">Short message</Alert>`}
      >
        <Alert hideIcon title={t("styleCompact")} className="py-2.5">
          {t("alertInfoBody")}
        </Alert>
      </DemoBlock>
    </div>
  );
}

function TabsDemos() {
  const t = useTranslations("showcase");
  return (
    <div className="space-y-4">
      <DemoBlock
        title={t("styleDefault")}
        previewClassName="flex-col items-stretch w-full sm:max-w-lg"
        code={`<Tabs defaultValue="one">
  <TabsList>
    <TabsTrigger value="one">One</TabsTrigger>
    <TabsTrigger value="two">Two</TabsTrigger>
  </TabsList>
</Tabs>`}
      >
        <Tabs defaultValue="one" className="w-full">
          <TabsList>
            <TabsTrigger value="one">{t("tabOne")}</TabsTrigger>
            <TabsTrigger value="two">{t("tabTwo")}</TabsTrigger>
            <TabsTrigger value="three">{t("tabThree")}</TabsTrigger>
          </TabsList>
          <TabsContent value="one" className="pt-3 text-sm text-muted-foreground">
            {t("tabOneBody")}
          </TabsContent>
          <TabsContent value="two" className="pt-3 text-sm text-muted-foreground">
            {t("tabTwoBody")}
          </TabsContent>
          <TabsContent
            value="three"
            className="pt-3 text-sm text-muted-foreground"
          >
            {t("tabThreeBody")}
          </TabsContent>
        </Tabs>
      </DemoBlock>

      <DemoBlock
        title={t("styleUnderline")}
        previewClassName="flex-col items-stretch w-full sm:max-w-lg"
        code={`<TabsList className="h-auto rounded-none bg-transparent p-0">
  <TabsTrigger className="rounded-none border-b-2 border-transparent data-[state=active]:border-primary data-[state=active]:bg-transparent data-[state=active]:shadow-none">
    Tab
  </TabsTrigger>
</TabsList>`}
      >
        <Tabs defaultValue="one" className="w-full">
          <TabsList className="h-auto w-full justify-start rounded-none bg-transparent p-0">
            {(["one", "two", "three"] as const).map((v, i) => (
              <TabsTrigger
                key={v}
                value={v}
                className="rounded-none border-b-2 border-transparent data-[state=active]:border-primary data-[state=active]:bg-transparent data-[state=active]:shadow-none"
              >
                {t((["tabOne", "tabTwo", "tabThree"] as const)[i])}
              </TabsTrigger>
            ))}
          </TabsList>
          <TabsContent value="one" className="pt-3 text-sm text-muted-foreground">
            {t("tabOneBody")}
          </TabsContent>
          <TabsContent value="two" className="pt-3 text-sm text-muted-foreground">
            {t("tabTwoBody")}
          </TabsContent>
          <TabsContent
            value="three"
            className="pt-3 text-sm text-muted-foreground"
          >
            {t("tabThreeBody")}
          </TabsContent>
        </Tabs>
      </DemoBlock>

      <DemoBlock
        title={t("stylePill")}
        previewClassName="flex-col items-stretch w-full sm:max-w-lg"
        code={`<TabsList className="rounded-full p-1">
  <TabsTrigger className="rounded-full">…</TabsTrigger>
</TabsList>`}
      >
        <Tabs defaultValue="one" className="w-full">
          <TabsList className={cn("rounded-full p-1")}>
            <TabsTrigger value="one" className="rounded-full">
              {t("tabOne")}
            </TabsTrigger>
            <TabsTrigger value="two" className="rounded-full">
              {t("tabTwo")}
            </TabsTrigger>
          </TabsList>
          <TabsContent value="one" className="pt-3 text-sm text-muted-foreground">
            {t("tabOneBody")}
          </TabsContent>
          <TabsContent value="two" className="pt-3 text-sm text-muted-foreground">
            {t("tabTwoBody")}
          </TabsContent>
        </Tabs>
      </DemoBlock>
    </div>
  );
}

const RENDERERS: Record<ComponentDemoSlug, () => React.ReactNode> = {
  button: ButtonDemos,
  input: InputDemos,
  switch: SwitchDemos,
  checkbox: CheckboxDemos,
  radio: RadioDemos,
  select: SelectDemos,
  textarea: TextareaDemos,
  badge: BadgeDemos,
  alert: AlertDemos,
  tabs: TabsDemos,
  map: MapDemos,
  charts: ChartsDemos,
  forms: FormsDemos,
  slider: SliderDemos,
  table: TableDemos,
  skeleton: SkeletonDemos,
  datetime: DateTimeDemos,
  cards: CardsDemos,
  modal: ModalDemos,
  dropdown: DropdownDemos,
  "file-upload": FileUploadDemos,
  validation: ValidationDemos,
  "rich-text": RichTextDemos,
  tooltip: TooltipDemos,
  drawer: DrawerDemos,
  carousel: CarouselDemos,
  hooks: HooksDemos,
};

export function ComponentDemoPage({ slug }: { slug: string }) {
  const t = useTranslations("showcase");
  if (!isComponentDemoSlug(slug)) notFound();
  const meta = COMPONENT_DEMOS.find((item) => item.slug === slug)!;
  const Renderer = RENDERERS[slug];

  return (
    <div className="space-y-6">
      <PageHeader
        title={t(meta.labelKey)}
        description={t("componentStylesHint")}
      />
      <Renderer />
    </div>
  );
}
