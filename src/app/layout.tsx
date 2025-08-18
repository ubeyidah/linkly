import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { ClerkProvider } from "@clerk/nextjs";
import { ThemeProvider } from "@/components/theme-provider";
import Navbar from "@/components/nav-bar";
import Wrapper from "@/components/wrapper";

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
          className={`${geistSans.variable} ${geistMono.variable} antialiased`}
        >
          <ThemeProvider
            attribute="class"
            defaultTheme="system"
            enableSystem
            disableTransitionOnChange
          >
            <div className="min-h-screen">
              <Navbar />
              <Wrapper as={"main"} className="py-8">
                <div className="grid grid-cols-1 lg:grid-cols-12">
                  <div className="hidden lg:block lg:col-span3">sidebar</div>
                  <div className="lg:col-span9">{children}</div>
                </div>
              </Wrapper>
            </div>
          </ThemeProvider>
        </body>
      </html>
    </ClerkProvider>
  );
}
