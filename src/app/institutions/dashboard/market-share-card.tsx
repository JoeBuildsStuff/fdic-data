import { MarketShareItem } from './_lib/queries'; // Assuming the interface is exported from queries
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

interface MarketShareCardProps {
  title: string;
  description: string;
  data: MarketShareItem[];
  updateDate: string; // e.g., "12/31/2024"
}

// Helper to format percentage
function formatPercentage(value: number): string {
  return `${value.toFixed(2)}%`;
}

export function MarketShareCard({ title, description, data, updateDate }: MarketShareCardProps) {
  return (
    <Card className="shadow-none">
      <CardHeader>
        <CardTitle>{title}</CardTitle>
        <CardDescription>{description}</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-2">
          {data.length > 0 ? (
            data
              .sort((a, b) => {
                // Sort primarily by group_name logic (e.g., Top 0.1%, Top 1%, Top 10%)
                const getSortValue = (name: string) => {
                  if (name.includes('Top 0.1%')) return 1;
                  if (name.includes('Top 1%')) return 2;
                  if (name.includes('Top 10%')) return 3;
                  return 4; // Fallback for other names
                };
                return getSortValue(a.group_name) - getSortValue(b.group_name);
              })
              .map((item) => (
                <div key={item.group_name} className="flex justify-between items-center text-sm">
                  <span className="font-medium">{item.group_name}
                    <span className="text-muted-foreground ml-1">({item.bank_count} banks)</span>:
                  </span>
                  <div className="text-right tabular-nums">
                    <span className="font-semibold">{formatPercentage(item.percentage_of_total)}</span>
                  </div>
                </div>
              ))
          ) : (
            <p className="text-muted-foreground text-sm">No market share data available.</p>
          )}
        </div>
      </CardContent>
      <CardFooter className="text-sm text-muted-foreground">
        Data as of {updateDate}
      </CardFooter>
    </Card>
  );
} 