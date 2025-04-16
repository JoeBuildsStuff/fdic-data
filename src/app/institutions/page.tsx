import { createClient } from '@/lib/supabase/server';
import Link from 'next/link';
import { InstitutionTable } from '@/app/institutions/components/institution-table';
import { AvailableColumn, Institution } from '@/app/institutions/components/columns';
import { type ExtendedColumnSort } from "@/types/data-table";
import { parseAsInteger, parseAsArrayOf, parseAsString } from 'nuqs/server';

interface Filter {
  id: string;
  value: string;
  variant: string;
  operator: string;
  filterId: string;
}

const DEFAULT_PAGE_SIZE = 20;
const COLUMNS_KEY = "columns";
const ARRAY_SEPARATOR = ",";

// Define available columns based on fetched data
// Updated based on fdic-yaml/institution_properties.yaml
const availableColumns: AvailableColumn[] = [
  { id: 'active', label: 'Institution Status' },
  { id: 'address', label: 'Street Address' },
  { id: 'asset', label: 'Total assets' },
  { id: 'bkclass', label: 'Institution Class' },
  { id: 'cb', label: 'Community Bank' },
  { id: 'cbsa', label: 'Core Based Statistical Area Name' },
  { id: 'cbsa_div', label: 'Metropolitan Divisions Name' },
  { id: 'cbsa_div_flg', label: 'Metropolitan Divisions Flag' },
  { id: 'cbsa_div_no', label: 'Metropolitan Divisions Number' },
  { id: 'cbsa_metro', label: 'Metropolitan Division Number' },
  { id: 'cbsa_metro_flg', label: 'Metropolitan Division Flag' },
  { id: 'cbsa_metro_name', label: 'Metropolitan Division Name' },
  { id: 'cbsa_micro_flg', label: 'Micropolitan Division Flag' },
  { id: 'cbsa_no', label: 'Core Based Statistical Areas' },
  { id: 'cert', label: 'FDIC Certificate #' },
  { id: 'certcons', label: 'Directly owned by another bank (CERT)' },
  { id: 'cfpbeffdte', label: 'CFPB Effective Date' },
  { id: 'cfpbenddte', label: 'CFPB End Date' },
  { id: 'cfpbflag', label: 'CFPB Flag' },
  { id: 'change1', label: 'Change Code' }, // Note: YAML has CHANGEC1, using change1 for consistency
  { id: 'change2', label: 'Change Code' }, // Note: YAML has CHANGEC2, using change2 for consistency
  { id: 'change3', label: 'Change Code' }, // Note: YAML has CHANGEC3, using change3 for consistency
  { id: 'change4', label: 'Change Code' }, // Note: YAML has CHANGEC4, using change4 for consistency
  { id: 'change5', label: 'Change Code' }, // Note: YAML has CHANGEC5, using change5 for consistency
  { id: 'change6', label: 'Change Code' }, // Note: YAML has CHANGEC6, using change6 for consistency
  { id: 'change7', label: 'Change Code' }, // Note: YAML has CHANGEC7, using change7 for consistency
  { id: 'change8', label: 'Change Code' }, // Note: YAML has CHANGEC8, using change8 for consistency
  { id: 'change9', label: 'Change Code' }, // Note: YAML has CHANGEC9, using change9 for consistency
  { id: 'change10', label: 'Change Code' }, // Note: YAML has CHANGEC10, using change10 for consistency
  { id: 'change11', label: 'Change Code' }, // Note: YAML has CHANGEC11, using change11 for consistency
  { id: 'change12', label: 'Change Code' }, // Note: YAML has CHANGEC12, using change12 for consistency
  { id: 'change13', label: 'Change Code' }, // Note: YAML has CHANGEC13, using change13 for consistency
  { id: 'change14', label: 'Change Code' }, // Note: YAML has CHANGEC14, using change14 for consistency
  { id: 'change15', label: 'Change Code' }, // Note: YAML has CHANGEC15, using change15 for consistency
  { id: 'charter', label: 'OCC Charter Number' },
  { id: 'chrtagnt', label: 'Chartering Agency' },
  { id: 'city', label: 'City' },
  { id: 'cityhcr', label: 'City of High Holder' },
  { id: 'clcode', label: 'Numeric code' },
  { id: 'cmsa_no', label: 'Consolidated Metropolitan Statistical Division Number' },
  { id: 'cmsa', label: 'Consolidated Metropolitan Statistical Area' },
  { id: 'conserve', label: 'Conservatorship' },
  { id: 'county', label: 'County' },
  { id: 'csa', label: 'Combined Statistical Area Name' },
  { id: 'csa_no', label: 'Numeric Code for the Combined Statistical Area' },
  { id: 'csa_flg', label: 'CSA Area Flag' },
  { id: 'dateupdt', label: 'Last update' },
  { id: 'denovo', label: 'Denovo Institution' },
  { id: 'dep', label: 'Total deposits' },
  { id: 'depdom', label: 'Deposits held in domestic offices' },
  { id: 'docket', label: 'OTS Docket Number' },
  { id: 'effdate', label: 'Last Structure Change Effective Date' },
  { id: 'endefymd', label: 'End date' },
  { id: 'eq', label: 'Equity capital' },
  { id: 'estymd', label: 'Established Date' },
  { id: 'fdicdbs', label: 'FDIC Geographic Region' },
  { id: 'fdicregn', label: 'FDIC Supervisory Region' },
  { id: 'fdicsupv', label: 'Federal Reserve District' },
  { id: 'fed', label: 'Federal Reserve ID Number' },
  { id: 'fed_rssd', label: 'Federal Reserve ID Number' }, // Note: Duplicate label with 'fed'
  { id: 'fedchrtr', label: 'Federal charter flag' },
  { id: 'fldoff', label: 'FDIC Field Office' },
  { id: 'form31', label: 'FFIEC Call Report 31 Filer' },
  { id: 'hctmult', label: 'Bank Holding Company Type' },
  { id: 'iba', label: 'Insured offices of foreign banks' },
  { id: 'inactive', label: 'Inactive' },
  { id: 'insagnt1', label: 'Primary Insurance Agency' },
  { id: 'insagnt2', label: 'Secondary Insurance Fund' },
  { id: 'insbif', label: 'Bank Insurance Fund' },
  { id: 'inscoml', label: 'Insured commercial banks' },
  { id: 'insdate', label: 'Date of Deposit Insurance' },
  { id: 'insdropdate', label: 'Date of Dropped Deposit Insurance' },
  { id: 'insdif', label: 'Deposit Insurance Fund member' },
  { id: 'insfdic', label: 'FDIC Insured' },
  { id: 'inssaif', label: 'SAIF Insured' },
  { id: 'inssave', label: 'Insured Savings Institution' },
  { id: 'instag', label: 'Agricultural lending institution indicator' },
  { id: 'instcrcd', label: 'Credit Card Institutions' },
  { id: 'latitude', label: 'Location Address Latitude' },
  { id: 'law_sasser_flg', label: 'Law Sasser Flag' },
  { id: 'longitude', label: 'Location Address Longitude' },
  { id: 'mdi_status_code', label: 'Minority Status Code' },
  { id: 'mdi_status_desc', label: 'Minority Status Description' },
  { id: 'msa', label: 'Metropolitan Statistical Area (MSA)' },
  { id: 'msa_no', label: 'Metropolitan Statistical Area Number' },
  { id: 'mutual', label: 'Ownership Type' },
  { id: 'name', label: 'Institution name' },
  { id: 'namehcr', label: 'Bank Holding Company (Regulatory Top Holder)' },
  { id: 'netinc', label: 'Net income' },
  { id: 'netincq', label: 'Net income - quarterly' },
  { id: 'newcert', label: 'New certificate number' },
  { id: 'oakar', label: 'Oakar Institutions' },
  { id: 'occdist', label: 'Office of the Comptroller' },
  { id: 'offdom', label: 'Number of Domestic Offices' },
  { id: 'offfor', label: 'Number of Foreign Offices' },
  { id: 'offices', label: 'Office' },
  { id: 'offoa', label: 'Number of US Offices' },
  { id: 'otsdist', label: 'OTS District' },
  { id: 'otsregnm', label: 'Office of Thrift Supervision Region' },
  { id: 'parcert', label: 'Directly owned by another bank (CERT)' }, // Note: Duplicate label with 'certcons'
  { id: 'procdate', label: 'Last Structure Change Process Date' },
  { id: 'qbprcoml', label: 'Quarterly Banking Profile Commercial Bank Region' },
  { id: 'regagnt', label: 'Primary Regulator' },
  { id: 'regagent2', label: 'Secondary Regulator' },
  { id: 'repdte', label: 'Report Date' },
  { id: 'risdate', label: 'Report Date' }, // Note: Duplicate label with 'repdte'
  { id: 'roa', label: 'Return on assets (ROA)' },
  { id: 'roaptx', label: 'Pretax return on assets' },
  { id: 'roaptxq', label: 'Quarterly Pretax return on assets' },
  { id: 'roaq', label: 'Quarterly return on assets' },
  { id: 'roe', label: 'Return on Equity (ROE)' },
  { id: 'roeq', label: 'Quarterly return on equity' },
  { id: 'rssdhcr', label: 'RSSDID - High Regulatory Holder' },
  { id: 'rundate', label: 'Run Date' },
  { id: 'sasser', label: 'Sasser Institutions' },
  { id: 'specgrp', label: 'Asset Concentration Hierarchy' },
  { id: 'specgrpn', label: 'Specialization Group' },
  { id: 'stalp', label: 'State Alpha code' },
  { id: 'stalphcr', label: 'Regulatory holding company state location' },
  { id: 'stchrtr', label: 'State Charter' },
  { id: 'stcnty', label: 'State and county number' },
  { id: 'stname', label: 'State Name' },
  { id: 'stnum', label: 'State Number' },
  { id: 'subchaps', label: 'Subchapter S Corporations' },
  { id: 'suprv_fd', label: 'Supervisory Region Number' },
  { id: 'te01n528', label: 'Web Site URL 01' },
  { id: 'te02n528', label: 'Web Site URL 02' },
  { id: 'te03n528', label: 'Web Site URL 03' },
  { id: 'te04n528', label: 'Web Site URL 04' },
  { id: 'te05n528', label: 'Web Site URL 05' },
  { id: 'te06n528', label: 'Web Site URL 06' },
  { id: 'te07n528', label: 'Web Site URL 07' },
  { id: 'te08n528', label: 'Web Site URL 08' },
  { id: 'te09n528', label: 'Web Site URL 09' },
  { id: 'te10n528', label: 'Web Site URL 10' },
  { id: 'te01n529', label: 'Trade Name 01' },
  { id: 'te02n529', label: 'Trade Name 02' },
  { id: 'te03n529', label: 'Trade Name 03' },
  { id: 'te04n529', label: 'Trade Name 04' },
  { id: 'te05n529', label: 'Trade Name 05' },
  { id: 'te06n529', label: 'Trade Name 06' },
  { id: 'tract', label: 'Trust Activity Indicator' }, // Note: Empty label from YAML
  { id: 'trust', label: 'Trust Powers' },
  { id: 'ultcert', label: 'Ultimate Cert' },
  { id: 'uninum', label: 'FDIC\'s unique number' },
  { id: 'webaddr', label: 'Primary Internet Web Address' },
  { id: 'zip', label: 'Zip Code' },
  // Removed columns that were not top-level properties in the YAML 'data' section:
  // 'priorname1' through 'priorname10'
  // 'changec1' through 'changec15' (Renamed to change1-15 for consistency, kept title)
  // 'insdropdate_raw'
];

// Define initially selected columns (adjust as needed)
const initialSelectedColumns = ['cert', 'estymd', 'name', 'asset', 'dep','eq', 'netinc', 'roa', 'roe' ];

// Define default sort options using the correct type
const defaultSortOptions: ExtendedColumnSort<Institution>[] = [{ id: 'asset', desc: true }];

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
  const selectedColumns = typeof columnsParam === 'string'
    ? parseAsArrayOf(parseAsString, ARRAY_SEPARATOR).parse(columnsParam) ?? initialSelectedColumns // Parse if string, fallback to default if parsing fails
    : initialSelectedColumns; // Use default directly if param is not a string

  // Ensure 'cert' is always selected as it's the primary identifier
  const selectColumnsString = [...new Set(['cert', ...selectedColumns])]
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

  // Parse sort if it exists, defaulting to defaultSortOptions
  let sortOptions: ExtendedColumnSort<Institution>[] = defaultSortOptions;
  const sortParam = resolvedSearchParams?.sort;
  if (sortParam && typeof sortParam === 'string') {
    try {
      const parsedSort = JSON.parse(sortParam);
      // Basic validation: check if it's an array and items have id/desc
      if (
        Array.isArray(parsedSort) && 
        parsedSort.every(item => typeof item.id === 'string' && typeof item.desc === 'boolean')
      ) {
        // We assume the id will be a valid keyof Institution here.
        // More robust validation could check against availableColumns or Institution keys.
        sortOptions = parsedSort as ExtendedColumnSort<Institution>[];
      } else {
        console.warn('Invalid sort format received, using default:', parsedSort);
      }
    } catch (error) {
      console.error('Error parsing sort JSON:', error);
      // Keep default sortOptions on error
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
      // Skip filter if value is empty
      if (!filter.value) return ''; 

      if (filter.operator === 'iLike') {
        return `${filter.id}.ilike.%${filter.value}%`;
      } else if (filter.operator === 'eq') {
        return `${filter.id}.eq.${filter.value}`;
      } else if (filter.operator === 'gt') {
        // Convert ms timestamp to ISO string for date comparison
        if (filter.id === 'estymd') {
          try {
            const dateValue = new Date(parseInt(filter.value)).toISOString();
            return `${filter.id}.gt.${dateValue}`;
          } catch (e) {
            console.error("Error parsing date for filter:", filter, e);
            return ''; // Skip filter if date parsing fails
          }
        } else {
          return `${filter.id}.gt.${filter.value}`;
        }
      }
      return '';
    }).filter(Boolean);
    
    if (orFilters.length > 0) {
      countQuery = countQuery.or(orFilters.join(','));
    }
  } else {
    // Apply filters with AND logic (default)
    filters.forEach(filter => {
      // Skip filter if value is empty
      if (!filter.value) return; 

      if (filter.operator === 'iLike') {
        countQuery = countQuery.ilike(filter.id, `%${filter.value}%`);
      } else if (filter.operator === 'eq') {
        countQuery = countQuery.eq(filter.id, filter.value);
      } else if (filter.operator === 'gt') {
        // Convert ms timestamp to ISO string for date comparison
        if (filter.id === 'estymd') {
          try {
            const dateValue = new Date(parseInt(filter.value)).toISOString();
            countQuery = countQuery.gt(filter.id, dateValue);
          } catch (e) {
            console.error("Error parsing date for filter:", filter, e);
            // Skip filter if date parsing fails
          }
        } else {
          countQuery = countQuery.gt(filter.id, filter.value);
        }
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
    .eq('active', 1) // Hardcode status filter to 1
    .range(offset, offset + pageSize - 1);
  
  // Apply filters to data query based on join operator
  if (joinOperator === 'or' && filters.length > 0) {
    const orFilters = filters.map(filter => {
      // Skip filter if value is empty
      if (!filter.value) return '';

      if (filter.operator === 'iLike') {
        return `${filter.id}.ilike.%${filter.value}%`;
      } else if (filter.operator === 'eq') {
        return `${filter.id}.eq.${filter.value}`;
      } else if (filter.operator === 'gt') {
        // Convert ms timestamp to ISO string for date comparison
        if (filter.id === 'estymd') {
          try {
            const dateValue = new Date(parseInt(filter.value)).toISOString();
            return `${filter.id}.gt.${dateValue}`;
          } catch (e) {
            console.error("Error parsing date for filter:", filter, e);
            return ''; // Skip filter if date parsing fails
          }
        } else {
          return `${filter.id}.gt.${filter.value}`;
        }
      }
      return '';
    }).filter(Boolean);
    
    if (orFilters.length > 0) {
      query = query.or(orFilters.join(','));
    }
  } else {
    // Apply filters with AND logic (default)
    filters.forEach(filter => {
      // Skip filter if value is empty
      if (!filter.value) return;

      if (filter.operator === 'iLike') {
        query = query.ilike(filter.id, `%${filter.value}%`);
      } else if (filter.operator === 'eq') {
        query = query.eq(filter.id, filter.value);
      } else if (filter.operator === 'gt') {
        // Convert ms timestamp to ISO string for date comparison
        if (filter.id === 'estymd') {
          try {
            const dateValue = new Date(parseInt(filter.value)).toISOString();
            query = query.gt(filter.id, dateValue);
          } catch (e) {
            console.error("Error parsing date for filter:", filter, e);
            // Skip filter if date parsing fails
          }
        } else {
          query = query.gt(filter.id, filter.value);
        }
      }
      // Add more operators as needed
    });
  }
  
  // Apply sorting using the final sortOptions
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
          initialSorting={sortOptions}
          initialPageSize={DEFAULT_PAGE_SIZE}
        />
    </div>
  );
}
  