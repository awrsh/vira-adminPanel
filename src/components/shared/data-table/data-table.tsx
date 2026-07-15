"use client";

import * as React from "react";
import {
  flexRender,
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  useReactTable,
  type ColumnDef,
  type OnChangeFn,
  type RowSelectionState,
  type SortingState,
  type VisibilityState,
} from "@tanstack/react-table";
import {
  ChevronDown,
  ChevronLeft,
  ChevronRight,
  Download,
  FileSpreadsheet,
  Search,
  Columns3,
} from "lucide-react";
import { useTranslations } from "next-intl";
import { toast } from "sonner";
import { cn } from "@/utils";
import { EmptyState } from "@/components/shared/empty-state";
import { ErrorState } from "@/components/shared/error-state";
import { LoadingState } from "@/components/shared/loading-state";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Input } from "@/components/ui/input";
import { Surface } from "@/components/ui/surface";

export interface DataTableProps<TData> {
  columns: ColumnDef<TData, unknown>[];
  data: TData[];
  getRowId?: (row: TData) => string;
  /** Server-side total row count for pagination display */
  totalCount?: number;
  pageCount?: number;
  isLoading?: boolean;
  isError?: boolean;
  onRetry?: () => void;
  searchValue?: string;
  onSearchChange?: (value: string) => void;
  searchPlaceholder?: string;
  pageIndex?: number;
  pageSize?: number;
  onPaginationChange?: (pageIndex: number, pageSize: number) => void;
  sorting?: SortingState;
  onSortingChange?: OnChangeFn<SortingState>;
  rowSelection?: RowSelectionState;
  onRowSelectionChange?: OnChangeFn<RowSelectionState>;
  enableRowSelection?: boolean;
  bulkActions?: React.ReactNode;
  toolbarExtra?: React.ReactNode;
  exportFilename?: string;
  manualPagination?: boolean;
  manualSorting?: boolean;
  manualFiltering?: boolean;
  className?: string;
  emptyTitle?: string;
  emptyDescription?: string;
}

function escapeCsvCell(value: unknown): string {
  const raw =
    value == null
      ? ""
      : typeof value === "object"
        ? JSON.stringify(value)
        : String(value);
  if (/[",\n\r]/.test(raw)) {
    return `"${raw.replace(/"/g, '""')}"`;
  }
  return raw;
}

function exportRowsToCsv<TData>(
  rows: TData[],
  columns: ColumnDef<TData, unknown>[],
  filename: string,
): void {
  const exportable = columns.filter(
    (col) => col.id !== "select" && col.id !== "actions" && "accessorKey" in col,
  );

  const headers = exportable.map((col) => {
    if (typeof col.header === "string") return col.header;
    return col.id ?? ("accessorKey" in col ? String(col.accessorKey) : "");
  });

  const lines = [
    headers.map(escapeCsvCell).join(","),
    ...rows.map((row) =>
      exportable
        .map((col) => {
          const key =
            "accessorKey" in col && col.accessorKey != null
              ? String(col.accessorKey)
              : col.id;
          if (!key) return "";
          const value = (row as Record<string, unknown>)[key];
          return escapeCsvCell(value);
        })
        .join(","),
    ),
  ];

  const blob = new Blob(["\uFEFF" + lines.join("\n")], {
    type: "text/csv;charset=utf-8;",
  });
  const url = URL.createObjectURL(blob);
  const anchor = document.createElement("a");
  anchor.href = url;
  anchor.download = `${filename}.csv`;
  anchor.click();
  URL.revokeObjectURL(url);
}

function DataTable<TData>({
  columns,
  data,
  getRowId,
  totalCount,
  pageCount: pageCountProp,
  isLoading = false,
  isError = false,
  onRetry,
  searchValue,
  onSearchChange,
  searchPlaceholder,
  pageIndex: pageIndexProp,
  pageSize: pageSizeProp = 10,
  onPaginationChange,
  sorting: sortingProp,
  onSortingChange,
  rowSelection: rowSelectionProp,
  onRowSelectionChange,
  enableRowSelection = true,
  bulkActions,
  toolbarExtra,
  exportFilename = "export",
  manualPagination = false,
  manualSorting = false,
  manualFiltering = false,
  className,
  emptyTitle,
  emptyDescription,
}: DataTableProps<TData>) {
  const t = useTranslations("common");
  const [internalSorting, setInternalSorting] = React.useState<SortingState>(
    [],
  );
  const [columnVisibility, setColumnVisibility] =
    React.useState<VisibilityState>({});
  const [internalRowSelection, setInternalRowSelection] =
    React.useState<RowSelectionState>({});
  const [internalSearch, setInternalSearch] = React.useState("");
  const [pagination, setPagination] = React.useState({
    pageIndex: pageIndexProp ?? 0,
    pageSize: pageSizeProp,
  });

  const sorting = sortingProp ?? internalSorting;
  const rowSelection = rowSelectionProp ?? internalRowSelection;
  const search =
    searchValue !== undefined ? searchValue : internalSearch;

  React.useEffect(() => {
    if (pageIndexProp !== undefined || pageSizeProp !== undefined) {
      setPagination((prev) => ({
        pageIndex: pageIndexProp ?? prev.pageIndex,
        pageSize: pageSizeProp ?? prev.pageSize,
      }));
    }
  }, [pageIndexProp, pageSizeProp]);

  const selectionColumn = React.useMemo<ColumnDef<TData, unknown>[]>(() => {
    if (!enableRowSelection) return [];
    return [
      {
        id: "select",
        enableHiding: false,
        enableSorting: false,
        header: ({ table }) => (
          <Checkbox
            checked={
              table.getIsAllPageRowsSelected() ||
              (table.getIsSomePageRowsSelected() && "indeterminate")
            }
            onCheckedChange={(value) =>
              table.toggleAllPageRowsSelected(Boolean(value))
            }
            aria-label="Select all"
          />
        ),
        cell: ({ row }) => (
          <Checkbox
            checked={row.getIsSelected()}
            onCheckedChange={(value) => row.toggleSelected(Boolean(value))}
            aria-label="Select row"
          />
        ),
      },
    ];
  }, [enableRowSelection]);

  const tableColumns = React.useMemo(
    () => [...selectionColumn, ...columns],
    [selectionColumn, columns],
  );

  const table = useReactTable({
    data,
    columns: tableColumns,
    state: {
      sorting,
      columnVisibility,
      rowSelection,
      pagination,
      globalFilter: manualFiltering ? undefined : search,
    },
    pageCount: pageCountProp,
    manualPagination,
    manualSorting,
    manualFiltering,
    enableRowSelection,
    getRowId,
    onSortingChange: onSortingChange ?? setInternalSorting,
    onColumnVisibilityChange: setColumnVisibility,
    onRowSelectionChange: onRowSelectionChange ?? setInternalRowSelection,
    onPaginationChange: (updater) => {
      setPagination((prev) => {
        const next = typeof updater === "function" ? updater(prev) : updater;
        onPaginationChange?.(next.pageIndex, next.pageSize);
        return next;
      });
    },
    onGlobalFilterChange: (value) => {
      const next = String(value ?? "");
      if (onSearchChange) onSearchChange(next);
      else setInternalSearch(next);
    },
    getCoreRowModel: getCoreRowModel(),
    getSortedRowModel: manualSorting ? undefined : getSortedRowModel(),
    getFilteredRowModel: manualFiltering ? undefined : getFilteredRowModel(),
    getPaginationRowModel: manualPagination
      ? undefined
      : getPaginationRowModel(),
  });

  const selectedCount = Object.keys(rowSelection).filter(
    (key) => rowSelection[key],
  ).length;

  const total =
    totalCount ??
    (manualPagination
      ? (pageCountProp ?? 1) * pagination.pageSize
      : table.getFilteredRowModel().rows.length);

  const handleSearchChange = (value: string) => {
    if (onSearchChange) onSearchChange(value);
    else setInternalSearch(value);
    table.setPageIndex(0);
  };

  const handleExportCsv = () => {
    const rows = manualPagination
      ? data
      : table.getFilteredRowModel().rows.map((row) => row.original);
    exportRowsToCsv(rows, columns, exportFilename);
  };

  const handleExportExcel = () => {
    toast.message(t("exportExcel"), {
      description: t("excelComingSoon"),
    });
  };

  return (
    <Surface elevated className={cn("overflow-hidden", className)}>
      <div className="flex flex-col gap-3 border-b border-border p-4 sm:flex-row sm:items-center sm:justify-between">
        <div className="relative w-full max-w-sm">
          <Search className="pointer-events-none absolute start-3 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" />
          <Input
            value={search}
            onChange={(event) => handleSearchChange(event.target.value)}
            placeholder={searchPlaceholder ?? t("search")}
            className="ps-9"
            aria-label={t("search")}
          />
        </div>

        <div className="flex flex-wrap items-center gap-2">
          {selectedCount > 0 ? (
            <div className="flex items-center gap-2">
              <span className="text-sm text-muted-foreground">
                {t("selected", { count: selectedCount })}
              </span>
              {bulkActions}
            </div>
          ) : null}

          {toolbarExtra}

          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="outline" size="sm">
                <Columns3 className="size-4" />
                {t("columns")}
                <ChevronDown className="size-3.5 opacity-60" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-48">
              <DropdownMenuLabel>{t("columns")}</DropdownMenuLabel>
              <DropdownMenuSeparator />
              {table
                .getAllColumns()
                .filter((column) => column.getCanHide())
                .map((column) => (
                  <DropdownMenuCheckboxItem
                    key={column.id}
                    checked={column.getIsVisible()}
                    onCheckedChange={(value) =>
                      column.toggleVisibility(Boolean(value))
                    }
                    className="capitalize"
                  >
                    {typeof column.columnDef.header === "string"
                      ? column.columnDef.header
                      : column.id}
                  </DropdownMenuCheckboxItem>
                ))}
            </DropdownMenuContent>
          </DropdownMenu>

          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="outline" size="sm">
                <Download className="size-4" />
                {t("export")}
                <ChevronDown className="size-3.5 opacity-60" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuItem onClick={handleExportCsv}>
                <Download className="size-4" />
                {t("exportCsv")}
              </DropdownMenuItem>
              <DropdownMenuItem onClick={handleExportExcel}>
                <FileSpreadsheet className="size-4" />
                {t("exportExcel")}
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>

      {isError ? (
        <ErrorState
          title={t("errorTitle")}
          description={t("errorDescription")}
          retryLabel={t("retry")}
          onRetry={onRetry}
        />
      ) : isLoading ? (
        <LoadingState variant="skeleton" rows={8} />
      ) : data.length === 0 ? (
        <EmptyState
          title={emptyTitle ?? t("emptyTitle")}
          description={emptyDescription ?? t("emptyDescription")}
        />
      ) : (
        <>
          <div className="relative w-full overflow-x-auto">
            <table className="w-full min-w-[640px] border-collapse text-sm">
              <thead className="sticky top-0 z-10 bg-card/95 backdrop-blur-sm">
                {table.getHeaderGroups().map((headerGroup) => (
                  <tr
                    key={headerGroup.id}
                    className="border-b border-border"
                  >
                    {headerGroup.headers.map((header) => {
                      const canSort = header.column.getCanSort();
                      return (
                        <th
                          key={header.id}
                          className={cn(
                            "h-11 px-4 text-start text-xs font-medium tracking-wide text-muted-foreground whitespace-nowrap",
                            canSort && "cursor-pointer select-none",
                          )}
                          onClick={
                            canSort
                              ? header.column.getToggleSortingHandler()
                              : undefined
                          }
                        >
                          <div className="inline-flex items-center gap-1.5">
                            {header.isPlaceholder
                              ? null
                              : flexRender(
                                  header.column.columnDef.header,
                                  header.getContext(),
                                )}
                            {{
                              asc: " ↑",
                              desc: " ↓",
                            }[header.column.getIsSorted() as string] ?? null}
                          </div>
                        </th>
                      );
                    })}
                  </tr>
                ))}
              </thead>
              <tbody>
                {table.getRowModel().rows.map((row) => (
                  <tr
                    key={row.id}
                    data-state={row.getIsSelected() ? "selected" : undefined}
                    className="border-b border-border/70 transition-colors hover:bg-muted/40 data-[state=selected]:bg-primary/5"
                  >
                    {row.getVisibleCells().map((cell) => (
                      <td key={cell.id} className="px-4 py-3 align-middle">
                        {flexRender(
                          cell.column.columnDef.cell,
                          cell.getContext(),
                        )}
                      </td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <div className="flex flex-col gap-3 border-t border-border p-4 sm:flex-row sm:items-center sm:justify-between">
            <p className="text-sm text-muted-foreground">
              {t("pageOf", {
                page: pagination.pageIndex + 1,
                totalPages: Math.max(
                  1,
                  pageCountProp ??
                    Math.ceil(total / pagination.pageSize) ??
                    1,
                ),
                total,
              })}
            </p>
            <div className="flex items-center gap-2">
              <select
                className="h-9 rounded-xl border border-input bg-card px-2 text-sm shadow-float-sm outline-none focus-visible:border-ring"
                value={pagination.pageSize}
                onChange={(event) => {
                  table.setPageSize(Number(event.target.value));
                }}
                aria-label={t("rowsPerPage")}
              >
                {[10, 20, 30, 50].map((size) => (
                  <option key={size} value={size}>
                    {size}
                  </option>
                ))}
              </select>
              <Button
                variant="outline"
                size="icon-sm"
                onClick={() => table.previousPage()}
                disabled={!table.getCanPreviousPage()}
                aria-label={t("previous")}
              >
                <ChevronLeft className="size-4 rtl:rotate-180" />
              </Button>
              <Button
                variant="outline"
                size="icon-sm"
                onClick={() => table.nextPage()}
                disabled={!table.getCanNextPage()}
                aria-label={t("next")}
              >
                <ChevronRight className="size-4 rtl:rotate-180" />
              </Button>
            </div>
          </div>
        </>
      )}
    </Surface>
  );
}

export { DataTable };
