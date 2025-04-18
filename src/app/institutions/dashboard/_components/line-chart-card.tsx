"use client"

import { CartesianGrid, Line, LineChart, XAxis } from "recharts"

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
type ChartDataItem = Record<string, string | number>;

// Props for the LineChartCard component
interface LineChartProps {
  title: string;
  description: string;
  chartData: ChartDataItem[]; 
  xAxisKey: string; 
  lineKey: string; 
  lineLabel: string; 
  lineColor?: string;
}

export function LineChartCard({ 
  title, 
  description, 
  chartData, 
  xAxisKey, 
  lineKey, 
  lineLabel,
  lineColor = "black" // Default color is now primary
}: LineChartProps) {

  // Dynamically create chartConfig based on props
  const chartConfig = {
    [lineKey]: {
      label: lineLabel,
      color: lineColor,
    },
  } satisfies ChartConfig

  return (
    <Card className="shadow-none">
      <CardHeader>
        <CardTitle>{title}</CardTitle>
        <CardDescription>{description}</CardDescription>
      </CardHeader>
      <CardContent>
        <ChartContainer config={chartConfig}>
          <LineChart
            accessibilityLayer
            data={chartData}
            margin={{
              left: 12,
              right: 12,
            }}
          >
            <CartesianGrid vertical={false} />
            <XAxis
              dataKey={xAxisKey}
              tickLine={false}
              axisLine={false}
              tickMargin={8}
            />
            <ChartTooltip
              cursor={false}
              content={<ChartTooltipContent hideLabel />}
            />
            <Line
              dataKey={lineKey}
              type="natural"
              stroke={lineColor}
              strokeWidth={2}
              dot={false}
            />
          </LineChart>
        </ChartContainer>
      </CardContent>
    </Card>
  )
}
