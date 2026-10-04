'use client';

import React from 'react';
import { Select, SelectContent, SelectItem, SelectLabel, SelectTrigger, SelectValue, SelectGroup } from "@/components/ui/select";
import { Institution, ReportPeriod } from '../_lib/types';

interface InstitutionPeriodSelectorProps {
  institutions: Institution[];
  reportPeriods: ReportPeriod[];
  selectedInstitutionId?: string; // Optional: Current selected institution ID
  selectedReportPeriodId?: string; // Optional: Current selected report period ID
  onInstitutionChange: (value: string) => void; // Callback for institution selection
  onReportPeriodChange: (value: string) => void; // Callback for report period selection
}

export function InstitutionPeriodSelector({
  institutions,
  reportPeriods,
  selectedInstitutionId,
  selectedReportPeriodId,
  onInstitutionChange,
  onReportPeriodChange,
}: InstitutionPeriodSelectorProps) {
  return (
    <>
      <Select
        value={selectedInstitutionId}
        onValueChange={onInstitutionChange}
      >
        <SelectTrigger className="w-fit min-w-[200px]">
          <SelectValue placeholder="Select an institution" />
        </SelectTrigger>
        <SelectContent>
          <SelectGroup>
            <SelectLabel>Institution</SelectLabel>
            {institutions.map((inst) => (
              <SelectItem key={inst.id} value={inst.id.toString()}>
                {inst.name}
              </SelectItem>
            ))}
          </SelectGroup>
        </SelectContent>
      </Select>

      <Select
        value={selectedReportPeriodId}
        onValueChange={onReportPeriodChange}
      >
        <SelectTrigger className="w-fit min-w-[200px]">
          <SelectValue placeholder="Select report period" />
        </SelectTrigger>
        <SelectContent>
          <SelectGroup>
            <SelectLabel>Report Period</SelectLabel>
            {reportPeriods.map((rp) => (
              <SelectItem key={rp.report_period_id} value={rp.report_period_id.toString()}>
                {rp.report_date}
              </SelectItem>
            ))}
          </SelectGroup>
        </SelectContent>
      </Select>
    </>
  );
} 