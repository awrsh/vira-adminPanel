import { setRequestLocale, getTranslations } from "next-intl/server";
import { PageHeader } from "@/components/shared/page-header";
import { EmptyState } from "@/components/shared/empty-state";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Surface } from "@/components/ui/surface";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

interface DesignSystemPageProps {
  params: Promise<{ locale: string }>;
}

/** QA surface for Atlas Editorial primitives across locales and themes. */
export default async function DesignSystemPage({
  params,
}: DesignSystemPageProps) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations("designSystem");
  const tc = await getTranslations("common");

  return (
    <main id="main-content" className="mx-auto max-w-5xl space-y-10 px-4 py-10 sm:px-6">
      <PageHeader title={t("title")} description={t("subtitle")} />

      <section className="space-y-4">
        <h2 className="text-sm font-semibold uppercase tracking-wide text-muted-foreground">
          Buttons
        </h2>
        <div className="flex flex-wrap gap-2">
          <Button>{tc("save")}</Button>
          <Button variant="secondary">{tc("cancel")}</Button>
          <Button variant="outline">{tc("export")}</Button>
          <Button variant="ghost">{tc("edit")}</Button>
          <Button variant="destructive">{tc("delete")}</Button>
          <Button loading>{tc("loading")}</Button>
        </div>
      </section>

      <section className="space-y-4">
        <h2 className="text-sm font-semibold uppercase tracking-wide text-muted-foreground">
          Badges
        </h2>
        <div className="flex flex-wrap gap-2">
          <Badge>{tc("active")}</Badge>
          <Badge variant="secondary">{tc("pending")}</Badge>
          <Badge variant="outline">{tc("status")}</Badge>
          <Badge variant="success">{tc("success")}</Badge>
          <Badge variant="warning">{tc("pending")}</Badge>
          <Badge variant="destructive">{tc("error")}</Badge>
        </div>
      </section>

      <section className="grid gap-4 md:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle>Card</CardTitle>
            <CardDescription>{t("subtitle")}</CardDescription>
          </CardHeader>
          <CardContent>
            <Input floatingLabel={tc("search")} />
          </CardContent>
        </Card>
        <Surface elevated padding glass>
          <p className="text-sm font-medium text-foreground">Surface · glass</p>
          <p className="mt-1 text-sm text-muted-foreground">{tc("appName")}</p>
        </Surface>
      </section>

      <Tabs defaultValue="one">
        <TabsList>
          <TabsTrigger value="one">{tc("light")}</TabsTrigger>
          <TabsTrigger value="two">{tc("dark")}</TabsTrigger>
          <TabsTrigger value="three">{tc("system")}</TabsTrigger>
        </TabsList>
        <TabsContent value="one">
          <Surface padding>
            <p className="text-sm text-muted-foreground">{tc("theme")}</p>
          </Surface>
        </TabsContent>
        <TabsContent value="two">
          <Surface padding>
            <p className="text-sm text-muted-foreground">{tc("dark")}</p>
          </Surface>
        </TabsContent>
        <TabsContent value="three">
          <EmptyState title={tc("emptyTitle")} description={tc("emptyDescription")} />
        </TabsContent>
      </Tabs>
    </main>
  );
}
