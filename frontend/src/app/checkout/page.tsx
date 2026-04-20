"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { useCartStore } from "@/store/cartStore";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { toast } from "sonner";
import { CheckCircle2, Lock } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { placeOrder } from "@/lib/api";

export default function CheckoutPage() {
  const router = useRouter();
  const { items, getTotal, clearCart } = useCartStore();
  const [fullName, setFullName] = useState("");
  const [phone, setPhone] = useState("");
  const [address, setAddress] = useState("");
  const [city, setCity] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleOrder = async () => {
    if (!fullName || !phone || !address || !city) {
      toast.error("Please fill in all delivery details.");
      return;
    }
    if (items.length === 0) {
      toast.error("Your cart is empty.");
      return;
    }

    setIsSubmitting(true);
    try {
      const response = await placeOrder({
        fullName,
        phone,
        address,
        city,
        items: items.map((item) => ({
          productVariantId: item.variantId,
          quantity: item.quantity,
        })),
      });

      clearCart();
      toast.success("Order placed successfully! We will contact you shortly.");
      router.push(`/checkout/success?trackingId=${response.trackingId}`);
    } catch (error: unknown) {
      const message = error instanceof Error ? error.message : "Failed to place order";
      toast.error(message);
    } finally {
      setIsSubmitting(false);
    }
  };

  if (items.length === 0) {
    return (
      <div className="min-h-[70vh] flex flex-col items-center justify-center bg-gray-50 px-4">
        <h1 className="text-3xl font-serif text-gray-900 mb-4">Your cart is empty</h1>
        <p className="text-gray-500 mb-8 max-w-md text-center">
          Looks like you haven't added anything to your cart yet. Explore our collections and find something you love.
        </p>
        <Button asChild className="rounded-full px-8 py-6 text-base font-medium tracking-wide bg-gray-900 hover:bg-gray-800">
          <Link href="/products">Continue Shopping</Link>
        </Button>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white">
      <div className="border-b border-gray-100 bg-gray-50/50 py-4">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between">
          <Link href="/cart" className="text-sm text-gray-500 hover:text-gray-900 transition-colors flex items-center gap-1 font-medium">
             Return to Cart
          </Link>
          <div className="flex items-center gap-2 text-primary font-medium text-sm">
            <Lock className="w-4 h-4" />
            <span>Secure Checkout</span>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 md:py-20">
        <div className="grid gap-12 lg:grid-cols-[1.5fr_1fr] items-start">
          
          {/* Left Column: Form */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <div className="mb-10">
              <h1 className="text-4xl font-serif text-gray-900 mb-2">Checkout</h1>
              <p className="text-gray-500 font-light text-lg">Please enter your delivery details.</p>
            </div>

            <div className="space-y-10">
              <section>
                <h2 className="text-xl font-medium text-gray-900 mb-6 flex items-center gap-3">
                  <span className="flex items-center justify-center w-8 h-8 rounded-full bg-gray-100 text-sm font-semibold">1</span>
                  Delivery Information
                </h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-5 pl-11">
                  <div className="space-y-1 md:col-span-2">
                    <label className="text-sm font-medium text-gray-700">Full Name</label>
                    <Input
                      value={fullName}
                      onChange={(e) => setFullName(e.target.value)}
                      placeholder="Jane Doe"
                      className="h-12 bg-gray-50 border-gray-200 focus:bg-white transition-colors"
                    />
                  </div>
                  <div className="space-y-1">
                    <label className="text-sm font-medium text-gray-700">Phone Number</label>
                    <Input
                      value={phone}
                      onChange={(e) => setPhone(e.target.value)}
                      placeholder="+92 300 1234567"
                      className="h-12 bg-gray-50 border-gray-200 focus:bg-white transition-colors"
                    />
                  </div>
                  <div className="space-y-1">
                    <label className="text-sm font-medium text-gray-700">City</label>
                    <Input
                      value={city}
                      onChange={(e) => setCity(e.target.value)}
                      placeholder="Lahore"
                      className="h-12 bg-gray-50 border-gray-200 focus:bg-white transition-colors"
                    />
                  </div>
                  <div className="space-y-1 md:col-span-2">
                    <label className="text-sm font-medium text-gray-700">Complete Address</label>
                    <Input
                      value={address}
                      onChange={(e) => setAddress(e.target.value)}
                      placeholder="House 123, Street 4, Phase 5..."
                      className="h-12 bg-gray-50 border-gray-200 focus:bg-white transition-colors"
                    />
                  </div>
                </div>
              </section>

              <section>
                <h2 className="text-xl font-medium text-gray-900 mb-6 flex items-center gap-3">
                  <span className="flex items-center justify-center w-8 h-8 rounded-full bg-gray-100 text-sm font-semibold">2</span>
                  Payment Method
                </h2>
                <div className="pl-11">
                  <div className="border border-primary bg-primary/5 rounded-xl p-5 flex items-start gap-4">
                     <CheckCircle2 className="w-5 h-5 text-primary mt-0.5" />
                     <div>
                       <h3 className="font-semibold text-gray-900">Cash on Delivery (COD)</h3>
                       <p className="text-sm text-gray-600 mt-1">Pay with cash upon delivery. Currently, this is the only supported payment method.</p>
                     </div>
                  </div>
                </div>
              </section>
            </div>
          </motion.div>

          {/* Right Column: Order Summary */}
          <motion.div 
             initial={{ opacity: 0, y: 20 }}
             animate={{ opacity: 1, y: 0 }}
             transition={{ duration: 0.5, delay: 0.1 }}
             className="bg-gray-50 rounded-2xl p-8 sticky top-24"
          >
            <h2 className="text-2xl font-serif text-gray-900 mb-8">Order Summary</h2>

            <div className="space-y-6 mb-8 max-h-[40vh] overflow-y-auto pr-2 custom-scrollbar">
              {items.map((item) => (
                <div key={item.id} className="flex gap-4">
                  <div className="relative w-20 h-24 rounded-lg overflow-hidden bg-white shrink-0 border border-gray-100">
                    <Image src={item.image} alt={item.title} fill className="object-cover" />
                    <div className="absolute -top-2 -right-2 bg-gray-900 text-white w-6 h-6 flex items-center justify-center rounded-full text-xs font-bold z-10 border-2 border-white">
                      {item.quantity}
                    </div>
                  </div>
                  <div className="flex-1 flex flex-col justify-center">
                    <h3 className="font-medium text-gray-900 line-clamp-1">{item.title}</h3>
                    <p className="text-sm text-gray-500 mt-1">{item.size} / {item.color}</p>
                    <p className="font-medium text-gray-900 mt-1">PKR {item.price.toLocaleString()}</p>
                  </div>
                </div>
              ))}
            </div>

            <div className="border-t border-gray-200 pt-6 space-y-4">
               <div className="flex justify-between text-gray-600">
                 <span>Subtotal</span>
                 <span>PKR {getTotal().toLocaleString()}</span>
               </div>
               <div className="flex justify-between text-gray-600">
                 <span>Shipping</span>
                 <span className="text-primary font-medium">Free</span>
               </div>
               <div className="flex justify-between items-center text-xl font-bold text-gray-900 pt-4 border-t border-gray-200">
                 <span>Total</span>
                 <span>PKR {getTotal().toLocaleString()}</span>
               </div>
            </div>

            <Button
              onClick={handleOrder}
              disabled={isSubmitting}
              className="w-full mt-8 py-6 text-base rounded-xl bg-gray-900 hover:bg-gray-800 text-white font-medium tracking-wide disabled:opacity-60"
            >
              {isSubmitting ? "Placing Order..." : "Complete Order"}
            </Button>
            
            <p className="mt-6 text-center text-xs text-gray-400">
              By placing your order you agree to our Terms & Conditions and Privacy Policy.
            </p>
          </motion.div>
        </div>
      </div>
    </div>
  );
}
