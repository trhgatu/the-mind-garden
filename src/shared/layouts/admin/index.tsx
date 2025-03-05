// MainLayout.tsx
'use client';

import { Header } from './header';
import { LayoutProps } from '@/shared/models/common';
import { AppSidebar } from '@/shared/layouts/admin/app-sidebar';
import { Separator } from "@/components/ui/separator"
import {
  SidebarInset,
  SidebarProvider,
  SidebarTrigger,
} from "@/components/ui/sidebar"


export function AdminLayout({ children }: LayoutProps) {
  return (
    <div>
      <Header />
      <main>
        <SidebarProvider className='mt-[60px] h-[calc(100vh-60px)]" '>
          <AppSidebar className="mt-[60px] h-[calc(100vh-60px)]" />
          <SidebarInset className='bg-white'>
            <header className="md:flex hidden fixed h-16 shrink-0 items-center gap-2 transition-[width,height] ease-linear group-has-[[data-collapsible=icon]]/sidebar-wrapper:h-12">
              <div className="flex items-center gap-2 px-4">
                <SidebarTrigger className="-ml-1" />
                <Separator orientation="vertical" className="mr-2 h-4" />
              </div>
            </header>
            <div className="mx-auto grid w-full max-w-2xl gap-10 xl:max-w-5xl">
              {children}
            </div>
          </SidebarInset>
        </SidebarProvider>
      </main>
    </div>
  );
}