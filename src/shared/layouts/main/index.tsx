// MainLayout.tsx
'use client';
import { Header } from './header';
import {Footer} from './footer';

import { LayoutProps } from '@/shared/models/common';

export function MainLayout({ children }: LayoutProps) {

  return (
    <div>
      <Header />
      <main>
        {children}

      </main>
      <Footer/>
    </div>
  );
}
