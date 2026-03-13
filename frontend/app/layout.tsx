import "./globals.css";
import { Inter } from "next/font/google";
import { Barlow_Condensed } from "next/font/google";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
});

const barlow = Barlow_Condensed({
  subsets: ["latin"],
  weight: ["400", "600", "700"],
  variable: "--font-barlow",
});

export const metadata = {
  title: "FleetChain",
  description: "Enterprise Fleet Management powered by Blockchain & IoT",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={`${inter.variable} ${barlow.variable} bg-[#070E1A] text-white`}>
        {children}
      </body>
    </html>
  );
}