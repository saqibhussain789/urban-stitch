"use client";

import { useState, useEffect } from "react";
import { Menu, X, Search, User, ShoppingCart, ChevronRight } from "lucide-react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { useCartStore } from "@/store/cartStore";
import { useRouter } from "next/navigation";
import CartSheet from "@/components/layout/cart-sheet";
import SearchSheet from "@/components/layout/search-sheet";
import { useUiStore } from "@/store/uiStore";

interface SubMenuItem {
  name: string;
  href: string;
}

interface NavLink {
  name: string;
  href?: string;
  isSale?: boolean;
  subMenu?: SubMenuItem[];
}

export default function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [expandedSection, setExpandedSection] = useState<string | null>(null);
  const [isScrolled, setIsScrolled] = useState(false);
  const { getItemCount } = useCartStore();
  const { isCartOpen, isSearchOpen, setCartOpen, setSearchOpen } = useUiStore();
  const cartCount = getItemCount();
  const router = useRouter();

  const toggleMenu = () => setMenuOpen(!menuOpen);

  const iconColor = isScrolled
    ? "text-black"
    : "text-white drop-shadow-[0_1px_8px_rgba(0,0,0,0.45)]";

  const navLinks: NavLink[] = [
    { name: "MEN", href: "/men" },
    { name: "SALE", href: "/sale", isSale: true },
    { name: "TRACK ORDER", href: "/track-order" },
  ];

  // Toggle submenu expansion
  const toggleSection = (sectionName: string) => {
    setExpandedSection(expandedSection === sectionName ? null : sectionName);
  };

  // Prevent body scroll when menu is open
  useEffect(() => {
    if (menuOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }
    return () => {
      document.body.style.overflow = "unset";
    };
  }, [menuOpen]);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 24);
    };

    handleScroll();
    window.addEventListener("scroll", handleScroll, { passive: true });

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return (
    <>
      {/* Backdrop overlay */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3, ease: "easeInOut" }}
            className="fixed inset-0 bg-black/50 z-40"
            onClick={() => setMenuOpen(false)}
          />
        )}
      </AnimatePresence>

      {/* Top Announcement Bar - Scrolling */}
      <div className="bg-[#1F7A63] text-white text-[10px] md:text-sm py-2.5 overflow-hidden fixed top-0 w-full z-50">
        <div className="flex animate-marquee whitespace-nowrap">
          {[...Array(3)].map((_, i) => (
            <div key={i} className="shrink-0">
              <span className="inline-block px-4">
                ✨ 100% ORIGINAL PRODUCTS • FREE SHIPPING ON ORDERS OVER PKR 5000 •
                BALOCH FABRICS - EMPOWERING STYLE • AUTHENTIC BRANDED PRODUCTS ✨ ||
              </span>
            </div>
          ))}
        </div>
      </div>

      {/* Second Announcement Bar - Static */}
      <div className="bg-white text-center py-2.5 text-sm text-gray-700 border-b shadow-sm fixed top-10 w-full z-50">
        Free Shipping Over PKR 5000
      </div>

      {/* Main Header - Transparent & Sticky */}
      <motion.header
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
        className={`fixed top-[80px] left-0 w-full z-50 transition-all duration-500 ${
          isScrolled
            ? "bg-white/72 shadow-md shadow-black/5 backdrop-blur-md"
            : "bg-transparent"
        }`}
      >
        <div className="w-full mx-auto px-2">
          <div className="flex items-center justify-between h-20 md:h-24">
            {/* Left Section: Menu + Logo */}
            <div className="flex items-center gap-3 md:gap-4">
              <motion.button
                whileTap={{ scale: 0.9 }}
                whileHover={{ scale: 1.05 }}
                className="p-2.5 rounded-lg transition-all duration-300 group"
                onClick={toggleMenu}
                aria-label="Toggle Menu"
              >
                <Menu
                  className={`w-6 h-6 md:w-7 md:h-7 transition-transform group-hover:scale-110 ${iconColor}`}
                />
              </motion.button>

              <Link href="/" className="flex flex-col">
                <span className={`text-xl md:text-2xl font-bold tracking-[0.2em] transition-colors duration-300 ${isScrolled ? "text-slate-900" : "text-white"}`}>BALOCH</span>
                <span className={`text-[8px] md:text-[10px] tracking-[0.3em] font-semibold -mt-1 uppercase transition-colors duration-300 ${isScrolled ? "text-[#1F7A63]" : "text-white/80"}`}>Fabrics</span>
              </Link>
            </div>

            {/* Right Section: Icons */}
            <div className="flex items-center gap-2 md:gap-3">
              <motion.button
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.95 }}
                className="p-2.5 rounded-lg transition-all duration-300 group"
                aria-label="Search"
                onClick={() => setSearchOpen(true)}
              >
                <Search
                  className={`w-5 h-5 md:w-6 md:h-6 transition-colors ${iconColor}`}
                />
              </motion.button>

              <motion.button
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.95 }}
                className="p-2.5 rounded-lg transition-all duration-300 group"
                aria-label="User Account"
                onClick={() => router.push("/admin/login")}
              >
                <User
                  className={`w-5 h-5 md:w-6 md:h-6 transition-colors ${iconColor}`}
                />
              </motion.button>

              <motion.button
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.95 }}
                className="p-2.5 rounded-lg transition-all duration-300 relative group"
                aria-label="Shopping Cart"
                onClick={() => setCartOpen(true)}
              >
                <ShoppingCart
                  className={`w-5 h-5 md:w-6 md:h-6 transition-colors ${iconColor}`}
                />
                <AnimatePresence>
                  {cartCount > 0 && (
                    <motion.span
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      exit={{ scale: 0 }}
                      className="absolute -top-1 -right-1 bg-[#1F7A63] text-white text-[10px] md:text-xs rounded-full w-5 h-5 flex items-center justify-center font-bold shadow-lg ring-2 ring-white/50"
                    >
                      {cartCount > 99 ? "99+" : cartCount}
                    </motion.span>
                  )}
                </AnimatePresence>
              </motion.button>
            </div>
          </div>
        </div>
      </motion.header>

      {/* Mobile Sidebar Menu */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            initial={{ x: "-100%" }}
            animate={{ x: 0 }}
            exit={{ x: "-100%" }}
            transition={{
              duration: 0.4,
              ease: [0.4, 0, 0.2, 1],
            }}
            className="fixed top-0 left-0 h-full w-80 bg-white shadow-2xl z-[60] overflow-y-auto"
          >
            <div className="h-1 bg-linear-to-r from-[#1F7A63] via-[#4f9a7f] to-[#1F7A63]" />

            <div className="p-6">
              <div className="flex items-center justify-between mb-8 pb-4 border-b border-gray-100">
                <div className="flex flex-col">
                  <span className="text-xl font-bold tracking-[0.2em] text-slate-900">BALOCH</span>
                  <span className="text-[10px] tracking-[0.3em] text-[#1F7A63] font-semibold -mt-1 uppercase">Fabrics</span>
                </div>
                <motion.button
                  whileHover={{ scale: 1.1, rotate: 90 }}
                  whileTap={{ scale: 0.9 }}
                  transition={{ duration: 0.2 }}
                  onClick={() => setMenuOpen(false)}
                  className="p-2 rounded-lg hover:bg-gray-100 transition-colors"
                >
                  <X className="w-6 h-6 text-gray-600" />
                </motion.button>
              </div>

              <nav className="flex flex-col space-y-1">
                {navLinks.map((link, index) => (
                  <motion.div
                    key={link.name}
                    initial={{ x: -30, opacity: 0 }}
                    animate={{ x: 0, opacity: 1 }}
                    exit={{ x: -30, opacity: 0 }}
                    transition={{
                      delay: 0.05 * index,
                      duration: 0.3,
                      ease: "easeOut",
                    }}
                  >
                    <Link
                      href={link.href || "#"}
                      onClick={() => setMenuOpen(false)}
                      className="group block relative px-4 py-3.5 text-gray-700 hover:text-[#1F7A63] rounded-lg transition-all duration-300 font-medium overflow-hidden"
                    >
                      <span className="absolute inset-0 bg-linear-to-r from-[#1F7A63]/5 to-transparent transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left rounded-lg" />
                      <span className={`relative flex items-center justify-between ${link.isSale ? "font-bold text-[#1F7A63]" : ""}`}>
                        {link.name}
                        <motion.span
                          initial={{ x: -5, opacity: 0 }}
                          whileHover={{ x: 0, opacity: 1 }}
                          className="text-[#1F7A63] opacity-0 group-hover:opacity-100 transition-all duration-300"
                        >
                          →
                        </motion.span>
                      </span>
                    </Link>
                  </motion.div>
                ))}
              </nav>

              <motion.div
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.2 }}
                className="mt-8 pt-6 border-t border-gray-100"
              >
                <div className="text-center text-sm text-gray-500">
                  <p className="font-medium text-[#1F7A63]">Shop with Confidence</p>
                  <p className="mt-1">100% Authentic Products</p>
                </div>
              </motion.div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <style jsx global>{`
        @keyframes marquee {
          0% { transform: translateX(0); }
          100% { transform: translateX(-33.333%); }
        }
        .animate-marquee {
          animation: marquee 15s linear infinite;
        }
      `}</style>
      <CartSheet open={isCartOpen} onOpenChange={setCartOpen} />
      <SearchSheet open={isSearchOpen} onOpenChange={setSearchOpen} />
    </>
  );
}
