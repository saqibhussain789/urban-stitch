"use client";

import Image from "next/image";
import Link from "next/link";
import { useCartStore } from "@/store/cartStore";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";

export default function CartPage() {
  const { items, updateQuantity, removeItem, getTotal } = useCartStore();

  if (items.length === 0) {
    return (
      <div className="min-h-screen bg-white pt-10 pb-16">
        <div className="max-w-3xl mx-auto text-center px-4">
          <h1 className="text-3xl font-bold text-gray-900 mb-4">Your Cart is Empty</h1>
          <p className="text-gray-600 mb-8">Add items to your cart and they will appear here.</p>
          <Link href="/products" className="inline-flex items-center justify-center rounded-full bg-gray-900 px-8 py-3 text-white hover:bg-gray-800 transition">
            Browse Products
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white pt-10 pb-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-8 text-center">
          <h1 className="text-3xl font-bold text-gray-900">Your Cart</h1>
          <p className="text-gray-600">Review your selected items and proceed to checkout.</p>
        </div>

        <div className="grid gap-8 lg:grid-cols-[1.6fr_0.9fr]">
          <div className="space-y-4">
            {items.map((item) => (
              <Card key={item.id} className="p-4">
                <div className="flex flex-col gap-4 sm:flex-row sm:items-center">
                  <div className="relative h-28 w-28 shrink-0 overflow-hidden rounded-xl bg-gray-100">
                    <Image src={item.image} alt={item.title} fill className="object-cover" />
                  </div>
                  <div className="flex-1">
                    <h2 className="text-lg font-semibold text-gray-900">{item.title}</h2>
                    <p className="text-sm text-gray-600">{item.size} • {item.color}</p>
                    <div className="mt-3 flex flex-wrap items-center gap-2 text-sm text-gray-700">
                      <span>PKR {item.price.toLocaleString()}</span>
                      <span className="text-gray-400">•</span>
                      <span>{item.quantity} pcs</span>
                    </div>
                  </div>
                </div>

                <div className="mt-4 flex flex-wrap items-center gap-2">
                  <Button size="sm" variant="outline" onClick={() => updateQuantity(item.id, item.quantity - 1)}>-</Button>
                  <span className="w-12 text-center">{item.quantity}</span>
                  <Button size="sm" variant="outline" onClick={() => updateQuantity(item.id, item.quantity + 1)}>+</Button>
                  <Button size="sm" variant="destructive" onClick={() => removeItem(item.id)}>
                    Remove
                  </Button>
                </div>
              </Card>
            ))}
          </div>

          <div className="space-y-6">
            <Card className="p-6">
              <div className="space-y-4">
                <div>
                  <h2 className="text-xl font-semibold text-gray-900">Order Summary</h2>
                  <p className="text-gray-600">Review your cart total before checkout.</p>
                </div>
                <div className="flex items-center justify-between text-lg text-gray-900">
                  <span>Subtotal</span>
                  <span>PKR {getTotal().toLocaleString()}</span>
                </div>
                <div className="text-sm text-gray-500">
                  Shipping and taxes calculated at checkout.
                </div>
                <Button asChild className="w-full py-4">
                  <Link href="/checkout">Proceed to Checkout</Link>
                </Button>
              </div>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}
