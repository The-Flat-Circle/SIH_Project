import type { Metadata, Viewport } from "next";
import { Fraunces, Inter, IBM_Plex_Mono } from "next/font/google";
import "./globals.css";

const fraunces = Fraunces({
  subsets: ["latin"],
  variable: "--font-fraunces",
  display: "swap",
});

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

const ibmPlexMono = IBM_Plex_Mono({
  weight: ["400", "500", "600", "700"],
  subsets: ["latin"],
  variable: "--font-ibm-plex-mono",
  display: "swap",
});

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 1,
  userScalable: false,
  viewportFit: "cover",
  themeColor: "#FAF8F2",
};

export const metadata: Metadata = {
  title: "YATRA_FLOW // AI Smart Tourism & Crowd Optimization Engine (SIH 2026)",
  description: "Real-time CCTV crowd density estimation, 15-min congestion prediction, internal gate rerouting & external tourism redistribution platform for heritage & pilgrimage destinations.",
  manifest: "/manifest.json",
  appleWebApp: {
    capable: true,
    statusBarStyle: "black-translucent",
    title: "YatraFlow",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${fraunces.variable} ${inter.variable} ${ibmPlexMono.variable}`}>
      <body className="bg-[#FAF8F2] text-slate-800 antialiased selection:bg-yellow-300 selection:text-slate-900 min-h-screen w-full">
        {children}
      </body>
    </html>
  );
}
