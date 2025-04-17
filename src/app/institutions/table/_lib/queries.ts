import "server-only";

import type { Institution } from "./schema";
import type { SupabaseClient } from "@supabase/supabase-js"; 
import type { PostgrestFilterBuilder } from "@supabase/postgrest-js";
import type { Database } from "@/lib/database.types";

import { unstable_cache } from "@/lib/unstable-cache";

import type { GetInstitutionsSchema } from "./validations";

// Helper to apply Supabase filters directly using query methods
function applySupabaseFilters(
  query: PostgrestFilterBuilder<
    Database['fdic_data'],
    Database['fdic_data']['Tables']['fdic_data_institutions']['Row'],
    Database['fdic_data']['Tables']['fdic_data_institutions']['Row'][],
    unknown
  >,
  filters: GetInstitutionsSchema['filters'],
  joinOperator: 'and' | 'or'
) {
  if (filters.length === 0) {
    return query;
  }

  // For 'or' operator, construct the .or() condition string
  if (joinOperator === 'or') {
    const orFilterStrings = filters.map(f => {
      const columnName = f.id;
      const value = f.value;
      // Use operator names matching GetInstitutionsSchema['filters'] type
      switch (f.operator) {
        case 'iLike':
          if (Array.isArray(value)) return null; // Skip if value is array
          return `${columnName}.ilike.%${value}%`;
        case 'eq':
          if (Array.isArray(value)) return null; // Skip if value is array
          return `${columnName}.eq.${value}`;
        case 'ne':
          if (Array.isArray(value)) return null; // Skip if value is array
          return `${columnName}.neq.${value}`;
        case 'gt':
          if (Array.isArray(value)) return null; // Skip if value is array
          return `${columnName}.gt.${value}`;
        case 'gte':
          if (Array.isArray(value)) return null; // Skip if value is array
          return `${columnName}.gte.${value}`;
        case 'lt':
          if (Array.isArray(value)) return null; // Skip if value is array
          return `${columnName}.lt.${value}`;
        case 'lte':
          if (Array.isArray(value)) return null; // Skip if value is array
          return `${columnName}.lte.${value}`;
        case 'inArray':
          if (Array.isArray(value)) {
            return `${columnName}.in.(${value.join(',')})`;
          } else {
             console.warn(`'inArray' operator requires an array value for column ${columnName}`);
             return null;
          }
        // Add other operators from GetInstitutionsSchema['filters'] type as needed
        // e.g., case 'notILike': return `${columnName}.not.ilike.%${value}%`;
        // e.g., case 'isEmpty': return `${columnName}.is.null`; // Or .is.empty based on Supabase version/need
        // e.g., case 'isNotEmpty': return `${columnName}.not.is.null`;
        default:
          console.warn(`Unsupported filter operator for 'or': ${f.operator}`);
          return null;
      }
    }).filter(Boolean);

    if (orFilterStrings.length > 0) {
      query = query.or(orFilterStrings.join(','));
    }
  } else {
    // For 'and' operator, apply filters sequentially using specific methods
    filters.forEach(f => {
      const columnName = f.id;
      const value = f.value;
      // Use operator names matching GetInstitutionsSchema['filters'] type
      switch (f.operator) {
        case 'iLike':
          if (!Array.isArray(value)) {
            query = query.ilike(columnName, `%${value}%`);
          }
          break;
        case 'eq':
          if (!Array.isArray(value)) {
            query = query.eq(columnName, value);
          }
          break;
        case 'ne':
          if (!Array.isArray(value)) {
            query = query.neq(columnName, value);
          }
          break;
        case 'gt':
          if (!Array.isArray(value)) {
            query = query.gt(columnName, value);
          }
          break;
        case 'gte':
          if (!Array.isArray(value)) {
            query = query.gte(columnName, value);
          }
          break;
        case 'lt':
          if (!Array.isArray(value)) {
            query = query.lt(columnName, value);
          }
          break;
        case 'lte':
          if (!Array.isArray(value)) {
            query = query.lte(columnName, value);
          }
          break;
        case 'inArray':
          if (Array.isArray(value)) {
             query = query.in(columnName, value);
          } else {
             console.warn(`'inArray' operator requires an array value for column ${columnName}`);
          }
          break;
        // Add other operators from GetInstitutionsSchema['filters'] type as needed
        // e.g., case 'notILike': query = query.not(columnName, 'ilike', `%${value}%`); break;
        // e.g., case 'isEmpty': query = query.is(columnName, null); break;
        // e.g., case 'isNotEmpty': query = query.not(columnName, 'is', null); break;
        default:
          console.warn(`Unsupported filter operator for 'and': ${f.operator}`);
      }
    });
  }

  return query;
}

// Define the actual data fetching logic separately
async function fetchInstitutionsData(
  supabase: SupabaseClient<Database>,
  input: GetInstitutionsSchema
) {
  // Define the expected query builder type explicitly near the top
  type QueryBuilderType = PostgrestFilterBuilder<
    Database['fdic_data'],
    Database['fdic_data']['Tables']['fdic_data_institutions']['Row'],
    Database['fdic_data']['Tables']['fdic_data_institutions']['Row'][],
    unknown
  >;

  try {
    const offset = (input.page - 1) * input.perPage;
    const limit = offset + input.perPage - 1;

    const selectColumns = input.columns.length > 0 ? input.columns.join(',') : '*';

    // Start query using the passed Supabase client and add explicit cast
    let query = supabase
      .schema('fdic_data')
      .from('fdic_data_institutions')
      .select(selectColumns, { count: 'exact' }) as QueryBuilderType;

    if ( input.filters.length > 0) {
      // Now the type passed should match the function signature due to the cast
      query = applySupabaseFilters(query, input.filters, input.joinOperator);
    }

    if (input.sort.length > 0) {
      input.sort.forEach(item => {
        const ascending = !item.desc;
        // Treat nulls as the smallest value: NULLS FIRST for asc, NULLS LAST for desc
        query = query.order(item.id as string, { ascending: ascending, nullsFirst: ascending });
      });
    } else {
      // Keep default sort as name ascending (null handling might not be critical here)
      // If a different default involving numeric/date is desired, apply nullsFirst logic here too.
      query = query.order('name', { ascending: true });
    }

    query = query.range(offset, limit);

    const { data, error, count } = await query;

    if (error) {
      console.error("Error fetching institutions from Supabase:", { error });
      throw error;
    }

    const total = count ?? 0;
    const pageCount = Math.ceil(total / input.perPage);

    const typedData = (data || []) as unknown as Institution[];

    return { data: typedData, pageCount };

  } catch (err) {
    // Log the error specific to data fetching
    console.error("Error during Supabase data fetch:", { err });
    // Re-throw or return error shape for the cache wrapper to handle
    // Return the default shape so the page doesn't crash
    return { data: [], pageCount: 0 };
  }
}

// Exported function now wraps the fetching logic with unstable_cache
export async function getInstitutions(
  supabase: SupabaseClient<Database>,
  input: GetInstitutionsSchema
) {
  const cacheKey = `getInstitutions-${JSON.stringify(input)}`;

  // unstable_cache now wraps the call to fetchInstitutionsData
  // Note: Supabase client is NOT passed directly to unstable_cache callback arguments
  // It's used by the function being called *inside* the cache boundary, but created outside.
  const cachedFetch = unstable_cache(
    async (inputJson: string) => {
      // We parse the input inside the cache boundary if needed,
      // or simply use the outer `input` variable if scope allows.
      // Using outer `input` is simpler here.
      const parsedInput = JSON.parse(inputJson) as GetInstitutionsSchema;
      console.log(`Cache miss for key: ${cacheKey}`); // Log cache misses
      return fetchInstitutionsData(supabase, parsedInput); // Call the actual fetch logic
    },
    [cacheKey], // Cache key based on input parameters
    {
      revalidate: 60,
      tags: ["institutions"],
    }
  );

  // Call the cached function with the stringified input
  // Although the callback uses the outer `input`, unstable_cache needs a serializable argument
  // for its internal keying/tracking if the key array isn't sufficient.
  // Passing the JSON string ensures this, even if the callback doesn't explicitly use it.
  try {
    return await cachedFetch(JSON.stringify(input));
  } catch (err) {
     // Log error from cache wrapper/fetch function
     console.error("Error executing cached getInstitutions:", {err});
     return { data: [], pageCount: 0 }; // Return default shape on error
  }
}
