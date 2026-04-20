"use client";

import { usePathname } from "next/navigation";
import Navbar from "@/components/layout/navbar";
import Footer from "@/components/layout/footer";

export default function LayoutWrapper({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  const isHomePage = pathname === "/";
  const isAdmin = pathname.startsWith("/admin");
  const contentOffsetClass = !isHomePage && !isAdmin ? "pt-[10rem] md:pt-[11rem]" : "";

  if (isAdmin) {
    return (
      <main className="flex-1">
        {children}
      </main>
    );
  }

  return (
    <>
      <Navbar />
      <main className={`flex-1 ${contentOffsetClass}`}>
        {children}
      </main>
      <Footer />
    </>
  );
}
