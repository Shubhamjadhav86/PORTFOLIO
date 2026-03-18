import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google"; // Using defaults provided by Next.js
import "./globals.css";
import { ThemeProvider } from "@/components/theme-provider"

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Shubham Jadhav | Full Stack Developer",
  description: "Portfolio of Shubham Jadhav, a Full Stack Developer building scalable web applications. Open to internships and full-time opportunities.",
};

import { SmoothScroll } from "@/components/smooth-scroll";
import { PageTransition } from "@/components/page-transition";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="dark" style={{ colorScheme: 'dark' }}>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased bg-background text-foreground selection:bg-primary/30 selection:text-primary overflow-x-hidden`}
      >
        <div className="noise" />
        <div className="scanline" />
        <div className="fixed inset-0 z-[-1] futuristic-grid opacity-20 pointer-events-none" />
        <div className="fixed inset-0 z-[-1] bg-gradient-to-tr from-primary/5 via-transparent to-accent/5 pointer-events-none" />
        
        <ThemeProvider
          attribute="class"
          defaultTheme="dark"
          forcedTheme="dark"
          enableSystem={false}
          disableTransitionOnChange
        >
          <SmoothScroll>
            <PageTransition>
              {children}
            </PageTransition>
          </SmoothScroll>
        </ThemeProvider>
      </body>
    </html>
  );
}
