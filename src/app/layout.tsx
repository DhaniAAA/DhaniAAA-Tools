import type { Metadata } from "next";
import { Space_Grotesk, JetBrains_Mono } from "next/font/google";
import "./globals.css";

const display = Space_Grotesk({ subsets: ["latin"], weight: ["500", "700"] });
const mono = JetBrains_Mono({ subsets: ["latin"], variable: "--font-brutal-mono" });

const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://www.dhaniaa.my.id";

export const metadata: Metadata = {
  metadataBase: new URL(baseUrl),
  title: "DhaniAAA - Portfolio",
  description:
    "Portfolio DhaniAAA - Developer & Creator. Berbagai project web development, Python tools, dan aplikasi.",
  verification: {
    google: "tVmuhNE0prRcZEjLAIHTaIEgRDMNhNCGJnHdQf-0qdA",
  },
  icons: {
    icon: "/assets/img/favicon.svg",
    shortcut: "/favicon.ico",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${display.className} ${mono.variable} bg-[#0A0A0A] text-[#F4F4F0] min-h-screen antialiased`}>
        {children}
      </body>
    </html>
  );
}
