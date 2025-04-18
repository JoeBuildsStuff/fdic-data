import { createClient } from '@/lib/supabase/server'; // Adjust path if necessary
import { getKeyStatistics, getBankAgeDistribution, getBankEstablishmentTrend } from './_lib/queries';
import { ChartCard } from './column-chart-card'; // Import ChartCard
import {
  Card,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"; // Assuming Shadcn UI components path
// import { LineChartCard } from './line-chart-card';
// Helper function for formatting numbers
function formatNumber(num: number): string {
  // Handle potential null/undefined inputs from data, though getKeyStatistics provides defaults
  if (typeof num !== 'number') return '0'; 
  return num.toLocaleString('en-US');
}

// Helper function for formatting currency in millions (assuming input data is in thousands)
function formatMillionsCurrency(num: number): string {
  if (typeof num !== 'number' || num === 0) return '$0 Million';
  // Divide by 1000 to convert thousands to millions
  const millions = num / 1000;
  // Format as currency, remove decimals for millions, and add ' Million'
  return millions.toLocaleString('en-US', {
    style: 'currency',
    currency: 'USD',
    minimumFractionDigits: 0, // Ensure no decimals
    maximumFractionDigits: 0, // Ensure no decimals
  });
}

// Function to group bank establishment data by decades
function groupEstablishmentsByDecade(data: Array<{ year: string; count: number }>) {
  const decadeData: Record<string, number> = {};
  
  // Group the data by decade
  data.forEach(item => {
    const year = parseInt(item.year, 10);
    if (isNaN(year)) return; // Skip invalid years
    
    // Calculate the decade start year (e.g., 1980 for 1980s)
    const decadeStart = Math.floor(year / 10) * 10;
    const decadeKey = `${decadeStart}-${decadeStart + 9}`;
    
    // Initialize the decade if it doesn't exist
    if (!decadeData[decadeKey]) {
      decadeData[decadeKey] = 0;
    }
    
    // Add the count to the decade total
    decadeData[decadeKey] += item.count;
  });
  
  // Convert to array format for the chart
  return Object.entries(decadeData)
    .map(([decade, count]) => ({ 
      year: decade, // Using 'year' as the key to match the chart component props
      count 
    }))
    .sort((a, b) => {
      // Sort by decade start year
      const aStart = parseInt(a.year.split('-')[0], 10);
      const bStart = parseInt(b.year.split('-')[0], 10);
      return aStart - bStart;
    });
}

export default async function InstitutionsDashboardPage() {
  const supabase = await createClient();
  // Fetch all data in parallel
  const [stats, bankAgeData, establishmentTrendData] = await Promise.all([
    getKeyStatistics(supabase),
    getBankAgeDistribution(supabase),
    getBankEstablishmentTrend(supabase)
  ]);

  // Group the establishment data by decades
  const establishmentByDecadeData = groupEstablishmentsByDecade(establishmentTrendData);

  // Use current date for weekly updates, placeholder for quarterly date
  const currentDate = new Date();
  const weeklyUpdateDate = new Intl.DateTimeFormat('en-US', { year: 'numeric', month: 'numeric', day: 'numeric' }).format(currentDate);
  // Using the date provided in the example text for quarterly data
  const quarterlyUpdateDate = '12/31/2024'; // TODO: Replace with dynamic date if needed

  return (
    <div className="flex flex-col gap-4">
      {/* Key Statistics Section */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {/* Card 1: Total Institutions */}
        <Card className="shadow-none">
          <CardHeader>
            <CardDescription>Total Insured Institutions</CardDescription>
            <CardTitle className="@[250px]/card:text-3xl text-2xl font-semibold tabular-nums">
              {formatNumber(stats.totalInstitutions)}
            </CardTitle>
          </CardHeader>
          <CardFooter className="flex-col items-start gap-1 text-sm">
            <div className="line-clamp-1 flex font-medium">Total Institutions</div>
            <div className="text-muted-foreground">Data as of {weeklyUpdateDate}</div>
          </CardFooter>
        </Card>

        {/* Card 2: Total Branches */}
        <Card className="shadow-none">
          <CardHeader>
            <CardDescription>Total Insured Branch Offices</CardDescription>
            <CardTitle className="@[250px]/card:text-3xl text-2xl font-semibold tabular-nums">
              {formatNumber(stats.totalBranches)}
            </CardTitle>
          </CardHeader>
          <CardFooter className="flex-col items-start gap-1 text-sm">
            <div className="line-clamp-1 flex font-medium">Total Branches</div>
            <div className="text-muted-foreground">Data as of {weeklyUpdateDate}</div>
          </CardFooter>
        </Card>

        {/* Card 3: Total Assets */}
        <Card className="shadow-none">
          <CardHeader>
            <CardDescription>Total Assets</CardDescription>
            <CardTitle className="@[250px]/card:text-3xl text-2xl font-semibold tabular-nums">
              {formatMillionsCurrency(stats.totalAssets)}
            </CardTitle>
          </CardHeader>
          <CardFooter className="flex-col items-start gap-1 text-sm">
            <div className="line-clamp-1 flex font-medium">Millions $USD</div>
            <div className="text-muted-foreground">Data as of {quarterlyUpdateDate}</div>
          </CardFooter>
        </Card>

        {/* Card 4: Total Deposits */}
        <Card className="shadow-none ">
          <CardHeader>
            <CardDescription>Total Deposits</CardDescription>
            <CardTitle className="@[250px]/card:text-3xl text-2xl font-semibold tabular-nums">
              {formatMillionsCurrency(stats.totalDeposits)}
            </CardTitle>
          </CardHeader>
          <CardFooter className="flex-col items-start gap-1 text-sm">
            <div className="flex font-medium">Millions $USD</div>
            <div className="text-muted-foreground">Data as of {quarterlyUpdateDate}</div>
          </CardFooter>
        </Card>
      </div>

      {/* Charts Section */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {/* Bank Age Distribution Chart */}
        <ChartCard 
            title="Institution Age Distribution" 
            description={`Distribution of FDIC insured institutions by age group (Data as of ${weeklyUpdateDate})`}
            chartData={bankAgeData as unknown as Record<string, string | number>[]} // Assert type to satisfy ChartCard prop type
            xAxisKey="age_range" // Key from our RPC function
            barKey="count" // Key from our RPC function
            barLabel="Institutions" // Label for the bars
            // Optionally specify barColor here if needed
        />

        {/* Bank Establishment Trend Chart - Now as Column Chart with decades */}
        <ChartCard 
            title="New Bank Establishments by Decade" 
            description={`Number of new bank formations per decade (Data as of ${weeklyUpdateDate})`}
            chartData={establishmentByDecadeData as unknown as Record<string, string | number>[]} // Now using the grouped data
            xAxisKey="year" // Using the same key, but it now contains decade ranges
            barKey="count" // Key from our RPC function
            barLabel="New Institutions" // Label for the bars
            barColor="hsl(var(--chart-2))" // Different color from the age distribution chart
        />
      </div>

      
    </div>
  );
}
