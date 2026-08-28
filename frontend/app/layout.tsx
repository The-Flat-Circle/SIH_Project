import type { Metadata } from "next";
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

export const metadata: Metadata = {
  title: "YATRA_FLOW // AI Smart Tourism & Crowd Optimization Engine (SIH 2026)",
  description: "Real-time CCTV crowd density estimation, 15-min congestion prediction, internal gate rerouting & external tourism redistribution platform for heritage & pilgrimage destinations.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${fraunces.variable} ${inter.variable} ${ibmPlexMono.variable}`}>
      <body className="bg-stone-charcoal text-parchment antialiased selection:bg-temple-gold selection:text-stone-charcoal">
        {children}
      </body>
    </html>
  );
}
