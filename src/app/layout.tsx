import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import ParticlesBackground from "@/components/ParticlesBackground";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "DhaniAAA - Portfolio",
  description:
    "Portfolio DhaniAAA - Developer & Creator. Berbagai project web development, Python tools, dan aplikasi.",
  verification: {
    google: "VvtEIUx1VcrUjE7eNtjjW60419bpRYhOOvaCXV5x5cs",
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
        <ParticlesBackground />
        {children}
      </body>
    </html>
  );
}
