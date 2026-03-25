import type { Metadata } from "next";
import { Playfair_Display, Inter } from "next/font/google";
import "./globals.css";
import BottomNav from "@/components/BottomNav";
import RegisterServiceWorker from "./register-sw";
import { Analytics } from "@vercel/analytics/next";

const playfair = Playfair_Display({
  variable: "--font-heading",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  display: "swap",
});

const inter = Inter({
  variable: "--font-body",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "LocalCrawl - Old Soul, New City",
  description: "A themed neighborhood walking tour around Petaling Street and Merdeka 118, Kuala Lumpur",
  manifest: "/manifest.json",
  themeColor: "#C9A84C",
  appleWebApp: {
    capable: true,
    statusBarStyle: "black-translucent",
    title: "LocalCrawl",
  },
  viewport: {
    width: "device-width",
    initialScale: 1,
    maximumScale: 1,
    userScalable: false,
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${playfair.variable} ${inter.variable}`}>
      <head>
        <link rel="stylesheet" href="https://unpkg.com/leaflet@1.9.4/dist/leaflet.css" />
        <link rel="apple-touch-icon" href="/icon-192.png" />
      </head>
      <body className="antialiased pb-20">
        <RegisterServiceWorker />
        {children}
        <BottomNav />
        <Analytics />
      </body>
    </html>
  );
}
