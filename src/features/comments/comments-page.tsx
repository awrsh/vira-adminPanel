"use client";

import * as React from "react";
import { useLocale, useTranslations } from "next-intl";
import {
  type ColumnDef,
  type RowSelectionState,
  type SortingState,
} from "@tanstack/react-table";
import { MoreHorizontal, Pencil, Plus, Star, Trash2 } from "lucide-react";
import { toast } from "sonner";
import {
  useComments,
  useDeleteComment,
  useDeleteComments,
} from "@/features/comments/hooks";
import { CommentFormDrawer } from "@/features/comments/comment-form-drawer";
import { COMMENT_STATUSES } from "@/features/comments/schemas";
import { PageHeader } from "@/components/shared/page-header";
import { DataTable } from "@/components/shared/data-table";
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
import { cn, formatDate } from "@/utils";
import type { CustomerComment } from "@/types";

const ALL = "__all__";

function Stars({ value }: { value: number }) {
  return (
    <div className="flex items-center gap-0.5" dir="ltr">
      {Array.from({ length: 5 }).map((_, i) => (
        <Star
          key={i}
          className={cn(
            "size-3.5",
            i < value
              ? "fill-amber-400 text-amber-400"
              : "text-muted-foreground/40",
          )}
        />
      ))}
    </div>
  );
}

export function CommentsPage() {
  const t = useTranslations("comments");
  const locale = useLocale();
  const hasPermission = useAuthStore((s) => s.hasPermission);

  const canCreate = hasPermission("comments:create");
  const canEdit = hasPermission("comments:edit");
  const canDelete = hasPermission("comments:delete");

  const [search, setSearch] = React.useState("");
  const [statusFilter, setStatusFilter] = React.useState(ALL);
  const [pageIndex, setPageIndex] = React.useState(0);
  const [pageSize, setPageSize] = React.useState(10);
  const [sorting, setSorting] = React.useState<SortingState>([
    { id: "createdAt", desc: true },
  ]);
  const [rowSelection, setRowSelection] = React.useState<RowSelectionState>({});
  const [formOpen, setFormOpen] = React.useState(false);
  const [editing, setEditing] = React.useState<CustomerComment | null>(null);

  const filters = React.useMemo(() => {
    if (statusFilter === ALL) return undefined;
    return { status: statusFilter };
  }, [statusFilter]);

  const query = useComments({
    page: pageIndex + 1,
    pageSize,
    search: search || undefined,
    sortBy: sorting[0]?.id,
    sortOrder: sorting[0]?.desc ? "desc" : "asc",
    filters,
  });

  const deleteComment = useDeleteComment();
  const deleteComments = useDeleteComments();
  const rows = query.data?.data ?? [];
  const approved = rows.filter((c) => c.status === "approved");
  const avg =
    approved.reduce((sum, c) => sum + c.rating, 0) /
    Math.max(approved.length, 1);

  function openCreate() {
    setEditing(null);
    setFormOpen(true);
  }

  function openEdit(comment: CustomerComment) {
    setEditing(comment);
    setFormOpen(true);
  }

  async function handleDelete(comment: CustomerComment) {
    try {
      await deleteComment.mutateAsync(comment.id);
      toast.success(t("deleted"));
    } catch {
      toast.error(t("error"));
    }
  }

  async function handleBulkDelete() {
    const ids = Object.keys(rowSelection);
    if (!ids.length) return;
    try {
      await deleteComments.mutateAsync(ids);
      setRowSelection({});
      toast.success(t("deleted"));
    } catch {
      toast.error(t("error"));
    }
  }

  const columns = React.useMemo<ColumnDef<CustomerComment>[]>(
    () => [
      {
        accessorKey: "name",
        header: t("customer"),
        cell: ({ row }) =>
          locale === "fa" ? row.original.name : row.original.nameEn,
      },
      {
        accessorKey: "product",
        header: t("product"),
        cell: ({ row }) =>
          locale === "fa" ? row.original.product : row.original.productEn,
      },
      {
        accessorKey: "rating",
        header: t("rating"),
        cell: ({ row }) => <Stars value={row.original.rating} />,
      },
      {
        accessorKey: "status",
        header: t("statusLabel"),
        cell: ({ row }) => (
          <Badge variant="outline">
            {t(`statuses.${row.original.status}`)}
          </Badge>
        ),
      },
      {
        accessorKey: "createdAt",
        header: t("date"),
        cell: ({ row }) => (
          <span dir="ltr">{formatDate(row.original.createdAt, locale)}</span>
        ),
      },
      {
        id: "actions",
        cell: ({ row }) => (
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button size="icon-sm" variant="ghost" aria-label={t("actions")}>
                <MoreHorizontal className="size-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              {canEdit ? (
                <DropdownMenuItem onClick={() => openEdit(row.original)}>
                  <Pencil className="size-4" />
                  {t("edit")}
                </DropdownMenuItem>
              ) : null}
              {canDelete ? (
                <>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem
                    className="text-destructive focus:text-destructive"
                    onClick={() => void handleDelete(row.original)}
                  >
                    <Trash2 className="size-4" />
                    {t("delete")}
                  </DropdownMenuItem>
                </>
              ) : null}
            </DropdownMenuContent>
          </DropdownMenu>
        ),
      },
    ],
    [canDelete, canEdit, locale, t],
  );

  return (
    <div className="space-y-6">
      <PageHeader
        title={t("title")}
        description={t("subtitle")}
        actions={
          canCreate ? (
            <Button size="sm" onClick={openCreate}>
              <Plus className="size-4" />
              {t("create")}
            </Button>
          ) : null
        }
      />

      <Surface elevated className="p-5">
        <p className="text-sm text-muted-foreground">{t("avgLabel")}</p>
        <p className="mt-1 text-3xl font-semibold">{avg.toFixed(1)}</p>
        <p className="mt-1 text-xs text-muted-foreground">
          {t("count", { count: approved.length })}
        </p>
      </Surface>

      <DataTable
        columns={columns}
        data={rows}
        getRowId={(row) => row.id}
        totalCount={query.data?.total}
        pageCount={query.data?.totalPages}
        isLoading={query.isLoading}
        isError={query.isError}
        onRetry={() => void query.refetch()}
        searchPlaceholder={t("search")}
        searchValue={search}
        onSearchChange={(value) => {
          setSearch(value);
          setPageIndex(0);
        }}
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
        toolbarExtra={
          <Select
            value={statusFilter}
            onValueChange={(value) => {
              setStatusFilter(value);
              setPageIndex(0);
            }}
          >
            <SelectTrigger className="w-[10rem]">
              <SelectValue placeholder={t("statusLabel")} />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value={ALL}>{t("allStatuses")}</SelectItem>
              {COMMENT_STATUSES.map((status) => (
                <SelectItem key={status} value={status}>
                  {t(`statuses.${status}`)}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        }
        bulkActions={
          canDelete ? (
            <Button
              size="sm"
              variant="destructive"
              onClick={() => void handleBulkDelete()}
            >
              <Trash2 className="size-4" />
              {t("deleteSelected")}
            </Button>
          ) : null
        }
      />

      <CommentFormDrawer
        open={formOpen}
        onOpenChange={setFormOpen}
        comment={editing}
      />
    </div>
  );
}
