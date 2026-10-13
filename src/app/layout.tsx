import type { Metadata } from "next";
import { Cascadia_Mono } from "next/font/google";
import "./globals.css";
import TmuxBar from "@/components/shell/TmuxBar";
import CmdlineRow from "@/components/shell/CmdlineRow";
import KeyProvider from "@/components/keys/KeyProvider";
import { SpeedInsights } from '@vercel/speed-insights/next';
import { SITE_DESCRIPTION, SITE_NAME, SITE_URL } from "@/lib/site";

const cascadia = Cascadia_Mono({
  subsets: ["latin"],
  variable: "--font-cascadia",
});

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: `${SITE_NAME} | Software Engineer`,
    template: `%s | ${SITE_NAME}`,
  },
  description: SITE_DESCRIPTION,
  icons: {
    icon: "/favicon.ico",
  },
  twitter: {
    card: "summary_large_image",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className={`${cascadia.variable} scroll-smooth`}>
      <body className="antialiased">
        <a
          href="#content"
          className="sr-only focus:not-sr-only focus:fixed focus:left-2 focus:top-2 focus:z-50 focus:bg-bg focus:px-3 focus:py-2 focus:text-fg-strong"
        >
          Skip to content
        </a>
        <KeyProvider>
          {/* From md up the screen is fixed like a terminal: bars stay put and panes scroll. */}
          <div className="flex min-h-dvh flex-col md:h-dvh md:min-h-0">
            <TmuxBar />
            <main id="content" className="flex flex-1 flex-col md:min-h-0">
              {children}
            </main>
            <CmdlineRow />
          </div>
        </KeyProvider>
        <SpeedInsights />
      </body>
    </html>
  );
}
