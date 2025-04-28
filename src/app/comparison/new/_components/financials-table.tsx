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
    field: NonNullFieldData;
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
              <TableHead key={idx} className="py-2">
                <InstitutionPeriodSelector
                  institutions={institutions}
                  reportPeriods={reportPeriods}
                  initialInstitutionId={pair.institutionId}
                  initialReportPeriodId={pair.reportPeriodId}
                  pairIndex={idx}
                />
              </TableHead>
            ))}
            <TableHead className="py-2">
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
                            className="p-0.5 rounded hover:bg-muted -ml-1.5"
                          >
                            {isExpanded ? <ChevronDown size={14} /> : <ChevronRight size={14} />}
                          </button>
                        ) : (
                          // Add placeholder for alignment if no children
                          <span className="inline-block w-[18px]"></span>
                        )}
                        <span>{f.title}:</span>
                      </div>
                    </TooltipTrigger>
                    <TooltipContent className="max-w-[300px]">
                      <p className="m-1"><code>{f.field_name}</code></p>
                      <p className="m-1">{f.description}</p>
                    </TooltipContent>
                  </Tooltip>
                </TableCell>
                {selectedData.map((_, colIndex) => {
                  // Find original index before filtering
                  const originalIndex = fieldRows.findIndex(originalItem => originalItem.field.field_id === f.field_id);
                  const val = fieldValues[originalIndex]?.[colIndex];
                  return (
                    <TableCell key={colIndex}>
                      {val !== null && val !== undefined
                        ? `$${(val * 1000).toLocaleString()}`
                        : 'N/A'}
                    </TableCell>
                  );
                })}
                <TableCell>N/A</TableCell>
              </TableRow>
            );
          })}
        </TableBody>
      </Table>
    </TooltipProvider>
  );
}
