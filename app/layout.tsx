import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: 'Personal Budget Calculator | Ali Raza',
  description: 'A clean and responsive personal budget calculator built with Next.js, TypeScript, and Tailwind CSS. Track your income and expenses with ease.',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`{inter.className} bg-black`}>{children}</body>
    </html>
  );
}
