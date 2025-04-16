"use client";

import type * as React from "react";

import { DataTableViewOptions } from "@/components/data-table-view-options";
import { cn } from "@/lib/utils";
import type { AvailableColumn } from "@/app/institutions/table/components/columns";
import type { Options } from "nuqs";

interface DataTableAdvancedToolbarProps
  extends React.ComponentProps<"div"> {
  availableColumns: AvailableColumn[];
  selectedColumns: string[];
  onColumnsChange: (value: string[] | ((old: string[]) => string[] | null) | null, options?: Options | undefined) => Promise<URLSearchParams>; // Match setter type from nuqs
}

export function DataTableAdvancedToolbar({
  children,
  className,
  availableColumns,
  selectedColumns,
  onColumnsChange,
  ...props
}: DataTableAdvancedToolbarProps) {
  return (
    <div
      role="toolbar"
      aria-orientation="horizontal"
      className={cn(
        "flex w-full items-start justify-between gap-2 p-1",
        className,
      )}
      {...props}
    >
      <div className="flex flex-1 flex-wrap items-center gap-2">{children}</div>
      <div className="flex items-center gap-2">
        <DataTableViewOptions
          availableColumns={availableColumns}
          selectedColumns={selectedColumns}
          onColumnsChange={onColumnsChange}
        />
      </div>
    </div>
  );
}
