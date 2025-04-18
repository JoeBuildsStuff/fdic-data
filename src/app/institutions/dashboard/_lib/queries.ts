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
            revalidate: 3600, // Revalidate cache every hour
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

// get bankclass counts
export async function fetchBankClassData(
    supabase: SupabaseClient<Database>
  ): Promise<Record<string, number>> {
    try {
      // Revert to fetching only bkclass and counting client-side
      const { data, error } = await supabase
        .schema('fdic_data')
        .from('fdic_data_institutions')
        .select('bkclass') // Select only bkclass
        .eq('active', '1');
  
      if (error) {
        console.error("Error fetching bank class data:", error);
        throw error;
      }
  
      // Count occurrences client-side
      const counts: Record<string, number> = {};
      if (data) {
         // Type 'item' correctly based on the select
         data.forEach((item: { bkclass: string | null }) => {
           const bkclass = item.bkclass || 'unknown';
           counts[bkclass] = (counts[bkclass] || 0) + 1; // Increment count
         });
      }
  
      return counts;
    } catch (err) {
      console.error("Error in fetchBankClassData:", { err });
      return {}; // Return empty object on error
    }
  }

// Fetch Community Bank (CB) data
export async function fetchCommunityBankData(
  supabase: SupabaseClient<Database>
): Promise<Record<string, number>> {
  try {
    const { data, error } = await supabase
      .schema('fdic_data')
      .from('fdic_data_institutions')
      .select('cb')
      .eq('active', '1');

    if (error) {
      console.error("Error fetching community bank data:", error);
      throw error;
    }

    // Count occurrences as "yes" and "no" instead of "1" and "0"
    const counts: Record<string, number> = { yes: 0, no: 0, unknown: 0 };
    if (data) {
      data.forEach((item: { cb: string | null }) => {
        if (item.cb === "1") {
          counts["yes"] = (counts["yes"] || 0) + 1;
        } else if (item.cb === "0") {
          counts["no"] = (counts["no"] || 0) + 1;
        } else {
          counts["unknown"] = (counts["unknown"] || 0) + 1;
        }
      });
    }

    // Remove "unknown" if its count is zero
    if (counts["unknown"] === 0) {
      delete counts["unknown"];
    }

    return counts;
  } catch (err) {
    console.error("Error in fetchCommunityBankData:", { err });
    return {}; // Return empty object on error
  }
}

// Exported function wraps the bank class data fetching logic with unstable_cache
export async function getBankClassData(
  supabase: SupabaseClient<Database>
): Promise<Record<string, number>> {
  const cacheKey = "bankClassData";

  const cachedFetch = unstable_cache(
      async () => {
          console.log(`Cache miss for key: ${cacheKey}`);
          return fetchBankClassData(supabase);
      },
      [cacheKey],
      {
          revalidate: 3600, // Revalidate cache every hour
          tags: ["statistics", "institutions", "bankClass"],
      }
  );

  try {
      return await cachedFetch();
  } catch (err) {
      console.error("Error executing cached getBankClassData:", { err });
      return {}; // Return empty object on error
  }
}

// Exported function wraps the community bank data fetching logic with unstable_cache
export async function getCommunityBankData(
  supabase: SupabaseClient<Database>
): Promise<Record<string, number>> {
  const cacheKey = "communityBankData";

  const cachedFetch = unstable_cache(
      async () => {
          console.log(`Cache miss for key: ${cacheKey}`);
          return fetchCommunityBankData(supabase);
      },
      [cacheKey],
      {
          revalidate: 3600, // Revalidate cache every hour
          tags: ["statistics", "institutions", "communityBank"],
      }
  );

  try {
      return await cachedFetch();
  } catch (err) {
      console.error("Error executing cached getCommunityBankData:", { err });
      return {}; // Return empty object on error
  }
}

// Fetch Regulatory Agent (REGAGNT) data
export async function fetchRegulatorAgentData(
  supabase: SupabaseClient<Database>
): Promise<Record<string, number>> {
  try {
    const { data, error } = await supabase
      .schema('fdic_data')
      .from('fdic_data_institutions')
      .select('regagnt')
      .eq('active', '1');

    if (error) {
      console.error("Error fetching regulator agent data:", error);
      throw error;
    }

    // Count occurrences client-side
    const counts: Record<string, number> = {};
    if (data) {
      data.forEach((item: { regagnt: string | null }) => {
        const regagnt = item.regagnt || 'unknown';
        counts[regagnt] = (counts[regagnt] || 0) + 1;
      });
    }

    return counts;
  } catch (err) {
    console.error("Error in fetchRegulatorAgentData:", { err });
    return {}; // Return empty object on error
  }
}

// Exported function wraps the regulator agent data fetching logic with unstable_cache
export async function getRegulatorAgentData(
  supabase: SupabaseClient<Database>
): Promise<Record<string, number>> {
  const cacheKey = "regulatorAgentData";

  const cachedFetch = unstable_cache(
      async () => {
          console.log(`Cache miss for key: ${cacheKey}`);
          return fetchRegulatorAgentData(supabase);
      },
      [cacheKey],
      {
          revalidate: 3600, // Revalidate cache every hour
          tags: ["statistics", "institutions", "regulatorAgent"],
      }
  );

  try {
      return await cachedFetch();
  } catch (err) {
      console.error("Error executing cached getRegulatorAgentData:", { err });
      return {}; // Return empty object on error
  }
}

// Fetch Specialization Group Name (SPECGRPN) data
export async function fetchSpecializationNameData(
  supabase: SupabaseClient<Database>
): Promise<Record<string, number>> {
  try {
    const { data, error } = await supabase
      .schema('fdic_data')
      .from('fdic_data_institutions')
      .select('specgrpn')
      .eq('active', '1');

    if (error) {
      console.error("Error fetching specialization group name data:", error);
      throw error;
    }

    // Count occurrences client-side
    const counts: Record<string, number> = {};
    if (data) {
      data.forEach((item: { specgrpn: string | null }) => {
        const specgrpn = item.specgrpn || 'unknown';
        counts[specgrpn] = (counts[specgrpn] || 0) + 1;
      });
    }

    return counts;
  } catch (err) {
    console.error("Error in fetchSpecializationNameData:", { err });
    return {}; // Return empty object on error
  }
}

// Exported function wraps the specialization name data fetching logic with unstable_cache
export async function getSpecializationNameData(
  supabase: SupabaseClient<Database>
): Promise<Record<string, number>> {
  const cacheKey = "specializationNameData";

  const cachedFetch = unstable_cache(
      async () => {
          console.log(`Cache miss for key: ${cacheKey}`);
          return fetchSpecializationNameData(supabase);
      },
      [cacheKey],
      {
          revalidate: 3600, // Revalidate cache every hour
          tags: ["statistics", "institutions", "specializationName"],
      }
  );

  try {
      return await cachedFetch();
  } catch (err) {
      console.error("Error executing cached getSpecializationNameData:", { err });
      return {}; // Return empty object on error
  }
}

// Fetch Federal Charter Flag (FEDCHRTR) data
export async function fetchFederalCharterData(
  supabase: SupabaseClient<Database>
): Promise<Record<string, number>> {
  try {
    const { data, error } = await supabase
      .schema('fdic_data')
      .from('fdic_data_institutions')
      .select('fedchrtr')
      .eq('active', '1');

    if (error) {
      console.error("Error fetching federal charter data:", error);
      throw error;
    }

    // Count occurrences client-side
    const counts: Record<string, number> = {};
    if (data) {
      data.forEach((item: { fedchrtr: string | null }) => {
        const fedchrtr = item.fedchrtr || 'unknown';
        counts[fedchrtr] = (counts[fedchrtr] || 0) + 1;
      });
    }

    return counts;
  } catch (err) {
    console.error("Error in fetchFederalCharterData:", { err });
    return {}; // Return empty object on error
  }
}

// Exported function wraps the federal charter data fetching logic with unstable_cache
export async function getFederalCharterData(
  supabase: SupabaseClient<Database>
): Promise<Record<string, number>> {
  const cacheKey = "federalCharterData";

  const cachedFetch = unstable_cache(
      async () => {
          console.log(`Cache miss for key: ${cacheKey}`);
          return fetchFederalCharterData(supabase);
      },
      [cacheKey],
      {
          revalidate: 3600, // Revalidate cache every hour
          tags: ["statistics", "institutions", "federalCharter"],
      }
  );

  try {
      return await cachedFetch();
  } catch (err) {
      console.error("Error executing cached getFederalCharterData:", { err });
      return {}; // Return empty object on error
  }
}

// Fetch State Charter (STCHRTR) data
export async function fetchStateCharterData(
  supabase: SupabaseClient<Database>
): Promise<Record<string, number>> {
  try {
    const { data, error } = await supabase
      .schema('fdic_data')
      .from('fdic_data_institutions')
      .select('stchrtr')
      .eq('active', '1');

    if (error) {
      console.error("Error fetching state charter data:", error);
      throw error;
    }

    // Count occurrences client-side
    const counts: Record<string, number> = {};
    if (data) {
      data.forEach((item: { stchrtr: string | null }) => {
        const stchrtr = item.stchrtr || 'unknown';
        counts[stchrtr] = (counts[stchrtr] || 0) + 1;
      });
    }

    return counts;
  } catch (err) {
    console.error("Error in fetchStateCharterData:", { err });
    return {}; // Return empty object on error
  }
}

// Exported function wraps the state charter data fetching logic with unstable_cache
export async function getStateCharterData(
  supabase: SupabaseClient<Database>
): Promise<Record<string, number>> {
  const cacheKey = "stateCharterData";

  const cachedFetch = unstable_cache(
      async () => {
          console.log(`Cache miss for key: ${cacheKey}`);
          return fetchStateCharterData(supabase);
      },
      [cacheKey],
      {
          revalidate: 3600, // Revalidate cache every hour
          tags: ["statistics", "institutions", "stateCharter"],
      }
  );

  try {
      return await cachedFetch();
  } catch (err) {
      console.error("Error executing cached getStateCharterData:", { err });
      return {}; // Return empty object on error
  }
}

// Fetch Chartering Agency (CHRTAGNT) data
export async function fetchCharteringAgencyData(
  supabase: SupabaseClient<Database>
): Promise<Record<string, number>> {
  try {
    const { data, error } = await supabase
      .schema('fdic_data')
      .from('fdic_data_institutions')
      .select('chrtagnt')
      .eq('active', '1');

    if (error) {
      console.error("Error fetching chartering agency data:", error);
      throw error;
    }

    // Count occurrences client-side
    const counts: Record<string, number> = {};
    if (data) {
      data.forEach((item: { chrtagnt: string | null }) => {
        const chrtagnt = item.chrtagnt || 'unknown';
        counts[chrtagnt] = (counts[chrtagnt] || 0) + 1;
      });
    }

    return counts;
  } catch (err) {
    console.error("Error in fetchCharteringAgencyData:", { err });
    return {}; // Return empty object on error
  }
}

// Exported function wraps the chartering agency data fetching logic with unstable_cache
export async function getCharteringAgencyData(
  supabase: SupabaseClient<Database>
): Promise<Record<string, number>> {
  const cacheKey = "charteringAgencyData";

  const cachedFetch = unstable_cache(
      async () => {
          console.log(`Cache miss for key: ${cacheKey}`);
          return fetchCharteringAgencyData(supabase);
      },
      [cacheKey],
      {
          revalidate: 3600, // Revalidate cache every hour
          tags: ["statistics", "institutions", "charteringAgency"],
      }
  );

  try {
      return await cachedFetch();
  } catch (err) {
      console.error("Error executing cached getCharteringAgencyData:", { err });
      return {}; // Return empty object on error
  }
}

// Fetch Institution Credit Code (INSTCRCD) data
export async function fetchInstitutionCreditCodeData(
  supabase: SupabaseClient<Database>
): Promise<Record<string, number>> {
  try {
    const { data, error } = await supabase
      .schema('fdic_data')
      .from('fdic_data_institutions')
      .select('instcrcd')
      .eq('active', '1');

    if (error) {
      console.error("Error fetching institution credit code data:", error);
      throw error;
    }

    // Count occurrences client-side
    const counts: Record<string, number> = {};
    if (data) {
      data.forEach((item: { instcrcd: string | null }) => {
        const instcrcd = item.instcrcd || 'unknown';
        counts[instcrcd] = (counts[instcrcd] || 0) + 1;
      });
    }

    return counts;
  } catch (err) {
    console.error("Error in fetchInstitutionCreditCodeData:", { err });
    return {}; // Return empty object on error
  }
}

// Exported function wraps the institution credit code data fetching logic with unstable_cache
export async function getInstitutionCreditCodeData(
  supabase: SupabaseClient<Database>
): Promise<Record<string, number>> {
  const cacheKey = "institutionCreditCodeData";

  const cachedFetch = unstable_cache(
      async () => {
          console.log(`Cache miss for key: ${cacheKey}`);
          return fetchInstitutionCreditCodeData(supabase);
      },
      [cacheKey],
      {
          revalidate: 3600, // Revalidate cache every hour
          tags: ["statistics", "institutions", "institutionCreditCode"],
      }
  );

  try {
      return await cachedFetch();
  } catch (err) {
      console.error("Error executing cached getInstitutionCreditCodeData:", { err });
      return {}; // Return empty object on error
  }
}

// Fetch Specialization Group (SPECGRP) numeric code data
export async function fetchSpecializationCodeData(
  supabase: SupabaseClient<Database>
): Promise<Record<string, number>> {
  try {
    const { data, error } = await supabase
      .schema('fdic_data')
      .from('fdic_data_institutions')
      .select('specgrp')
      .eq('active', '1');

    if (error) {
      console.error("Error fetching specialization group code data:", error);
      throw error;
    }

    // Count occurrences client-side
    const counts: Record<string, number> = {};
    if (data) {
      data.forEach((item: { specgrp: number | null }) => {
        const specgrp = (item.specgrp !== null ? String(item.specgrp) : 'unknown');
        counts[specgrp] = (counts[specgrp] || 0) + 1;
      });
    }

    return counts;
  } catch (err) {
    console.error("Error in fetchSpecializationCodeData:", { err });
    return {}; // Return empty object on error
  }
}

// Exported function wraps the specialization code data fetching logic with unstable_cache
export async function getSpecializationCodeData(
    supabase: SupabaseClient<Database>
): Promise<Record<string, number>> {
    const cacheKey = "specializationCodeData";

    const cachedFetch = unstable_cache(
        async () => {
            console.log(`Cache miss for key: ${cacheKey}`);
            return fetchSpecializationCodeData(supabase);
        },
        [cacheKey],
        {
            revalidate: 3600, // Revalidate cache every hour
            tags: ["statistics", "institutions", "specializationCode"],
        }
    );

    try {
        return await cachedFetch();
    } catch (err) {
        console.error("Error executing cached getSpecializationCodeData:", { err });
        return {}; // Return empty object on error
    }
}