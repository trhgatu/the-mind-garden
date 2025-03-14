"use client";

import Link from "next/link";
import { PATHS } from "@/app/routes";
import { useState, useEffect } from "react";
import { ModeToggle } from "@/shared/components/toggle-theme";
import { motion, AnimatePresence } from "framer-motion";
import { lora, quintessential } from "@/shared/fonts/fonts";
import { useAuth } from "@/shared/contexts";
import { Loading } from "@/shared/components/loading";

export function Header() {
  const { user, isInitializing,logout } = useAuth();
  const [isMobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    if (isMobileMenuOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "auto";
    }
    return () => {
      document.body.style.overflow = "auto";
    };
  }, [isMobileMenuOpen]);

  const overlayVariants = {
    closed: {
      opacity: 0,
      transition: {
        duration: 0.3
      }
    },
    open: {
      opacity: 1,
      transition: {
        duration: 0.3
      }
    }
  };
  const menuVariants = {
    closed: {
      x: "100%",
      opacity: 0,
      transition: {
        type: "spring",
        stiffness: 400,
        damping: 40
      }
    },
    open: {
      x: 0,
      opacity: 1,
      transition: {
        type: "spring",
        stiffness: 300,
        damping: 30,
        staggerChildren: 0.07,
        delayChildren: 0.2
      }
    }
  };

  if(isInitializing) {
      return <Loading variant="book" full/>
  }
  return (
    <header
      className={`fixed top-0 left-0 w-full z-50 transition-all duration-300 ${scrolled ? "transparent backdrop-blur-md shadow-sm" : "transparent"
        }`}
      style={{ height: "var(--header-height)" }}
    >
      <div className="py-4">
        <div className="container max-w-5xl mx-auto flex items-center justify-between px-4">
          <div className="flex items-center">
            <Link href={PATHS.HOME} className={`text-2xl ${quintessential.className} font-bold hover:scale-105 transition-all hover:text-[#7B3F01] duration-100`}>
              The Mind Garden
            </Link>
          </div>
          <nav className="hidden md:flex">
            <ul className="flex space-x-6 items-center">
              <ul className="flex space-x-6 items-center">
                {[
                  { label: "Trang chủ", path: "/home" },
                  { label: "Liên hệ", path: "/contact" },
                  { label: "Tác giả", path: "/author" },
                ].map(({ label, path }) => (
                  <Link
                    className="relative py-1 px-2 overflow-hidden group"
                    key={path}
                    href={path}
                  >
                    <span className={`relative z-10 transition-colors duration-300 ${lora.className}`}>
                      {label}
                    </span>
                    <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-[#7B3F01] group-hover:w-full transition-all duration-300"></span>
                  </Link>

                ))}
              </ul>
              {user ? (
                <>
                  <Link href={`/profile/${user.username}`}>
                    Hồ sơ {user.username ? `(${user.username})` : ""}
                  </Link>
                  <button onClick={logout} className="text-red-500">
                    Đăng xuất
                  </button>
                </>
              ) : (
                <>
                  <Link href="/login">Đăng nhập</Link>
                  <Link href="/register">Đăng ký</Link>
                </>
              )}



              <li><ModeToggle /></li>
            </ul>
          </nav>

          <button
            className="md:hidden relative z-50 w-10 h-10 flex items-center justify-center"
            onClick={() => setMobileMenuOpen(!isMobileMenuOpen)}
            aria-label="Toggle Mobile Menu"
          >
            <div className="relative w-6 h-5">
              <span
                className={`absolute h-0.5 w-6 bg-current transform transition-all duration-300 ease-in-out ${isMobileMenuOpen ? "rotate-45 top-2" : "rotate-0 top-0"
                  }`}
              />
              <span
                className={`absolute h-0.5 w-6 bg-current transform transition-all duration-300 ease-in-out ${isMobileMenuOpen ? "opacity-0" : "opacity-100"
                  } top-2`}
              />
              <span
                className={`absolute h-0.5 w-6 bg-current transform transition-all duration-300 ease-in-out ${isMobileMenuOpen ? "-rotate-45 top-2" : "rotate-0 top-4"
                  }`}
              />
            </div>
          </button>
        </div>

        <AnimatePresence>
          {isMobileMenuOpen && (
            <motion.div
              key="menu-mobile-overlay"
              initial="closed"
              animate="open"
              exit="closed"
              variants={overlayVariants}
              className="fixed inset-0 bg-black/60 z-40 md:hidden"
              onClick={() => setMobileMenuOpen(false)}
              aria-hidden="true"
              style={{
                height: 'calc(var(--vh, 1vh) * 100)',
                width: '100%',
                position: 'fixed',
                top: 0,
                left: 0,
                right: 0,
                bottom: 0
              }}
            />
          )}
          <AnimatePresence>
            {isMobileMenuOpen && (
              <motion.div
                key="mobile-menu"
                initial="closed"
                animate="open"
                exit="closed"
                variants={menuVariants}
                className="md:hidden fixed top-0 right-0 w-4/5 max-w-sm shadow-2xl z-50 overflow-hidden border-l border-border bg-white"
                style={{
                  height: 'calc(var(--vh, 1vh) * 100)',
                  backgroundColor: 'var(--theme-mode) === "dark" ? "#202020" : "white"',
                }}
              >
                <div className="flex flex-col h-full dark:bg-[#202020] bg-white">
                  <div
                    className="p-6 border-b border-border dark:bg-[#202020] bg-white"
                  >
                    <div className="flex justify-between items-center">
                      <div>
                        <div className="text-2xl font-bold">The Mind Garden</div>
                      </div>
                      <button
                        onClick={() => setMobileMenuOpen(false)}
                        className="p-2 rounded-full hover:bg-accent transition-colors duration-200"
                        aria-label="Close menu"
                      >
                        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                          <path d="M18 6 6 18"></path>
                          <path d="m6 6 12 12"></path>
                        </svg>
                      </button>
                    </div>
                  </div>

                  <div className="flex-1 py-8 px-6 overflow-y-auto dark:bg-[#202020] bg-white">
                    <div className="space-y-1">
                      {[{ label: "Trang chủ", path: "/home" },
                      { label: "Đăng nhập", path: "/login" },
                      { label: "Đăng ký", path: "/register" },
                      { label: "Liên hệ", path: "/contact" },
                      { label: "Tác giả", path: "/author" }].map(({ label, path }) => (
                        <Link
                          key={path}
                          href={path}
                          className="w-full text-left py-3 px-4 rounded-lg transition-colors duration-200 flex items-center"
                          onClick={() => setMobileMenuOpen(false)}
                        >
                          <span className="text-lg font-medium">{label}</span>
                        </Link>
                      ))}

                    </div>
                    <div
                      className="mt-8 pt-6 border-t border-border"
                    >
                      <div className="flex items-center justify-between mb-6">
                        <span className="text-sm font-medium">Chế độ</span>
                        <ModeToggle />
                      </div>
                    </div>
                  </div>
                  <div
                    className="p-6 border-t border-border mt-auto dark:bg-[#202020] bg-white"
                  >
                    <div className="text-sm text-muted-foreground">
                      © 2025 The Mind Garden
                    </div>
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>

        </AnimatePresence>

      </div>
    </header >
  );
}
