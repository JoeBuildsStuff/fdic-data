"use client"

import { ColumnDef } from "@tanstack/react-table"
import { DataTableColumnHeader } from "@/components/data-table-column-header"
import { Building2, MapPin, Hash } from "lucide-react"

// Define and export the AvailableColumn type here
export interface AvailableColumn {
  id: keyof Institution | string;
  label: string;
}

// This type is based on the institution properties from the YAML file
export type Institution = {
  cert?: string // FDIC Certificate #
  name?: string // Legal Name
  city?: string // City
  stname?: string // State Name (Abbreviation)
  zip?: string // ZIP Code
  address?: string // Street Address
  asset?: string // Total Assets in thousands
  cb?: string // Community Bank flag
  bkclass?: string // Institution Class
  active?: string // Institution Status
}

// Define ALL possible columns in a Record keyed by their accessorKey/id
const allColumns: Record<string, ColumnDef<Institution>> = {
  cert: {
    accessorKey: "cert",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Certificate #" />
    ),
    meta: {
      label: "Certificate #",
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
      <DataTableColumnHeader column={column} title="Legal Name" />
    ),
    cell: ({ row }) => <div className="">{row.getValue("name")}</div>,
    meta: {
      label: "Legal Name",
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
      <DataTableColumnHeader column={column} title="State" />
    ),
    meta: {
      label: "State",
      variant: "select",
      options: [], // Will be populated from data
      icon: MapPin,
    },
    enableColumnFilter: true,
  },
  zip: {
    accessorKey: "zip",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="ZIP Code" />
    ),
    meta: {
      label: "ZIP Code",
      placeholder: "Search ZIP codes...",
      variant: "text",
      icon: MapPin,
    },
    enableColumnFilter: true,
  },
  address: {
    accessorKey: "address",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Address" />
    ),
    meta: {
      label: "Address",
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
      label: "Total Assets",
      variant: "range",
      range: [0, 1000000000], // Adjust range to reflect thousands
      unit: "$",
      icon: Hash,
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
};

// Remove the old static export
// export const columns: ColumnDef<Institution>[] = [ ... ];

// Function to get columns based on selected IDs using the Record above
export function getInstitutionTableColumns(selectedColumnIds: string[]): ColumnDef<Institution>[] {
  return selectedColumnIds
    .map(id => allColumns[id]) // Use the 'allColumns' Record
    .filter(Boolean); // Filter out undefined in case of bad/missing IDs
} 