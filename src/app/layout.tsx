"use client";

import { ReactNode, useMemo } from "react";
import { inter } from "@/shared/fonts/fonts";
import { ThemeProvider } from "@/shared/components/theme-provider";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";

import "./globals.css";
import { Toaster } from "sonner";

export default function RootLayout({ children }: { children: ReactNode }) {
  const queryClient = useMemo(() => new QueryClient(), []);

  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`${inter.className} font-base antialiased`}>
        <ThemeProvider attribute="class" defaultTheme="system" enableSystem disableTransitionOnChange>
          <QueryClientProvider client={queryClient}>
            {children}
            <Toaster/>
            <ReactQueryDevtools initialIsOpen={false} />
          </QueryClientProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
