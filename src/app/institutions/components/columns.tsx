"use client"

import { ColumnDef } from "@tanstack/react-table"
import { DataTableColumnHeader } from "@/components/data-table-column-header"
import { Building2, MapPin, Hash } from "lucide-react"

// This type is based on the institution properties from the YAML file
export type Institution = {
  cert: string // FDIC Certificate #
  name: string // Legal Name
  city: string // City
  stname: string // State Name
  zip: string // ZIP Code
  address: string // Street Address
  asset: number // Total assets
  cb: string // Community Bank flag
  bkclass: string // Institution Class
  active: string // Institution Status
  // Add other relevant fields as needed
}

export const columns: ColumnDef<Institution>[] = [
  {
    accessorKey: "name",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Legal Name" />
    ),
    cell: ({ row }) => <div className="font-medium">{row.getValue("name")}</div>,
    meta: {
      label: "Legal Name",
      placeholder: "Search names...",
      variant: "text",
      icon: Building2,
    },
    enableColumnFilter: true,
  },
  {
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
  {
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
  {
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
  {
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
  {
    accessorKey: "bkclass",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Institution Class" />
    ),
    meta: {
      label: "Institution Class",
      variant: "select",
      options: [
        { label: "National Bank", value: "N" },
        { label: "State Member Bank", value: "SM" },
        { label: "State Non-Member Bank", value: "NM" },
        { label: "Savings Bank", value: "SB" },
        { label: "Savings Association", value: "SA" },
        { label: "Other Institution", value: "OI" }
      ],
      icon: Building2,
    },
    enableColumnFilter: true,
  },
  {
    accessorKey: "asset",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Total Assets" />
    ),
    cell: ({ row }) => {
      const amount = parseFloat(row.getValue("asset")) * 1000; // Convert to actual amount
      if (isNaN(amount)) {
        return <div>-</div>;
      }
      const formatted = new Intl.NumberFormat("en-US", {
        style: "currency",
        currency: "USD",
        notation: "standard", // Changed to standard to always show full number
        minimumFractionDigits: 0, // Ensure no decimal places
        maximumFractionDigits: 0, // Ensure no decimal places
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
  {
    accessorKey: "cb",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Community Bank" />
    ),
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
  {
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
  },
  {
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
] 