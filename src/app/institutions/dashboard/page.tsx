import { createClient } from '@/lib/supabase/server'; // Adjust path if necessary
import { 
  getKeyStatistics, 
  getBankAgeDistribution, 
  getBankEstablishmentTrend,
  getBankClassData,
  getCommunityBankData,
  getRegulatorAgentData,
  getFederalCharterData,
  getStateCharterData,
  getCharteringAgencyData,
  getSpecializationNameData,
  getMarketShareAssets,
  getMarketShareDeposits,
  getMarketShareEquity,
  getMarketShareNetIncome
} from './_lib/queries';
import { ColumnChartCard } from './_components/column-chart-card';
import { BarChartCard } from './_components/bar-chart-card'; 
import { MarketShareCard } from './_components/market-share-card'; // Import the new component
import { StatisticCard } from './_components/statistic-card'; // Import the new StatisticCard component
import {
  ChartConfig
} from "@/components/ui/chart";

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

// Helper to convert Record<string, number> to columnar chart data
function convertToColumnChartData(data: Record<string, number>): Array<Record<string, string | number>> {
  return Object.entries(data)
    .map(([category, value]) => ({ 
      category, 
      value 
    }))
    // Sort by value in descending order to make the chart more readable
    .sort((a, b) => (b.value as number) - (a.value as number))
    // Optionally limit to top N if there are too many categories
    .slice(0, 10);
}

// Map for bank class descriptions
const bankClassDescriptions: Record<string, string> = {
  'N': 'National Charter, Fed Member (OCC)',
  'NM': 'State Charter, Fed Non-Member (FDIC)',
  'SM': 'State Charter, Fed Member (FRB)',
  'SB': 'Federal Savings Banks',
  'SA': 'Savings Associations',
  'OI': 'Insured U.S. Branch of Foreign Institution',
  'unknown': 'Unknown Classification'
};

// Enhances bank class data with readable names for column chart
function enhanceBankClassColumnData(data: Record<string, number>): Array<Record<string, string | number>> {
  return Object.entries(data)
    .map(([code, value]) => ({ 
      category: bankClassDescriptions[code] || code, 
      value,
      code // Store the original code for potential use in tooltips or links
    }))
    .sort((a, b) => (b.value as number) - (a.value as number));
}

// Function to generate ChartConfig for BarChartCard from columnar data
function generateBarChartConfig(data: Array<Record<string, string | number>>, categoryKey: string, valueKey: string, defaultColor = "hsl(var(--chart-1))"): ChartConfig {
  const config: ChartConfig = {
    [valueKey]: { // Entry for the value axis
      label: "Value", // Generic label, adjust if needed
      color: defaultColor // Use a default/base color for the value axis itself if needed by the chart component
    }
  };
  data.forEach((item, index) => {
    const category = item[categoryKey] as string;
    // Assign colors systematically, maybe using chart variables
    const color = `hsl(var(--chart-${(index % 8) + 1}))`; // Cycle through chart colors
    config[category] = {
      label: category, // Use the category name as the label
      color: color,
    };
  });
  return config satisfies ChartConfig;
}

export default async function InstitutionsDashboardPage() {
  const supabase = await createClient();
  
  // Fetch all data in parallel
  const [
    stats, 
    bankAgeData, 
    establishmentTrendData,
    bankClassData,
    communityBankData,
    regulatorAgentData,
    federalCharterData,
    stateCharterData,
    charteringAgencyData,
    specializationNameData
  ] = await Promise.all([
    getKeyStatistics(supabase),
    getBankAgeDistribution(supabase),
    getBankEstablishmentTrend(supabase),
    getBankClassData(supabase),
    getCommunityBankData(supabase),
    getRegulatorAgentData(supabase),
    getFederalCharterData(supabase),
    getStateCharterData(supabase),
    getCharteringAgencyData(supabase),
    getSpecializationNameData(supabase)
  ]);

  // Fetch market share data in parallel (could be combined with above)
  const [
    marketShareAssetsData,
    marketShareDepositsData,
    marketShareEquityData,
    marketShareNetIncomeData
  ] = await Promise.all([
    getMarketShareAssets(supabase),
    getMarketShareDeposits(supabase),
    getMarketShareEquity(supabase),
    getMarketShareNetIncome(supabase)
  ]);

  // Group the establishment data by decades
  const establishmentByDecadeData = groupEstablishmentsByDecade(establishmentTrendData);

  // Use current date for weekly updates, placeholder for quarterly date
  const currentDate = new Date();
  const weeklyUpdateDate = new Intl.DateTimeFormat('en-US', { year: 'numeric', month: 'numeric', day: 'numeric' }).format(currentDate);
  // Using the date provided in the example text for quarterly data
  const quarterlyUpdateDate = '12/31/2024'; // TODO: Replace with dynamic date if needed

  // Prepare column chart data
  const bankClassColumnData = enhanceBankClassColumnData(bankClassData);
  const communityBankColumnData = convertToColumnChartData(communityBankData);
  const regulatorAgentColumnData = convertToColumnChartData(regulatorAgentData);
  const charterTypesColumnData = convertToColumnChartData({
    'Federal Charter': federalCharterData['1'] || 0,
    'State Charter': stateCharterData['1'] || 0
  });
  const charteringAgencyColumnData = convertToColumnChartData(charteringAgencyData);
  const specializationColumnData = convertToColumnChartData(specializationNameData);

  // Generate ChartConfigs for the Bar Charts
  const bankClassBarConfig = generateBarChartConfig(bankClassColumnData, 'category', 'value', 'hsl(var(--chart-3))');
  const communityBankBarConfig = generateBarChartConfig(communityBankColumnData, 'category', 'value', 'hsl(var(--chart-4))');
  const regulatorAgentBarConfig = generateBarChartConfig(regulatorAgentColumnData, 'category', 'value', 'hsl(var(--chart-5))');
  const charterTypesBarConfig = generateBarChartConfig(charterTypesColumnData, 'category', 'value', 'hsl(var(--chart-6))');
  const charteringAgencyBarConfig = generateBarChartConfig(charteringAgencyColumnData, 'category', 'value', 'hsl(var(--chart-7))');
  const specializationBarConfig = generateBarChartConfig(specializationColumnData, 'category', 'value', 'hsl(var(--chart-8))');

  return (
    <div className="flex flex-col gap-4">
      {/* Key Statistics Section */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {/* Replace individual cards with the reusable component */}
        <StatisticCard 
          title={formatNumber(stats.totalInstitutions)}
          description="Total Insured Institutions"
          footerText="Total Institutions"
          updateDate={weeklyUpdateDate}
        />
        <StatisticCard 
          title={formatNumber(stats.totalBranches)}
          description="Total Insured Branch Offices"
          footerText="Total Branches"
          updateDate={weeklyUpdateDate}
        />
        <StatisticCard 
          title={formatMillionsCurrency(stats.totalAssets)}
          description="Total Assets"
          footerText="Millions $USD"
          updateDate={quarterlyUpdateDate}
        />
        <StatisticCard 
          title={formatMillionsCurrency(stats.totalDeposits)}
          description="Total Deposits"
          footerText="Millions $USD"
          updateDate={quarterlyUpdateDate}
        />
      </div>

      {/* Market Share Section - Row 5 */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <MarketShareCard 
          title="Asset Concentration"
          description="Market share held by top institutions"
          data={marketShareAssetsData}
          updateDate={quarterlyUpdateDate}
        />
        <MarketShareCard 
          title="Deposit Concentration"
          description="Market share held by top institutions"
          data={marketShareDepositsData}
          updateDate={quarterlyUpdateDate}
        />
        <MarketShareCard 
          title="Equity Concentration"
          description="Market share held by top institutions"
          data={marketShareEquityData}
          updateDate={quarterlyUpdateDate}
        />
        <MarketShareCard 
          title="Net Income Concentration"
          description="Market share held by top institutions"
          data={marketShareNetIncomeData}
          updateDate={quarterlyUpdateDate}
        />
      </div>

      {/* Charts Section - Row 1 */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {/* Bank Age Distribution Chart */}
        <ColumnChartCard 
            title="Institution Age Distribution" 
            description={`Distribution of FDIC insured institutions by age group (Data as of ${weeklyUpdateDate})`}
            chartData={bankAgeData as unknown as Record<string, string | number>[]} // Assert type to satisfy ChartCard prop type
            xAxisKey="age_range" // Key from our RPC function
            barKey="count" // Key from our RPC function
            barLabel="Institutions" // Label for the bars
            // Optionally specify barColor here if needed
        />

        {/* Bank Establishment Trend Chart - Now as Column Chart with decades */}
        <ColumnChartCard 
            title="New Bank Establishments by Decade" 
            description={`Number of new bank formations per decade (Data as of ${weeklyUpdateDate})`}
            chartData={establishmentByDecadeData as unknown as Record<string, string | number>[]} // Now using the grouped data
            xAxisKey="year" // Using the same key, but it now contains decade ranges
            barKey="count" // Key from our RPC function
            barLabel="New Institutions" // Label for the bars
            barColor="hsl(var(--chart-2))" // Different color from the age distribution chart
        />
      </div>

      {/* Charts Section - Row 2 */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {/* Bank Class Distribution - Now Bar Chart */}
        <BarChartCard 
          title="Institution Classification"
          description={`Distribution by FDIC Bank Class (${weeklyUpdateDate})`}
          chartData={bankClassColumnData}
          chartConfig={bankClassBarConfig} // Pass generated config
          yAxisKey="category" // Was xAxisKey
          yAxisWidth={200}
          xAxisKey="value"    // Was barKey
          barKey="value"      // The value being plotted
          // Footer props can be added if needed
        />

        {/* Community Bank Distribution - Now Bar Chart */}
        <BarChartCard 
          title="Community Banks"
          description={`Institutions by Community Bank Status (${weeklyUpdateDate})`}
          chartData={communityBankColumnData}
          chartConfig={communityBankBarConfig} // Pass generated config
          yAxisKey="category"
          xAxisKey="value"
          barKey="value"
        />
      </div>

      {/* Charts Section - Row 3 */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {/* Regulator Agent Distribution - Now Bar Chart */}
        <BarChartCard 
          title="Primary Regulators"
          description={`Institutions by Primary Regulatory Agency (${weeklyUpdateDate})`}
          chartData={regulatorAgentColumnData}
          chartConfig={regulatorAgentBarConfig} // Pass generated config
          yAxisKey="category"
          xAxisKey="value"
          barKey="value"
        />

        {/* Charter Type Distribution - Now Bar Chart */}
        <BarChartCard 
          title="Charter Types"
          description={`Federal vs State Charters (${weeklyUpdateDate})`}
          chartData={charterTypesColumnData}
          chartConfig={charterTypesBarConfig} // Pass generated config
          yAxisKey="category"
          xAxisKey="value"
          barKey="value"
        />
      </div>

      {/* Charts Section - Row 4 */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {/* Chartering Agency Distribution - Now Bar Chart */}
        <BarChartCard 
          title="Chartering Agencies"
          description={`Distribution by Chartering Authority (${weeklyUpdateDate})`}
          chartData={charteringAgencyColumnData}
          chartConfig={charteringAgencyBarConfig} // Pass generated config
          yAxisKey="category"
          xAxisKey="value"
          barKey="value"
        />

        {/* Specialization Distribution - Now Bar Chart */}
        <BarChartCard 
          title="Institution Specializations"
          description={`Distribution by Business Focus (${weeklyUpdateDate})`}
          chartData={specializationColumnData}
          chartConfig={specializationBarConfig} // Pass generated config
          yAxisWidth={200}
          yAxisKey="category"
          xAxisKey="value"
          barKey="value"
        />
      </div>

    </div>
  );
}