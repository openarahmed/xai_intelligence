// app/layout.tsx
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Navbar from "../app/components/shared/Navbar"; // Import korlam

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Xai Intelligence",
  description: "Transform Raw Data into Intelligence",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      {/* Background color black set kora hoyeche image er moto */}
      <body className={`${inter.className} bg-black text-white antialiased`}>
        <Navbar />
        {children}
      </body>
    </html>
  );
}
