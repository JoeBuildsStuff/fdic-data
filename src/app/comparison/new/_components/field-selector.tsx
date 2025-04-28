"use client";
import { useSearchParams, useRouter } from 'next/navigation';
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from "@/components/ui/select";

const FIELD_GROUPS = [
  "Assets, Liabilities, and Capital",
  "Income and Expense",
  "Performance and Condition Ratios",
  "Demographic Information",
];

export default function FieldSelector() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const currentGroup = searchParams.get('fieldGroup') ?? '';
  return (
    <Select
      value={currentGroup}
      onValueChange={(value) => {
        const instParams = searchParams.getAll('institutionId');
        const periodParams = searchParams.getAll('reportPeriodId');
        const newParams = new URLSearchParams();
        if (value) {
          newParams.set('fieldGroup', value);
        }
        instParams.forEach((v) => newParams.append('institutionId', v));
        periodParams.forEach((v) => newParams.append('reportPeriodId', v));
        const qs = newParams.toString();
        router.push(`/comparison/new${qs ? `?${qs}` : ''}`);
      }}
    >
      <SelectTrigger className="w-full">
        <SelectValue placeholder="Select field group" />
      </SelectTrigger>
      <SelectContent>
        {FIELD_GROUPS.map((group) => (
          <SelectItem key={group} value={group}>
            {group}
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  );
}