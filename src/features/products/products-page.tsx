"use client";

import * as React from "react";
import { useLocale, useTranslations } from "next-intl";
import {
  type ColumnDef,
  type RowSelectionState,
  type SortingState,
} from "@tanstack/react-table";
import { Eye, MoreHorizontal, Package, Pencil, Plus, Trash2 } from "lucide-react";
import { toast } from "sonner";
import {
  useDeleteProduct,
  useDeleteProducts,
  useProducts,
} from "@/features/products/hooks";
import { ProductDetailsDrawer } from "@/features/products/product-details-drawer";
import { ProductFormDrawer } from "@/features/products/product-form-drawer";
import { PRODUCT_STATUSES } from "@/features/products/schemas";
import { useCategories } from "@/hooks/api";
import { PageHeader } from "@/components/shared/page-header";
import { DataTable } from "@/components/shared/data-table";
import { BarChart } from "@/components/charts/charts";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { ImagePreview } from "@/components/ui/image-preview";
import { Surface } from "@/components/ui/surface";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useAuthStore } from "@/stores/auth-store";
import { formatCurrency, formatNumber } from "@/utils";
import type { Product } from "@/types";

const ALL = "__all__";

export function ProductsPageView() {
  const t = useTranslations();
  const locale = useLocale();
  const hasPermission = useAuthStore((s) => s.hasPermission);

  const canCreate = hasPermission("products:create");
  const canEdit = hasPermission("products:edit");
  const canDelete = hasPermission("products:delete");

  const [search, setSearch] = React.useState("");
  const [categoryFilter, setCategoryFilter] = React.useState(ALL);
  const [statusFilter, setStatusFilter] = React.useState(ALL);
  const [pageIndex, setPageIndex] = React.useState(0);
  const [pageSize, setPageSize] = React.useState(10);
  const [sorting, setSorting] = React.useState<SortingState>([
    { id: "createdAt", desc: true },
  ]);
  const [rowSelection, setRowSelection] = React.useState<RowSelectionState>({});

  const [formOpen, setFormOpen] = React.useState(false);
  const [editing, setEditing] = React.useState<Product | null>(null);
  const [detailsProduct, setDetailsProduct] = React.useState<Product | null>(
    null,
  );
  const [detailsOpen, setDetailsOpen] = React.useState(false);

  const categoriesQuery = useCategories({ pageSize: 100, sortBy: "name" });
  const categories = categoriesQuery.data?.data ?? [];

  const filters = React.useMemo(() => {
    const next: Record<string, string | undefined> = {};
    if (categoryFilter !== ALL) next.category = categoryFilter;
    if (statusFilter !== ALL) next.status = statusFilter;
    return Object.keys(next).length ? next : undefined;
  }, [categoryFilter, statusFilter]);

  const query = useProducts({
    page: pageIndex + 1,
    pageSize,
    search: search || undefined,
    sortBy: sorting[0]?.id,
    sortOrder: sorting[0]?.desc ? "desc" : "asc",
    filters,
  });

  const deleteProduct = useDeleteProduct();
  const deleteProducts = useDeleteProducts();

  const inventorySeries = React.useMemo(() => {
    const rows = query.data?.data ?? [];
    if (!rows.length) {
      return [
        { label: "—", value: 0 },
      ];
    }
    return rows.slice(0, 6).map((product) => ({
      label: (locale === "fa" ? product.name : product.nameEn).slice(0, 10),
      value: product.stock,
    }));
  }, [locale, query.data?.data]);

  const inventoryStats = React.useMemo(() => {
    const rows = query.data?.data ?? [];
    const totalStock = rows.reduce((sum, item) => sum + item.stock, 0);
    const lowStock = rows.filter((item) => item.stock < 10).length;
    return { totalStock, lowStock, total: query.data?.total ?? 0 };
  }, [query.data?.data, query.data?.total]);

  function openCreate() {
    setEditing(null);
    setFormOpen(true);
  }

  React.useEffect(() => {
    if (typeof window === "undefined") return;
    const params = new URLSearchParams(window.location.search);
    if (params.get("action") !== "create" || !canCreate) return;
    const timer = window.setTimeout(() => openCreate(), 0);
    return () => window.clearTimeout(timer);
  }, [canCreate]);

  function openEdit(product: Product) {
    setDetailsOpen(false);
    setEditing(product);
    setFormOpen(true);
  }

  function openDetails(product: Product) {
    setDetailsProduct(product);
    setDetailsOpen(true);
  }

  const handleDeleteOne = React.useCallback(
    async (product: Product) => {
      try {
        await deleteProduct.mutateAsync(product.id);
        setDetailsOpen(false);
        setRowSelection((prev) => {
          const next = { ...prev };
          delete next[product.id];
          return next;
        });
        toast.success(t("products.deleted"));
      } catch {
        toast.error(t("common.errorDescription"));
      }
    },
    [deleteProduct, t],
  );

  async function handleBulkDelete() {
    const ids = Object.keys(rowSelection);
    if (!ids.length) return;
    try {
      await deleteProducts.mutateAsync(ids);
      setRowSelection({});
      toast.success(t("products.bulkDeleted"));
    } catch {
      toast.error(t("common.errorDescription"));
    }
  }

  const localeTag = locale === "fa" ? "fa-IR" : "en-US";

  const columns = React.useMemo<ColumnDef<Product>[]>(
    () => [
      {
        accessorKey: "name",
        header: t("products.name"),
        cell: ({ row }) => {
          const product = row.original;
          const name = locale === "fa" ? product.name : product.nameEn;
          return (
            <button
              type="button"
              className="flex items-center gap-3 text-start"
              onClick={() => openDetails(product)}
            >
              {product.image ? (
                <ImagePreview
                  src={product.image}
                  alt={name}
                  className="size-9 rounded-xl object-cover"
                />
              ) : (
                <span className="flex size-9 items-center justify-center rounded-xl bg-muted text-muted-foreground">
                  <Package className="size-4" />
                </span>
              )}
              <span className="font-medium hover:text-primary hover:underline">
                {name}
              </span>
            </button>
          );
        },
      },
      { accessorKey: "sku", header: t("products.sku") },
      {
        accessorKey: "category",
        header: t("products.category"),
        cell: ({ row }) =>
          locale === "fa" ? row.original.category : row.original.categoryEn,
      },
      {
        accessorKey: "price",
        header: t("products.price"),
        cell: ({ row }) => formatCurrency(row.original.price, localeTag),
      },
      {
        accessorKey: "stock",
        header: t("products.stock"),
        cell: ({ row }) => (
          <div className="flex items-center gap-2">
            <span>{formatNumber(row.original.stock, localeTag)}</span>
            {row.original.stock < 10 ? (
              <Badge variant="destructive">{t("products.lowStock")}</Badge>
            ) : null}
          </div>
        ),
      },
      {
        accessorKey: "status",
        header: t("common.status"),
        cell: ({ row }) => (
          <Badge
            variant={
              row.original.status === "published"
                ? "success"
                : row.original.status === "draft"
                  ? "warning"
                  : "outline"
            }
          >
            {t(`products.statuses.${row.original.status}`)}
          </Badge>
        ),
      },
      {
        id: "actions",
        enableSorting: false,
        header: t("common.actions"),
        cell: ({ row }) => (
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button
                variant="ghost"
                size="icon-sm"
                aria-label={t("common.actions")}
              >
                <MoreHorizontal className="size-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuItem onClick={() => openDetails(row.original)}>
                <Eye className="size-4" />
                {t("products.viewDetails")}
              </DropdownMenuItem>
              {canEdit ? (
                <DropdownMenuItem onClick={() => openEdit(row.original)}>
                  <Pencil className="size-4" />
                  {t("common.edit")}
                </DropdownMenuItem>
              ) : null}
              {canDelete ? (
                <>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem
                    className="text-destructive focus:text-destructive"
                    onClick={() => void handleDeleteOne(row.original)}
                  >
                    <Trash2 className="size-4" />
                    {t("common.delete")}
                  </DropdownMenuItem>
                </>
              ) : null}
            </DropdownMenuContent>
          </DropdownMenu>
        ),
      },
    ],
    [canDelete, canEdit, handleDeleteOne, locale, localeTag, t],
  );

  const selectedCount = Object.keys(rowSelection).length;

  return (
    <div className="space-y-8">
      <PageHeader
        title={t("products.title")}
        description={t("products.subtitle")}
        actions={
          canCreate ? (
            <Button onClick={openCreate}>
              <Plus className="size-4" />
              {t("products.add")}
            </Button>
          ) : null
        }
      />

      <div className="grid grid-cols-12 gap-3 lg:gap-4">
        <Surface elevated className="col-span-12 p-4 sm:p-5">
          <div className="mb-3 flex flex-wrap items-end justify-between gap-4">
            <div className="max-w-xl space-y-1 text-start">
              <h3 className="text-sm font-medium text-muted-foreground">
                {t("products.inventoryTitle")}
              </h3>
              <p className="text-xs text-muted-foreground/80">
                {t("products.inventorySubtitle")}
              </p>
            </div>
            <div className="flex flex-wrap gap-6 text-start">
              <div>
                <p className="text-xs text-muted-foreground">
                  {t("products.totalProducts")}
                </p>
                <p className="text-2xl font-semibold tracking-tight">
                  {formatNumber(inventoryStats.total, localeTag)}
                </p>
              </div>
              <div>
                <p className="text-xs text-muted-foreground">
                  {t("products.pageStock")}
                </p>
                <p className="text-2xl font-semibold tracking-tight">
                  {formatNumber(inventoryStats.totalStock, localeTag)}
                </p>
              </div>
              <div>
                <p className="text-xs text-muted-foreground">
                  {t("products.lowStockCount")}
                </p>
                <p className="text-2xl font-semibold tracking-tight text-destructive">
                  {formatNumber(inventoryStats.lowStock, localeTag)}
                </p>
              </div>
            </div>
          </div>
          <BarChart
            data={inventorySeries}
            name={t("products.stock")}
            showLegend={false}
            height={200}
          />
        </Surface>
      </div>

      <DataTable
        columns={columns}
        data={query.data?.data ?? []}
        getRowId={(row) => row.id}
        totalCount={query.data?.total}
        pageCount={query.data?.totalPages}
        isLoading={query.isLoading}
        isError={query.isError}
        onRetry={() => void query.refetch()}
        searchValue={search}
        onSearchChange={(value) => {
          setSearch(value);
          setPageIndex(0);
        }}
        searchPlaceholder={t("products.searchPlaceholder")}
        pageIndex={pageIndex}
        pageSize={pageSize}
        onPaginationChange={(nextPage, nextSize) => {
          setPageIndex(nextPage);
          setPageSize(nextSize);
        }}
        sorting={sorting}
        onSortingChange={setSorting}
        rowSelection={rowSelection}
        onRowSelectionChange={setRowSelection}
        enableRowSelection={canDelete}
        manualPagination
        manualSorting
        manualFiltering
        exportFilename="products"
        emptyTitle={t("common.emptyTitle")}
        emptyDescription={t("products.emptyDescription")}
        toolbarExtra={
          <div className="flex flex-wrap items-center gap-2">
            <Select
              value={categoryFilter}
              onValueChange={(value) => {
                setCategoryFilter(value);
                setPageIndex(0);
              }}
            >
              <SelectTrigger className="h-9 w-[10.5rem]">
                <SelectValue placeholder={t("products.category")} />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value={ALL}>{t("products.allCategories")}</SelectItem>
                {categories.map((category) => (
                  <SelectItem key={category.id} value={category.name}>
                    {locale === "fa" ? category.name : category.nameEn}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>

            <Select
              value={statusFilter}
              onValueChange={(value) => {
                setStatusFilter(value);
                setPageIndex(0);
              }}
            >
              <SelectTrigger className="h-9 w-[9.5rem]">
                <SelectValue placeholder={t("common.status")} />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value={ALL}>{t("products.allStatuses")}</SelectItem>
                {PRODUCT_STATUSES.map((status) => (
                  <SelectItem key={status} value={status}>
                    {t(`products.statuses.${status}`)}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        }
        bulkActions={
          selectedCount > 0 && canDelete ? (
            <div className="flex flex-wrap items-center gap-2">
              <span className="text-xs text-muted-foreground">
                {t("common.selected", { count: selectedCount })}
              </span>
              <Button
                variant="destructive"
                size="sm"
                loading={deleteProducts.isPending}
                onClick={() => void handleBulkDelete()}
              >
                {t("common.bulkDelete")}
              </Button>
            </div>
          ) : null
        }
      />

      <ProductFormDrawer
        key={editing?.id ?? "product-create"}
        open={formOpen}
        onOpenChange={setFormOpen}
        product={editing}
      />

      <ProductDetailsDrawer
        product={detailsProduct}
        open={detailsOpen}
        onOpenChange={setDetailsOpen}
        canEdit={canEdit}
        canDelete={canDelete}
        onEdit={openEdit}
        onDelete={(product) => void handleDeleteOne(product)}
      />
    </div>
  );
}
