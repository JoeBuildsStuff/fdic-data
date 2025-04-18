"use client"

import { Bar, BarChart, CartesianGrid, XAxis, YAxis } from "recharts"

import {
  Card,
  CardContent,
  CardDescription,

  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import {
  ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart"

// Interface for individual chart data items
// Use a more flexible type compatible with various data shapes
type ChartDataItem = Record<string, string | number>;

// Props for the ChartCard component
interface ChartCardProps {
  title: string;
  description: string;
  chartData: ChartDataItem[]; // Use the flexible type
  xAxisKey: string; // Key for the X-axis data
  barKey: string; // Key for the bar data
  barLabel: string; // Label for the bar in the tooltip and config
  barColor?: string; // Optional color for the bar
}

export function ChartCard({ 
  title, 
  description, 
  chartData, 
  xAxisKey, 
  barKey, 
  barLabel,
  barColor = "hsl(var(--chart-1))" // Default color
}: ChartCardProps) {

  // Dynamically create chartConfig based on props
  const chartConfig = {
    [barKey]: { // Use barKey as the key in chartConfig
      label: barLabel,
      color: barColor,
    },
  } satisfies ChartConfig

  return (
    <Card className="shadow-none">
      <CardHeader>
        <CardTitle>{title}</CardTitle>
        <CardDescription>{description}</CardDescription>
      </CardHeader>
      <CardContent>
        <ChartContainer config={chartConfig} className="h-full w-full">
          <BarChart accessibilityLayer data={chartData}>
            <CartesianGrid vertical={false} />
            <XAxis
              dataKey={xAxisKey} // Use xAxisKey prop
              tickLine={false}
              tickMargin={10}
              axisLine={false}
              // tickFormatter={(value) => value.slice(0, 3)} // Remove generic slicer, might need customization per chart
            />
            <YAxis tickLine={false} axisLine={false} /> {/* Added YAxis */}
            <ChartTooltip
              cursor={false}
              content={<ChartTooltipContent /* indicator="dashed" */ />} // Removed indicator for single bar
            />
            <Bar 
              dataKey={barKey} // Use barKey prop
              fill={`var(--color-${barKey})`} // Dynamically set fill using barKey
              radius={4} 
            />
          </BarChart>
        </ChartContainer>
      </CardContent>
    </Card>
  )
}
