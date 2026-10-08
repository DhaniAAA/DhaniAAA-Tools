import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

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
      <body className={`${inter.className} bg-black text-white min-h-screen`}>
        {children}
      </body>
    </html>
  );
}
