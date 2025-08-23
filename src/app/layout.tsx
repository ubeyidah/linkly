import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { ClerkProvider } from "@clerk/nextjs";
import { ThemeProvider } from "@/components/theme-provider";
import Navbar from "@/components/nav-bar";
import Wrapper from "@/components/wrapper";
import Sidebar from "@/components/side-bar";
import { Suspense } from "react";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Linkly",
  description: "Linkly – a modern social media platform to connect and share.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <ClerkProvider>
      <html lang="en" suppressHydrationWarning>
        <body
          className={`${geistSans.variable} ${geistMono.variable} antialiased relative`}
        >
          <ThemeProvider
            attribute="class"
            defaultTheme="system"
            enableSystem
            disableTransitionOnChange
          >
            <div className="min-h-screen">
              <Navbar />
              <Wrapper
                as={"main"}
                className="py-8 grid grid-cols-1 lg:grid-cols-12 gap-6"
              >
                <div className="hidden lg:block lg:col-span-3">
                  <div className="sticky top-[80px]">
                    <Suspense fallback={"lading..."}>
                      <Sidebar />
                    </Suspense>
                  </div>
                </div>
                <div className="lg:col-span-9">{children}</div>
              </Wrapper>
            </div>
          </ThemeProvider>
        </body>
      </html>
    </ClerkProvider>
  );
}
