"use client";

import { useRouter, useSearchParams } from 'next/navigation';
// import type { Institution, ReportPeriod } from './_lib/queries'; // Assuming these types are exported or defined appropriately
import { getInstitutions, getReportPeriods } from '../_lib/queries'; // Import functions instead
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

// Infer types from the return types of the query functions
type InstitutionsData = Awaited<ReturnType<typeof getInstitutions>>['data'];
type ReportPeriodsData = Awaited<ReturnType<typeof getReportPeriods>>['data'];

// Ensure data is not null before getting the element type
type Institution = NonNullable<InstitutionsData>[number];
type ReportPeriod = NonNullable<ReportPeriodsData>[number];

interface InstitutionPeriodSelectorProps {
  institutions: Institution[];
  reportPeriods: ReportPeriod[];
  initialInstitutionId?: number;
  initialReportPeriodId?: number;
  pairIndex: number;
}

export default function InstitutionPeriodSelector({
  institutions,
  reportPeriods,
  initialInstitutionId,
  initialReportPeriodId,
  pairIndex,
}: InstitutionPeriodSelectorProps) {
  const router = useRouter();
  const searchParams = useSearchParams();

  const handleSelectionChange = (name: 'institutionId' | 'reportPeriodId', value: string) => {
    // Get current parameter arrays
    const instParams = searchParams.getAll('institutionId');
    const periodParams = searchParams.getAll('reportPeriodId');
    const insts = [...instParams];
    const periods = [...periodParams];

    if (name === 'institutionId') {
      if (value) {
        insts[pairIndex] = value;
      } else {
        // Remove pair completely if cleared
        insts.splice(pairIndex, 1);
        periods.splice(pairIndex, 1);
      }
    } else {
      if (value) {
        periods[pairIndex] = value;
      } else {
        insts.splice(pairIndex, 1);
        periods.splice(pairIndex, 1);
      }
    }

    // Build new search params
    const newParams = new URLSearchParams();
    insts.forEach((val) => newParams.append('institutionId', val));
    periods.forEach((val) => newParams.append('reportPeriodId', val));

    const qs = newParams.toString();
    const query = qs ? `?${qs}` : '';
    router.push(`/comparison/new${query}`);
  };

  return (
    <form className="grid grid-rows-2 gap-1">
      <div className="">
        {/* Institution Selector */}
        <Select
          value={initialInstitutionId?.toString() ?? ""} // Ensure value is string
          onValueChange={(value) => handleSelectionChange('institutionId', value)}
        >
          <SelectTrigger className="w-[10rem]">
            <SelectValue placeholder="Select Institution..." />
          </SelectTrigger>
          <SelectContent>
            {institutions.map((inst) => (
              <SelectItem key={inst.id} value={inst.id.toString()}>
                {inst.name} (Cert: {inst.cert})
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>
      <div>
        {/* Report Period Selector */}
        <Select
          value={initialReportPeriodId?.toString() ?? ""} // Ensure value is string
          onValueChange={(value) => handleSelectionChange('reportPeriodId', value)}
        >
          <SelectTrigger className="w-[10rem]">
            <SelectValue placeholder="Select Period..." />
          </SelectTrigger>
          <SelectContent>
             {reportPeriods.map((period) => (
              <SelectItem key={period.report_period_id} value={period.report_period_id.toString()}>
                {period.report_date}
              </SelectItem>
            ))}
           </SelectContent>
        </Select>
      </div>
      {/* No submit button needed */}
    </form>
  );
} 