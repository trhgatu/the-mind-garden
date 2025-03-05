// MainLayout.tsx
'use client';
import { Header } from './header';
import { Footer } from './footer';

import { LayoutProps } from '@/shared/models/common';

export function MainLayout({ children }: LayoutProps) {

  return (
    <div className="flex flex-col h-screen">
      <Header />
      <main className="flex-grow">
        {children}
      </main>
      <Footer />
    </div>
  );
}
