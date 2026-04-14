"use client";

import { useDeferredValue, useMemo, useState } from "react";
import Link from "next/link";
import { Search, TrendingUp } from "lucide-react";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet";
import { Input } from "@/components/ui/input";
import { products } from "@/lib/data";

interface SearchSheetProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

const quickLinks = ["New arrivals", "Hoodies", "Jackets", "Sale"];

export default function SearchSheet({
  open,
  onOpenChange,
}: SearchSheetProps) {
  const [query, setQuery] = useState("");
  const deferredQuery = useDeferredValue(query);

  const results = useMemo(() => {
    const normalizedQuery = deferredQuery.trim().toLowerCase();

    if (!normalizedQuery) {
      return products.slice(0, 4);
    }

    return products
      .filter((product) => {
        const searchText = [
          product.title,
          product.category,
          product.gender,
          product.description,
        ]
          .join(" ")
          .toLowerCase();

        return searchText.includes(normalizedQuery);
      })
      .slice(0, 6);
  }, [deferredQuery]);

  const handleClose = () => {
    onOpenChange(false);
    setQuery("");
  };

  const handleOpenChange = (nextOpen: boolean) => {
    onOpenChange(nextOpen);

    if (!nextOpen) {
      setQuery("");
    }
  };

  return (
    <Sheet open={open} onOpenChange={handleOpenChange}>
      <SheetContent
        side="top"
        className="border-b border-slate-200 bg-white/95 px-0 pt-0 backdrop-blur-md"
      >
        <SheetHeader className="border-b border-slate-200 px-6 py-5 sm:px-8">
          <SheetTitle className="text-xl font-semibold text-slate-900">
            Search the collection
          </SheetTitle>
          <SheetDescription>
            Find products, categories, and new arrivals faster.
          </SheetDescription>
        </SheetHeader>

        <div className="mx-auto w-full max-w-5xl px-6 py-6 sm:px-8 sm:py-8">
          <div className="rounded-[1.75rem] border border-slate-200 bg-slate-50 p-3 shadow-sm">
            <div className="flex items-center gap-3">
              <div className="flex size-11 items-center justify-center rounded-full bg-white text-slate-500 shadow-sm">
                <Search className="h-5 w-5" />
              </div>
              <Input
                value={query}
                onChange={(event) => setQuery(event.target.value)}
                placeholder="Search hoodies, jackets, sale..."
                className="h-12 border-0 bg-transparent px-0 text-base shadow-none focus-visible:ring-0"
                autoFocus
              />
            </div>
          </div>

          <div className="mt-5 flex flex-wrap gap-2">
            {quickLinks.map((label) => (
              <button
                key={label}
                type="button"
                onClick={() => setQuery(label)}
                className="rounded-full border border-slate-200 bg-white px-4 py-2 text-sm text-slate-700 transition hover:border-slate-300 hover:bg-slate-50"
              >
                {label}
              </button>
            ))}
          </div>

          <div className="mt-8 grid gap-4 sm:grid-cols-2">
            {results.length > 0 ? (
              results.map((product) => (
                <Link
                  key={product.id}
                  href={`/products/${product.id}`}
                  onClick={handleClose}
                  className="group rounded-[1.5rem] border border-slate-200 bg-white p-5 transition hover:-translate-y-0.5 hover:border-slate-300 hover:shadow-md"
                >
                  <div className="flex items-start justify-between gap-4">
                    <div>
                      <p className="text-xs uppercase tracking-[0.24em] text-slate-500">
                        {product.category}
                      </p>
                      <h3 className="mt-2 text-lg font-semibold text-slate-900 transition group-hover:text-slate-700">
                        {product.title}
                      </h3>
                      <p className="mt-2 line-clamp-2 text-sm leading-6 text-slate-600">
                        {product.description}
                      </p>
                    </div>
                    <p className="shrink-0 text-sm font-semibold text-slate-900">
                      PKR {product.price.toLocaleString()}
                    </p>
                  </div>
                </Link>
              ))
            ) : (
              <div className="rounded-[1.5rem] border border-dashed border-slate-300 bg-slate-50 p-8 text-sm text-slate-600 sm:col-span-2">
                No matching products found. Try another keyword.
              </div>
            )}
          </div>

          <div className="mt-8 flex items-center gap-2 text-sm text-slate-500">
            <TrendingUp className="h-4 w-4" />
            Popular right now: New, Sale, Hoodies
          </div>
        </div>
      </SheetContent>
    </Sheet>
  );
}
