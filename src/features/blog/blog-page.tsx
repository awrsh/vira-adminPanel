"use client";

import * as React from "react";
import { useLocale, useTranslations } from "next-intl";
import {
  type ColumnDef,
  type RowSelectionState,
  type SortingState,
} from "@tanstack/react-table";
import { Eye, MoreHorizontal, Pencil, Plus, Trash2 } from "lucide-react";
import { toast } from "sonner";
import {
  useBlogPosts,
  useDeleteBlogPost,
  useDeleteBlogPosts,
} from "@/features/blog/hooks";
import { BlogPostDetailsDrawer } from "@/features/blog/blog-details-drawer";
import { BlogPostFormDrawer } from "@/features/blog/blog-form-drawer";
import { BLOG_STATUSES } from "@/features/blog/schemas";
import { PageHeader } from "@/components/shared/page-header";
import { DataTable } from "@/components/shared/data-table";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
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
import { formatDate } from "@/utils";
import type { BlogPost } from "@/types";

const ALL = "__all__";

function statusVariant(status: BlogPost["status"]) {
  if (status === "published") return "default" as const;
  if (status === "archived") return "secondary" as const;
  return "outline" as const;
}

export function BlogPageView() {
  const t = useTranslations("blog");
  const locale = useLocale();
  const hasPermission = useAuthStore((s) => s.hasPermission);

  const canCreate = hasPermission("blog:create");
  const canEdit = hasPermission("blog:edit");
  const canDelete = hasPermission("blog:delete");

  const [search, setSearch] = React.useState("");
  const [statusFilter, setStatusFilter] = React.useState(ALL);
  const [pageIndex, setPageIndex] = React.useState(0);
  const [pageSize, setPageSize] = React.useState(10);
  const [sorting, setSorting] = React.useState<SortingState>([
    { id: "updatedAt", desc: true },
  ]);
  const [rowSelection, setRowSelection] = React.useState<RowSelectionState>({});

  const [formOpen, setFormOpen] = React.useState(false);
  const [editing, setEditing] = React.useState<BlogPost | null>(null);
  const [detailsPost, setDetailsPost] = React.useState<BlogPost | null>(null);
  const [detailsOpen, setDetailsOpen] = React.useState(false);

  const filters = React.useMemo(() => {
    if (statusFilter === ALL) return undefined;
    return { status: statusFilter };
  }, [statusFilter]);

  const query = useBlogPosts({
    page: pageIndex + 1,
    pageSize,
    search: search || undefined,
    sortBy: sorting[0]?.id,
    sortOrder: sorting[0]?.desc ? "desc" : "asc",
    filters,
  });

  const deletePost = useDeleteBlogPost();
  const deletePosts = useDeleteBlogPosts();
  const rows = query.data?.data ?? [];

  function openCreate() {
    setEditing(null);
    setFormOpen(true);
  }

  function openEdit(post: BlogPost) {
    setDetailsOpen(false);
    setEditing(post);
    setFormOpen(true);
  }

  function openDetails(post: BlogPost) {
    setDetailsPost(post);
    setDetailsOpen(true);
  }

  async function handleDelete(post: BlogPost) {
    try {
      await deletePost.mutateAsync(post.id);
      toast.success(t("deleted"));
    } catch {
      toast.error(t("error"));
    }
  }

  async function handleBulkDelete() {
    const ids = Object.keys(rowSelection);
    if (!ids.length) return;
    try {
      await deletePosts.mutateAsync(ids);
      setRowSelection({});
      toast.success(t("deleted"));
    } catch {
      toast.error(t("error"));
    }
  }

  const columns = React.useMemo<ColumnDef<BlogPost>[]>(
    () => [
      {
        accessorKey: "title",
        header: t("title"),
        cell: ({ row }) => (
          <button
            type="button"
            className="text-start font-medium hover:underline"
            onClick={() => openDetails(row.original)}
          >
            {locale === "fa" ? row.original.title : row.original.titleEn}
          </button>
        ),
      },
      {
        accessorKey: "category",
        header: t("category"),
        cell: ({ row }) =>
          locale === "fa" ? row.original.category : row.original.categoryEn,
      },
      {
        accessorKey: "status",
        header: t("status"),
        cell: ({ row }) => (
          <Badge variant={statusVariant(row.original.status)}>
            {t(`statuses.${row.original.status}`)}
          </Badge>
        ),
      },
      {
        accessorKey: "updatedAt",
        header: t("updated"),
        cell: ({ row }) => (
          <span dir="ltr">{formatDate(row.original.updatedAt, locale)}</span>
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
              <DropdownMenuItem onClick={() => openDetails(row.original)}>
                <Eye className="size-4" />
                {t("view")}
              </DropdownMenuItem>
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
              <SelectValue placeholder={t("status")} />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value={ALL}>{t("allStatuses")}</SelectItem>
              {BLOG_STATUSES.map((status) => (
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

      <BlogPostFormDrawer
        open={formOpen}
        onOpenChange={setFormOpen}
        post={editing}
      />
      <BlogPostDetailsDrawer
        open={detailsOpen}
        onOpenChange={setDetailsOpen}
        post={detailsPost}
        canEdit={canEdit}
        canDelete={canDelete}
        onEdit={openEdit}
      />
    </div>
  );
}
