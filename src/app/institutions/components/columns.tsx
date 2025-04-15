"use client"

import { ColumnDef } from "@tanstack/react-table"
import { DataTableColumnHeader } from "@/components/data-table-column-header"
import { Building2, MapPin, Hash, Link as LinkIcon, Calendar, CheckCircle, XCircle, Circle, TrendingUp, Percent, Banknote } from "lucide-react"

// Define and export the AvailableColumn type here
export interface AvailableColumn {
  id: keyof Institution | string;
  label: string;
}

// This type is based on the institution properties from the YAML file
export type Institution = {
  active?: string | null; // Institution Status ('1' or '0')
  address?: string | null; // Street Address
  asset?: string | null; // Total Assets (number as string)
  bkclass?: string | null; // Institution Class Code
  cb?: string | null; // Community Bank flag ('1' or '0')
  cbsa?: string | null; // Core Based Statistical Area Name
  cbsa_div?: string | null; // Metropolitan Divisions Name
  cbsa_div_flg?: string | null; // Metropolitan Divisions Flag ('1' or '0')
  cbsa_div_no?: string | null; // Metropolitan Divisions Number
  cbsa_metro?: string | null; // Metropolitan Division Number
  cbsa_metro_flg?: string | null; // Metropolitan Division Flag ('1' or '0')
  cbsa_metro_name?: string | null; // Metropolitan Division Name
  cbsa_micro_flg?: string | null; // Micropolitan Division Flag ('1' or '0')
  cbsa_no?: string | null; // Core Based Statistical Areas Number
  cert?: string | null; // FDIC Certificate #
  certcons?: string | null; // Directly owned by another bank (CERT)
  cfpbeffdte?: string | null; // CFPB Effective Date (date string)
  cfpbenddte?: string | null; // CFPB End Date (date string)
  cfpbflag?: string | null; // CFPB Flag ('1' or '0')
  change1?: string | null; // Change Code 1
  change2?: string | null; // Change Code 2
  change3?: string | null; // Change Code 3
  change4?: string | null; // Change Code 4
  change5?: string | null; // Change Code 5
  change6?: string | null; // Change Code 6
  change7?: string | null; // Change Code 7
  change8?: string | null; // Change Code 8
  change9?: string | null; // Change Code 9
  change10?: string | null; // Change Code 10
  change11?: string | null; // Change Code 11
  change12?: string | null; // Change Code 12
  change13?: string | null; // Change Code 13
  change14?: string | null; // Change Code 14
  change15?: string | null; // Change Code 15
  charter?: string | null; // OCC Charter Number
  chrtagnt?: string | null; // Chartering Agency Code
  city?: string | null; // City
  cityhcr?: string | null; // City of High Holder
  clcode?: string | null; // Numeric class code
  cmsa_no?: string | null; // Consolidated Metropolitan Statistical Division Number
  cmsa?: string | null; // Consolidated Metropolitan Statistical Area Name
  conserve?: string | null; // Conservatorship flag ('1' or '0')
  county?: string | null; // County Name
  csa?: string | null; // Combined Statistical Area Name
  csa_no?: string | null; // Combined Statistical Area Number
  csa_flg?: string | null; // CSA Area Flag ('1' or '0')
  dateupdt?: string | null; // Last update date (date string)
  denovo?: string | null; // Denovo Institution flag ('1' or '0')
  dep?: string | null; // Total deposits (number as string)
  depdom?: string | null; // Deposits held in domestic offices (number as string)
  docket?: string | null; // OTS Docket Number
  effdate?: string | null; // Last Structure Change Effective Date (date string)
  endefymd?: string | null; // End date (date string)
  eq?: string | null; // Equity capital (number as string)
  estymd?: string | null; // Established Date (date string)
  fdicdbs?: string | null; // FDIC Geographic Region Code
  fdicregn?: string | null; // FDIC Supervisory Region Name
  fdicsupv?: string | null; // Federal Reserve District Name
  fed?: string | null; // Federal Reserve ID Number (District Code)
  fed_rssd?: string | null; // Federal Reserve ID Number (RSSD)
  fedchrtr?: string | null; // Federal charter flag ('1' or '0')
  fldoff?: string | null; // FDIC Field Office Name
  form31?: string | null; // FFIEC Call Report 31 Filer flag ('1' or '0')
  hctmult?: string | null; // Bank Holding Company Type flag ('1' or '0')
  iba?: string | null; // Insured offices of foreign banks flag ('1' or '0')
  inactive?: string | null; // Inactive flag ('1' or '0')
  insagnt1?: string | null; // Primary Insurance Agency Code
  insagnt2?: string | null; // Secondary Insurance Fund Code
  insbif?: string | null; // Bank Insurance Fund flag ('1' or '0')
  inscoml?: string | null; // Insured commercial banks flag ('1' or '0')
  insdate?: string | null; // Date of Deposit Insurance (date string)
  insdropdate?: string | null; // Date of Dropped Deposit Insurance (date string)
  insdif?: string | null; // Deposit Insurance Fund member flag ('1' or '0')
  insfdic?: string | null; // FDIC Insured flag ('1' or '0') // Likely always 1 for this dataset
  inssaif?: string | null; // SAIF Insured flag ('1' or '0')
  inssave?: string | null; // Insured Savings Institution flag ('1' or '0')
  instag?: string | null; // Agricultural lending institution indicator ('1' or '0')
  instcrcd?: string | null; // Credit Card Institutions flag ('1' or '0')
  latitude?: number | null; // Location Address Latitude (using number based on context)
  law_sasser_flg?: string | null; // Law Sasser Flag ('1' or '0')
  longitude?: number | null; // Location Address Longitude (using number based on context)
  mdi_status_code?: string | null; // Minority Status Code
  mdi_status_desc?: string | null; // Minority Status Description
  msa?: string | null; // Metropolitan Statistical Area (MSA) Name
  msa_no?: string | null; // Metropolitan Statistical Area Number
  mutual?: string | null; // Ownership Type flag ('1' or '0')
  name?: string | null; // Institution name
  namehcr?: string | null; // Bank Holding Company (Regulatory Top Holder) Name
  netinc?: string | null; // Net income (number as string)
  netincq?: string | null; // Net income - quarterly (number as string)
  newcert?: string | null; // New certificate number
  oakar?: string | null; // Oakar Institutions flag ('1' or '0')
  occdist?: string | null; // Office of the Comptroller District Code
  offdom?: string | null; // Number of Domestic Offices (number as string)
  offfor?: string | null; // Number of Foreign Offices (number as string)
  offices?: string | null; // Office (number as string?) - Check YAML, marked as number but description vague
  offoa?: string | null; // Number of US Offices (number as string)
  otsdist?: string | null; // OTS District Code
  otsregnm?: string | null; // Office of Thrift Supervision Region Name
  parcert?: string | null; // Directly owned by another bank (CERT) - parent cert
  procdate?: string | null; // Last Structure Change Process Date (date string)
  qbprcoml?: string | null; // Quarterly Banking Profile Commercial Bank Region Name
  regagnt?: string | null; // Primary Regulator Code
  regagent2?: string | null; // Secondary Regulator Code
  repdte?: string | null; // Report Date (date string)
  risdate?: string | null; // Report Date (date string, same as repdte?)
  roa?: string | null; // Return on assets (ROA) (number as string, likely percent)
  roaptx?: string | null; // Pretax return on assets (number as string, likely percent)
  roaptxq?: string | null; // Quarterly Pretax return on assets (number as string, likely percent)
  roaq?: string | null; // Quarterly return on assets (number as string, likely percent)
  roe?: string | null; // Return on Equity (ROE) (number as string, likely percent)
  roeq?: string | null; // Quarterly return on equity (number as string, likely percent)
  rssdhcr?: string | null; // RSSDID - High Regulatory Holder ID
  rundate?: string | null; // Run Date (date string)
  sasser?: string | null; // Sasser Institutions flag ('1' or '0')
  specgrp?: string | null; // Asset Concentration Hierarchy Code (number as string)
  specgrpn?: string | null; // Specialization Group Name
  stalp?: string | null; // State Alpha code (e.g., 'CA')
  stalphcr?: string | null; // Regulatory holding company state location (e.g., 'CA')
  stchrtr?: string | null; // State Charter flag ('1' or '0')
  stcnty?: string | null; // State and county number (FIPS)
  stname?: string | null; // State Name (e.g., 'California')
  stnum?: string | null; // State Number (FIPS)
  subchaps?: string | null; // Subchapter S Corporations flag ('1' or '0')
  suprv_fd?: string | null; // Supervisory Region Number Code
  te01n528?: string | null; // Web Site URL 01
  te02n528?: string | null; // Web Site URL 02
  te03n528?: string | null; // Web Site URL 03
  te04n528?: string | null; // Web Site URL 04
  te05n528?: string | null; // Web Site URL 05
  te06n528?: string | null; // Web Site URL 06
  te07n528?: string | null; // Web Site URL 07
  te08n528?: string | null; // Web Site URL 08
  te09n528?: string | null; // Web Site URL 09
  te10n528?: string | null; // Web Site URL 10
  te01n529?: string | null; // Trade Name 01
  te02n529?: string | null; // Trade Name 02
  te03n529?: string | null; // Trade Name 03
  te04n529?: string | null; // Trade Name 04
  te05n529?: string | null; // Trade Name 05
  te06n529?: string | null; // Trade Name 06
  tract?: string | null; // TRACT - Meaning unclear from YAML ('')
  trust?: string | null; // Trust Powers Code
  ultcert?: string | null; // Ultimate Cert Number
  uninum?: string | null; // FDIC's unique number
  webaddr?: string | null; // Primary Internet Web Address
  zip?: string | null; // Zip Code
}

// Helper function for simple flag rendering
const renderFlag = (value: string | number | null | undefined) => { // Added type
  return <div>{value === "1" || value === 1 ? <CheckCircle className="h-4 w-4 text-green-500" /> : value === "0" || value === 0 ? <XCircle className="h-4 w-4 text-red-500" /> : <Circle className="h-4 w-4 text-gray-400" />}</div>; // Allow number comparison too
}

// Helper function for currency formatting (handles potential K suffix if needed)
const formatCurrency = (value: string | number | null | undefined, multiplier: number = 1000) => { // Added type, removed unused unit
    if (value === null || value === undefined || value === '' || isNaN(Number(value))) {
        return <div className="text-right">-</div>;
    }
    try {
        const amount = parseFloat(value as string) * multiplier;
        const formatted = new Intl.NumberFormat("en-US", {
            style: "currency",
            currency: "USD", // Assuming USD, adjust if needed
            notation: "standard", // Use "compact" for K/M/B etc. if preferred
            minimumFractionDigits: 0,
            maximumFractionDigits: 0,
        }).format(amount);
        return <div className="text-right">{formatted}</div>;
    } catch (e) {
        console.error("Error formatting currency:", value, e);
        return <div className="text-right">Invalid Value</div>;
    }
}

// Helper function for percentage formatting
const formatPercentage = (value: string | number | null | undefined) => { // Added type
    if (value === null || value === undefined || value === '' || isNaN(Number(value))) {
        return <div className="text-right">-</div>;
    }
    try {
        const amount = parseFloat(value as string);
        const formatted = new Intl.NumberFormat("en-US", {
            style: "percent",
            minimumFractionDigits: 2,
            maximumFractionDigits: 2,
        }).format(amount / 100); // Assuming the value is already in percent * 100 format
        return <div className="text-right">{formatted}</div>;
    } catch (e) {
        console.error("Error formatting percentage:", value, e);
        return <div className="text-right">Invalid Value</div>;
    }
}

// Helper function for date formatting
const formatDate = (value: string | number | null | undefined) => { // Added type
    if (!value) return <div className="">-</div>;
    try {
        // Attempt common date formats
        const date = new Date(value);
        if (isNaN(date.getTime())) {
             // Try parsing YYYYMMDD if applicable
             if (typeof value === 'string' && /^\d{8}$/.test(value)) {
                 const year = value.substring(0, 4);
                 const month = value.substring(4, 6);
                 const day = value.substring(6, 8);
                 const parsedDate = new Date(`${year}-${month}-${day}T00:00:00Z`); // Use UTC
                 if (!isNaN(parsedDate.getTime())) {
                     return <div className="">{parsedDate.toLocaleDateString()}</div>;
                 }
             }
             // Try parsing MM/DD/YYYY if applicable (less likely from DB)
             if (typeof value === 'string' && /^\d{1,2}\/\d{1,2}\/\d{4}$/.test(value)) {
                 const parsedDate = new Date(value);
                  if (!isNaN(parsedDate.getTime())) {
                     return <div className="">{parsedDate.toLocaleDateString()}</div>;
                 }
             }

             console.warn("Invalid date format:", value);
             return <div className="">{value}</div>; // Fallback to original string
        }
        return <div className="">{date.toLocaleDateString()}</div>;
    } catch (e) {
        console.error("Error formatting date:", value, e);
        return <div className="">Invalid Date</div>;
    }
}

// Helper function for simple URL rendering
const renderUrl = (value: string | number | null | undefined) => { // Added type
  if (!value || typeof value !== 'string') return <div className="">-</div>;
  // Basic check if it looks like a URL
  if (!value.startsWith('http://') && !value.startsWith('https://')) {
      value = 'http://' + value; // Attempt to make it a valid link
  }
  return <a href={value} target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline truncate max-w-xs inline-block">{value}</a>;
}

// Define ALL possible columns in a Record keyed by their accessorKey/id
const allColumns: Record<string, ColumnDef<Institution>> = {
  cert: {
    accessorKey: "cert",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="FDIC Cert #" />
    ),
    meta: {
      label: "FDIC Certificate #",
      placeholder: "Search certificate #...",
      variant: "text",
      icon: Hash,
    },
    enableColumnFilter: true,
    enableHiding: false, // Usually keep ID visible
  },
  name: {
    accessorKey: "name",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Institution Name" />
    ),
    cell: ({ row }) => <div className="">{row.getValue("name")}</div>,
    meta: {
      label: "Institution name",
      placeholder: "Search names...",
      variant: "text",
      icon: Building2,
    },
    enableColumnFilter: true,
  },
  city: {
    accessorKey: "city",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="City" />
    ),
    meta: {
      label: "City",
      placeholder: "Search cities...",
      variant: "text",
      icon: MapPin,
    },
    enableColumnFilter: true,
  },
  stname: {
    accessorKey: "stname",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="State Name" />
    ),
    meta: {
      label: "State Name",
      variant: "select",
      options: [], // Will be populated from data
      icon: MapPin,
    },
    enableColumnFilter: true,
  },
  zip: {
    accessorKey: "zip",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Zip Code" />
    ),
    meta: {
      label: "Zip Code",
      placeholder: "Search ZIP codes...",
      variant: "text",
      icon: MapPin,
    },
    enableColumnFilter: true,
  },
  address: {
    accessorKey: "address",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Street Address" />
    ),
    meta: {
      label: "Street Address",
      placeholder: "Search addresses...",
      variant: "text",
      icon: MapPin,
    },
    enableColumnFilter: true,
  },
  asset: {
    accessorKey: "asset",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Total Assets" />
    ),
    cell: ({ row }) => {
      const value = row.getValue("asset");
      if (value === null || value === undefined || isNaN(Number(value))) {
        return <div className="">-</div>;
      }
      const amount = parseFloat(value as string) * 1000; // Convert K to actual amount
      const formatted = new Intl.NumberFormat("en-US", {
        style: "currency",
        currency: "USD",
        notation: "standard",
        minimumFractionDigits: 0,
        maximumFractionDigits: 0,
      }).format(amount);

      return <div className="">{formatted}</div>;
    },
    meta: {
      label: "Total assets",
      variant: "range",
      range: [0, 1000000000],
      unit: "$",
      icon: Banknote,
    },
    enableColumnFilter: true,
  },
  cb: {
    accessorKey: "cb",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Community Bank" />
    ),
    cell: ({ row }) => {
       const flag = row.getValue("cb");
       return <div>{flag === "1" ? "Yes" : flag === "0" ? "No" : "-"}</div>;
    },
    meta: {
      label: "Community Bank",
      variant: "select",
      options: [
        { label: "Yes", value: "1" },
        { label: "No", value: "0" }
      ],
      icon: Building2,
    },
    enableColumnFilter: true,
  },
  bkclass: {
    accessorKey: "bkclass",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Class" />
    ),
    meta: {
      label: "Institution Class",
      variant: "select",
      options: [
        { label: "National Bank", value: "N" },
        { label: "State Member", value: "SM" },
        { label: "State Non-Member", value: "NM" },
        { label: "Savings Bank", value: "SB" },
        { label: "Savings Assoc.", value: "SA" },
        { label: "Other", value: "OI" }
      ],
      icon: Building2,
    },
    enableColumnFilter: true,
  },
  active: {
    accessorKey: "active",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Status" />
    ),
    cell: ({ row }) => {
      const status = row.getValue("active") === "1" ? "Active" : "Inactive";
      return <div>{status}</div>;
    },
    meta: {
      label: "Status",
      variant: "select",
      options: [
        { label: "Active", value: "1" },
        { label: "Inactive", value: "0" }
      ],
      icon: Building2,
    },
    enableColumnFilter: true,
  },
  cbsa: {
    accessorKey: "cbsa",
    header: ({ column }) => <DataTableColumnHeader column={column} title="CBSA Name" />,
    meta: { label: "Core Based Statistical Area Name", placeholder: "Search CBSA names...", variant: "text", icon: MapPin },
    enableColumnFilter: true,
  },
  cbsa_div: {
    accessorKey: "cbsa_div",
    header: ({ column }) => <DataTableColumnHeader column={column} title="CBSA Division Name" />,
    meta: { label: "Metropolitan Divisions Name", placeholder: "Search division names...", variant: "text", icon: MapPin },
    enableColumnFilter: true,
  },
  cbsa_div_flg: {
    accessorKey: "cbsa_div_flg",
    header: ({ column }) => <DataTableColumnHeader column={column} title="CBSA Div Flag" />,
    cell: ({ row }) => renderFlag(row.getValue("cbsa_div_flg")),
    meta: { label: "Metropolitan Divisions Flag", variant: "select", options: [{ label: "Yes", value: "1" }, { label: "No", value: "0" }], icon: MapPin },
    enableColumnFilter: true,
  },
  cbsa_div_no: {
    accessorKey: "cbsa_div_no",
    header: ({ column }) => <DataTableColumnHeader column={column} title="CBSA Div #" />,
    meta: { label: "Metropolitan Divisions Number", placeholder: "Search numbers...", variant: "text", icon: Hash },
    enableColumnFilter: true,
  },
  cbsa_metro: {
    accessorKey: "cbsa_metro",
    header: ({ column }) => <DataTableColumnHeader column={column} title="Metro Div #" />,
    meta: { label: "Metropolitan Division Number", placeholder: "Search numbers...", variant: "text", icon: Hash },
    enableColumnFilter: true,
  },
  cbsa_metro_flg: {
    accessorKey: "cbsa_metro_flg",
    header: ({ column }) => <DataTableColumnHeader column={column} title="Metro Div Flag" />,
    cell: ({ row }) => renderFlag(row.getValue("cbsa_metro_flg")),
    meta: { label: "Metropolitan Division Flag", variant: "select", options: [{ label: "Yes", value: "1" }, { label: "No", value: "0" }], icon: MapPin },
    enableColumnFilter: true,
  },
  cbsa_metro_name: {
    accessorKey: "cbsa_metro_name",
    header: ({ column }) => <DataTableColumnHeader column={column} title="Metro Div Name" />,
    meta: { label: "Metropolitan Division Name", placeholder: "Search names...", variant: "text", icon: MapPin },
    enableColumnFilter: true,
  },
  cbsa_micro_flg: {
    accessorKey: "cbsa_micro_flg",
    header: ({ column }) => <DataTableColumnHeader column={column} title="Micro Div Flag" />,
    cell: ({ row }) => renderFlag(row.getValue("cbsa_micro_flg")),
    meta: { label: "Micropolitan Division Flag", variant: "select", options: [{ label: "Yes", value: "1" }, { label: "No", value: "0" }], icon: MapPin },
    enableColumnFilter: true,
  },
  cbsa_no: {
    accessorKey: "cbsa_no",
    header: ({ column }) => <DataTableColumnHeader column={column} title="CBSA #" />,
    meta: { label: "Core Based Statistical Areas", placeholder: "Search CBSA #...", variant: "text", icon: Hash },
    enableColumnFilter: true,
  },
  certcons: {
    accessorKey: "certcons",
    header: ({ column }) => <DataTableColumnHeader column={column} title="Parent Cert" />,
    meta: { label: "Directly owned by another bank (CERT)", placeholder: "Search parent cert...", variant: "text", icon: Hash },
    enableColumnFilter: true,
  },
  cfpbeffdte: {
    accessorKey: "cfpbeffdte",
    header: ({ column }) => <DataTableColumnHeader column={column} title="CFPB Eff Date" />,
    cell: ({ row }) => formatDate(row.getValue("cfpbeffdte")),
    meta: { label: "CFPB Effective Date", variant: "date", icon: Calendar },
    enableColumnFilter: true,
  },
  cfpbenddte: {
    accessorKey: "cfpbenddte",
    header: ({ column }) => <DataTableColumnHeader column={column} title="CFPB End Date" />,
    cell: ({ row }) => formatDate(row.getValue("cfpbenddte")),
    meta: { label: "CFPB End Date", variant: "date", icon: Calendar },
    enableColumnFilter: true,
  },
  cfpbflag: {
    accessorKey: "cfpbflag",
    header: ({ column }) => <DataTableColumnHeader column={column} title="CFPB Flag" />,
    cell: ({ row }) => renderFlag(row.getValue("cfpbflag")),
    meta: { label: "CFPB Flag", variant: "select", options: [{ label: "Yes", value: "1" }, { label: "No", value: "0" }], icon: Building2 },
    enableColumnFilter: true,
  },
  change1: { accessorKey: "change1", header: ({ column }) => <DataTableColumnHeader column={column} title="Chg Code 1" />, meta: { label: "Change Code", variant: "text", icon: Hash }, enableColumnFilter: true },
  change2: { accessorKey: "change2", header: ({ column }) => <DataTableColumnHeader column={column} title="Chg Code 2" />, meta: { label: "Change Code", variant: "text", icon: Hash }, enableColumnFilter: true },
  change3: { accessorKey: "change3", header: ({ column }) => <DataTableColumnHeader column={column} title="Chg Code 3" />, meta: { label: "Change Code", variant: "text", icon: Hash }, enableColumnFilter: true },
  change4: { accessorKey: "change4", header: ({ column }) => <DataTableColumnHeader column={column} title="Chg Code 4" />, meta: { label: "Change Code", variant: "text", icon: Hash }, enableColumnFilter: true },
  change5: { accessorKey: "change5", header: ({ column }) => <DataTableColumnHeader column={column} title="Chg Code 5" />, meta: { label: "Change Code", variant: "text", icon: Hash }, enableColumnFilter: true },
  change6: { accessorKey: "change6", header: ({ column }) => <DataTableColumnHeader column={column} title="Chg Code 6" />, meta: { label: "Change Code", variant: "text", icon: Hash }, enableColumnFilter: true },
  change7: { accessorKey: "change7", header: ({ column }) => <DataTableColumnHeader column={column} title="Chg Code 7" />, meta: { label: "Change Code", variant: "text", icon: Hash }, enableColumnFilter: true },
  change8: { accessorKey: "change8", header: ({ column }) => <DataTableColumnHeader column={column} title="Chg Code 8" />, meta: { label: "Change Code", variant: "text", icon: Hash }, enableColumnFilter: true },
  change9: { accessorKey: "change9", header: ({ column }) => <DataTableColumnHeader column={column} title="Chg Code 9" />, meta: { label: "Change Code", variant: "text", icon: Hash }, enableColumnFilter: true },
  change10: { accessorKey: "change10", header: ({ column }) => <DataTableColumnHeader column={column} title="Chg Code 10" />, meta: { label: "Change Code", variant: "text", icon: Hash }, enableColumnFilter: true },
  change11: { accessorKey: "change11", header: ({ column }) => <DataTableColumnHeader column={column} title="Chg Code 11" />, meta: { label: "Change Code", variant: "text", icon: Hash }, enableColumnFilter: true },
  change12: { accessorKey: "change12", header: ({ column }) => <DataTableColumnHeader column={column} title="Chg Code 12" />, meta: { label: "Change Code", variant: "text", icon: Hash }, enableColumnFilter: true },
  change13: { accessorKey: "change13", header: ({ column }) => <DataTableColumnHeader column={column} title="Chg Code 13" />, meta: { label: "Change Code", variant: "text", icon: Hash }, enableColumnFilter: true },
  change14: { accessorKey: "change14", header: ({ column }) => <DataTableColumnHeader column={column} title="Chg Code 14" />, meta: { label: "Change Code", variant: "text", icon: Hash }, enableColumnFilter: true },
  change15: { accessorKey: "change15", header: ({ column }) => <DataTableColumnHeader column={column} title="Chg Code 15" />, meta: { label: "Change Code", variant: "text", icon: Hash }, enableColumnFilter: true },
  charter: {
    accessorKey: "charter",
    header: ({ column }) => <DataTableColumnHeader column={column} title="OCC Charter #" />,
    meta: { label: "OCC Charter Number", placeholder: "Search charter #...", variant: "text", icon: Hash },
    enableColumnFilter: true,
  },
  chrtagnt: {
    accessorKey: "chrtagnt",
    header: ({ column }) => <DataTableColumnHeader column={column} title="Charter Agency" />,
    meta: { label: "Chartering Agency", placeholder: "Search agencies...", variant: "text", icon: Building2 },
    enableColumnFilter: true,
  },
  cityhcr: {
    accessorKey: "cityhcr",
    header: ({ column }) => <DataTableColumnHeader column={column} title="High Holder City" />,
    meta: { label: "City of High Holder", placeholder: "Search cities...", variant: "text", icon: MapPin },
    enableColumnFilter: true,
  },
  clcode: {
    accessorKey: "clcode",
    header: ({ column }) => <DataTableColumnHeader column={column} title="Class Code" />,
    meta: { label: "Numeric code", placeholder: "Search codes...", variant: "text", icon: Hash },
    enableColumnFilter: true,
  },
  cmsa_no: {
    accessorKey: "cmsa_no",
    header: ({ column }) => <DataTableColumnHeader column={column} title="CMSA #" />,
    meta: { label: "Consolidated Metropolitan Statistical Division Number", placeholder: "Search CMSA #...", variant: "text", icon: Hash },
    enableColumnFilter: true,
  },
  cmsa: {
    accessorKey: "cmsa",
    header: ({ column }) => <DataTableColumnHeader column={column} title="CMSA Name" />,
    meta: { label: "Consolidated Metropolitan Statistical Area", placeholder: "Search CMSA names...", variant: "text", icon: MapPin },
    enableColumnFilter: true,
  },
  conserve: {
    accessorKey: "conserve",
    header: ({ column }) => <DataTableColumnHeader column={column} title="Conservator" />,
    cell: ({ row }) => renderFlag(row.getValue("conserve")),
    meta: { label: "Conservatorship", variant: "select", options: [{ label: "Yes", value: "1" }, { label: "No", value: "0" }], icon: Building2 },
    enableColumnFilter: true,
  },
  county: {
    accessorKey: "county",
    header: ({ column }) => <DataTableColumnHeader column={column} title="County" />,
    meta: { label: "County", placeholder: "Search counties...", variant: "text", icon: MapPin },
    enableColumnFilter: true,
  },
  csa: {
    accessorKey: "csa",
    header: ({ column }) => <DataTableColumnHeader column={column} title="CSA Name" />,
    meta: { label: "Combined Statistical Area Name", placeholder: "Search CSA names...", variant: "text", icon: MapPin },
    enableColumnFilter: true,
  },
  csa_no: {
    accessorKey: "csa_no",
    header: ({ column }) => <DataTableColumnHeader column={column} title="CSA #" />,
    meta: { label: "Numeric Code for the Combined Statistical Area", placeholder: "Search CSA #...", variant: "text", icon: Hash },
    enableColumnFilter: true,
  },
  csa_flg: {
    accessorKey: "csa_flg",
    header: ({ column }) => <DataTableColumnHeader column={column} title="CSA Flag" />,
    cell: ({ row }) => renderFlag(row.getValue("csa_flg")),
    meta: { label: "CSA Area Flag", variant: "select", options: [{ label: "Yes", value: "1" }, { label: "No", value: "0" }], icon: MapPin },
    enableColumnFilter: true,
  },
  dateupdt: {
    accessorKey: "dateupdt",
    header: ({ column }) => <DataTableColumnHeader column={column} title="Last Update" />,
    cell: ({ row }) => formatDate(row.getValue("dateupdt")),
    meta: { label: "Last update", variant: "date", icon: Calendar },
    enableColumnFilter: true,
  },
  denovo: {
    accessorKey: "denovo",
    header: ({ column }) => <DataTableColumnHeader column={column} title="Denovo" />,
    cell: ({ row }) => renderFlag(row.getValue("denovo")),
    meta: { label: "Denovo Institution", variant: "select", options: [{ label: "Yes", value: "1" }, { label: "No", value: "0" }], icon: Building2 },
    enableColumnFilter: true,
  },
  dep: {
    accessorKey: "dep",
    header: ({ column }) => <DataTableColumnHeader column={column} title="Total Deposits" />,
    cell: ({ row }) => formatCurrency(row.getValue("dep")),
    meta: { label: "Total deposits", variant: "range", unit: "$", icon: Banknote },
    enableColumnFilter: true,
  },
  depdom: {
    accessorKey: "depdom",
    header: ({ column }) => <DataTableColumnHeader column={column} title="Domestic Deposits" />,
    cell: ({ row }) => formatCurrency(row.getValue("depdom")),
    meta: { label: "Deposits held in domestic offices", variant: "range", unit: "$", icon: Banknote },
    enableColumnFilter: true,
  },
  docket: {
    accessorKey: "docket",
    header: ({ column }) => <DataTableColumnHeader column={column} title="OTS Docket #" />,
    meta: { label: "OTS Docket Number", placeholder: "Search dockets...", variant: "text", icon: Hash },
    enableColumnFilter: true,
  },
  effdate: {
    accessorKey: "effdate",
    header: ({ column }) => <DataTableColumnHeader column={column} title="Eff Date" />,
    cell: ({ row }) => formatDate(row.getValue("effdate")),
    meta: { label: "Last Structure Change Effective Date", variant: "date", icon: Calendar },
    enableColumnFilter: true,
  },
  endefymd: {
    accessorKey: "endefymd",
    header: ({ column }) => <DataTableColumnHeader column={column} title="End Date" />,
    cell: ({ row }) => formatDate(row.getValue("endefymd")),
    meta: { label: "End date", variant: "date", icon: Calendar },
    enableColumnFilter: true,
  },
  eq: {
    accessorKey: "eq",
    header: ({ column }) => <DataTableColumnHeader column={column} title="Equity Capital" />,
    cell: ({ row }) => formatCurrency(row.getValue("eq")),
    meta: { label: "Equity capital", variant: "range", unit: "$", icon: Banknote },
    enableColumnFilter: true,
  },
  estymd: {
    accessorKey: "estymd",
    header: ({ column }) => <DataTableColumnHeader column={column} title="Established" />,
    cell: ({ row }) => formatDate(row.getValue("estymd")),
    meta: { label: "Established Date", variant: "date", icon: Calendar },
    enableColumnFilter: true,
  },
  fdicdbs: {
    accessorKey: "fdicdbs",
    header: ({ column }) => <DataTableColumnHeader column={column} title="FDIC Geo Region" />,
    meta: { label: "FDIC Geographic Region", placeholder: "Search regions...", variant: "text", icon: MapPin },
    enableColumnFilter: true,
  },
  fdicregn: {
    accessorKey: "fdicregn",
    header: ({ column }) => <DataTableColumnHeader column={column} title="FDIC Sup Region" />,
    meta: { label: "FDIC Supervisory Region", placeholder: "Search regions...", variant: "text", icon: MapPin },
    enableColumnFilter: true,
  },
  fdicsupv: {
    accessorKey: "fdicsupv",
    header: ({ column }) => <DataTableColumnHeader column={column} title="Fed District" />,
    meta: { label: "Federal Reserve District", placeholder: "Search districts...", variant: "text", icon: MapPin },
    enableColumnFilter: true,
  },
  fed: {
    accessorKey: "fed",
    header: ({ column }) => <DataTableColumnHeader column={column} title="Fed ID (Dist)" />,
    meta: { label: "Federal Reserve ID Number", placeholder: "Search Fed IDs...", variant: "text", icon: Hash },
    enableColumnFilter: true,
  },
  fed_rssd: {
    accessorKey: "fed_rssd",
    header: ({ column }) => <DataTableColumnHeader column={column} title="Fed ID (RSSD)" />,
    meta: { label: "Federal Reserve ID Number", placeholder: "Search RSSD...", variant: "text", icon: Hash },
    enableColumnFilter: true,
  },
  fedchrtr: {
    accessorKey: "fedchrtr",
    header: ({ column }) => <DataTableColumnHeader column={column} title="Fed Charter" />,
    cell: ({ row }) => renderFlag(row.getValue("fedchrtr")),
    meta: { label: "Federal charter flag", variant: "select", options: [{ label: "Yes", value: "1" }, { label: "No", value: "0" }], icon: Building2 },
    enableColumnFilter: true,
  },
  fldoff: {
    accessorKey: "fldoff",
    header: ({ column }) => <DataTableColumnHeader column={column} title="FDIC Field Office" />,
    meta: { label: "FDIC Field Office", placeholder: "Search offices...", variant: "text", icon: MapPin },
    enableColumnFilter: true,
  },
  form31: {
    accessorKey: "form31",
    header: ({ column }) => <DataTableColumnHeader column={column} title="Form 31 Filer" />,
    cell: ({ row }) => renderFlag(row.getValue("form31")),
    meta: { label: "FFIEC Call Report 31 Filer", variant: "select", options: [{ label: "Yes", value: "1" }, { label: "No", value: "0" }], icon: Building2 },
    enableColumnFilter: true,
  },
  hctmult: {
    accessorKey: "hctmult",
    header: ({ column }) => <DataTableColumnHeader column={column} title="Multi BHC" />,
    cell: ({ row }) => renderFlag(row.getValue("hctmult")),
    meta: { label: "Bank Holding Company Type", variant: "select", options: [{ label: "Yes", value: "1" }, { label: "No", value: "0" }], icon: Building2 },
    enableColumnFilter: true,
  },
  iba: {
    accessorKey: "iba",
    header: ({ column }) => <DataTableColumnHeader column={column} title="Foreign Bank Branch" />,
    cell: ({ row }) => renderFlag(row.getValue("iba")),
    meta: { label: "Insured offices of foreign banks", variant: "select", options: [{ label: "Yes", value: "1" }, { label: "No", value: "0" }], icon: Building2 },
    enableColumnFilter: true,
  },
  inactive: {
    accessorKey: "inactive",
    header: ({ column }) => <DataTableColumnHeader column={column} title="Inactive Flag" />,
    cell: ({ row }) => renderFlag(row.getValue("inactive")),
    meta: { label: "Inactive", variant: "select", options: [{ label: "Yes", value: "1" }, { label: "No", value: "0" }], icon: XCircle },
    enableColumnFilter: true,
  },
  insagnt1: {
    accessorKey: "insagnt1",
    header: ({ column }) => <DataTableColumnHeader column={column} title="Primary Ins Agency" />,
    meta: { label: "Primary Insurance Agency", placeholder: "Search agencies...", variant: "text", icon: Building2 },
    enableColumnFilter: true,
  },
  insagnt2: {
    accessorKey: "insagnt2",
    header: ({ column }) => <DataTableColumnHeader column={column} title="Secondary Ins Fund" />,
    meta: { label: "Secondary Insurance Fund", placeholder: "Search funds...", variant: "text", icon: Building2 },
    enableColumnFilter: true,
  },
  insbif: {
    accessorKey: "insbif",
    header: ({ column }) => <DataTableColumnHeader column={column} title="BIF Member" />,
    cell: ({ row }) => renderFlag(row.getValue("insbif")),
    meta: { label: "Bank Insurance Fund", variant: "select", options: [{ label: "Yes", value: "1" }, { label: "No", value: "0" }], icon: Building2 },
    enableColumnFilter: true,
  },
  inscoml: {
    accessorKey: "inscoml",
    header: ({ column }) => <DataTableColumnHeader column={column} title="Insured Comm Bank" />,
    cell: ({ row }) => renderFlag(row.getValue("inscoml")),
    meta: { label: "Insured commercial banks", variant: "select", options: [{ label: "Yes", value: "1" }, { label: "No", value: "0" }], icon: Building2 },
    enableColumnFilter: true,
  },
  insdate: {
    accessorKey: "insdate",
    header: ({ column }) => <DataTableColumnHeader column={column} title="Insured Date" />,
    cell: ({ row }) => formatDate(row.getValue("insdate")),
    meta: { label: "Date of Deposit Insurance", variant: "date", icon: Calendar },
    enableColumnFilter: true,
  },
  insdropdate: {
    accessorKey: "insdropdate",
    header: ({ column }) => <DataTableColumnHeader column={column} title="Ins Drop Date" />,
    cell: ({ row }) => formatDate(row.getValue("insdropdate")),
    meta: { label: "Date of Dropped Deposit Insurance", variant: "date", icon: Calendar },
    enableColumnFilter: true,
  },
  insdif: {
    accessorKey: "insdif",
    header: ({ column }) => <DataTableColumnHeader column={column} title="DIF Member" />,
    cell: ({ row }) => renderFlag(row.getValue("insdif")),
    meta: { label: "Deposit Insurance Fund member", variant: "select", options: [{ label: "Yes", value: "1" }, { label: "No", value: "0" }], icon: Building2 },
    enableColumnFilter: true,
  },
  insfdic: {
    accessorKey: "insfdic",
    header: ({ column }) => <DataTableColumnHeader column={column} title="FDIC Insured" />,
    cell: ({ row }) => renderFlag(row.getValue("insfdic")),
    meta: { label: "FDIC Insured", variant: "select", options: [{ label: "Yes", value: "1" }, { label: "No", value: "0" }], icon: CheckCircle },
    enableColumnFilter: true,
  },
  inssaif: {
    accessorKey: "inssaif",
    header: ({ column }) => <DataTableColumnHeader column={column} title="SAIF Member" />,
    cell: ({ row }) => renderFlag(row.getValue("inssaif")),
    meta: { label: "SAIF Insured", variant: "select", options: [{ label: "Yes", value: "1" }, { label: "No", value: "0" }], icon: Building2 },
    enableColumnFilter: true,
  },
  inssave: {
    accessorKey: "inssave",
    header: ({ column }) => <DataTableColumnHeader column={column} title="Insured Savings Inst" />,
    cell: ({ row }) => renderFlag(row.getValue("inssave")),
    meta: { label: "Insured Savings Institution", variant: "select", options: [{ label: "Yes", value: "1" }, { label: "No", value: "0" }], icon: Building2 },
    enableColumnFilter: true,
  },
  instag: {
    accessorKey: "instag",
    header: ({ column }) => <DataTableColumnHeader column={column} title="Agri Lender" />,
    cell: ({ row }) => renderFlag(row.getValue("instag")),
    meta: { label: "Agricultural lending institution indicator", variant: "select", options: [{ label: "Yes", value: "1" }, { label: "No", value: "0" }], icon: Building2 },
    enableColumnFilter: true,
  },
  instcrcd: {
    accessorKey: "instcrcd",
    header: ({ column }) => <DataTableColumnHeader column={column} title="Credit Card Inst" />,
    cell: ({ row }) => renderFlag(row.getValue("instcrcd")),
    meta: { label: "Credit Card Institutions", variant: "select", options: [{ label: "Yes", value: "1" }, { label: "No", value: "0" }], icon: Building2 },
    enableColumnFilter: true,
  },
  latitude: {
    accessorKey: "latitude",
    header: ({ column }) => <DataTableColumnHeader column={column} title="Latitude" />,
    cell: ({ row }) => { // Added type check for toFixed
        const value = row.getValue("latitude");
        return <div className="text-right">{typeof value === 'number' ? value.toFixed(6) : '-'}</div>;
    },
    meta: { label: "Location Address Latitude", variant: "range", icon: MapPin },
    enableColumnFilter: true,
  },
  law_sasser_flg: {
    accessorKey: "law_sasser_flg",
    header: ({ column }) => <DataTableColumnHeader column={column} title="Sasser Flag" />,
    cell: ({ row }) => renderFlag(row.getValue("law_sasser_flg")),
    meta: { label: "Law Sasser Flag", variant: "select", options: [{ label: "Yes", value: "1" }, { label: "No", value: "0" }], icon: Building2 },
    enableColumnFilter: true,
  },
  longitude: {
    accessorKey: "longitude",
    header: ({ column }) => <DataTableColumnHeader column={column} title="Longitude" />,
    cell: ({ row }) => { // Added type check for toFixed
        const value = row.getValue("longitude");
        return <div className="text-right">{typeof value === 'number' ? value.toFixed(6) : '-'}</div>;
    },
    meta: { label: "Location Address Longitude", variant: "range", icon: MapPin },
    enableColumnFilter: true,
  },
  mdi_status_code: {
    accessorKey: "mdi_status_code",
    header: ({ column }) => <DataTableColumnHeader column={column} title="MDI Code" />,
    meta: { label: "Minority Status Code", placeholder: "Search codes...", variant: "text", icon: Building2 },
    enableColumnFilter: true,
  },
  mdi_status_desc: {
    accessorKey: "mdi_status_desc",
    header: ({ column }) => <DataTableColumnHeader column={column} title="MDI Desc" />,
    meta: { label: "Minority Status Description", placeholder: "Search descriptions...", variant: "text", icon: Building2 },
    enableColumnFilter: true,
  },
  msa: {
    accessorKey: "msa",
    header: ({ column }) => <DataTableColumnHeader column={column} title="MSA Name" />,
    meta: { label: "Metropolitan Statistical Area (MSA)", placeholder: "Search MSA names...", variant: "text", icon: MapPin },
    enableColumnFilter: true,
  },
  msa_no: {
    accessorKey: "msa_no",
    header: ({ column }) => <DataTableColumnHeader column={column} title="MSA #" />,
    meta: { label: "Metropolitan Statistical Area Number", placeholder: "Search MSA #...", variant: "text", icon: Hash },
    enableColumnFilter: true,
  },
  mutual: {
    accessorKey: "mutual",
    header: ({ column }) => <DataTableColumnHeader column={column} title="Mutual Owned" />,
    cell: ({ row }) => renderFlag(row.getValue("mutual")),
    meta: { label: "Ownership Type", variant: "select", options: [{ label: "Mutual", value: "1" }, { label: "Stock", value: "0" }], icon: Building2 },
    enableColumnFilter: true,
  },
  namehcr: {
    accessorKey: "namehcr",
    header: ({ column }) => <DataTableColumnHeader column={column} title="Top Holder Name" />,
    meta: { label: "Bank Holding Company (Regulatory Top Holder)", placeholder: "Search holder names...", variant: "text", icon: Building2 },
    enableColumnFilter: true,
  },
  netinc: {
    accessorKey: "netinc",
    header: ({ column }) => <DataTableColumnHeader column={column} title="Net Income (Ann)" />,
    cell: ({ row }) => formatCurrency(row.getValue("netinc")),
    meta: { label: "Net income", variant: "range", unit: "$", icon: Banknote },
    enableColumnFilter: true,
  },
  netincq: {
    accessorKey: "netincq",
    header: ({ column }) => <DataTableColumnHeader column={column} title="Net Income (Qtr)" />,
    cell: ({ row }) => formatCurrency(row.getValue("netincq")),
    meta: { label: "Net income - quarterly", variant: "range", unit: "$", icon: Banknote },
    enableColumnFilter: true,
  },
  newcert: {
    accessorKey: "newcert",
    header: ({ column }) => <DataTableColumnHeader column={column} title="New Cert #" />,
    meta: { label: "New certificate number", placeholder: "Search cert #...", variant: "text", icon: Hash },
    enableColumnFilter: true,
  },
  oakar: {
    accessorKey: "oakar",
    header: ({ column }) => <DataTableColumnHeader column={column} title="Oakar Inst" />,
    cell: ({ row }) => renderFlag(row.getValue("oakar")),
    meta: { label: "Oakar Institutions", variant: "select", options: [{ label: "Yes", value: "1" }, { label: "No", value: "0" }], icon: Building2 },
    enableColumnFilter: true,
  },
  occdist: {
    accessorKey: "occdist",
    header: ({ column }) => <DataTableColumnHeader column={column} title="OCC District" />,
    meta: { label: "Office of the Comptroller", placeholder: "Search districts...", variant: "text", icon: MapPin },
    enableColumnFilter: true,
  },
  offdom: {
    accessorKey: "offdom",
    header: ({ column }) => <DataTableColumnHeader column={column} title="# Dom Offices" />,
    cell: ({ row }) => <div className="text-right">{row.getValue("offdom") ?? '-'}</div>,
    meta: { label: "Number of Domestic Offices", variant: "range", icon: Hash },
    enableColumnFilter: true,
  },
  offfor: {
    accessorKey: "offfor",
    header: ({ column }) => <DataTableColumnHeader column={column} title="# For Offices" />,
    cell: ({ row }) => <div className="text-right">{row.getValue("offfor") ?? '-'}</div>,
    meta: { label: "Number of Foreign Offices", variant: "range", icon: Hash },
    enableColumnFilter: true,
  },
  offices: {
    accessorKey: "offices",
    header: ({ column }) => <DataTableColumnHeader column={column} title="# Offices" />,
    cell: ({ row }) => <div className="text-right">{row.getValue("offices") ?? '-'}</div>,
    meta: { label: "Office", variant: "range", icon: Hash },
    enableColumnFilter: true,
  },
  offoa: {
    accessorKey: "offoa",
    header: ({ column }) => <DataTableColumnHeader column={column} title="# US Offices" />,
    cell: ({ row }) => <div className="text-right">{row.getValue("offoa") ?? '-'}</div>,
    meta: { label: "Number of US Offices", variant: "range", icon: Hash },
    enableColumnFilter: true,
  },
  otsdist: {
    accessorKey: "otsdist",
    header: ({ column }) => <DataTableColumnHeader column={column} title="OTS District" />,
    meta: { label: "OTS District", placeholder: "Search districts...", variant: "text", icon: MapPin },
    enableColumnFilter: true,
  },
  otsregnm: {
    accessorKey: "otsregnm",
    header: ({ column }) => <DataTableColumnHeader column={column} title="OTS Region" />,
    meta: { label: "Office of Thrift Supervision Region", placeholder: "Search regions...", variant: "text", icon: MapPin },
    enableColumnFilter: true,
  },
  parcert: {
    accessorKey: "parcert",
    header: ({ column }) => <DataTableColumnHeader column={column} title="Parent Cert (Par)" />,
    meta: { label: "Directly owned by another bank (CERT)", placeholder: "Search parent cert...", variant: "text", icon: Hash },
    enableColumnFilter: true,
  },
  procdate: {
    accessorKey: "procdate",
    header: ({ column }) => <DataTableColumnHeader column={column} title="Process Date" />,
    cell: ({ row }) => formatDate(row.getValue("procdate")),
    meta: { label: "Last Structure Change Process Date", variant: "date", icon: Calendar },
    enableColumnFilter: true,
  },
  qbprcoml: {
    accessorKey: "qbprcoml",
    header: ({ column }) => <DataTableColumnHeader column={column} title="QBP Region" />,
    meta: { label: "Quarterly Banking Profile Commercial Bank Region", placeholder: "Search regions...", variant: "text", icon: MapPin },
    enableColumnFilter: true,
  },
  regagnt: {
    accessorKey: "regagnt",
    header: ({ column }) => <DataTableColumnHeader column={column} title="Primary Regulator" />,
    meta: { label: "Primary Regulator", placeholder: "Search regulators...", variant: "text", icon: Building2 },
    enableColumnFilter: true,
  },
  regagent2: {
    accessorKey: "regagent2",
    header: ({ column }) => <DataTableColumnHeader column={column} title="Secondary Regulator" />,
    meta: { label: "Secondary Regulator", placeholder: "Search regulators...", variant: "text", icon: Building2 },
    enableColumnFilter: true,
  },
  repdte: {
    accessorKey: "repdte",
    header: ({ column }) => <DataTableColumnHeader column={column} title="Report Date" />,
    cell: ({ row }) => formatDate(row.getValue("repdte")),
    meta: { label: "Report Date", variant: "date", icon: Calendar },
    enableColumnFilter: true,
  },
  risdate: {
    accessorKey: "risdate",
    header: ({ column }) => <DataTableColumnHeader column={column} title="RIS Date" />,
    cell: ({ row }) => formatDate(row.getValue("risdate")),
    meta: { label: "Report Date", variant: "date", icon: Calendar },
    enableColumnFilter: true,
  },
  roa: {
    accessorKey: "roa",
    header: ({ column }) => <DataTableColumnHeader column={column} title="ROA" />,
    cell: ({ row }) => formatPercentage(row.getValue("roa")),
    meta: { label: "Return on assets (ROA)", variant: "range", unit: "%", icon: Percent },
    enableColumnFilter: true,
  },
  roaptx: {
    accessorKey: "roaptx",
    header: ({ column }) => <DataTableColumnHeader column={column} title="ROA Pretax" />,
    cell: ({ row }) => formatPercentage(row.getValue("roaptx")),
    meta: { label: "Pretax return on assets", variant: "range", unit: "%", icon: Percent },
    enableColumnFilter: true,
  },
  roaptxq: {
    accessorKey: "roaptxq",
    header: ({ column }) => <DataTableColumnHeader column={column} title="ROA Pretax (Qtr)" />,
    cell: ({ row }) => formatPercentage(row.getValue("roaptxq")),
    meta: { label: "Quarterly Pretax return on assets", variant: "range", unit: "%", icon: Percent },
    enableColumnFilter: true,
  },
  roaq: {
    accessorKey: "roaq",
    header: ({ column }) => <DataTableColumnHeader column={column} title="ROA (Qtr)" />,
    cell: ({ row }) => formatPercentage(row.getValue("roaq")),
    meta: { label: "Quarterly return on assets", variant: "range", unit: "%", icon: Percent },
    enableColumnFilter: true,
  },
  roe: {
    accessorKey: "roe",
    header: ({ column }) => <DataTableColumnHeader column={column} title="ROE" />,
    cell: ({ row }) => formatPercentage(row.getValue("roe")),
    meta: { label: "Return on Equity (ROE)", variant: "range", unit: "%", icon: TrendingUp },
    enableColumnFilter: true,
  },
  roeq: {
    accessorKey: "roeq",
    header: ({ column }) => <DataTableColumnHeader column={column} title="ROE (Qtr)" />,
    cell: ({ row }) => formatPercentage(row.getValue("roeq")),
    meta: { label: "Quarterly return on equity", variant: "range", unit: "%", icon: TrendingUp },
    enableColumnFilter: true,
  },
  rssdhcr: {
    accessorKey: "rssdhcr",
    header: ({ column }) => <DataTableColumnHeader column={column} title="Top Holder RSSD" />,
    meta: { label: "RSSDID - High Regulatory Holder", placeholder: "Search RSSD...", variant: "text", icon: Hash },
    enableColumnFilter: true,
  },
  rundate: {
    accessorKey: "rundate",
    header: ({ column }) => <DataTableColumnHeader column={column} title="Run Date" />,
    cell: ({ row }) => formatDate(row.getValue("rundate")),
    meta: { label: "Run Date", variant: "date", icon: Calendar },
    enableColumnFilter: true,
  },
  sasser: {
    accessorKey: "sasser",
    header: ({ column }) => <DataTableColumnHeader column={column} title="Sasser Inst" />,
    cell: ({ row }) => renderFlag(row.getValue("sasser")),
    meta: { label: "Sasser Institutions", variant: "select", options: [{ label: "Yes", value: "1" }, { label: "No", value: "0" }], icon: Building2 },
    enableColumnFilter: true,
  },
  specgrp: {
    accessorKey: "specgrp",
    header: ({ column }) => <DataTableColumnHeader column={column} title="Spec Grp Code" />,
    meta: { label: "Asset Concentration Hierarchy", placeholder: "Search codes...", variant: "text", icon: Hash },
    enableColumnFilter: true,
  },
  specgrpn: {
    accessorKey: "specgrpn",
    header: ({ column }) => <DataTableColumnHeader column={column} title="Spec Grp Name" />,
    meta: { label: "Specialization Group", placeholder: "Search groups...", variant: "text", icon: Building2 },
    enableColumnFilter: true,
  },
  stalp: {
    accessorKey: "stalp",
    header: ({ column }) => <DataTableColumnHeader column={column} title="State Code" />,
    meta: { label: "State Alpha code", placeholder: "Search state codes...", variant: "text", icon: MapPin },
    enableColumnFilter: true,
  },
  stalphcr: {
    accessorKey: "stalphcr",
    header: ({ column }) => <DataTableColumnHeader column={column} title="Holder State Code" />,
    meta: { label: "Regulatory holding company state location", placeholder: "Search state codes...", variant: "text", icon: MapPin },
    enableColumnFilter: true,
  },
  stchrtr: {
    accessorKey: "stchrtr",
    header: ({ column }) => <DataTableColumnHeader column={column} title="State Charter" />,
    cell: ({ row }) => renderFlag(row.getValue("stchrtr")),
    meta: { label: "State Charter", variant: "select", options: [{ label: "Yes", value: "1" }, { label: "No", value: "0" }], icon: Building2 },
    enableColumnFilter: true,
  },
  stcnty: {
    accessorKey: "stcnty",
    header: ({ column }) => <DataTableColumnHeader column={column} title="State/County FIPS" />,
    meta: { label: "State and county number", placeholder: "Search FIPS...", variant: "text", icon: Hash },
    enableColumnFilter: true,
  },
  stnum: {
    accessorKey: "stnum",
    header: ({ column }) => <DataTableColumnHeader column={column} title="State FIPS" />,
    meta: { label: "State Number", placeholder: "Search FIPS...", variant: "text", icon: Hash },
    enableColumnFilter: true,
  },
  subchaps: {
    accessorKey: "subchaps",
    header: ({ column }) => <DataTableColumnHeader column={column} title="Subchapter S" />,
    cell: ({ row }) => renderFlag(row.getValue("subchaps")),
    meta: { label: "Subchapter S Corporations", variant: "select", options: [{ label: "Yes", value: "1" }, { label: "No", value: "0" }], icon: Building2 },
    enableColumnFilter: true,
  },
  suprv_fd: {
    accessorKey: "suprv_fd",
    header: ({ column }) => <DataTableColumnHeader column={column} title="Sup Region #" />,
    meta: { label: "Supervisory Region Number", placeholder: "Search region #...", variant: "text", icon: Hash },
    enableColumnFilter: true,
  },
  te01n528: { accessorKey: "te01n528", header: ({ column }) => <DataTableColumnHeader column={column} title="Web URL 1" />, cell: ({ row }) => renderUrl(row.getValue("te01n528")), meta: { label: "Web Site URL 01", variant: "text", icon: LinkIcon }, enableColumnFilter: true },
  te02n528: { accessorKey: "te02n528", header: ({ column }) => <DataTableColumnHeader column={column} title="Web URL 2" />, cell: ({ row }) => renderUrl(row.getValue("te02n528")), meta: { label: "Web Site URL 02", variant: "text", icon: LinkIcon }, enableColumnFilter: true },
  te03n528: { accessorKey: "te03n528", header: ({ column }) => <DataTableColumnHeader column={column} title="Web URL 3" />, cell: ({ row }) => renderUrl(row.getValue("te03n528")), meta: { label: "Web Site URL 03", variant: "text", icon: LinkIcon }, enableColumnFilter: true },
  te04n528: { accessorKey: "te04n528", header: ({ column }) => <DataTableColumnHeader column={column} title="Web URL 4" />, cell: ({ row }) => renderUrl(row.getValue("te04n528")), meta: { label: "Web Site URL 04", variant: "text", icon: LinkIcon }, enableColumnFilter: true },
  te05n528: { accessorKey: "te05n528", header: ({ column }) => <DataTableColumnHeader column={column} title="Web URL 5" />, cell: ({ row }) => renderUrl(row.getValue("te05n528")), meta: { label: "Web Site URL 05", variant: "text", icon: LinkIcon }, enableColumnFilter: true },
  te06n528: { accessorKey: "te06n528", header: ({ column }) => <DataTableColumnHeader column={column} title="Web URL 6" />, cell: ({ row }) => renderUrl(row.getValue("te06n528")), meta: { label: "Web Site URL 06", variant: "text", icon: LinkIcon }, enableColumnFilter: true },
  te07n528: { accessorKey: "te07n528", header: ({ column }) => <DataTableColumnHeader column={column} title="Web URL 7" />, cell: ({ row }) => renderUrl(row.getValue("te07n528")), meta: { label: "Web Site URL 07", variant: "text", icon: LinkIcon }, enableColumnFilter: true },
  te08n528: { accessorKey: "te08n528", header: ({ column }) => <DataTableColumnHeader column={column} title="Web URL 8" />, cell: ({ row }) => renderUrl(row.getValue("te08n528")), meta: { label: "Web Site URL 08", variant: "text", icon: LinkIcon }, enableColumnFilter: true },
  te09n528: { accessorKey: "te09n528", header: ({ column }) => <DataTableColumnHeader column={column} title="Web URL 9" />, cell: ({ row }) => renderUrl(row.getValue("te09n528")), meta: { label: "Web Site URL 09", variant: "text", icon: LinkIcon }, enableColumnFilter: true },
  te10n528: { accessorKey: "te10n528", header: ({ column }) => <DataTableColumnHeader column={column} title="Web URL 10" />, cell: ({ row }) => renderUrl(row.getValue("te10n528")), meta: { label: "Web Site URL 10", variant: "text", icon: LinkIcon }, enableColumnFilter: true },
  te01n529: { accessorKey: "te01n529", header: ({ column }) => <DataTableColumnHeader column={column} title="Trade Name 1" />, meta: { label: "Trade Name 01", variant: "text", icon: Building2 }, enableColumnFilter: true },
  te02n529: { accessorKey: "te02n529", header: ({ column }) => <DataTableColumnHeader column={column} title="Trade Name 2" />, meta: { label: "Trade Name 02", variant: "text", icon: Building2 }, enableColumnFilter: true },
  te03n529: { accessorKey: "te03n529", header: ({ column }) => <DataTableColumnHeader column={column} title="Trade Name 3" />, meta: { label: "Trade Name 03", variant: "text", icon: Building2 }, enableColumnFilter: true },
  te04n529: { accessorKey: "te04n529", header: ({ column }) => <DataTableColumnHeader column={column} title="Trade Name 4" />, meta: { label: "Trade Name 04", variant: "text", icon: Building2 }, enableColumnFilter: true },
  te05n529: { accessorKey: "te05n529", header: ({ column }) => <DataTableColumnHeader column={column} title="Trade Name 5" />, meta: { label: "Trade Name 05", variant: "text", icon: Building2 }, enableColumnFilter: true },
  te06n529: { accessorKey: "te06n529", header: ({ column }) => <DataTableColumnHeader column={column} title="Trade Name 6" />, meta: { label: "Trade Name 06", variant: "text", icon: Building2 }, enableColumnFilter: true },
  tract: {
    accessorKey: "tract",
    header: ({ column }) => <DataTableColumnHeader column={column} title="Tract" />,
    meta: { label: "", placeholder: "Search tract...", variant: "text", icon: Hash },
    enableColumnFilter: true,
  },
  trust: {
    accessorKey: "trust",
    header: ({ column }) => <DataTableColumnHeader column={column} title="Trust Powers" />,
    meta: { label: "Trust Powers", placeholder: "Search trust codes...", variant: "text", icon: Building2 },
    enableColumnFilter: true,
  },
  ultcert: {
    accessorKey: "ultcert",
    header: ({ column }) => <DataTableColumnHeader column={column} title="Ultimate Cert" />,
    meta: { label: "Ultimate Cert", placeholder: "Search cert #...", variant: "text", icon: Hash },
    enableColumnFilter: true,
  },
  uninum: {
    accessorKey: "uninum",
    header: ({ column }) => <DataTableColumnHeader column={column} title="FDIC Uni #" />,
    meta: { label: "FDIC's unique number", placeholder: "Search unique #...", variant: "text", icon: Hash },
    enableColumnFilter: true,
  },
  webaddr: {
    accessorKey: "webaddr",
    header: ({ column }) => <DataTableColumnHeader column={column} title="Primary Web Addr" />,
    cell: ({ row }) => renderUrl(row.getValue("webaddr")),
    meta: { label: "Primary Internet Web Address", placeholder: "Search URLs...", variant: "text", icon: LinkIcon },
    enableColumnFilter: true,
  },
};

// Function to get columns based on selected IDs using the Record above
export function getInstitutionTableColumns(selectedColumnIds: string[]): ColumnDef<Institution>[] {
  return selectedColumnIds
    .map(id => allColumns[id]) // Use the 'allColumns' Record
    .filter(Boolean); // Filter out undefined in case of bad/missing IDs
} 