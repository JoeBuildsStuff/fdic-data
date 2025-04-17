import type { SearchParams } from "@/app/types";
import * as React from "react";
import type { SupabaseClient } from "@supabase/supabase-js";
import type { Database } from "@/lib/database.types";

import { DataTableSkeleton } from "@/components/data-table-skeleton";
import { Shell } from "@/components/shell";
import { getValidFilters } from "@/lib/data-table";
import { createClient } from "@/lib/supabase/server";

import { InstitutionsTable } from "./_components/institutions-table";
import { getInstitutions } from "./_lib/queries";
import { searchParamsCache } from "./_lib/validations";
import type { Institution } from "./_lib/schema";

interface IndexPageProps {
  searchParams: Promise<SearchParams>;
}

// Define all selectable columns with user-friendly labels based on Institution schema
// Make sure these IDs match keys in your Institution type and institutions-table-columns.tsx meta
const availableColumns: { id: keyof Institution | string; label: string }[] = [
  { id: "cert", label: "FDIC Cert #" },
  { id: "name", label: "Institution Name" },
  { id: "city", label: "City" },
  { id: "stname", label: "State Name" },
  { id: "zip", label: "Zip Code" },
  { id: "active", label: "Status" },
  { id: "bkclass", label: "Class" },
  { id: "asset", label: "Total Assets" },
  { id: "dep", label: "Total Deposits" },
  { id: "estymd", label: "Established" },
  { id: "webaddr", label: "Website" },
  { id: "address", label: "Street Address" },
  { id: "cb", label: "Community Bank" },
  { id: "cbsa", label: "CBSA Name" },
  { id: "cbsa_div", label: "CBSA Division Name" },
  { id: "cbsa_div_flg", label: "CBSA Division Flag" },
  { id: "cbsa_div_no", label: "CBSA Division Number" },
  { id: "cbsa_metro", label: "CBSA Metro Number" },
  { id: "cbsa_metro_flg", label: "CBSA Metro Flag" },
  { id: "cbsa_metro_name", label: "CBSA Metro Name" },
  { id: "cbsa_micro_flg", label: "CBSA Micro Flag" },
  { id: "cbsa_no", label: "CBSA Number" },
  { id: "certcons", label: "Parent Cert" },
  { id: "cfpbeffdte", label: "CFPB Effective Date" },
  { id: "cfpbenddte", label: "CFPB End Date" },
  { id: "cfpbflag", label: "CFPB Flag" },
  { id: "change1", label: "Change Code 1" },
  { id: "change2", label: "Change Code 2" },
  { id: "change3", label: "Change Code 3" },
  { id: "change4", label: "Change Code 4" },
  { id: "change5", label: "Change Code 5" },
  { id: "change6", label: "Change Code 6" },
  { id: "change7", label: "Change Code 7" },
  { id: "change8", label: "Change Code 8" },
  { id: "change9", label: "Change Code 9" },
  { id: "change10", label: "Change Code 10" },
  { id: "change11", label: "Change Code 11" },
  { id: "change12", label: "Change Code 12" },
  { id: "change13", label: "Change Code 13" },
  { id: "change14", label: "Change Code 14" },
  { id: "change15", label: "Change Code 15" },
  { id: "charter", label: "Charter Number" },
  { id: "chrtagnt", label: "Chartering Agency" },
  { id: "cityhcr", label: "City of High Holder" },
  { id: "clcode", label: "Class Code" },
  { id: "cmsa_no", label: "CMSA Number" },
  { id: "cmsa", label: "CMSA Name" },
  { id: "conserve", label: "Conservatorship" },
  { id: "county", label: "County" },
  { id: "csa", label: "CSA Name" },
  { id: "csa_no", label: "CSA Number" },
  { id: "csa_flg", label: "CSA Flag" },
  { id: "dateupdt", label: "Last Update Date" },
  { id: "denovo", label: "Denovo" },
  { id: "depdom", label: "Domestic Deposits" },
  { id: "docket", label: "OTS Docket Number" },
  { id: "effdate", label: "Last Structure Change Effective Date" },
  { id: "endefymd", label: "End Date" },
  { id: "eq", label: "Equity Capital" },
  { id: "fdicdbs", label: "FDIC Geographic Region" },
  { id: "fdicregn", label: "FDIC Supervisory Region" },
  { id: "fdicsupv", label: "Federal Reserve District" },
  { id: "fed", label: "Federal Reserve ID" },
  { id: "fed_rssd", label: "Federal Reserve RSSD" },
  { id: "fedchrtr", label: "Federal Charter" },
  { id: "fldoff", label: "FDIC Field Office" },
  { id: "form31", label: "FFIEC Call Report 31 Filer" },
  { id: "hctmult", label: "Bank Holding Company Type" },
  { id: "iba", label: "Insured Foreign Bank" },
  { id: "inactive", label: "Inactive" },
  { id: "insagnt1", label: "Primary Insurance Agency" },
  { id: "insagnt2", label: "Secondary Insurance Fund" },
  { id: "insbif", label: "Bank Insurance Fund" },
  { id: "inscoml", label: "Insured Commercial Bank" },
  { id: "insdate", label: "Deposit Insurance Date" },
  { id: "insdropdate", label: "Dropped Deposit Insurance Date" },
  { id: "insdif", label: "Deposit Insurance Fund Member" },
  { id: "insfdic", label: "FDIC Insured" },
  { id: "inssaif", label: "SAIF Insured" },
  { id: "inssave", label: "Insured Savings Institution" },
  { id: "instag", label: "Agricultural Lending Institution" },
  { id: "instcrcd", label: "Credit Card Institution" },
  { id: "latitude", label: "Latitude" },
  { id: "law_sasser_flg", label: "Law Sasser Flag" },
  { id: "longitude", label: "Longitude" },
  { id: "mdi_status_code", label: "Minority Status Code" },
  { id: "mdi_status_desc", label: "Minority Status Description" },
  { id: "msa", label: "MSA Name" },
  { id: "msa_no", label: "MSA Number" },
  { id: "mutual", label: "Ownership Type" },
  { id: "namehcr", label: "Holding Company Name" },
  { id: "netinc", label: "Net Income" },
  { id: "netincq", label: "Net Income Quarterly" },
  { id: "newcert", label: "New Certificate Number" },
  { id: "oakar", label: "Oakar Institution" },
  { id: "occdist", label: "OCC District Code" },
  { id: "offdom", label: "Domestic Offices" },
  { id: "offfor", label: "Foreign Offices" },
  { id: "offices", label: "Offices" },
  { id: "offoa", label: "US Offices" },
  { id: "otsdist", label: "OTS District Code" },
  { id: "otsregnm", label: "OTS Region Name" },
  { id: "parcert", label: "Parent Cert" },
  { id: "procdate", label: "Last Structure Change Process Date" },
  { id: "qbprcoml", label: "QBP Commercial Bank Region" },
  { id: "regagnt", label: "Primary Regulator" },
  { id: "regagent2", label: "Secondary Regulator" },
  { id: "repdte", label: "Report Date" },
  { id: "risdate", label: "RIS Date" },
  { id: "roa", label: "Return on Assets" },
  { id: "roaptx", label: "Pretax Return on Assets" },
  { id: "roaptxq", label: "Quarterly Pretax Return on Assets" },
  { id: "roaq", label: "Quarterly Return on Assets" },
  { id: "roe", label: "Return on Equity" },
  { id: "roeq", label: "Quarterly Return on Equity" },
  { id: "rssdhcr", label: "High Regulatory Holder ID" },
  { id: "rundate", label: "Run Date" },
  { id: "sasser", label: "Sasser Institution" },
  { id: "specgrp", label: "Asset Concentration Hierarchy Code" },
  { id: "specgrpn", label: "Specialization Group Name" },
  { id: "stalp", label: "State Alpha Code" },
  { id: "stalphcr", label: "Reg Holding Co State" },
  { id: "stchrtr", label: "State Charter" },
  { id: "stcnty", label: "State and County Number" },
  { id: "stnum", label: "State Number" },
  { id: "subchaps", label: "Subchapter S Corp" },
  { id: "suprv_fd", label: "Supervisory Region Number" },
  { id: "te01n528", label: "Web URL 1" },
  { id: "te02n528", label: "Web URL 2" },
  { id: "te03n528", label: "Web URL 3" },
  { id: "te04n528", label: "Web URL 4" },
  { id: "te05n528", label: "Web URL 5" },
  { id: "te06n528", label: "Web URL 6" },
  { id: "te07n528", label: "Web URL 7" },
  { id: "te08n528", label: "Web URL 8" },
  { id: "te09n528", label: "Web URL 9" },
  { id: "te10n528", label: "Web URL 10" },
  { id: "te01n529", label: "Trade Name 1" },
  { id: "te02n529", label: "Trade Name 2" },
  { id: "te03n529", label: "Trade Name 3" },
  { id: "te04n529", label: "Trade Name 4" },
  { id: "te05n529", label: "Trade Name 5" },
  { id: "te06n529", label: "Trade Name 6" },
  { id: "tract", label: "Tract" },
  { id: "trust", label: "Trust Powers" },
  { id: "ultcert", label: "Ultimate Cert" },
  { id: "uninum", label: "FDIC Unique Number" }
];

export default async function IndexPage(props: IndexPageProps) {
  const searchParams = await props.searchParams;
  const search = searchParamsCache.parse(searchParams);

  // Create Supabase client *before* calling the cached function
  const supabase: SupabaseClient<Database> = await createClient();

  const validFilters = getValidFilters(search.filters);

  // Pass the supabase client to getInstitutions
  const promises = Promise.all([
    getInstitutions(supabase, { // Pass client as first argument
      ...search,
      filters: validFilters,
    }),
  ]);

  // Determine default/selected columns for skeleton
  const columnsForSkeleton = search.columns.length > 0 ? search.columns : availableColumns.map(c => c.id);

  return (
    <Shell className="gap-2">
        <React.Suspense
          fallback={
            <DataTableSkeleton
              // Adjust skeleton based on selected/default institution columns
              columnCount={columnsForSkeleton.length}
              // You might want to define specific filter inputs if needed
              filterCount={2}
              // Adjust cellWidths based on default/selected columns if needed
              // Example widths for the default columns defined above:
              // cellWidths={[
              //   "8rem", // cert
              //   "20rem", // name
              //   "10rem", // city
              //   "10rem", // stname
              //   "6rem", // zip
              //   "6rem", // active
              //   "8rem", // bkclass
              // ]}
              shrinkZero
            />
          }
        >
          {/* Use InstitutionsTable and pass correct props */}
          <InstitutionsTable
            promises={promises}
            availableColumns={availableColumns}
            search={search}
          />
        </React.Suspense>
    </Shell>
  );
}
