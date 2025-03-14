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
  const { user, isInitializing, logout } = useAuth();
  const [isMobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [activeRoute, setActiveRoute] = useState("");

  // Set active route on initial load and route change
  useEffect(() => {
    setActiveRoute(window.location.pathname);
  }, []);

  // Handle scroll effects
  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Handle body scroll lock when mobile menu is open
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

  // Animation variants
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

  const menuItemVariants = {
    closed: { opacity: 0, y: 20 },
    open: { opacity: 1, y: 0 }
  };

  // Navigation items
  const navItems = [
    { label: "Trang chủ", path: PATHS.HOME || "/home" },
    { label: "Liên hệ", path: "/contact" },
    { label: "Tác giả", path: "/author" },
  ];

  if (isInitializing) {
    return <Loading variant="book" full />;
  }

  return (
    <header
      className={`fixed top-0 left-0 w-full z-50 transition-all duration-300 ${scrolled
          ? "bg-white/80 dark:bg-gray-900/80 backdrop-blur-md shadow-sm"
          : "bg-transparent"
        }`}
      style={{ height: "var(--header-height)" }}
    >
      <div className="py-4">
        <div className="container max-w-5xl mx-auto flex items-center justify-between px-4">
          {/* Logo */}
          <motion.div
            className="flex items-center"
            whileHover={{ scale: 1.05 }}
            transition={{ type: "spring", stiffness: 400, damping: 10 }}
          >
            <Link href={PATHS.HOME} className={`text-2xl ${quintessential.className} font-bold transition-all hover:text-[#7B3F01] duration-300`}>
              <span className="relative">
                The Mind Garden
                <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-[#7B3F01] group-hover:w-full transition-all duration-300"></span>
              </span>
            </Link>
          </motion.div>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex">
            <ul className="flex space-x-6 items-center">
              {navItems.map(({ label, path }) => (
                <li key={path}>
                  <Link
                    className="relative py-1 px-2 overflow-hidden group"
                    href={path}
                  >
                    <span className={`relative z-10 transition-colors duration-300 ${lora.className} ${activeRoute === path ? "text-[#7B3F01] font-medium" : ""}`}>
                      {label}
                    </span>
                    <span className={`absolute bottom-0 left-0 h-0.5 bg-[#7B3F01] transition-all duration-300 ${activeRoute === path ? "w-full" : "w-0 group-hover:w-full"}`}></span>
                  </Link>
                </li>
              ))}

              {/* Auth Section */}
              {user ? (
                <>
                  <li>
                    <Link
                      href={`/profile/${user.username}`}
                      className="flex items-center gap-2 hover:text-[#7B3F01] transition-colors"
                    >
                      <span className="relative overflow-hidden">
                        <span className={`${lora.className}`}>Hồ sơ {user.username ? `(${user.username})` : ""}</span>
                        <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-[#7B3F01] group-hover:w-full transition-all duration-300"></span>
                      </span>
                    </Link>
                  </li>
                  <li>
                    <button
                      onClick={logout}
                      className="text-red-500 hover:text-red-600 transition-colors py-1 px-3 rounded-lg hover:bg-red-50 dark:hover:bg-red-900/20"
                    >
                      Đăng xuất
                    </button>
                  </li>
                </>
              ) : (
                <>
                  <li>
                    <Link
                      href="/login"
                      className="py-1 px-3 transition-colors hover:text-[#7B3F01] relative group"
                    >
                      <span className={`${lora.className}`}>Đăng nhập</span>
                      <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-[#7B3F01] group-hover:w-full transition-all duration-300"></span>
                    </Link>
                  </li>
                  <li>
                    <Link
                      href="/register"
                      className="py-1.5 px-4 bg-[#7B3F01]/10 text-[#7B3F01] rounded-lg hover:bg-[#7B3F01]/20 transition-colors"
                    >
                      <span className={`${lora.className}`}>Đăng ký</span>
                    </Link>
                  </li>
                </>
              )}

              <li><ModeToggle /></li>
            </ul>
          </nav>

          {/* Mobile Menu Button */}
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

        {/* Mobile Menu Overlay */}
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
        </AnimatePresence>

        {/* Mobile Menu Panel */}
        <AnimatePresence>
          {isMobileMenuOpen && (
            <motion.div
              key="mobile-menu"
              initial="closed"
              animate="open"
              exit="closed"
              variants={menuVariants}
              className="md:hidden fixed top-0 right-0 w-4/5 max-w-sm shadow-2xl z-50 overflow-hidden border-l border-border dark:border-gray-800"
              style={{
                height: 'calc(var(--vh, 1vh) * 100)',
              }}
            >
              <div className="flex flex-col h-full dark:bg-gray-900 bg-white">
                {/* Mobile Menu Header */}
                <div className="p-6 border-b border-border dark:border-gray-800">
                  <div className="flex justify-between items-center">
                    <div>
                      <div className={`text-2xl font-bold ${quintessential.className}`}>The Mind Garden</div>
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

                {/* Mobile Menu Items */}
                <div className="flex-1 py-8 px-6 overflow-y-auto dark:bg-gray-900 bg-white">
                  <div className="space-y-1">
                    {/* Navigation Items */}
                    {navItems.map(({ label, path }) => (
                      <motion.div key={path} variants={menuItemVariants}>
                        <Link
                          href={path}
                          className={`block w-full text-left py-3 px-4 rounded-lg transition-colors duration-200 ${activeRoute === path
                              ? "bg-[#7B3F01]/10 text-[#7B3F01]"
                              : "hover:bg-gray-100 dark:hover:bg-gray-800"
                            }`}
                          onClick={() => setMobileMenuOpen(false)}
                        >
                          <span className={`text-lg font-medium ${lora.className}`}>{label}</span>
                        </Link>
                      </motion.div>
                    ))}

                    {/* Auth Items */}
                    {user ? (
                      <>
                        <motion.div variants={menuItemVariants}>
                          <Link
                            href={`/profile/${user.username}`}
                            className="block w-full text-left py-3 px-4 rounded-lg transition-colors duration-200 hover:bg-gray-100 dark:hover:bg-gray-800"
                            onClick={() => setMobileMenuOpen(false)}
                          >
                            <span className={`text-lg font-medium ${lora.className}`}>
                              Hồ sơ {user.username ? `(${user.username})` : ""}
                            </span>
                          </Link>
                        </motion.div>
                        <motion.div variants={menuItemVariants}>
                          <button
                            onClick={() => {
                              logout();
                              setMobileMenuOpen(false);
                            }}
                            className="w-full text-left py-3 px-4 rounded-lg transition-colors duration-200 text-red-500 hover:bg-red-50 dark:hover:bg-red-900/20"
                          >
                            <span className={`text-lg font-medium ${lora.className}`}>Đăng xuất</span>
                          </button>
                        </motion.div>
                      </>
                    ) : (
                      <>
                        <motion.div variants={menuItemVariants}>
                          <Link
                            href="/login"
                            className="block w-full text-left py-3 px-4 rounded-lg transition-colors duration-200 hover:bg-gray-100 dark:hover:bg-gray-800"
                            onClick={() => setMobileMenuOpen(false)}
                          >
                            <span className={`text-lg font-medium ${lora.className}`}>Đăng nhập</span>
                          </Link>
                        </motion.div>
                        <motion.div variants={menuItemVariants}>
                          <Link
                            href="/register"
                            className="block w-full text-left py-3 px-4 rounded-lg bg-[#7B3F01]/10 text-[#7B3F01] transition-colors duration-200"
                            onClick={() => setMobileMenuOpen(false)}
                          >
                            <span className={`text-lg font-medium ${lora.className}`}>Đăng ký</span>
                          </Link>
                        </motion.div>
                      </>
                    )}
                  </div>

                  {/* Theme Toggle */}
                  <motion.div
                    variants={menuItemVariants}
                    className="mt-8 pt-6 border-t border-border dark:border-gray-800"
                  >
                    <div className="flex items-center justify-between mb-6">
                      <span className={`text-sm font-medium ${lora.className}`}>Chế độ</span>
                      <ModeToggle />
                    </div>
                  </motion.div>
                </div>

                {/* Footer */}
                <motion.div
                  variants={menuItemVariants}
                  className="p-6 border-t border-border dark:border-gray-800 mt-auto"
                >
                  <div className="text-sm text-muted-foreground">
                    © 2025 The Mind Garden
                  </div>
                </motion.div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Progress indicator for scrolling */}
      {scrolled && (
        <div className="h-0.5 bg-gradient-to-r from-[#7B3F01]/70 to-[#7B3F01]/30 dark:from-[#7B3F01]/90 dark:to-[#7B3F01]/50"
          style={{ width: `${(window.scrollY / (document.body.scrollHeight - window.innerHeight)) * 100}%` }}
        />
      )}
    </header>
  );
}

// Add this at the end of your file to set the viewport height correctly for mobile
export function setViewportHeight() {
  // Set viewport height variable for mobile browsers
  if (typeof window !== 'undefined') {
    const vh = window.innerHeight * 0.01;
    document.documentElement.style.setProperty('--vh', `${vh}px`);

    window.addEventListener('resize', () => {
      const vh = window.innerHeight * 0.01;
      document.documentElement.style.setProperty('--vh', `${vh}px`);
    });
  }
}

// Call this function in your layout component or _app.js
// setViewportHeight();