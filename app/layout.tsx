import type { Metadata } from "next";
import { Inter, Outfit, Plus_Jakarta_Sans } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "@/components/theme-provider"
import { Preloader } from "@/components/preloader"
import { CustomCursor } from "@/components/custom-cursor"
import { SmoothScroll } from "@/components/smooth-scroll"

const outfit = Outfit({ subsets: ["latin"] });
const plusJakartaSans = Plus_Jakarta_Sans({ subsets: ["latin"], variable: "--font-plus-jakarta" });
const inter = Inter({ subsets: ["latin"], variable: "--font-inter" });

export const metadata: Metadata = {
  title: "Shubham Jadhav | Full Stack Developer",
  description: "Portfolio of Shubham Jadhav",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`${outfit.className} ${plusJakartaSans.variable} ${inter.variable} antialiased selection:bg-primary/30 min-h-screen bg-black overflow-x-hidden`}>
        <ThemeProvider
          attribute="class"
          defaultTheme="dark"
          enableSystem
          disableTransitionOnChange
        >
          <Preloader />
          <CustomCursor />
          <SmoothScroll>
            <div className="relative overflow-x-clip min-h-screen">
              {children}
            </div>
          </SmoothScroll>
        </ThemeProvider>
      </body>
    </html>
  );
}
