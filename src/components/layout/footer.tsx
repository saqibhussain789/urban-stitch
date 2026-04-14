"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import {  Music2, User } from "lucide-react";

const quickLinks = [
  { name: "WINTER SALE UPTO 50% OFF", href: "/sale" },
  { name: "NEW IN", href: "/new" },
  { name: "BEST SELLERS", href: "/products" },
];

const customerService = [
  { name: "CONTACT US", href: "/contact" },
  { name: "ABOUT US", href: "/about" },
  { name: "BLOG", href: "/blog" },
  { name: "FAQS", href: "/faqs" },
  { name: "REFUND POLICY", href: "/refund-policy" },
  { name: "SHIPPING POLICY", href: "/shipping-policy" },
  { name: "PRIVACY POLICY", href: "/privacy-policy" },
  { name: "TERMS OF SERVICE", href: "/terms-of-service" },
];

const socialLinks = [
//   { icon: Facebook, href: "https://facebook.com", label: "Facebook" },
//   { icon: Instagram, href: "https://instagram.com", label: "Instagram" },
//   { icon: Youtube, href: "https://youtube.com", label: "YouTube" },
  { icon: Music2, href: "https://tiktok.com", label: "TikTok" },
  { icon: User, href: "https://pinterest.com", label: "Pinterest" },
];

export default function Footer() {
  return (
    <footer className="bg-[#111111] text-white py-16 px-6">
      <div className="mx-auto max-w-7xl">
        <div className="grid grid-cols-1 gap-12 md:grid-cols-3 md:gap-8">
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="space-y-4"
          >
            {quickLinks.map((link, index) => (
              <motion.div
                key={link.name}
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.4, delay: index * 0.08 }}
                viewport={{ once: true }}
              >
                <Link
                  href={link.href}
                  className="block text-sm md:text-base font-semibold tracking-wider uppercase hover:text-[#1F7A63] transition-colors duration-300"
                >
                  {link.name}
                </Link>
              </motion.div>
            ))}
          </motion.div>

          <motion.div
            initial={{ opacity: 0, scale: 0.92 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            viewport={{ once: true }}
            className="flex flex-col items-center justify-center space-y-8"
          >
            <div className="text-center">
              <div className="mb-4 text-3xl font-bold tracking-[0.4em] text-white">BALOCH</div>
              <p className="max-w-sm text-sm text-gray-300">
                Minimal premium clothing built for modern wardrobes and effortless style.
              </p>
            </div>

            <div className="flex gap-6 items-center">
              {socialLinks.map((social, index) => {
                const Icon = social.icon;
                return (
                  <motion.a
                    key={social.label}
                    href={social.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    initial={{ opacity: 0, y: 16 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.4, delay: 0.25 + index * 0.08 }}
                    viewport={{ once: true }}
                    whileHover={{ scale: 1.15, y: -2 }}
                    whileTap={{ scale: 0.95 }}
                    className="text-gray-300 hover:text-[#1F7A63] transition-colors duration-300"
                    aria-label={social.label}
                  >
                    <Icon className="w-6 h-6" />
                  </motion.a>
                );
              })}
            </div>

            <motion.p
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              transition={{ duration: 0.6, delay: 0.75 }}
              viewport={{ once: true }}
              className="text-xs md:text-sm text-gray-400 text-center"
            >
              © 2025 Baloch Threads. Crafted for premium streetwear.
            </motion.p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            viewport={{ once: true }}
            className="space-y-3 md:text-right"
          >
            {customerService.map((link, index) => (
              <motion.div
                key={link.name}
                initial={{ opacity: 0, x: 20 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.4, delay: index * 0.06 }}
                viewport={{ once: true }}
              >
                <Link
                  href={link.href}
                  className="block text-sm md:text-base font-semibold tracking-wider uppercase hover:text-[#1F7A63] transition-colors duration-300"
                >
                  {link.name}
                </Link>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </div>
    </footer>
  );
}
