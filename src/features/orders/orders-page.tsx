"use client";

import * as React from "react";
import { useLocale, useTranslations } from "next-intl";
import {
  type ColumnDef,
  type RowSelectionState,
  type SortingState,
} from "@tanstack/react-table";
import {
  Eye,
  MoreHorizontal,
  Pencil,
  Plus,
  Trash2,
} from "lucide-react";
import { toast } from "sonner";
import {
  useDeleteOrder,
  useDeleteOrders,
  useOrders,
} from "@/features/orders/hooks";
import { OrderDetailsDrawer } from "@/features/orders/order-details-drawer";
import { OrderFormDrawer } from "@/features/orders/order-form-drawer";
import {
  ORDER_STATUSES,
  PAYMENT_STATUSES,
} from "@/features/orders/schemas";
import { PageHeader } from "@/components/shared/page-header";
import { DataTable } from "@/components/shared/data-table";
import { AreaChart } from "@/components/charts/charts";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
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
import { formatCurrency, formatDate, formatNumber } from "@/utils";
import type { Order } from "@/types";

const ALL = "__all__";

export function OrdersPageView() {
  const t = useTranslations();
  const locale = useLocale();
  const hasPermission = useAuthStore((s) => s.hasPermission);

  const canCreate = hasPermission("orders:create");
  const canEdit = hasPermission("orders:edit");
  const canDelete = hasPermission("orders:delete");

  const [search, setSearch] = React.useState("");
  const [statusFilter, setStatusFilter] = React.useState(ALL);
  const [paymentFilter, setPaymentFilter] = React.useState(ALL);
  const [pageIndex, setPageIndex] = React.useState(0);
  const [pageSize, setPageSize] = React.useState(10);
  const [sorting, setSorting] = React.useState<SortingState>([
    { id: "createdAt", desc: true },
  ]);
  const [rowSelection, setRowSelection] = React.useState<RowSelectionState>({});

  const [formOpen, setFormOpen] = React.useState(false);
  const [editing, setEditing] = React.useState<Order | null>(null);
  const [detailsOrder, setDetailsOrder] = React.useState<Order | null>(null);
  const [detailsOpen, setDetailsOpen] = React.useState(false);

  const filters = React.useMemo(() => {
    const next: Record<string, string | undefined> = {};
    if (statusFilter !== ALL) next.status = statusFilter;
    if (paymentFilter !== ALL) next.paymentStatus = paymentFilter;
    return Object.keys(next).length ? next : undefined;
  }, [paymentFilter, statusFilter]);

  const query = useOrders({
    page: pageIndex + 1,
    pageSize,
    search: search || undefined,
    sortBy: sorting[0]?.id,
    sortOrder: sorting[0]?.desc ? "desc" : "asc",
    filters,
  });

  const deleteOrder = useDeleteOrder();
  const deleteOrders = useDeleteOrders();

  const localeTag = locale === "fa" ? "fa-IR" : "en-US";

  const revenueSeries = React.useMemo(() => {
    const labels =
      locale === "fa"
        ? ["ه۱", "ه۲", "ه۳", "ه۴", "ه۵", "ه۶"]
        : ["W1", "W2", "W3", "W4", "W5", "W6"];
    const rows = query.data?.data ?? [];
    const base =
      rows.reduce((sum, order) => sum + order.total, 0) / Math.max(rows.length, 1) ||
      50_000_000;
    return labels.map((label, index) => ({
      label,
      value: Math.round(base * (0.7 + index * 0.12) + (index % 2) * base * 0.05),
    }));
  }, [locale, query.data?.data]);

  const stats = React.useMemo(() => {
    const rows = query.data?.data ?? [];
    const pageRevenue = rows.reduce((sum, order) => sum + order.total, 0);
    const unpaid = rows.filter((order) => order.paymentStatus === "unpaid")
      .length;
    return {
      total: query.data?.total ?? 0,
      pageRevenue,
      unpaid,
    };
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

  function openEdit(order: Order) {
    setDetailsOpen(false);
    setEditing(order);
    setFormOpen(true);
  }

  function openDetails(order: Order) {
    setDetailsOrder(order);
    setDetailsOpen(true);
  }

  const handleDeleteOne = React.useCallback(
    async (order: Order) => {
      try {
        await deleteOrder.mutateAsync(order.id);
        setDetailsOpen(false);
        setRowSelection((prev) => {
          const next = { ...prev };
          delete next[order.id];
          return next;
        });
        toast.success(t("orders.deleted"));
      } catch {
        toast.error(t("common.errorDescription"));
      }
    },
    [deleteOrder, t],
  );

  async function handleBulkDelete() {
    const ids = Object.keys(rowSelection);
    if (!ids.length) return;
    try {
      await deleteOrders.mutateAsync(ids);
      setRowSelection({});
      toast.success(t("orders.bulkDeleted"));
    } catch {
      toast.error(t("common.errorDescription"));
    }
  }

  const columns = React.useMemo<ColumnDef<Order>[]>(
    () => [
      {
        accessorKey: "orderNumber",
        header: t("orders.orderNumber"),
        cell: ({ row }) => (
          <button
            type="button"
            className="font-medium hover:text-primary hover:underline"
            onClick={() => openDetails(row.original)}
          >
            {row.original.orderNumber}
          </button>
        ),
      },
      {
        accessorKey: "customerName",
        header: t("orders.customer"),
        cell: ({ row }) =>
          locale === "fa"
            ? row.original.customerName
            : row.original.customerNameEn,
      },
      {
        accessorKey: "total",
        header: t("orders.total"),
        cell: ({ row }) => formatCurrency(row.original.total, localeTag),
      },
      {
        accessorKey: "items",
        header: t("orders.items"),
        cell: ({ row }) => formatNumber(row.original.items, localeTag),
      },
      {
        accessorKey: "status",
        header: t("orders.fulfillmentStatus"),
        cell: ({ row }) => (
          <Badge
            variant={
              row.original.status === "delivered"
                ? "success"
                : row.original.status === "cancelled"
                  ? "destructive"
                  : row.original.status === "pending"
                    ? "warning"
                    : "secondary"
            }
          >
            {t(`orders.statuses.${row.original.status}`)}
          </Badge>
        ),
      },
      {
        accessorKey: "paymentStatus",
        header: t("orders.payment"),
        cell: ({ row }) => (
          <Badge
            variant={
              row.original.paymentStatus === "paid"
                ? "success"
                : row.original.paymentStatus === "refunded"
                  ? "outline"
                  : "warning"
            }
          >
            {t(`orders.payments.${row.original.paymentStatus}`)}
          </Badge>
        ),
      },
      {
        accessorKey: "createdAt",
        header: t("orders.createdAt"),
        cell: ({ row }) => formatDate(row.original.createdAt, localeTag),
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
                {t("orders.viewDetails")}
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
        title={t("orders.title")}
        description={t("orders.subtitle")}
        actions={
          canCreate ? (
            <Button onClick={openCreate}>
              <Plus className="size-4" />
              {t("orders.add")}
            </Button>
          ) : null
        }
      />

      <div className="grid grid-cols-12 gap-3 lg:gap-4">
        <Surface elevated className="col-span-12 p-4 sm:p-5">
          <div className="mb-3 flex flex-wrap items-end justify-between gap-4">
            <div className="max-w-xl space-y-1 text-start">
              <h3 className="text-sm font-medium text-muted-foreground">
                {t("orders.revenueTitle")}
              </h3>
              <p className="text-xs text-muted-foreground/80">
                {t("orders.revenueSubtitle")}
              </p>
            </div>
            <div className="flex flex-wrap gap-6 text-start">
              <div>
                <p className="text-xs text-muted-foreground">
                  {t("orders.totalOrders")}
                </p>
                <p className="text-2xl font-semibold tracking-tight">
                  {formatNumber(stats.total, localeTag)}
                </p>
              </div>
              <div>
                <p className="text-xs text-muted-foreground">
                  {t("orders.pageRevenue")}
                </p>
                <p className="text-2xl font-semibold tracking-tight">
                  {formatCurrency(stats.pageRevenue, localeTag)}
                </p>
              </div>
              <div>
                <p className="text-xs text-muted-foreground">
                  {t("orders.unpaidOnPage")}
                </p>
                <p className="text-2xl font-semibold tracking-tight text-warning">
                  {formatNumber(stats.unpaid, localeTag)}
                </p>
              </div>
            </div>
          </div>
          <AreaChart
            data={revenueSeries}
            name={t("orders.total")}
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
        searchPlaceholder={t("orders.searchPlaceholder")}
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
        exportFilename="orders"
        emptyTitle={t("common.emptyTitle")}
        emptyDescription={t("orders.emptyDescription")}
        toolbarExtra={
          <div className="flex flex-wrap items-center gap-2">
            <Select
              value={statusFilter}
              onValueChange={(value) => {
                setStatusFilter(value);
                setPageIndex(0);
              }}
            >
              <SelectTrigger className="h-9 w-[10.5rem]">
                <SelectValue placeholder={t("orders.fulfillmentStatus")} />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value={ALL}>{t("orders.allStatuses")}</SelectItem>
                {ORDER_STATUSES.map((status) => (
                  <SelectItem key={status} value={status}>
                    {t(`orders.statuses.${status}`)}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>

            <Select
              value={paymentFilter}
              onValueChange={(value) => {
                setPaymentFilter(value);
                setPageIndex(0);
              }}
            >
              <SelectTrigger className="h-9 w-[9.5rem]">
                <SelectValue placeholder={t("orders.payment")} />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value={ALL}>{t("orders.allPayments")}</SelectItem>
                {PAYMENT_STATUSES.map((status) => (
                  <SelectItem key={status} value={status}>
                    {t(`orders.payments.${status}`)}
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
                loading={deleteOrders.isPending}
                onClick={() => void handleBulkDelete()}
              >
                {t("common.bulkDelete")}
              </Button>
            </div>
          ) : null
        }
      />

      <OrderFormDrawer
        key={editing?.id ?? "order-create"}
        open={formOpen}
        onOpenChange={setFormOpen}
        order={editing}
      />

      <OrderDetailsDrawer
        key={detailsOrder?.id ?? "order-details"}
        order={detailsOrder}
        open={detailsOpen}
        onOpenChange={setDetailsOpen}
        canEdit={canEdit}
        canDelete={canDelete}
        onEdit={openEdit}
        onDelete={(order) => void handleDeleteOne(order)}
      />
    </div>
  );
}
