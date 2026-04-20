"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Grid3x3, LayoutGrid, SlidersHorizontal, X } from "lucide-react";
import ProductCard from "@/components/ui/product-card";
import { ApiProduct } from "@/lib/api";

interface CategoryPageTemplateProps {
  title: string;
  subtitle: string;
  description: string;
  products: ApiProduct[];
}

export default function CategoryPageTemplate({
  title,
  subtitle,
  description,
  products,
}: CategoryPageTemplateProps) {
  const [grid, setGrid] = useState<2 | 4>(4);
  const [filterOpen, setFilterOpen] = useState(false);

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900">
      <section className="border-b border-slate-200 bg-white py-12 md:py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl">
            <p className="text-sm uppercase tracking-[0.3em] text-slate-500 font-semibold">
              {subtitle}
            </p>
            <h1 className="mt-4 text-4xl font-serif md:font-light text-slate-900 sm:text-6xl">
              {title}
            </h1>
            <p className="mt-6 text-lg text-slate-600 leading-relaxed font-light">
              {description}
            </p>
          </div>
        </div>
      </section>

      <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
        <div className="mb-8 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <button
            type="button"
            onClick={() => setFilterOpen(true)}
            className="inline-flex items-center gap-2 rounded-full border border-slate-200 bg-white px-5 py-2.5 text-sm font-medium text-slate-900 transition hover:bg-slate-100 shadow-sm"
          >
            <SlidersHorizontal className="h-4 w-4" />
            Filters
          </button>

          <div className="inline-flex items-center gap-1 rounded-full border border-slate-200 bg-white p-1 shadow-sm">
            <button
              type="button"
              onClick={() => setGrid(4)}
              className={`inline-flex h-9 w-9 items-center justify-center rounded-full transition ${
                grid === 4
                  ? "bg-slate-900 text-white"
                  : "text-slate-500 hover:bg-slate-100"
              }`}
              aria-label="4 column grid"
            >
              <Grid3x3 className="h-4 w-4" />
            </button>
            <button
              type="button"
              onClick={() => setGrid(2)}
              className={`inline-flex h-9 w-9 items-center justify-center rounded-full transition ${
                grid === 2
                  ? "bg-slate-900 text-white"
                  : "text-slate-500 hover:bg-slate-100"
              }`}
              aria-label="2 column grid"
            >
              <LayoutGrid className="h-4 w-4" />
            </button>
          </div>
        </div>

        {products.length > 0 ? (
          <div
            className={`grid gap-6 ${
              grid === 4
                ? "grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4"
                : "grid-cols-1 sm:grid-cols-2"
            }`}
          >
            {products.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        ) : (
          <div className="text-center py-24">
            <p className="text-lg text-slate-500">No products found for this category at the moment.</p>
          </div>
        )}
      </div>

      <AnimatePresence>
        {filterOpen && (
          <>
            <motion.div
              className="fixed inset-0 bg-black/40 z-40 backdrop-blur-sm"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setFilterOpen(false)}
            />
            <motion.div
              className="fixed right-0 top-0 z-50 h-full w-full max-w-md overflow-y-auto bg-white p-8 shadow-2xl"
              initial={{ x: "100%", opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              exit={{ x: "100%", opacity: 0 }}
              transition={{ duration: 0.3, ease: [0.25, 0.4, 0.25, 1] }}
            >
              <div className="flex items-center justify-between border-b pb-6 mb-8">
                <div>
                  <p className="text-xs uppercase tracking-[0.3em] text-slate-500 font-semibold mb-1">
                    Filters
                  </p>
                  <h2 className="text-2xl font-serif text-slate-900">
                    Refine Options
                  </h2>
                </div>
                <button
                  type="button"
                  onClick={() => setFilterOpen(false)}
                  className="rounded-full p-2 text-slate-500 transition hover:bg-slate-100 bg-slate-50"
                  aria-label="Close filters"
                >
                  <X className="h-5 w-5" />
                </button>
              </div>

              <div className="space-y-8">
                <div>
                  <h3 className="text-sm font-semibold text-slate-900 uppercase tracking-widest mb-4">
                    Category
                  </h3>
                  <div className="flex flex-wrap gap-2">
                    {["T-Shirts", "Jackets", "Jeans", "Hoodies"].map((name) => (
                      <button
                        key={name}
                        type="button"
                        className="rounded-full border border-slate-200 bg-white px-5 py-2 text-sm text-slate-600 transition hover:bg-slate-900 hover:text-white"
                      >
                        {name}
                      </button>
                    ))}
                  </div>
                </div>

                <div>
                  <h3 className="text-sm font-semibold text-slate-900 uppercase tracking-widest mb-4">
                    Sort by
                  </h3>
                  <div className="flex flex-col gap-2">
                    {["Newest", "Price: Low to High", "Price: High to Low"].map(
                      (option) => (
                        <button
                          key={option}
                          type="button"
                          className="rounded-lg border border-slate-200 bg-white px-5 py-3 text-left text-sm text-slate-600 transition hover:bg-slate-50 font-medium"
                        >
                          {option}
                        </button>
                      )
                    )}
                  </div>
                </div>
              </div>
              <div className="mt-12">
                 <button className="w-full bg-slate-900 text-white rounded-full py-4 font-semibold tracking-wide hover:bg-slate-800 transition-colors" onClick={() => setFilterOpen(false)}>Apply Filters</button>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </div>
  );
}
