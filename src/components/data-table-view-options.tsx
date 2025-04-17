"use client";

import { Check, ChevronsUpDown, Settings2 } from "lucide-react";
import { cn } from "@/lib/utils";

import { Button } from "@/components/ui/button";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
  CommandSeparator,
} from "@/components/ui/command";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import * as React from "react";
import type { AvailableColumn } from "@/app/institutions/table/_components/institutions-table-columns";
import type { Options } from "nuqs";

interface DataTableViewOptionsProps {
  availableColumns: AvailableColumn[];
  selectedColumns: string[];
  onColumnsChange: (value: string[] | ((old: string[]) => string[] | null) | null, options?: Options | undefined) => Promise<URLSearchParams>;
}

export function DataTableViewOptions({
  availableColumns,
  selectedColumns,
  onColumnsChange,
}: DataTableViewOptionsProps) {
  const handleSelect = (columnId: string) => {
    const newSelectedColumns = selectedColumns.includes(columnId)
      ? selectedColumns.filter((id) => id !== columnId)
      : [...selectedColumns, columnId];
    onColumnsChange(newSelectedColumns);
  };

  const selectedAvailableColumns = availableColumns.filter((col) =>
    selectedColumns.includes(col.id as string)
  );
  const unselectedAvailableColumns = availableColumns.filter(
    (col) => !selectedColumns.includes(col.id as string)
  );

  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button
          aria-label="Toggle columns"
          role="combobox"
          variant="outline"
          size="sm"
          className="ml-auto hidden h-8 lg:flex"
        >
          <Settings2 />
          View
          <ChevronsUpDown className="ml-auto opacity-50" />
        </Button>
      </PopoverTrigger>
      <PopoverContent align="end" className="w-44 p-0">
        <Command>
          <CommandInput placeholder="Search columns..." />
          <CommandList>
            <CommandEmpty>No columns found.</CommandEmpty>
            {selectedAvailableColumns.length > 0 && (
              <CommandGroup heading="Selected Columns">
                {selectedAvailableColumns.map((column) => {
                  const isSelected = true;
                  return (
                    <CommandItem
                      key={column.id as string}
                      onSelect={() => handleSelect(column.id as string)}
                      className="cursor-pointer"
                    >
                      <span className="truncate">{column.label}</span>
                      <Check
                        className={cn(
                          "ml-auto size-4 shrink-0",
                          isSelected ? "opacity-100" : "opacity-0"
                        )}
                      />
                    </CommandItem>
                  );
                })}
              </CommandGroup>
            )}
            {selectedAvailableColumns.length > 0 && unselectedAvailableColumns.length > 0 && (
              <CommandSeparator />
            )}
            {unselectedAvailableColumns.length > 0 && (
              <CommandGroup heading="Available Columns">
                {unselectedAvailableColumns.map((column) => {
                  const isSelected = false;
                  return (
                    <CommandItem
                      key={column.id as string}
                      onSelect={() => handleSelect(column.id as string)}
                      className="cursor-pointer"
                    >
                      <span className="truncate">{column.label}</span>
                      <Check
                        className={cn(
                          "ml-auto size-4 shrink-0",
                          isSelected ? "opacity-100" : "opacity-0"
                        )}
                      />
                    </CommandItem>
                  );
                })}
              </CommandGroup>
            )}
          </CommandList>
        </Command>
      </PopoverContent>
    </Popover>
  );
}
