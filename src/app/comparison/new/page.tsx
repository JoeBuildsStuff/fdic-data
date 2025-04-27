import { createClient } from '@/lib/supabase/server';
import { getFieldByName, getInstitutions, getReportPeriods, getReportedValue } from './_lib/queries';
import FinancialsTable from "./financials-table";
import type { SearchParams } from "@/app/types";
import { z } from "zod";
// import { formatCurrency } from '@/lib/utils'; // Assuming you have a currency formatter - Removed for now

// Schema to validate search parameters
const financialsSearchParamsSchema = z.object({
  institutionId: z.preprocess(
    (val) => Array.isArray(val) ? val : val ? [val] : [],
    z.array(z.coerce.number())
  ).default([]),
  reportPeriodId: z.preprocess(
    (val) => Array.isArray(val) ? val : val ? [val] : [],
    z.array(z.coerce.number())
  ).default([]),
});

interface FinancialsTableProps {
  searchParams: Promise<SearchParams>; // Define as Promise
}

export default async function Page({ searchParams: searchParamsPromise }: FinancialsTableProps) { // Rename prop
  const supabase = await createClient();
  const actualSearchParams = await searchParamsPromise; // Await the promise
  const search = financialsSearchParamsSchema.parse(actualSearchParams); // Parse the resolved object

  // Fetch data for dropdowns and specific fields concurrently
  const [
    { data: institutionsData },
    { data: reportPeriodsData },
    { data: depField },
    { data: assetField },
  ] = await Promise.all([
    getInstitutions(supabase), // Fetch institutions for the dropdown
    getReportPeriods(supabase), // Fetch report periods for the dropdown
    getFieldByName(supabase, 'DEP'),
    getFieldByName(supabase, 'ASSET'),
  ]);

  const institutions = institutionsData ?? [];
  const reportPeriods = reportPeriodsData ?? [];

  // Build selectedData array of institution/period comparison pairs
  type SelectedPairData = import('./financials-table').SelectedPairData;
  // Allow partial selections: pair up to the longest array length
  const numPairs = Math.max(search.institutionId.length, search.reportPeriodId.length);
  const selectionPairs = Array.from({ length: numPairs }, (_, i) => ({
    institutionId: search.institutionId[i],
    reportPeriodId: search.reportPeriodId[i],
  }));
  let selectedData: SelectedPairData[] = [];
  if (depField?.field_id && assetField?.field_id) {
    // Fetch values for complete pairs; leave null for partial
    const valuePromises = selectionPairs.map((pair) => {
      if (pair.institutionId != null && pair.reportPeriodId != null) {
        return Promise.all([
          getReportedValue(supabase, pair.reportPeriodId, depField.field_id, pair.institutionId),
          getReportedValue(supabase, pair.reportPeriodId, assetField.field_id, pair.institutionId),
        ]);
      } else {
        // Incomplete selection => no data
        return Promise.resolve([
          { data: null, error: null },
          { data: null, error: null },
        ] as const);
      }
    });
    const valueResults = await Promise.all(valuePromises);
    selectedData = valueResults.map(([depRes, assetRes], i) => {
      const pair = selectionPairs[i];
      // Ensure we never return null for institutionName
      const rawName = institutions.find((inst) => inst.id === pair.institutionId)?.name;
      const institutionName = rawName ?? undefined;
      // Ensure we never return null for reportDate
      const rawDate = reportPeriods.find((p) => p.report_period_id === pair.reportPeriodId)?.report_date;
      const reportDate = rawDate ?? undefined;
      return {
        institutionId: pair.institutionId,
        reportPeriodId: pair.reportPeriodId,
        institutionName,
        reportDate,
        depValue: depRes.data,
        assetValue: assetRes.data,
      };
    });
  }

  return (
    <FinancialsTable
      institutions={institutions}
      reportPeriods={reportPeriods}
      selectedData={selectedData}
      depField={depField!}
      assetField={assetField!}
    />
  );
}