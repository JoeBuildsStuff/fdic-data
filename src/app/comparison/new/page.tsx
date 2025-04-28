import { createClient } from '@/lib/supabase/server';
import { getFieldByName, getInstitutions, getReportPeriods, getReportedValue } from './_lib/queries';
import rawFieldCodes from './_lib/field_codes_grouped.json';
import FinancialsTable from "./_components/financials-table";
import type { SearchParams } from "@/app/types";
import { z } from "zod";
// import { formatCurrency } from '@/lib/utils'; // Assuming you have a currency formatter - Removed for now

// Schema to validate search parameters (now includes selected field group)
const financialsSearchParamsSchema = z.object({
  institutionId: z.preprocess(
    (val) => Array.isArray(val) ? val : val ? [val] : [],
    z.array(z.coerce.number())
  ).default([]),
  reportPeriodId: z.preprocess(
    (val) => Array.isArray(val) ? val : val ? [val] : [],
    z.array(z.coerce.number())
  ).default([]),
  fieldGroup: z.string().optional(),
});

interface FinancialsTableProps {
  searchParams: Promise<SearchParams>; // Define as Promise
}

// Define types for the field codes JSON structure
interface CodeNode {
  code: string;
  children: CodeNode[];
  depth?: number;
}
interface SectionNode {
  section: string;
  children: CodeNode[];
}
interface FieldCodesTree {
  section: string;
  children: SectionNode[];
}
// Cast the raw JSON to our typed structure
const fieldCodes = rawFieldCodes as FieldCodesTree;

interface FlattenedCodeNode {
    code: string;
    depth: number;
    hasChildren: boolean;
    // Path includes the codes of all ancestors + the node itself
    path: string[];
}
const flattenCodesWithHierarchy = (
    nodes: CodeNode[],
    currentDepth = 0,
    parentPath: string[] = []
): FlattenedCodeNode[] => {
    return nodes.flatMap(node => {
        const currentPath = [...parentPath, node.code];
        const hasChildren = node.children && node.children.length > 0;
        return [
            { code: node.code, depth: currentDepth, hasChildren, path: currentPath },
            ...(hasChildren ? flattenCodesWithHierarchy(node.children, currentDepth + 1, currentPath) : [])
        ];
    });
};

export default async function Page({ searchParams: searchParamsPromise }: FinancialsTableProps) { // Rename prop
  const supabase = await createClient();
  const actualSearchParams = await searchParamsPromise; // Await the promise
  const search = financialsSearchParamsSchema.parse(actualSearchParams); // Parse the resolved object

  // Fetch data for dropdowns
  const [
    { data: institutionsData },
    { data: reportPeriodsData },
  ] = await Promise.all([
    getInstitutions(supabase),
    getReportPeriods(supabase),
  ]);

  const institutions = institutionsData ?? [];
  const reportPeriods = reportPeriodsData ?? [];

  // Get list of codes with their respective depths for the selected group
  let flattenedFieldList: FlattenedCodeNode[] = [];
  if (search.fieldGroup) {
      const groupNode = fieldCodes.children.find((sec) => sec.section === search.fieldGroup);
      if (groupNode) {
          flattenedFieldList = flattenCodesWithHierarchy(groupNode.children);
      }
  }

  // Build selectedData array of institution/period comparison pairs
  type SelectedPairData = import('./_components/financials-table').SelectedPairData;
  const numPairs = Math.max(search.institutionId.length, search.reportPeriodId.length);
  const selectionPairs = Array.from({ length: numPairs }, (_, i) => ({
    institutionId: search.institutionId[i],
    reportPeriodId: search.reportPeriodId[i],
  }));
  const selectedData: SelectedPairData[] = selectionPairs.map((pair) => {
    const rawName = institutions.find((inst) => inst.id === pair.institutionId)?.name;
    const institutionName = rawName ?? undefined;
    const rawDate = reportPeriods.find((p) => p.report_period_id === pair.reportPeriodId)?.report_date;
    const reportDate = rawDate ?? undefined;
    return {
      institutionId: pair.institutionId,
      reportPeriodId: pair.reportPeriodId,
      institutionName,
      reportDate,
    };
  });

  // Now structure includes field metadata AND depth
  type FieldRowWithDepth = {
      field: NonNullable<Awaited<ReturnType<typeof getFieldByName>>['data']>;
      depth: number;
      hasChildren: boolean;
      path: string[];
  };
  let fieldRowsWithDepth: FieldRowWithDepth[] = [];
  let finalFieldValues: (number | null)[][] = []; // Initialize final values array

  if (flattenedFieldList.length > 0) {
    const metaResults = await Promise.all(
      flattenedFieldList.map((item) => getFieldByName(supabase, item.code))
    );

    // Combine metadata results with the depth/hierarchy information
    const combinedData = metaResults
        .map((res, index) => ({
            field: res.data,
            depth: flattenedFieldList[index].depth,
            hasChildren: flattenedFieldList[index].hasChildren,
            path: flattenedFieldList[index].path,
        }))
        .filter((item): item is FieldRowWithDepth & { field: NonNullable<FieldRowWithDepth['field']> } => item.field !== null);

    // Fetch reported values based on the combined data *before* deduplication
    const originalFieldValues = await Promise.all(
      combinedData.map((item) =>
        Promise.all(
          selectionPairs.map((pair) =>
            pair.institutionId != null && pair.reportPeriodId != null
              ? getReportedValue(supabase, pair.reportPeriodId, item.field.field_id, pair.institutionId).then((res) => res.data)
              : Promise.resolve(null)
          )
        )
      )
    );

    // Deduplicate based on field_id, keeping the first occurrence
    const uniqueFieldIds = new Set<number>();
    const deduplicatedIndices: number[] = [];
    fieldRowsWithDepth = combinedData.filter((item, index) => {
        if (!uniqueFieldIds.has(item.field.field_id)) {
            uniqueFieldIds.add(item.field.field_id);
            deduplicatedIndices.push(index); // Keep track of the original index
            return true;
        }
        return false;
    });

    // Filter fieldValues to match the deduplicated fieldRows
    finalFieldValues = deduplicatedIndices.map(index => originalFieldValues[index]);
  }

  return (
    <FinancialsTable
      institutions={institutions}
      reportPeriods={reportPeriods}
      selectedData={selectedData}
      fieldRows={fieldRowsWithDepth}
      fieldValues={finalFieldValues} // Pass the correctly scoped and assigned values
    />
  );
}