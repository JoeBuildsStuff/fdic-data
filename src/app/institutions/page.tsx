import { createClient } from '@/lib/supabase/server';
import Link from 'next/link';
import { InstitutionTable } from '@/app/institutions/components/institution-table';
import { AvailableColumn, Institution } from '@/app/institutions/components/columns';
import { parseAsInteger, parseAsArrayOf, parseAsString } from 'nuqs/server';

interface Filter {
  id: string;
  value: string;
  variant: string;
  operator: string;
  filterId: string;
}

interface SortOption {
  id: string;
  desc: boolean;
}

const DEFAULT_PAGE_SIZE = 10;
const COLUMNS_KEY = "columns";
const ARRAY_SEPARATOR = ",";

// Define available columns based on fetched data
const availableColumns: AvailableColumn[] = [
  { id: 'cert', label: 'Certificate' },
  { id: 'name', label: 'Name' },
  { id: 'city', label: 'City' },
  { id: 'stname', label: 'State' },
  { id: 'zip', label: 'Zip' },
  { id: 'address', label: 'Address' },
  { id: 'asset', label: 'Assets' },
  { id: 'cb', label: 'Commercial Bank' },
  { id: 'bkclass', label: 'Bank Class' },
  { id: 'active', label: 'Active' },
];

// Define initially selected columns (adjust as needed)
const initialSelectedColumns = ['cert', 'name', 'city', 'stname', 'asset', 'active'];

export default async function Institutions({
  searchParams,
}: {
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>
}) {
  const resolvedSearchParams = await searchParams;
  const supabase = await createClient();

  // Handle potential string array for page and perPage
  const pageParam = resolvedSearchParams?.page;
  const perPageParam = resolvedSearchParams?.perPage;

  const page = parseAsInteger.withDefault(1).parse(
    typeof pageParam === 'string' ? pageParam : ''
  );
  const perPage = parseAsInteger.withDefault(DEFAULT_PAGE_SIZE).parse(
    typeof perPageParam === 'string' ? perPageParam : ''
  );
  const pageSize = perPage ?? DEFAULT_PAGE_SIZE;

  // Parse selected columns, defaulting to initialSelectedColumns
  const columnsParam = resolvedSearchParams?.[COLUMNS_KEY];
  const selectedColumns = parseAsArrayOf(parseAsString, ARRAY_SEPARATOR)
    .withDefault(initialSelectedColumns)
    .parse(typeof columnsParam === 'string' ? columnsParam : '');

  // Ensure 'cert' is always selected as it's the primary identifier
  const selectColumnsString = [...new Set(['cert', ...(selectedColumns ?? [])])]
    .join(',');

  // Parse filters if they exist
  let filters: Filter[] = [];
  const filtersParam = resolvedSearchParams?.filters;
  if (filtersParam && typeof filtersParam === 'string') {
    try {
      filters = JSON.parse(filtersParam);
    } catch (error) {
      console.error('Error parsing filters JSON:', error);
      // Handle invalid JSON, maybe set default filters or show an error
    }
  }

  // Parse sort if it exists
  let sortOptions: SortOption[] = [];
  const sortParam = resolvedSearchParams?.sort;
  if (sortParam && typeof sortParam === 'string') {
    try {
      sortOptions = JSON.parse(sortParam);
    } catch (error) {
      console.error('Error parsing sort JSON:', error);
      // Handle invalid JSON, maybe set default sort or show an error
    }
  }

  // Check join operator
  const joinOperator = resolvedSearchParams?.joinOperator === 'or' ? 'or' : 'and';

  const offset = ((page ?? 1) - 1) * pageSize;

  // Build count query with filters
  let countQuery = supabase
    .from('fdic_data_institutions')
    .select('*', { count: 'exact', head: true });
    
  // Apply filters to count query based on join operator
  if (joinOperator === 'or' && filters.length > 0) {
    const orFilters = filters.map(filter => {
      if (filter.operator === 'iLike') {
        return `${filter.id}.ilike.%${filter.value}%`;
      } else if (filter.operator === 'eq') {
        return `${filter.id}.eq.${filter.value}`;
      }
      return '';
    }).filter(Boolean);
    
    if (orFilters.length > 0) {
      countQuery = countQuery.or(orFilters.join(','));
    }
  } else {
    // Apply filters with AND logic (default)
    filters.forEach(filter => {
      if (filter.operator === 'iLike') {
        countQuery = countQuery.ilike(filter.id, `%${filter.value}%`);
      } else if (filter.operator === 'eq') {
        countQuery = countQuery.eq(filter.id, filter.value);
      }
      // Add more operators as needed
    });
  }

  const { count, error: countError } = await countQuery;

  if (countError) {
    console.error('Error fetching institution count:', countError);
    return <div className="p-4 text-red-500">Error loading data count.</div>;
  }

  // Build data query with filters
  let query = supabase
    .from('fdic_data_institutions')
    .select(selectColumnsString)
    .range(offset, offset + pageSize - 1);
  
  // Apply filters to data query based on join operator
  if (joinOperator === 'or' && filters.length > 0) {
    const orFilters = filters.map(filter => {
      if (filter.operator === 'iLike') {
        return `${filter.id}.ilike.%${filter.value}%`;
      } else if (filter.operator === 'eq') {
        return `${filter.id}.eq.${filter.value}`;
      }
      return '';
    }).filter(Boolean);
    
    if (orFilters.length > 0) {
      query = query.or(orFilters.join(','));
    }
  } else {
    // Apply filters with AND logic (default)
    filters.forEach(filter => {
      if (filter.operator === 'iLike') {
        query = query.ilike(filter.id, `%${filter.value}%`);
      } else if (filter.operator === 'eq') {
        query = query.eq(filter.id, filter.value);
      }
      // Add more operators as needed
    });
  }
  
  // Apply sorting
  sortOptions.forEach(sort => {
    if (sort.id === 'asset' && sort.desc) {
      // For asset column in descending order, put NULL/NaN values last
      query = query.order(sort.id, { ascending: false, nullsFirst: false });
    } else {
      query = query.order(sort.id, { ascending: !sort.desc, nullsFirst: !sort.desc });
    }
  });

  const { data: institutions, error: dataError } = await query;

  if (dataError) {
    console.error('Error fetching institutions:', dataError);
    return <div className="p-4 text-red-500">Error loading data.</div>;
  }

  const totalPages = Math.ceil((count ?? 0) / pageSize);

  if (!institutions && (count ?? 0) > 0 && (page ?? 1) > 1) {
     return (
       <div className="p-4">
         <h1 className="text-2xl font-bold mb-4">FDIC Institutions</h1>
         <p>Page {page ?? 1} does not exist. The last page is {totalPages}.</p>
         <Link href={`/institutions?page=${totalPages}`}>
            <button className="mt-4 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-700">
              Go to Last Page
            </button>
          </Link>
       </div>
     );
  }

  return (
    <div className="container mx-auto py-10">
      <h1 className="text-3xl font-bold mb-6">FDIC Institutions</h1>
        <InstitutionTable
          availableColumns={availableColumns}
          initialSelectedColumns={initialSelectedColumns}
          data={institutions as Institution[]}
          pageCount={totalPages}
        />
    </div>
  );
}
  