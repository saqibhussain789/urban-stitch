"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";

const categories = [
  {
    title: "Men's Collection",
    href: "/men",
    image: "https://images.unsplash.com/photo-1617137968427-85924c800a22?w=800&q=80",
    className: "md:col-span-2 md:row-span-2",
  },
  {
    title: "Women's Collection",
    href: "/women",
    image: "https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?w=800&q=80",
    className: "md:col-span-1 md:row-span-1",
  },
  {
    title: "Unisex Essentials",
    href: "/unisex",
    image: "https://images.unsplash.com/photo-1574015974293-817f0ebebb74?w=800&q=80",
    className: "md:col-span-1 md:row-span-1",
  },
];

export default function HomeCategories() {
  return (
    <section className="py-16 md:py-24 bg-white overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col items-center mb-12 sm:mb-16">
          <span className="text-xs tracking-[0.2em] uppercase text-gray-500 mb-4 block">Categories</span>
          <h2 className="text-4xl md:text-5xl font-light text-gray-900 tracking-tight text-center">
            Shop by Department
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 md:grid-rows-2 gap-4 h-auto md:h-[600px]">
          {categories.map((category, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              className={`group relative overflow-hidden rounded-xl ${category.className} min-h-[300px] bg-gray-100`}
            >
              <Link href={category.href} className="absolute inset-0 block w-full h-full">
                <Image
                  src={category.image}
                  alt={category.title}
                  fill
                  className="object-cover transition-transform duration-700 group-hover:scale-105"
                  sizes="(max-width: 768px) 100vw, 50vw"
                />
                <div className="absolute inset-0 bg-black/20 group-hover:bg-black/30 transition-colors duration-500" />
                <div className="absolute inset-0 flex flex-col items-center justify-center p-6 text-center">
                  <h3 className="text-3xl font-bold tracking-tight text-white mb-4">
                    {category.title}
                  </h3>
                  <div className="inline-flex items-center gap-2 border border-white/50 text-white px-6 py-3 rounded-full hover:bg-white hover:text-black transition-all duration-300 transform translate-y-4 opacity-0 group-hover:translate-y-0 group-hover:opacity-100">
                    <span className="text-sm font-medium tracking-wider uppercase">Shop Now</span>
                  </div>
                </div>
              </Link>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
