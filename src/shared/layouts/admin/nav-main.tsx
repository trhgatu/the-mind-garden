"use client"

import Link from "next/link"
import { type LucideIcon } from "lucide-react"
import { usePathname } from "next/navigation"
import {
  SidebarGroup,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar"

interface NavItem {
  title: string
  url: string
  icon?: LucideIcon
}

interface NavMainProps {
  items: NavItem[]
}
import { Separator } from "@/components/ui/separator"
export function NavMain({ items }: NavMainProps) {
  const pathname = usePathname()

  return (
    <SidebarGroup>
      <SidebarMenu>
        {items.map((item) => {
          const isActive = pathname === item.url
          return (
            <SidebarMenuItem key={item.title}>
              <SidebarMenuButton asChild>
                <Link
                  href={item.url}
                  className={`flex items-center gap-3 px-4 py-6 rounded-md transition ${isActive
                    ? "bg-neutral-100 font-bold dark:bg-neutral-600"
                    : "hover:bg-neutral-100 dark:hover:bg-neutral-700 dark:hover:text-neutral-100"
                    }`}
                >
                  {item.icon && <item.icon className="w-5 h-5" />}
                  <span className="text-md">{item.title}</span>
                </Link>
              </SidebarMenuButton>
            </SidebarMenuItem>
          )
        })}
        <Separator/>
      </SidebarMenu>
    </SidebarGroup>
  )
}