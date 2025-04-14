import { createClient } from '@/lib/supabase/server';
import Link from 'next/link';
import { InstitutionTable } from '@/app/institutions/components/institution-table';
import { columns, Institution } from '@/app/institutions/components/columns';
import { parseAsInteger } from 'nuqs/server';

interface InstitutionsProps {
  searchParams?: {
    page?: string;
    perPage?: string;
    filters?: string;
    sort?: string;
    joinOperator?: string;
  };
}

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

export default async function Institutions({ searchParams }: InstitutionsProps) {
  const supabase = await createClient();

  const page = parseAsInteger.withDefault(1).parse(searchParams?.page ?? '');
  const perPage = parseAsInteger.withDefault(DEFAULT_PAGE_SIZE).parse(searchParams?.perPage ?? '');
  const pageSize = perPage ?? DEFAULT_PAGE_SIZE;

  // Parse filters if they exist
  const filters: Filter[] = searchParams?.filters ? JSON.parse(searchParams.filters) : [];
  
  // Parse sort if it exists
  const sortOptions: SortOption[] = searchParams?.sort ? JSON.parse(searchParams.sort) : [];
  
  // Check join operator
  const joinOperator = searchParams?.joinOperator === 'or' ? 'or' : 'and';

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
    .select('cert, name, city, stname, zip, address, asset, cb, bkclass, active')
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
          columns={columns}
          data={institutions as Institution[]}
          pageCount={totalPages}
        />
    </div>
  );
}
  