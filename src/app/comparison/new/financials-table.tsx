import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import FinancialsForm from "./financials-form";
import type { getInstitutions, getReportPeriods, getFieldByName } from "./_lib/queries";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";

// Define data types based on query return values
type InstitutionsData = Awaited<ReturnType<typeof getInstitutions>>['data'];
type ReportPeriodsData = Awaited<ReturnType<typeof getReportPeriods>>['data'];
type Institution = NonNullable<InstitutionsData>[number];
type ReportPeriod = NonNullable<ReportPeriodsData>[number];
type FieldData = Awaited<ReturnType<typeof getFieldByName>>['data'];

// Type for each selected institution/period pair and its values
export type SelectedPairData = {
  institutionId: number;
  reportPeriodId: number;
  institutionName?: string;
  reportDate?: string;
  depValue: number | null;
  assetValue: number | null;
};

interface FinancialsTableProps {
  institutions: Institution[];
  reportPeriods: ReportPeriod[];
  selectedData: SelectedPairData[];
  depField: FieldData;
  assetField: FieldData;
}

export default function FinancialsTable({
  institutions,
  reportPeriods,
  selectedData,
  depField,
  assetField,
}: FinancialsTableProps) {
  return (
    <TooltipProvider>
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead className="w-[200px]"></TableHead>
            {selectedData.map((pair, idx) => (
              <TableHead key={idx} className="py-2">
                <FinancialsForm
                  institutions={institutions}
                  reportPeriods={reportPeriods}
                  initialInstitutionId={pair.institutionId}
                  initialReportPeriodId={pair.reportPeriodId}
                  pairIndex={idx}
                />
              </TableHead>
            ))}
            <TableHead className="py-2">
              <FinancialsForm
                institutions={institutions}
                reportPeriods={reportPeriods}
                pairIndex={selectedData.length}
              />
            </TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {depField && (
            <TableRow key={depField.field_id}>
              <TableCell className="font-medium">
                <Tooltip>
                  <TooltipTrigger asChild>
                    <span>{depField.title}:</span>
                  </TooltipTrigger>
                  <TooltipContent className="max-w-[300px]">
                    <p className="m-1">{depField.description}</p>
                  </TooltipContent>
                </Tooltip>
              </TableCell>
              {selectedData.map((pair, idx) => (
                <TableCell key={idx}>
                  {pair.depValue !== null
                    ? `$${(pair.depValue * 1000).toLocaleString()}`
                    : 'N/A'}
                </TableCell>
              ))}
              <TableCell>N/A</TableCell>
            </TableRow>
          )}
          {assetField && (
            <TableRow key={assetField.field_id}>
              <TableCell className="font-medium">
                <Tooltip>
                  <TooltipTrigger asChild>
                    <span>{assetField.title}:</span>
                  </TooltipTrigger>
                  <TooltipContent className="max-w-[300px]">
                    <p className="m-1">{assetField.description}</p>
                  </TooltipContent>
                </Tooltip>
              </TableCell>
              {selectedData.map((pair, idx) => (
                <TableCell key={idx}>
                  {pair.assetValue !== null
                    ? `$${(pair.assetValue * 1000).toLocaleString()}`
                    : 'N/A'}
                </TableCell>
              ))}
              <TableCell>N/A</TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>
    </TooltipProvider>
  );
}
