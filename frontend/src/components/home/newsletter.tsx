"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { toast } from "sonner";
import { motion } from "framer-motion";

export default function Newsletter() {
  const [email, setEmail] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;
    toast.success("Thanks for subscribing!");
    setEmail("");
  };

  return (
    <section className="bg-gray-50 py-24">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
        >
          <span className="text-secondary-foreground text-sm uppercase tracking-widest block mb-4">Stay Connected</span>
          <h2 className="text-4xl md:text-5xl font-semibold text-gray-900 mb-6 font-serif">
            Join the Club
          </h2>
          <p className="text-lg text-gray-600 mb-10 max-w-2xl mx-auto">
            Subscribe to our newsletter and get 10% off your first purchase. Plus, be the first to know about new releases and exclusive offers.
          </p>

          <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row max-w-lg mx-auto gap-3">
            <Input
              type="email"
              placeholder="Enter your email address"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="bg-white border-gray-300 h-14 rounded-full px-6 flex-1 text-base focus-visible:ring-primary focus-visible:border-transparent"
            />
            <Button
              type="submit"
              className="h-14 px-8 rounded-full bg-gray-900 hover:bg-gray-800 text-white font-medium tracking-wide"
            >
              Subscribe
            </Button>
          </form>
          <p className="mt-4 text-xs text-gray-500">
            By subscribing, you agree to our Terms of Service and Privacy Policy.
          </p>
        </motion.div>
      </div>
    </section>
  );
}
