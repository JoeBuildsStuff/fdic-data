"use client";

import type { Institution } from "../_lib/schema";
import * as React from "react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { type ColumnDef } from "@tanstack/react-table";

import { DataTable } from "@/components/data-table";
import { useDataTable } from "@/hooks/use-data-table";

import { DataTableAdvancedToolbar } from "@/components/data-table-advanced-toolbar";
import { DataTableFilterList } from "@/components/data-table-filter-list";
import { DataTableSortList } from "@/components/data-table-sort-list";
import type {
  getInstitutions,
} from "../_lib/queries";
import type { GetInstitutionsSchema } from "../_lib/validations";

import { getInstitutionTableColumns } from "./institutions-table-columns";

interface AvailableColumn {
  id: keyof Institution | string;
  label: string;
}

interface InstitutionsTableProps {
  promises: Promise<
    [
      Awaited<ReturnType<typeof getInstitutions>>,
    ]
  >;
  availableColumns: AvailableColumn[];
  search: GetInstitutionsSchema;
}

export function InstitutionsTable({
  promises,
  availableColumns,
  search,
}: InstitutionsTableProps) {

  const [
    { data, pageCount },
  ] = React.use(promises);

  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const columns = React.useMemo(() => {
    const allPossibleColumns = getInstitutionTableColumns(search.columns);
    const actionsColumn = allPossibleColumns.find((col) => col.id === "actions");
    const filteredColumns = allPossibleColumns;

    if (actionsColumn && !filteredColumns.some((col) => col.id === "actions")) {
      filteredColumns.push(actionsColumn);
    }

    return filteredColumns as ColumnDef<Institution>[];
  }, [
    search.columns,
  ]);

  const { table, shallow, debounceMs, throttleMs } = useDataTable({
    data: data as Institution[],
    columns,
    pageCount,
    initialState: {
      sorting: search.sort ?? [{ id: "name", desc: true }],
      columnVisibility: {},
    },
    getRowId: (originalRow) => originalRow.cert?.toString() ?? Math.random().toString(),
    shallow: false,
    clearOnDefault: true,
  });

  const handleColumnsChange = React.useCallback(
    async (value: string[] | ((old: string[]) => string[] | null) | null): Promise<URLSearchParams> => {
      const current = new URLSearchParams(searchParams?.toString());
      const oldColumns = search.columns ?? [];
      let newColumns: string[] | null = null;

      if (typeof value === 'function') {
        newColumns = value(oldColumns);
      } else {
        newColumns = value;
      }

      if (newColumns === null || newColumns.length === 0) {
        console.log("Setting columns to default or removing parameter.");
        current.delete("columns"); // Remove the columns parameter
      } else {
        current.set("columns", newColumns.join(","));
      }

      await router.replace(`${pathname}?${current.toString()}`, { scroll: false });
      return current;
    },
    [pathname, router, searchParams, search.columns], // Added search.columns dependency
  );


  return (
    <>
      <DataTable
        table={table}
      >
          <DataTableAdvancedToolbar
            availableColumns={availableColumns}
            selectedColumns={search.columns}
            onColumnsChange={handleColumnsChange}
          >
            <DataTableSortList table={table} align="start" />
              <DataTableFilterList
                table={table}
                shallow={shallow}
                debounceMs={debounceMs}
                throttleMs={throttleMs}
                align="start"
              />
          </DataTableAdvancedToolbar>
      </DataTable>
    </>
  );
}
