"use client";

import { useDeferredValue, useEffect, useMemo, useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import ProductCard from "@/components/ui/product-card";
import { fetchProducts, ApiProduct } from "@/lib/api";

const ALL_CATEGORIES = "All";

function mapGenderLabel(gender: string) {
  if (gender === "MEN") return "Men";
  if (gender === "WOMEN") return "Women";
  return "Unisex";
}

export default function ProductsPage() {
  const [products, setProducts] = useState<ApiProduct[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [selectedCategory, setSelectedCategory] = useState(ALL_CATEGORIES);
  const [query, setQuery] = useState("");
  const deferredQuery = useDeferredValue(query);

  useEffect(() => {
    fetchProducts()
      .then(setProducts)
      .catch(console.error)
      .finally(() => setIsLoading(false));
  }, []);

  const categories = useMemo(() => {
    const names = products
      .map((p) => p.category?.name)
      .filter(Boolean) as string[];
    return [ALL_CATEGORIES, ...Array.from(new Set(names))];
  }, [products]);

  const filteredProducts = useMemo(() => {
    const normalizedQuery = deferredQuery.trim().toLowerCase();
    return products.filter((product) => {
      const matchesCategory =
        selectedCategory === ALL_CATEGORIES ||
        product.category?.name === selectedCategory;
      const matchesQuery =
        normalizedQuery.length === 0 ||
        [
          product.title,
          product.description,
          product.category?.name ?? "",
          mapGenderLabel(product.gender),
        ]
          .join(" ")
          .toLowerCase()
          .includes(normalizedQuery);

      return matchesCategory && matchesQuery;
    });
  }, [deferredQuery, selectedCategory, products]);

  return (
    <div className="min-h-screen bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-8 pb-12">
        <div className="mb-8 rounded-[2rem] border border-slate-200 bg-slate-50 p-6 sm:p-8">
          <div className="grid gap-6 lg:grid-cols-[1fr_22rem] lg:items-end">
            <div>
              <p className="text-sm uppercase tracking-[0.3em] text-slate-500">
                Full catalog
              </p>
              <h1 className="mt-3 text-4xl font-semibold tracking-tight text-slate-900">
                Our Products
              </h1>
              <p className="mt-3 max-w-2xl text-lg text-slate-600">
                Explore premium essentials, elevated outerwear, and statement pieces.
              </p>
            </div>

            <Input
              value={query}
              onChange={(event) => setQuery(event.target.value)}
              placeholder="Search products..."
              className="h-12 rounded-full border-slate-200 bg-white px-5"
            />
          </div>
        </div>

        <div className="flex flex-wrap gap-2 mb-8 justify-center">
          {categories.map((category) => (
            <Button
              key={category}
              variant={selectedCategory === category ? "default" : "outline"}
              size="sm"
              className="rounded-full"
              onClick={() => setSelectedCategory(category)}
            >
              {category}
            </Button>
          ))}
        </div>

        {isLoading ? (
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {Array.from({ length: 8 }).map((_, i) => (
              <div
                key={i}
                className="h-80 rounded-[1.75rem] bg-slate-100 animate-pulse"
              />
            ))}
          </div>
        ) : filteredProducts.length === 0 ? (
          <div className="rounded-[2rem] border border-dashed border-slate-300 bg-slate-50 p-12 text-center text-slate-600">
            No products matched your search.
          </div>
        ) : (
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {filteredProducts.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
