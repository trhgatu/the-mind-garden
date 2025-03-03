import Link from 'next/link';
import { ModeToggle } from '@/shared/components/toggle-theme';
export function Header() {
  return (
    <header className="fixed top-0 left-0 right-0 w-full h-[60px] border-b bg-white dark:bg-black z-50 flex items-center px-4 md:px-6">
      <div className="flex w-full justify-between items-center max-w-7xl mx-auto">
        <Link href="/" className="flex items-center gap-2">
          <span className="hidden sm:block text-xl font-bold">Vietnam Social.</span>
        </Link>
        <div className="flex items-center gap-4">
          <ModeToggle />
        </div>
      </div>
    </header>
  );
}
