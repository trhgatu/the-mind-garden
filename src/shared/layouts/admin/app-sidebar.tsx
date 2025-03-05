"use client"

import * as React from "react"
import {
  CircleGauge,
  Newspaper,
  LayoutList,
  Tags,
  Users,
} from "lucide-react"

import { NavMain } from "@/shared/layouts/admin/nav-main"
import {
  Sidebar,
  SidebarContent,
  SidebarRail,
} from "@/components/ui/sidebar"


const data = {
  navMain: [
    {
      title: "Dashboard",
      url: "/admin/dashboard",
      icon: CircleGauge,
      isActive: true,
      items: [],
    },
    {
      title: "Quản lý bài viết",
      url: "/admin/posts",
      icon: Newspaper,
      items: [],
    },
    {
      title: "Quản lý người dùng",
      url: "/admin/users",
      icon: Users,
      items: [],
    },
    {
      title: "Quản lý tags",
      url: "/admin/tags",
      icon: LayoutList,
      items: [],
    },
    {
      title: "Quản lý quotes",
      url: "/admin/quotes",
      icon: LayoutList,
      items: [],
    },
    {
      title: "Quản lý danh mục",
      url: "/admin/categories",
      icon: LayoutList,
      items: [],
    },
    {
      title: "Thông báo",
      url: "/admin/tags",
      icon: Tags,
      items: [],
    },
  ],
}


export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  return (
    <Sidebar collapsible="icon" {...props}>
      <SidebarContent>
        <NavMain items={data.navMain} />
      </SidebarContent>
      <SidebarRail />
    </Sidebar>
  )
}