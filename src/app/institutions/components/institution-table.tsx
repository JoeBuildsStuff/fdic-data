"use client"

import * as React from "react"
import { type ColumnDef } from "@tanstack/react-table"

import { useDataTable } from "@/hooks/use-data-table"
import { DataTable } from "@/components/data-table"
// import { DataTableToolbar } from "@/components/data-table-toolbar"
import { DataTableAdvancedToolbar } from "@/components/data-table-advanced-toolbar"
import { DataTableFilterList } from "@/components/data-table-filter-list"
import { DataTableSortList } from "@/components/data-table-sort-list"
import { type ExtendedColumnSort } from "@/types/data-table"

interface InstitutionTableProps<TData, TValue> {
  columns: ColumnDef<TData, TValue>[]
  data: TData[]
  pageCount: number
  initialPage?: number
  initialPageSize?: number
  initialSorting?: ExtendedColumnSort<TData>[]
}

export function InstitutionTable<TData, TValue>({
  columns,
  data,
  pageCount,
  initialPage = 1,
  initialPageSize = 20,
  initialSorting = [{ id: "asset", desc: true } as ExtendedColumnSort<TData>],
}: InstitutionTableProps<TData, TValue>) {
  // The useDataTable hook will automatically handle URL parameters through nuqs
  const { table, shallow, debounceMs, throttleMs } = useDataTable({
    data,
    columns,
    pageCount,
    enableAdvancedFilter: true, // This enables the advanced filter format in the URL
    shallow: false,
    initialState: {
      pagination: {
        pageIndex: initialPage - 1, // Convert to zero-based index
        pageSize: initialPageSize
      },
      sorting: initialSorting,
    },
  })

  return (
    <div className="space-y-4">
      <DataTable table={table}>
        <DataTableAdvancedToolbar table={table}>
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