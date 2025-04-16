"use client"

import * as React from "react"
import {
  Building2,
  DollarSign,
  // Globe,
} from "lucide-react"

import { NavMain } from "@/components/nav-main"

import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarRail,
} from "@/components/ui/sidebar"
import { SidebarLogo } from "@/components/sidebar-logo"



const navMain = [
    {
      title: "Institutions",
      url: "/institutions/dashboard",
      icon: Building2,
      isActive: true,
      items: [
        // {
        //   title: "Dashboard",
        //   url: "/institutions/dashboard",
        // },
        {
          title: "Table",
          url: "/institutions/table",
        },
      ],
    },
    {
      title: "Financials",
      url: "/financials/dashboard",
      icon: DollarSign,
      isActive: true,
      items: [
        {
          title: "Dashboard",
          url: "/financials/dashboard",
        },
        {
          title: "Table",
          url: "/financials/table",
        },
      ],
    },
    // {
    //   title: "Industry",
    //   url: "/industry/dashboard",
    //   icon: Globe,
    //   isActive: true,
    //   items: [
    //     {
    //       title: "Dashboard",
    //       url: "/industry/dashboard",
    //     },
    //     {
    //       title: "Table",
    //       url: "/industry/table",
    //     },

    //   ],
    // },
  ]

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {


  return (
    <Sidebar collapsible="icon" {...props}>
      <SidebarHeader>
        <SidebarLogo />
      </SidebarHeader>
      <SidebarContent>
        <NavMain items={navMain} />
      </SidebarContent>
      <SidebarFooter>
        {/* TODO: Add User Login Component */}
      </SidebarFooter>
      <SidebarRail />
    </Sidebar>
  )
}
