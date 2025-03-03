"use client";

import Link from "next/link";
import { useState } from "react";
import { ModeToggle } from "@/shared/components/toggle-theme";
import { Menu, X } from "lucide-react";
import { motion } from "framer-motion";

export function Header() {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <header className="fixed top-0 left-0 right-0 w-full h-[60px] border-b bg-white dark:bg-black z-50 flex items-center px-4 md:px-6">
      <div className="flex w-full justify-between items-center max-w-7xl mx-auto">
        {/* Logo */}
        <Link href="/" className="flex items-center gap-2">
          <span className="hidden sm:block text-xl font-bold">The Mind Garden.</span>
        </Link>

        {/* Menu chính - Hiển thị trên màn hình lớn */}
        <nav className="hidden md:flex gap-6">
          <Link href="/" className="text-gray-800 dark:text-gray-300 hover:text-blue-500">Trang chủ</Link>
          <Link href="/blog" className="text-gray-800 dark:text-gray-300 hover:text-blue-500">Blog</Link>
          <Link href="/about" className="text-gray-800 dark:text-gray-300 hover:text-blue-500">Giới thiệu</Link>
        </nav>

        {/* Nút Toggle Menu Mobile & Dark Mode */}
        <div className="flex items-center gap-4">
          <ModeToggle />
          <button className="md:hidden" onClick={() => setMenuOpen(!menuOpen)}>
            {menuOpen ? <X className="w-6 h-6 text-gray-800 dark:text-white" /> : <Menu className="w-6 h-6 text-gray-800 dark:text-white" />}
          </button>
        </div>
      </div>

      {/* Menu Mobile */}
      {menuOpen && (
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -10 }}
          className="absolute top-[60px] left-0 w-full bg-white dark:bg-black border-b shadow-md md:hidden"
        >
          <nav className="flex flex-col items-center gap-4 py-4">
            <Link href="/" className="text-gray-800 dark:text-gray-300 hover:text-blue-500">Trang chủ</Link>
            <Link href="/blog" className="text-gray-800 dark:text-gray-300 hover:text-blue-500">Blog</Link>
            <Link href="/about" className="text-gray-800 dark:text-gray-300 hover:text-blue-500">Giới thiệu</Link>
          </nav>
        </motion.div>
      )}
    </header>
  );
}
