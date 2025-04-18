import "server-only";

import type { SupabaseClient } from "@supabase/supabase-js";
import type { Database } from "@/lib/database.types";
import { unstable_cache } from "@/lib/unstable-cache";

// Define the structure of the returned statistics
export interface KeyStatistics {
  totalInstitutions: number;
  totalAssets: number; // Assuming millions USD, adjust formatting later
  totalDeposits: number; // Assuming millions USD, adjust formatting later
  totalBranches: number;
}

// Define the structure for bank age distribution data items
export interface BankAgeDistributionItem {
    age_range: string; // e.g., '0-9', '10-19'
    count: number;
}

// Define the structure for bank establishment trend data items
export interface BankEstablishmentTrendItem {
    year: string;
    count: number;
}

// Fetch the key statistics data using the RPC function
async function fetchKeyStatisticsData(
  supabase: SupabaseClient<Database>
): Promise<KeyStatistics> {
  try {
    // Call the PostgreSQL function using rpc
    // Cast function name to 'any' to bypass TS check, provide empty params object
    const { data: rawData, error } = await supabase
      .schema('fdic_data')
      .rpc('get_key_statistics')
      .single(); // Expecting a single row result

    if (error) {
      console.error("Error fetching key statistics via RPC:", error);
      throw error;
    }

    // Type guard for null data
    if (!rawData) {
      console.error("No data returned from get_key_statistics RPC call.");
      // Return default values if no data is unexpectedly returned
      return {
        totalInstitutions: 0,
        totalAssets: 0,
        totalDeposits: 0,
        totalBranches: 0
      };
    }

    // Ensure the returned values are numbers, default to 0 if null/undefined
    const totalInstitutions = Number(rawData.total_institutions ?? 0);
    const totalAssets = Number(rawData.total_assets ?? 0);
    const totalDeposits = Number(rawData.total_deposits ?? 0);
    const totalBranches = Number(rawData.total_branches ?? 0);

    return {
      totalInstitutions,
      totalAssets,
      totalDeposits,
      totalBranches
    };

  } catch (err) {
    console.error("Error in fetchKeyStatisticsData:", { err });
    // Return default values on error
    return {
      totalInstitutions: 0,
      totalAssets: 0,
      totalDeposits: 0,
      totalBranches: 0
    };
  }
}

// Fetch the bank age distribution data using the RPC function
async function fetchBankAgeDistributionData(
  supabase: SupabaseClient<Database>
): Promise<BankAgeDistributionItem[]> {
    try {
        // Call the PostgreSQL function using rpc
        const { data, error } = await supabase
          .schema('fdic_data')
          .rpc('get_bank_age_distribution');

        console.log("RPC data", data);

        if (error) {
            console.error("Error fetching bank age distribution via RPC:", error);
            throw error;
        }

        // Type guard for null/undefined data or empty array
        if (!data || !Array.isArray(data)) { // Also check if it's an array
            console.warn("No data or invalid data returned from get_bank_age_distribution RPC call.");
            return []; // Return empty array if no data
        }

        // Ensure the returned values match the expected type
        return data.map((item: BankAgeDistributionItem) => ({
            age_range: String(item.age_range ?? 'Unknown'), // Default to 'Unknown' if null/undefined
            count: Number(item.count ?? 0) // Default to 0 if null/undefined
        }));

    } catch (err) {
        console.error("Error in fetchBankAgeDistributionData:", { err });
        return []; // Return empty array on error
    }
}

// Fetch the bank establishment trend data using the RPC function
async function fetchBankEstablishmentTrendData(
  supabase: SupabaseClient<Database>
): Promise<BankEstablishmentTrendItem[]> {
    try {
        // Call the PostgreSQL function using rpc
        const { data, error } = await supabase
          .schema('fdic_data')
          .rpc('get_bank_establishment_trend');

        if (error) {
            console.error("Error fetching bank establishment trend via RPC:", error);
            throw error;
        }

        // Type guard for null/undefined data or empty array
        if (!data || !Array.isArray(data)) {
            console.warn("No data or invalid data returned from get_bank_establishment_trend RPC call.");
            return []; // Return empty array if no data
        }

        // Ensure the returned values match the expected type
        return data.map((item: BankEstablishmentTrendItem) => ({
            year: String(item.year ?? 'Unknown'),
            count: Number(item.count ?? 0)
        }));

    } catch (err) {
        console.error("Error in fetchBankEstablishmentTrendData:", { err });
        return []; // Return empty array on error
    }
}

// Exported function wraps the fetching logic with unstable_cache
export async function getKeyStatistics(
  supabase: SupabaseClient<Database>
): Promise<KeyStatistics> {
  const cacheKey = "keyStatistics";

  const cachedFetch = unstable_cache(
    // The function to cache doesn't need arguments here as supabase is in the outer scope
    async () => {
      console.log(`Cache miss for key: ${cacheKey}`); // Log cache misses
      return fetchKeyStatisticsData(supabase); // Call the actual fetch logic
    },
    [cacheKey], // Cache key
    {
        revalidate: 3600, // Revalidate cache every hour (data changes less frequently)
      tags: ["statistics", "institutions"], // Cache tags
    }
  );

  try {
    return await cachedFetch();
  } catch (err) {
    console.error("Error executing cached getKeyStatistics:", { err });
    // Return default shape on error
    return {
        totalInstitutions: 0,
        totalAssets: 0,
        totalDeposits: 0,
        totalBranches: 0
    };
  }
}

// Exported function wraps the bank age distribution fetching logic with unstable_cache
export async function getBankAgeDistribution(
    supabase: SupabaseClient<Database>
): Promise<BankAgeDistributionItem[]> {
    const cacheKey = "bankAgeDistribution";

    const cachedFetch = unstable_cache(
        async () => {
            console.log(`Cache miss for key: ${cacheKey}`);
            return fetchBankAgeDistributionData(supabase);
        },
        [cacheKey],
        {
            revalidate: 3600, // Revalidate cache every hour (data changes less frequently)
            tags: ["statistics", "institutions", "ageDistribution"],
        }
    );

    try {
        return await cachedFetch();
    } catch (err) {
        console.error("Error executing cached getBankAgeDistribution:", { err });
        return []; // Return empty array on error
    }
}

// Exported function wraps the bank establishment trend fetching logic with unstable_cache
export async function getBankEstablishmentTrend(
    supabase: SupabaseClient<Database>
): Promise<BankEstablishmentTrendItem[]> {
    const cacheKey = "bankEstablishmentTrend";

    const cachedFetch = unstable_cache(
        async () => {
            console.log(`Cache miss for key: ${cacheKey}`);
            return fetchBankEstablishmentTrendData(supabase);
        },
        [cacheKey],
        {
            revalidate: 10, // Revalidate cache every hour
            tags: ["statistics", "institutions", "establishmentTrend"],
        }
    );

    try {
        return await cachedFetch();
    } catch (err) {
        console.error("Error executing cached getBankEstablishmentTrend:", { err });
        return []; // Return empty array on error
    }
}
