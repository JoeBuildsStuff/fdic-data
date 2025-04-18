import {
  Card,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

interface StatisticCardProps {
  title: string;          // The main statistic value (already formatted)
  description: string;    // The description above the title
  footerText: string;     // Text in the footer (e.g., "Total Institutions" or "Millions $USD")
  updateDate: string;     // The date for the footer
}

export function StatisticCard({ title, description, footerText, updateDate }: StatisticCardProps) {
  return (
    <Card className="shadow-none">
      <CardHeader>
        <CardDescription>{description}</CardDescription>
        <CardTitle className="@[250px]/card:text-3xl text-2xl font-semibold tabular-nums">
          {title}
        </CardTitle>
      </CardHeader>
      <CardFooter className="flex-col items-start gap-1 text-sm">
        <div className="line-clamp-1 flex font-medium">{footerText}</div>
        <div className="text-muted-foreground">Data as of {updateDate}</div>
      </CardFooter>
    </Card>
  );
} 