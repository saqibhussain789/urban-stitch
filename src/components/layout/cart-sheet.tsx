"use client";

import Image from "next/image";
import Link from "next/link";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";
import { useCartStore } from "@/store/cartStore";

interface CartSheetProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export default function CartSheet({ open, onOpenChange }: CartSheetProps) {
  const { items, updateQuantity, removeItem, getTotal } = useCartStore();

  return (
    <Sheet open={open} onOpenChange={onOpenChange}>
      <SheetContent
        side="right"
        className="w-full max-w-md border-l border-slate-200 bg-white p-0"
      >
        <SheetHeader className="border-b border-slate-200 px-6 py-5">
          <SheetTitle className="text-xl font-semibold text-slate-900">
            Your Cart
          </SheetTitle>
          <SheetDescription>
            Review your items and continue to checkout.
          </SheetDescription>
        </SheetHeader>

        {items.length === 0 ? (
          <div className="flex min-h-[calc(100vh-7rem)] flex-col items-center justify-center px-6 pb-10 text-center">
            <div className="max-w-xs space-y-4">
              <h3 className="text-lg font-semibold text-slate-900">
                Your cart is empty
              </h3>
              <p className="text-sm leading-6 text-slate-600">
                Add products to your cart and they will appear here instantly.
              </p>
              <Button asChild className="w-full">
                <Link href="/products" onClick={() => onOpenChange(false)}>
                  Browse products
                </Link>
              </Button>
            </div>
          </div>
        ) : (
          <>
            <div className="max-h-[calc(100vh-13rem)] flex-1 overflow-y-auto px-6 py-5">
              <div className="space-y-4">
                {items.map((item) => (
                  <div
                    key={item.id}
                    className="rounded-2xl border border-slate-200 bg-slate-50 p-4"
                  >
                    <div className="flex gap-4">
                      <div className="relative h-24 w-20 shrink-0 overflow-hidden rounded-xl bg-slate-200">
                        <Image
                          src={item.image}
                          alt={item.title}
                          fill
                          className="object-cover"
                        />
                      </div>

                      <div className="min-w-0 flex-1">
                        <div className="flex items-start justify-between gap-3">
                          <div>
                            <p className="line-clamp-2 font-medium text-slate-900">
                              {item.title}
                            </p>
                            <p className="mt-1 text-sm text-slate-500">
                              {item.size} / {item.color}
                            </p>
                          </div>
                          <button
                            type="button"
                            onClick={() => removeItem(item.id)}
                            className="text-xs font-medium text-slate-500 transition hover:text-slate-900"
                          >
                            Remove
                          </button>
                        </div>

                        <div className="mt-4 flex items-center justify-between gap-3">
                          <div className="inline-flex items-center rounded-full border border-slate-200 bg-white">
                            <button
                              type="button"
                              className="px-3 py-2 text-sm text-slate-700"
                              onClick={() =>
                                updateQuantity(item.id, item.quantity - 1)
                              }
                            >
                              -
                            </button>
                            <span className="min-w-8 text-center text-sm font-medium text-slate-900">
                              {item.quantity}
                            </span>
                            <button
                              type="button"
                              className="px-3 py-2 text-sm text-slate-700"
                              onClick={() =>
                                updateQuantity(item.id, item.quantity + 1)
                              }
                            >
                              +
                            </button>
                          </div>

                          <p className="text-sm font-semibold text-slate-900">
                            PKR {(item.price * item.quantity).toLocaleString()}
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="border-t border-slate-200 bg-white px-6 py-5">
              <div className="mb-4 flex items-center justify-between text-sm text-slate-600">
                <span>Subtotal</span>
                <span className="text-lg font-semibold text-slate-900">
                  PKR {getTotal().toLocaleString()}
                </span>
              </div>

              <div className="space-y-3">
                <Button asChild className="w-full">
                  <Link href="/checkout" onClick={() => onOpenChange(false)}>
                    Checkout
                  </Link>
                </Button>
                <Button asChild variant="outline" className="w-full">
                  <Link href="/cart" onClick={() => onOpenChange(false)}>
                    View full cart
                  </Link>
                </Button>
              </div>
            </div>
          </>
        )}
      </SheetContent>
    </Sheet>
  );
}
