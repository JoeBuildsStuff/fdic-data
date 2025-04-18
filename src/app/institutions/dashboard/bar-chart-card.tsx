"use client"

import { TrendingUp } from "lucide-react"
import { Bar, BarChart, XAxis, YAxis } from "recharts"
import { ElementType } from "react";

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
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
// Use a flexible type compatible with various data shapes
type ChartDataItem = Record<string, string | number | undefined>;

// Props for the BarChartCard component
interface BarChartCardProps {
  title: string;
  description: string;
  chartData: ChartDataItem[];
  chartConfig: ChartConfig;
  yAxisKey: string; // Key for the Y-axis data (categories)
  xAxisKey: string; // Key for the X-axis data (values)
  barKey: string; // Key for the bar data (values)
  yAxisWidth?: number; // Optional width for the Y axis labels
  footerText?: string; // Optional main footer text
  footerMutedText?: string; // Optional muted footer text
  FooterIcon?: ElementType; // Optional icon component for the footer
}

// Updated component signature to accept props
export function BarChartCard({
  title,
  description,
  chartData,
  chartConfig,
  yAxisKey,
  xAxisKey,
  barKey,
  footerText,
  footerMutedText,
  yAxisWidth = 80, // Default Y axis width
  FooterIcon = TrendingUp // Default icon if none provided
}: BarChartCardProps) {
  return (
    <Card className="shadow-none">
      <CardHeader>
        <CardTitle>{title}</CardTitle>
        <CardDescription>{description}</CardDescription>
      </CardHeader>
      <CardContent>
        <ChartContainer config={chartConfig} className="h-full w-full">
          <BarChart
            accessibilityLayer
            data={chartData}
            layout="vertical"
            margin={{
              left: 20,
            }}
            className="h-full w-full"
          >
            <YAxis
              dataKey={yAxisKey}
              type="category"
              tickLine={false}
              tickMargin={10}
              axisLine={false}
              width={yAxisWidth}
              tickFormatter={(value) =>
                chartConfig[value as keyof typeof chartConfig]?.label ?? value
              }
            />
            <XAxis dataKey={xAxisKey} type="number" hide />
            <ChartTooltip
              cursor={false}
              content={<ChartTooltipContent hideLabel />}
            />
            <Bar dataKey={barKey} layout="vertical" radius={5} />
          </BarChart>
        </ChartContainer>
      </CardContent>
      {(footerText || footerMutedText) && (
        <CardFooter className="flex-col items-start gap-2 text-sm">
          {footerText && (
            <div className="flex gap-2 font-medium leading-none">
              {footerText} {FooterIcon && <FooterIcon className="h-4 w-4" />}
            </div>
          )}
          {footerMutedText && (
            <div className="leading-none text-muted-foreground">
              {footerMutedText}
            </div>
          )}
        </CardFooter>
      )}
    </Card>
  )
}
