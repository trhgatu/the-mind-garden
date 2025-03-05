"use client"

import * as React from "react"
import { PATHS } from "@/app/routes"

import {
  CircleGauge,
  Newspaper,
  LayoutList,
  Tags,
  Users,
  TagsIcon,
  Quote,
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
      url: PATHS.ADMIN.BASE,
      icon: CircleGauge,
      isActive: true,
      items: [],
    },
    {
      title: "Quản lý bài viết",
      url: PATHS.ADMIN.POSTS,
      icon: Newspaper,
      items: [],
    },
    {
      title: "Quản lý người dùng",
      url: PATHS.ADMIN.USERS,
      icon: Users,
      items: [],
    },
    {
      title: "Quản lý tags",
      url: PATHS.ADMIN.TAGS,
      icon: TagsIcon,
      items: [],
    },
    {
      title: "Quản lý quotes",
      url: PATHS.ADMIN.QUOTES,
      icon: Quote,
      items: [],
    },
    {
      title: "Quản lý danh mục",
      url: PATHS.ADMIN.CATEGORIES,
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