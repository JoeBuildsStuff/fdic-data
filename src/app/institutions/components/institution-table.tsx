"use client"

import * as React from "react"
import { type ColumnDef } from "@tanstack/react-table"
import { useDataTable } from "@/hooks/use-data-table"
import { DataTable } from "@/components/data-table"
import { DataTableAdvancedToolbar } from "@/components/data-table-advanced-toolbar"
import { DataTableFilterList } from "@/components/data-table-filter-list"
import { DataTableSortList } from "@/components/data-table-sort-list"
import { type ExtendedColumnSort } from "@/types/data-table"
import { type AvailableColumn, getInstitutionTableColumns } from "./columns"

interface InstitutionTableProps<TData> {
  data: TData[]
  pageCount: number
  availableColumns: AvailableColumn[]
  initialSelectedColumns: string[]
  initialPage?: number
  initialPageSize?: number
  initialSorting?: ExtendedColumnSort<TData>[]
}

export function InstitutionTable<TData>({
  data,
  pageCount,
  availableColumns,
  initialSelectedColumns,
  initialPage = 1,
  initialPageSize = 10,
  initialSorting,
}: InstitutionTableProps<TData>) {
  
  // Generate columns based on initialSelectedColumns
  const columns = React.useMemo(
    () => getInstitutionTableColumns(initialSelectedColumns) as ColumnDef<TData>[],
    [initialSelectedColumns]
  );
  
  const { 
    table, 
    shallow, 
    debounceMs, 
    throttleMs, 
    selectedColumns,
    setSelectedColumns
  } = useDataTable({
    data,
    columns,
    getColumns: getInstitutionTableColumns as (ids: string[]) => ColumnDef<TData>[],
    pageCount,
    availableColumns,
    enableAdvancedFilter: true,
    shallow: false,
    initialState: {
      pagination: {
        pageIndex: initialPage - 1,
        pageSize: initialPageSize
      },
      sorting: initialSorting,
      selectedColumns: initialSelectedColumns,
    },
  });

  return (
    <div className="space-y-4">
      <DataTable table={table}>
        <DataTableAdvancedToolbar 
          availableColumns={availableColumns}
          selectedColumns={selectedColumns}
          onColumnsChange={setSelectedColumns}
        >
          <DataTableFilterList 
            table={table} 
            shallow={shallow}
            debounceMs={debounceMs}
            throttleMs={throttleMs}
            align="start"
          />
          <DataTableSortList table={table} align="start"/>
        </DataTableAdvancedToolbar>
      </DataTable>
    </div>
  )
}