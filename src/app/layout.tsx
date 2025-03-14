"use client";

import { ReactNode, useMemo } from "react";
import { lato } from "@/shared/fonts/fonts";
import { ThemeProvider } from "@/shared/components/theme-provider";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";

import "./globals.css";
import { Toaster } from "sonner";
import { AuthProvider } from "@/shared/contexts";

export default function RootLayout({ children }: { children: ReactNode }) {
  const queryClient = useMemo(() => new QueryClient(), []);

  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`${lato.className} font-base antialiased`}>
        <ThemeProvider attribute="class" defaultTheme="system" enableSystem disableTransitionOnChange>
          <QueryClientProvider client={queryClient}>
            <AuthProvider>
              {children}
              <Toaster />
              <ReactQueryDevtools initialIsOpen={false} />
            </AuthProvider>
          </QueryClientProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
