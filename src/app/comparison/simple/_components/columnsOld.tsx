"use client"

import { ColumnDef } from "@tanstack/react-table"
import { InstitutionOld } from "../_lib/types"

export const columnsOld: ColumnDef<InstitutionOld>[] = [
  {
    accessorKey: "institutionStatus",
    header: () => <div className="">Institution Status</div>,
    cell: ({ row }) => {
      const value = row.getValue("institutionStatus")
      return <div className="">{value === 0 ? "Inactive" : "Active"}</div>
    },
  },
  {
    accessorKey: "institutionName",
    header: () => <div className="">Institution Name</div>,
    cell: ({ row }) => {
      const value = row.getValue("institutionName")
      return <div className="">{String(value)}</div>
    },
  },
  {
    accessorKey: "fdicCertificateNumber",
    header: () => <div className="">FDIC Certificate #</div>,
    cell: ({ row }) => {
      const value = row.getValue("fdicCertificateNumber")
      return <div className="">{Number(value)}</div>
    },
  },
  {
    accessorKey: "federalReserveIdNumber",
    header: () => <div className="">Federal Reserve ID #</div>,
    cell: ({ row }) => {
      const value = row.getValue("federalReserveIdNumber")
      return <div className="">{Number(value)}</div>
    },
  },
  {
    accessorKey: "zipCode",
    header: () => <div className="">Zip Code</div>,
    cell: ({ row }) => {
      const value = row.getValue("zipCode")
      return <div className="">{Number(value)}</div>
    },
  },
  {
    accessorKey: "numberOfDomesticOffices",
    header: () => <div className=""># Domestic Offices</div>,
    cell: ({ row }) => {
      const value = row.getValue("numberOfDomesticOffices")
      return <div className="">{Number(value)}</div>
    },
  },
  {
    accessorKey: "numberOfForeignOffices",
    header: () => <div className=""># Foreign Offices</div>,
    cell: ({ row }) => {
      const value = row.getValue("numberOfForeignOffices")
      return <div className="">{Number(value)}</div>
    },
  },
  {
    accessorKey: "interstateBranches",
    header: () => <div className="">Interstate Branches</div>,
    cell: ({ row }) => {
      const value = row.getValue("interstateBranches")
      return <div className="">{Number(value)}</div>
    },
  },
]
