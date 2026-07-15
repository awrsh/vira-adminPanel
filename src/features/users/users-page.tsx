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
  useDeleteUser,
  useDeleteUsers,
  useUpdateUser,
  useUsers,
} from "@/features/users/hooks";
import { UserDetailsDrawer } from "@/features/users/user-details-drawer";
import { UserFormDrawer } from "@/features/users/user-form-drawer";
import { USER_ROLES, USER_STATUSES } from "@/features/users/schemas";
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
import { formatDate } from "@/utils";
import type { Role, User } from "@/types";

const ALL = "__all__";

export function UsersPageView() {
  const t = useTranslations();
  const locale = useLocale();
  const hasPermission = useAuthStore((s) => s.hasPermission);

  const canCreate = hasPermission("users:create");
  const canEdit = hasPermission("users:edit");
  const canDelete = hasPermission("users:delete");

  const [search, setSearch] = React.useState("");
  const [roleFilter, setRoleFilter] = React.useState<string>(ALL);
  const [statusFilter, setStatusFilter] = React.useState<string>(ALL);
  const [pageIndex, setPageIndex] = React.useState(0);
  const [pageSize, setPageSize] = React.useState(10);
  const [sorting, setSorting] = React.useState<SortingState>([
    { id: "createdAt", desc: true },
  ]);
  const [rowSelection, setRowSelection] = React.useState<RowSelectionState>({});
  const [bulkRole, setBulkRole] = React.useState<Role | "">("");

  const [formOpen, setFormOpen] = React.useState(false);
  const [editing, setEditing] = React.useState<User | null>(null);
  const [detailsUser, setDetailsUser] = React.useState<User | null>(null);
  const [detailsOpen, setDetailsOpen] = React.useState(false);

  const filters = React.useMemo(() => {
    const next: Record<string, string | undefined> = {};
    if (roleFilter !== ALL) next.role = roleFilter;
    if (statusFilter !== ALL) next.status = statusFilter;
    return Object.keys(next).length ? next : undefined;
  }, [roleFilter, statusFilter]);

  const query = useUsers({
    page: pageIndex + 1,
    pageSize,
    search: search || undefined,
    sortBy: sorting[0]?.id,
    sortOrder: sorting[0]?.desc ? "desc" : "asc",
    filters,
  });

  const deleteUser = useDeleteUser();
  const deleteUsers = useDeleteUsers();
  const updateUser = useUpdateUser();

  React.useEffect(() => {
    if (typeof window === "undefined") return;
    const params = new URLSearchParams(window.location.search);
    if (params.get("action") === "create" && canCreate) {
      openCreate();
    }
  }, [canCreate]);

  const growthSeries = React.useMemo(() => {
    const labels =
      locale === "fa"
        ? ["ه۱", "ه۲", "ه۳", "ه۴", "ه۵", "ه۶"]
        : ["W1", "W2", "W3", "W4", "W5", "W6"];
    const total = query.data?.total ?? 80;
    const base = Math.max(8, Math.round(total / 12));
    return labels.map((label, index) => ({
      label,
      value: base + index * Math.round(base * 0.35) + (index % 2) * 3,
    }));
  }, [locale, query.data?.total]);

  function openCreate() {
    setEditing(null);
    setFormOpen(true);
  }

  function openEdit(user: User) {
    setDetailsOpen(false);
    setEditing(user);
    setFormOpen(true);
  }

  function openDetails(user: User) {
    setDetailsUser(user);
    setDetailsOpen(true);
  }

  const handleDeleteOne = React.useCallback(
    async (user: User) => {
      try {
        await deleteUser.mutateAsync(user.id);
        setDetailsOpen(false);
        setRowSelection((prev) => {
          const next = { ...prev };
          delete next[user.id];
          return next;
        });
        toast.success(t("users.deleted"));
      } catch {
        toast.error(t("common.errorDescription"));
      }
    },
    [deleteUser, t],
  );

  async function handleBulkDelete() {
    const ids = Object.keys(rowSelection);
    if (!ids.length) return;
    try {
      await deleteUsers.mutateAsync(ids);
      setRowSelection({});
      toast.success(t("users.bulkDeleted"));
    } catch {
      toast.error(t("common.errorDescription"));
    }
  }

  async function handleBulkRoleAssign() {
    const ids = Object.keys(rowSelection);
    if (!ids.length || !bulkRole) return;
    try {
      await Promise.all(
        ids.map((id) =>
          updateUser.mutateAsync({ id, patch: { role: bulkRole } }),
        ),
      );
      setRowSelection({});
      setBulkRole("");
      toast.success(t("users.bulkRoleAssigned"));
    } catch {
      toast.error(t("common.errorDescription"));
    }
  }

  const columns = React.useMemo<ColumnDef<User>[]>(
    () => [
      {
        accessorKey: "name",
        header: t("users.name"),
        cell: ({ row }) => {
          const name =
            locale === "fa" ? row.original.name : row.original.nameEn;
          return (
            <button
              type="button"
              className="text-start font-medium text-foreground hover:text-primary hover:underline"
              onClick={() => openDetails(row.original)}
            >
              {name}
            </button>
          );
        },
      },
      { accessorKey: "email", header: t("users.email") },
      { accessorKey: "phone", header: t("users.phone") },
      {
        accessorKey: "city",
        header: t("users.city"),
        cell: ({ row }) =>
          locale === "fa" ? row.original.city : row.original.cityEn,
      },
      {
        accessorKey: "role",
        header: t("users.role"),
        cell: ({ row }) => (
          <Badge variant="secondary">
            {t(`users.roles.${row.original.role}`)}
          </Badge>
        ),
      },
      {
        accessorKey: "status",
        header: t("common.status"),
        cell: ({ row }) => (
          <Badge
            variant={
              row.original.status === "active"
                ? "success"
                : row.original.status === "pending"
                  ? "warning"
                  : "outline"
            }
          >
            {t(`users.statuses.${row.original.status}`)}
          </Badge>
        ),
      },
      {
        accessorKey: "createdAt",
        header: t("users.createdAt"),
        cell: ({ row }) =>
          formatDate(
            row.original.createdAt,
            locale === "fa" ? "fa-IR" : "en-US",
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
                {t("users.viewDetails")}
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
    [canDelete, canEdit, handleDeleteOne, locale, t],
  );

  const selectedCount = Object.keys(rowSelection).length;

  return (
    <div className="space-y-8">
      <PageHeader
        title={t("users.title")}
        description={t("users.subtitle")}
        actions={
          canCreate ? (
            <Button onClick={openCreate}>
              <Plus className="size-4" />
              {t("users.add")}
            </Button>
          ) : null
        }
      />

      <div className="grid grid-cols-12 gap-3 lg:gap-4">
        <Surface elevated className="col-span-12 p-4 sm:p-5">
          <div className="mb-3 flex flex-wrap items-end justify-between gap-4">
            <div className="max-w-xl space-y-1 text-start">
              <h3 className="text-sm font-medium text-muted-foreground">
                {t("users.growthTitle")}
              </h3>
              <p className="text-xs text-muted-foreground/80">
                {t("users.growthSubtitle")}
              </p>
            </div>
            <div className="text-start">
              <p className="text-xs text-muted-foreground">
                {t("users.totalUsers")}
              </p>
              <p className="text-3xl font-semibold tracking-tight">
                {query.data?.total ?? "—"}
              </p>
            </div>
          </div>
          <AreaChart
            data={growthSeries}
            name={t("users.growthTitle")}
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
        searchPlaceholder={t("users.searchPlaceholder")}
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
        enableRowSelection={canDelete || canEdit}
        manualPagination
        manualSorting
        manualFiltering
        exportFilename="users"
        emptyTitle={t("common.emptyTitle")}
        emptyDescription={t("users.emptyDescription")}
        toolbarExtra={
          <div className="flex flex-wrap items-center gap-2">
            <Select
              value={roleFilter}
              onValueChange={(value) => {
                setRoleFilter(value);
                setPageIndex(0);
              }}
            >
              <SelectTrigger className="h-9 w-[9.5rem]">
                <SelectValue placeholder={t("users.role")} />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value={ALL}>{t("users.allRoles")}</SelectItem>
                {USER_ROLES.map((role) => (
                  <SelectItem key={role} value={role}>
                    {t(`users.roles.${role}`)}
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
                <SelectItem value={ALL}>{t("users.allStatuses")}</SelectItem>
                {USER_STATUSES.map((status) => (
                  <SelectItem key={status} value={status}>
                    {t(`users.statuses.${status}`)}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        }
        bulkActions={
          selectedCount > 0 ? (
            <div className="flex flex-wrap items-center gap-2">
              <span className="text-xs text-muted-foreground">
                {t("common.selected", { count: selectedCount })}
              </span>
              {canEdit ? (
                <>
                  <Select
                    value={bulkRole || undefined}
                    onValueChange={(value) => setBulkRole(value as Role)}
                  >
                    <SelectTrigger className="h-8 w-[9rem]">
                      <SelectValue placeholder={t("users.assignRole")} />
                    </SelectTrigger>
                    <SelectContent>
                      {USER_ROLES.map((role) => (
                        <SelectItem key={role} value={role}>
                          {t(`users.roles.${role}`)}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  <Button
                    size="sm"
                    variant="secondary"
                    disabled={!bulkRole}
                    loading={updateUser.isPending}
                    onClick={() => void handleBulkRoleAssign()}
                  >
                    {t("users.applyRole")}
                  </Button>
                </>
              ) : null}
              {canDelete ? (
                <Button
                  variant="destructive"
                  size="sm"
                  loading={deleteUsers.isPending}
                  onClick={() => void handleBulkDelete()}
                >
                  {t("common.bulkDelete")}
                </Button>
              ) : null}
            </div>
          ) : null
        }
      />

      <UserFormDrawer
        open={formOpen}
        onOpenChange={setFormOpen}
        user={editing}
      />

      <UserDetailsDrawer
        user={detailsUser}
        open={detailsOpen}
        onOpenChange={setDetailsOpen}
        canEdit={canEdit}
        canDelete={canDelete}
        onEdit={openEdit}
        onDelete={(user) => void handleDeleteOne(user)}
      />
    </div>
  );
}
