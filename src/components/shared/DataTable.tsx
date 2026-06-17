"use client";

import { useMemo, useState } from "react";
import { Table, type Column, type SortDirection } from "@/components/ui/Table";
import { Pagination } from "@/components/ui/Pagination";
import { EmptyState } from "./EmptyState";
import { Inbox } from "lucide-react";

interface DataTableProps<T> {
  columns: Column<T>[];
  data: T[];
  keyExtractor: (row: T) => string;
  loading?: boolean;
  emptyTitle?: string;
  emptyDescription?: string;
  emptyAction?: { label: string; onClick: () => void };
  onRowClick?: (row: T) => void;
  pageSize?: number;
  searchable?: boolean;
  searchFilter?: (row: T, query: string) => boolean;
  searchQuery?: string;
}

export function DataTable<T>({
  columns,
  data,
  keyExtractor,
  loading = false,
  emptyTitle = "No results found",
  emptyDescription = "Try adjusting your search or filters.",
  emptyAction,
  onRowClick,
  pageSize = 10,
  searchQuery = "",
  searchFilter,
}: DataTableProps<T>) {
  const [page, setPage] = useState(1);
  const [sortKey, setSortKey] = useState<string | undefined>();
  const [sortDirection, setSortDirection] = useState<SortDirection>(null);

  const filtered = useMemo(() => {
    if (!searchQuery || !searchFilter) return data;
    return data.filter((row) => searchFilter(row, searchQuery.toLowerCase()));
  }, [data, searchQuery, searchFilter]);

  const sorted = useMemo(() => {
    if (!sortKey || !sortDirection) return filtered;
    return [...filtered].sort((a, b) => {
      const aVal = (a as Record<string, unknown>)[sortKey];
      const bVal = (b as Record<string, unknown>)[sortKey];
      if (aVal == null) return 1;
      if (bVal == null) return -1;
      const cmp = String(aVal).localeCompare(String(bVal), undefined, { numeric: true });
      return sortDirection === "asc" ? cmp : -cmp;
    });
  }, [filtered, sortKey, sortDirection]);

  const totalPages = Math.ceil(sorted.length / pageSize) || 1;
  const paginated = sorted.slice((page - 1) * pageSize, page * pageSize);

  const handleSort = (key: string) => {
    if (sortKey === key) {
      setSortDirection((d) => (d === "asc" ? "desc" : d === "desc" ? null : "asc"));
      if (sortDirection === "desc") setSortKey(undefined);
    } else {
      setSortKey(key);
      setSortDirection("asc");
    }
  };

  if (!loading && sorted.length === 0) {
    return (
      <EmptyState
        icon={Inbox}
        title={emptyTitle}
        description={emptyDescription}
        action={emptyAction}
      />
    );
  }

  return (
    <div className="space-y-4">
      <Table
        columns={columns}
        data={paginated}
        keyExtractor={keyExtractor}
        loading={loading}
        sortKey={sortKey}
        sortDirection={sortDirection}
        onSort={handleSort}
        onRowClick={onRowClick}
      />
      <Pagination
        page={page}
        totalPages={totalPages}
        totalItems={sorted.length}
        pageSize={pageSize}
        onPageChange={setPage}
      />
    </div>
  );
}
