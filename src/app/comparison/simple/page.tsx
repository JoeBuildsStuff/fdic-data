import { getInstitutions, getReportPeriods, getFields } from "./_lib/queries"
import { InvertedTable } from "./_components/inverted-table";


export default async function DemoPage() {
  // Fetch institutions and report periods and fields
  const institutions = await getInstitutions();
  const reportPeriods = await getReportPeriods();
  const fields = await getFields();

  return (
    <div className="container mx-auto py-10">
      <InvertedTable
        institutions={institutions}
        reportPeriods={reportPeriods}
        fields={fields}
      />

    </div>
  )
}
