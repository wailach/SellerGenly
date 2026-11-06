import "./globals.css";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "SellerGenly — E-commerce Profit Intelligence",
  description: "AI-powered product analysis, profit calculation and product research."
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return <html lang="en"><body>{children}</body></html>;
}
