"use client"; // Mark this as a Client Component

import React, { useState, useMemo, useCallback } from 'react'; // Removed unused useEffect
import { ColumnDef, Row } from "@tanstack/react-table";
import { /* InstitutionOld, */ Institution, ReportPeriod, Field } from "../_lib/types"; // Remove InstitutionOld import
import { SimpleTable } from "./simple-table";
// Import Tooltip components
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip"
// Import Skeleton component
import { Skeleton } from "@/components/ui/skeleton"
// Remove direct Select imports if no longer needed here
// import { Select, SelectContent, SelectItem, SelectLabel, SelectTrigger, SelectValue, SelectGroup } from "@/components/ui/select";
import { InstitutionPeriodSelector } from './institution-period-selector'; // Import the new component
import { getReportedDataForSelection, ReportedDataForColumn } from '../_lib/actions'; // Import Server Action and type

// Helper type for the transformed data structure
type InvertedDataRow = {
  fieldNameDisplay: string; // Will hold title_alt for display
  fieldDbName: string; // Will hold the actual field_name from DB
  fieldDescription: string; // Will hold description_alt for tooltip
  [institutionName: string]: string | number | undefined;
};

// Define props interface - add institutions, reportPeriods, and fields
interface InvertedTableProps {
  // dataOld: InstitutionOld[]; // Remove dataOld
  institutions: Institution[];
  reportPeriods: ReportPeriod[];
  fields: Field[]; // Add fields prop
}

// Type for the state managing selections per column
type ColumnSelections = {
  [originalInstName: string]: {
    institutionId?: string;
    reportPeriodId?: string;
  };
};

// Type for storing dynamically fetched data per column
type DynamicDataStore = {
  [originalInstName: string]: ReportedDataForColumn | undefined;
};

export function InvertedTable({ /* dataOld, */ institutions, reportPeriods, fields }: InvertedTableProps) { // Remove dataOld from destructuring
  const [columnSelections, setColumnSelections] = useState<ColumnSelections>({});
  // State to store fetched data for each column
  const [dynamicCellData, setDynamicCellData] = useState<DynamicDataStore>({});
  // Optional: State to track loading status per column
  const [loadingColumns, setLoadingColumns] = useState<{ [originalInstName: string]: boolean }>({}); 


  // --- Memoized Field Name to ID Map (Simplified) ---
  const fieldNameToIdMap = useMemo(() => {
    const map: { [fieldName: string]: number } = {};
    fields.forEach(field => {
      // Use field.field_name (correct property from Field type)
      map[field.field_name] = field.field_id; // Key remains field_name
      // Map the display name from fieldDefinitions as well // Remove mapping from removed fieldDefinitions
    });
    console.log("Field Name to ID Map:", map); // Log the map for debugging
    return map;
  }, [fields]);

  // --- Data Fetching Logic ---
  const fetchAndUpdateColumnData = useCallback(async (originalInstName: string, institutionIdStr?: string, reportPeriodIdStr?: string) => {
    if (institutionIdStr && reportPeriodIdStr) {
      const institutionId = parseInt(institutionIdStr, 10);
      const reportPeriodId = parseInt(reportPeriodIdStr, 10);

      if (!isNaN(institutionId) && !isNaN(reportPeriodId)) {
        setLoadingColumns(prev => ({ ...prev, [originalInstName]: true }));
        try {
          console.log(`Fetching data for column: ${originalInstName}, instId: ${institutionId}, periodId: ${reportPeriodId}`);
          const fetchedData = await getReportedDataForSelection(institutionId, reportPeriodId);
          setDynamicCellData(prev => ({
            ...prev,
            [originalInstName]: fetchedData,
          }));
          console.log(`Data received for column: ${originalInstName}`, fetchedData);
        } catch (error) {
          console.error(`Error fetching data for column ${originalInstName}:`, error);
          // Optionally clear data or set an error state for the column
          setDynamicCellData(prev => ({ ...prev, [originalInstName]: undefined })); 
        } finally {
          setLoadingColumns(prev => ({ ...prev, [originalInstName]: false }));
        }
      }
    }
  }, []); // Dependencies: getReportedDataForSelection is stable (server action)

  // --- Handlers for Selectors ---
  const handleInstitutionChange = useCallback((originalInstName: string, value: string) => {
    const newSelections = { 
      ...columnSelections[originalInstName], 
      institutionId: value 
    };
    setColumnSelections(prev => ({
      ...prev,
      [originalInstName]: newSelections,
    }));
    fetchAndUpdateColumnData(originalInstName, value, newSelections.reportPeriodId);
  }, [columnSelections, fetchAndUpdateColumnData]);

  const handleReportPeriodChange = useCallback((originalInstName: string, value: string) => {
    const newSelections = { 
      ...columnSelections[originalInstName], 
      reportPeriodId: value 
    };
    setColumnSelections(prev => ({
      ...prev,
      [originalInstName]: newSelections,
    }));
    fetchAndUpdateColumnData(originalInstName, newSelections.institutionId, value);
  }, [columnSelections, fetchAndUpdateColumnData]);


  // --- Prepare Initial Data Structure (based on institutions prop) ---
  // Decide how many initial columns to show, e.g., the first 3 or a fixed number.
  const initialColumnCount = Math.min(3, institutions.length); // Show up to 3 initial columns
  const initialInstitutions = useMemo(() => institutions.slice(0, initialColumnCount), [institutions, initialColumnCount]);
  // Use the names of these initial institutions for column keys
  const institutionNames = useMemo(() => initialInstitutions.map(inst => inst.name), [initialInstitutions]);

  const invertedData: InvertedDataRow[] = useMemo(() => fields.map(field => { // Iterate over fields prop
      const rowData: InvertedDataRow = {
        fieldNameDisplay: field.title_alt || field.title || field.field_name, // Use title_alt, fallback to field_name
        fieldDbName: field.field_name, // Store the actual DB field name
        fieldDescription: field.description_alt || field.description || '', // Use description_alt, fallback, then empty
      };
      // Initialize cells for the initial institutions with a placeholder or undefined
      institutionNames.forEach(instName => {
          rowData[instName] = undefined; // Or set to '-' or null
      });
      return rowData;
  }), [fields, institutionNames]);


  // --- Define Table Columns ---
  const columnsInverted: ColumnDef<InvertedDataRow>[] = useMemo(() => [
      {
          accessorKey: "fieldName", // Keep accessor key simple, but use custom cell render
          id: "fieldInfo", // Give it a unique ID
          cell: ({ row }) => {
            const { fieldNameDisplay, fieldDbName, fieldDescription } = row.original;
            return (
              <TooltipProvider> {/* Optional: Add delay */} 
                <Tooltip>
                  <TooltipTrigger asChild>
                    <div className="font-semibold min-w-[10rem] max-w-[50rem] break-words text-wrap"> {/* Add cursor-help */} 
                      {fieldNameDisplay}
                    </div>
                  </TooltipTrigger>
                  <TooltipContent className="max-w-xs break-words space-y-2"> {/* Allow wrapping */} 
                    <p className="font-medium">{fieldDbName}</p>
                    <p>{fieldDescription}</p>
                  </TooltipContent>
                </Tooltip>
              </TooltipProvider>
            );
          },
          header: () => <div className="">Field</div> // Simpler header
      },
      ...institutionNames.map((instName) => ({ // Use institutionNames derived from institutions
          accessorKey: instName,
          cell: ({ row }: { row: Row<InvertedDataRow> }) => {
             const currentDbFieldName = row.original.fieldDbName; // Use the stored DB field name
             const fieldId = fieldNameToIdMap[currentDbFieldName]; // Look up ID using DB field name

              // Log if fieldId is not found for debugging
              if (fieldId === undefined) {
                  console.warn(`Could not find field ID for fieldName: ${currentDbFieldName}`);
              }

              const columnData = dynamicCellData[instName];
              const isLoading = loadingColumns[instName];

              let displayValue: string | number | undefined | null = undefined; // Initialize as undefined, matching invertedData

              if (isLoading) {
                // Instead of setting displayValue, return Skeleton directly
                return (
                  <div className="flex justify-end py-1"> {/* Align skeleton to the right */} 
                    <Skeleton className="h-4 w-20" /> {/* Basic skeleton styling */} 
                  </div>
                );
              } else if (columnData && fieldId !== undefined && columnSelections[instName]?.institutionId && columnSelections[instName]?.reportPeriodId) {
                  displayValue = columnData[fieldId];
              } 
              
              // Apply formatting
              if (currentDbFieldName === 'STNAME') { // Compare against DB field name
                   return <div className="text-right">{displayValue === 0 ? "Inactive" : displayValue === 1 ? "Active" : String(displayValue ?? '-')}</div>;
              }
              if (currentDbFieldName === 'BRSTATE') { // Compare against DB field name
                return <div className="text-right">{displayValue === 1 ? "Yes" : displayValue === 0 ? "No" : String(displayValue ?? '-')}</div>;
              }
              if (typeof displayValue === 'number') {
                return <div className="text-right tabular-nums">{displayValue.toLocaleString()}</div>;
              }
              return <div className="text-right">{String(displayValue ?? '-')}</div>;
          },
          header: () => {
            const currentSelection = columnSelections[instName] || {};

            return (
              <div className="flex flex-col items-end gap-2 justify-end py-1">
                <InstitutionPeriodSelector
                  institutions={institutions}
                  reportPeriods={reportPeriods}
                  selectedInstitutionId={currentSelection.institutionId}
                  selectedReportPeriodId={currentSelection.reportPeriodId}
                  onInstitutionChange={(value) => handleInstitutionChange(instName, value)}
                  onReportPeriodChange={(value) => handleReportPeriodChange(instName, value)}
                />
              </div>
            )
          }
      }))
  ], [institutionNames, fieldNameToIdMap, dynamicCellData, loadingColumns, columnSelections, institutions, reportPeriods, handleInstitutionChange, handleReportPeriodChange]);

  // --- End of Inverted Table Logic ---

  return <SimpleTable columns={columnsInverted} data={invertedData} />;
} 