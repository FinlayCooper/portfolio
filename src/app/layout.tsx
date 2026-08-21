import type { Metadata } from "next";
import { IBM_Plex_Mono, IBM_Plex_Sans } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/layout/Navbar";
import MatrixRain from "@/components/effects/MatrixRain";
import { SpeedInsights } from '@vercel/speed-insights/next';

const plexMono = IBM_Plex_Mono({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-plex-mono",
});

const plexSans = IBM_Plex_Sans({
  subsets: ["latin"],
  weight: ["400", "500", "600"],
  variable: "--font-plex-sans",
});

export const metadata: Metadata = {
  title: "Finlay Cooper | Portfolio",
  description:
    "Software engineer. Full-stack development, production systems, and game dev.",
  icons: {
    icon: "/favicon.ico",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className="scroll-smooth">
      <body className={`${plexMono.variable} ${plexSans.variable} antialiased`}>
        <MatrixRain />
        <Navbar />
        <main className="min-h-screen">
          {children}
        </main>
        <SpeedInsights />
      </body>
    </html>
  );
}
