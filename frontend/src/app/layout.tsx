import type { Metadata } from "next";
import { Playfair_Display, Inter } from "next/font/google";
import "./globals.css";
import LayoutWrapper from "./LayoutWrapper";
import WhatsappButton from "../components/WhatsappButton";
import { Toaster } from "sonner";
import { ThemeProvider } from "@/context/ThemeContext";

const playfair = Playfair_Display({
  variable: "--font-playfair",
  subsets: ["latin"],
  display: "swap",
  weight: ["400", "500", "600", "700"],
});

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  display: "swap",
  weight: ["300", "400", "500", "600", "700"],
});

export const metadata: Metadata = {
  title: "Baloch Threads - Premium Clothing | Official Online Store",
  description:
    "Discover premium quality clothing at Baloch Threads. Shop the latest collections with fast shipping.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="scroll-smooth">
      <body
        className={`${playfair.variable} ${inter.variable} antialiased bg-white text-gray-900 min-h-screen flex flex-col overflow-x-hidden`}
      >
        <ThemeProvider>
            <LayoutWrapper>{children}</LayoutWrapper>
        </ThemeProvider>
        <Toaster />
        <WhatsappButton />
      </body>
    </html>
  );
}