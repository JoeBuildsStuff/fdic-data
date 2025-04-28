"use client";

import { useState } from 'react';
import { ChevronDown, ChevronRight } from 'lucide-react';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import InstitutionPeriodSelector from "./institution-period-selector";
import type { getInstitutions, getReportPeriods, getFieldByName } from "../_lib/queries";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import FieldSelector from "./field-selector";
// Define data types based on query return values
type InstitutionsData = Awaited<ReturnType<typeof getInstitutions>>['data'];
type ReportPeriodsData = Awaited<ReturnType<typeof getReportPeriods>>['data'];
type Institution = NonNullable<InstitutionsData>[number];
type ReportPeriod = NonNullable<ReportPeriodsData>[number];
// FieldData can be null, so we define a non-nullable variant for rows
type FieldData = Awaited<ReturnType<typeof getFieldByName>>['data'];
type NonNullFieldData = NonNullable<FieldData>;

// Define the expected shape of a valid field object based on the query
// We assume 'supabase' generates types, but let's define explicitly for clarity
type ValidFieldData = {
  field_id: number;
  field_name: string;
  title: string | null; // Allow null based on schema possibility
  description: string | null; // Allow null based on schema possibility
  // title_alt and description_alt might exist but are problematic
  title_alt?: string | null;
  description_alt?: string | null;
};

// Type guard to check if the field data is valid
function isValidFieldData(field: unknown): field is ValidFieldData {
  // Ensure field is a non-null object before checking properties
  if (typeof field !== 'object' || field === null) {
    return false;
  }
  // Check for field_id existence and type, and absence of error key
  return 'field_id' in field && typeof (field as { field_id?: unknown }).field_id === 'number' && !('error' in field);
}

// Type for each selected institution/period pair (no longer holds field values directly)
export type SelectedPairData = {
  institutionId: number;
  reportPeriodId: number;
  institutionName?: string;
  reportDate?: string;
};

interface FinancialsTableProps {
  institutions: Institution[];
  reportPeriods: ReportPeriod[];
  selectedData: SelectedPairData[];
  // Metadata for each row (non-nullable) and a matrix of values [rowIndex][pairIndex]
  fieldRows: Array<{
    // The field *could* be invalid if parent doesn't filter errors
    field: NonNullFieldData | { error: unknown }; // Use unknown instead of any
    depth: number;
    hasChildren: boolean;
    path: string[];
  }>;
  fieldValues: (number | null)[][];
}

export default function FinancialsTable({
  institutions,
  reportPeriods,
  selectedData,
  fieldRows,
  fieldValues,
}: FinancialsTableProps) {
  const [expandedRows, setExpandedRows] = useState<Set<string>>(new Set());

  const toggleRow = (code: string) => {
    setExpandedRows(prev => {
      const newSet = new Set(prev);
      if (newSet.has(code)) {
        newSet.delete(code);
      } else {
        newSet.add(code);
      }
      return newSet;
    });
  };

  // Determine if a row should be visible based on expanded state of its ancestors
  const isVisible = (item: typeof fieldRows[number]): boolean => {
    if (item.depth === 0) return true; // Always show top-level items
    // Check if all parent codes in the path (excluding the item itself) are expanded
    return item.path.slice(0, -1).every(parentCode => expandedRows.has(parentCode));
  };

  return (
    <TooltipProvider>
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead className="relative w-[200px] "><div className="absolute bottom-0 mb-2"><FieldSelector /></div></TableHead>
            {selectedData.map((pair, idx) => (
              <TableHead key={idx} className="py-2 justify-end">
                <InstitutionPeriodSelector
                  institutions={institutions}
                  reportPeriods={reportPeriods}
                  initialInstitutionId={pair.institutionId}
                  initialReportPeriodId={pair.reportPeriodId}
                  pairIndex={idx}
                />
              </TableHead>
            ))}
            <TableHead className="py-2 justify-end">
              <InstitutionPeriodSelector
                institutions={institutions}
                reportPeriods={reportPeriods}
                pairIndex={selectedData.length}
              />
            </TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {fieldRows.filter(isVisible).map((item) => {
            // Use the type guard to ensure field is valid before accessing properties
            if (!isValidFieldData(item.field)) {
              // Optionally render an error row or skip
               console.warn('Skipping row due to invalid field data:', item);
               return null; // Skip rendering this row
            }

            // Now TypeScript knows item.field is ValidFieldData here
            const { field: f, depth, hasChildren } = item;
            const isExpanded = expandedRows.has(f.field_name);

            return (
              <TableRow key={f.field_id}>
                <TableCell
                  className="font-medium"
                  style={{ paddingLeft: `${depth * 1.5}rem` }}
                >
                  <Tooltip>
                    <TooltipTrigger asChild>
                      <div className="flex items-center gap-1">
                        {hasChildren ? (
                          <button
                            onClick={() => toggleRow(f.field_name)}
                            className="p-0.5 rounded hover:bg-muted"
                          >
                            {isExpanded ? <ChevronDown size={14} /> : <ChevronRight size={14} />}
                          </button>
                        ) : (
                          <span className="inline-block w-[18px]"></span>
                        )}
                        {/* Prioritize title_alt, then title, then field_name */}
                        <span>{f.title_alt ?? f.title ?? f.field_name}:</span>
                      </div>
                    </TooltipTrigger>
                    <TooltipContent className="max-w-[300px]">
                       {/* Safely access field_name */}
                      <p className="m-1"><code>{f.field_name}</code></p>
                       {/* Prioritize description_alt, then description, then fallback */}
                      <p className="m-1 whitespace-pre-line">{f.description_alt ?? f.description ?? 'No description available.'}</p>
                    </TooltipContent>
                  </Tooltip>
                </TableCell>
                {selectedData.map((_, colIndex) => {
                  // Find original index before filtering
                  // Ensure originalItem.field is also valid before accessing field_id
                  const originalIndex = fieldRows.findIndex(originalItem =>
                     isValidFieldData(originalItem.field) && originalItem.field.field_id === f.field_id
                  );
                  const val = fieldValues[originalIndex]?.[colIndex];
                  return (
                    <TableCell key={colIndex} className="text-right">
                      {val !== null && val !== undefined
                        ? `${(val).toLocaleString()}`
                        : ''}
                    </TableCell>
                  );
                })}
                {/* blank cell for the last column - supports alignment for adding additional institutions */}
                <TableCell></TableCell>
              </TableRow>
            );
          })}
        </TableBody>
      </Table>
    </TooltipProvider>
  );
}
