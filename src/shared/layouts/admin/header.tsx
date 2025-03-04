'use client';

import { quintessential } from '@/shared/fonts/fonts';

export function Header() {
  return (
    <header className="fixed top-0 left-0 right-0 w-full h-[60px] border-b bg-background z-50 flex items-center px-4 md:px-6">
      <div className="flex w-full justify-between items-center max-w-7xl mx-auto">
        <span className={`hidden sm:block text-xl font-bold ${quintessential.className}`}>Admin - The Mind Garden.</span>
      </div>
    </header>
  );
}