// MainLayout.tsx
'use client';
import { Header } from './header';
import { Footer } from './footer';

import { LayoutProps } from '@/shared/models/common';

export function MainLayout({ children }: LayoutProps) {

  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <main className="flex-grow container mx-auto px-4 py-6">{children}</main>
      <Footer />
    </div>
  );
}
