"use client";

import { useState } from "react";
import { 
  Search, 
  Package, 
  Truck, 
  CheckCircle2, 
  Clock, 
  AlertCircle,
  MapPin,
  Calendar,
  ChevronRight,
  ArrowRight,
  Loader2
} from "lucide-react";
import { fetchOrderByTrackingId, ApiOrder } from "@/lib/api";
import { motion, AnimatePresence } from "framer-motion";

export default function TrackOrderPage() {
  const [trackingId, setTrackingId] = useState("");
  const [order, setOrder] = useState<ApiOrder | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleTrack = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!trackingId.trim()) return;

    setLoading(true);
    setError("");
    setOrder(null);

    try {
      const data = await fetchOrderByTrackingId(trackingId.trim().toUpperCase());
      setOrder(data);
    } catch (err: any) {
      setError(err.message || "Could not find an order with that ID.");
    } finally {
      setLoading(false);
    }
  };

  const getStatusStep = (status: string) => {
    const steps = ["PENDING", "PROCESSING", "SHIPPED", "DELIVERED"];
    return steps.indexOf(status);
  };

  const currentStep = order ? getStatusStep(order.status) : -1;

  return (
    <div className="min-h-screen bg-[#F8FAFC] pb-20 pt-32">
      <div className="max-w-4xl mx-auto px-4">
        {/* Header */}
        <div className="text-center mb-12">
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            className="inline-flex items-center gap-2 px-4 py-2 bg-[#1F7A63]/10 text-[#1F7A63] rounded-full text-sm font-bold mb-4"
          >
            <Truck className="w-4 h-4" />
            Order Tracking Portal
          </motion.div>
          <h1 className="text-4xl md:text-5xl font-black text-slate-900 tracking-tight">Track Your Package</h1>
          <p className="text-slate-500 mt-4 text-lg">Enter your Reference ID (e.g., BF-XXXXXX) to see live status.</p>
        </div>

        {/* Search Bar */}
        <div className="max-w-2xl mx-auto mb-16">
          <form onSubmit={handleTrack} className="relative group">
            <div className="absolute inset-x-0 -bottom-2 h-full bg-[#1F7A63]/10 blur-2xl group-focus-within:bg-[#1F7A63]/20 transition-all rounded-full" />
            <div className="relative flex items-center bg-white rounded-full p-2 shadow-xl border border-slate-100">
              <Search className="ml-6 w-6 h-6 text-slate-400 group-focus-within:text-[#1F7A63] transition-colors" />
              <input
                type="text"
                placeholder="BF-XXXXXX"
                value={trackingId}
                onChange={(e) => setTrackingId(e.target.value)}
                className="flex-1 bg-transparent border-none px-4 py-4 text-lg font-bold text-slate-900 focus:ring-0 placeholder:text-slate-300 placeholder:font-normal"
              />
              <button
                type="submit"
                disabled={loading}
                className="bg-[#1F7A63] text-white px-8 py-4 rounded-full font-bold shadow-lg hover:scale-[1.05] active:scale-[0.95] transition-all disabled:opacity-50 flex items-center gap-2"
              >
                {loading ? <Loader2 className="w-5 h-5 animate-spin" /> : "Track Order"}
              </button>
            </div>
          </form>
          {error && (
            <motion.p 
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-center text-rose-500 font-bold mt-4 flex items-center justify-center gap-2"
            >
              <AlertCircle className="w-4 h-4" />
              {error}
            </motion.p>
          )}
        </div>

        {/* Results Area */}
        <AnimatePresence mode="wait">
          {order && (
            <motion.div
              key={order.id}
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="space-y-8"
            >
              {/* Status Stepper */}
              <div className="bg-white p-10 rounded-[3rem] shadow-sm border border-slate-100">
                <div className="flex flex-wrap items-center justify-between gap-6 mb-12">
                   <div>
                     <p className="text-[10px] font-bold text-slate-400 uppercase tracking-[0.2em] mb-1">Live Shipment Status</p>
                     <p className="text-2xl font-bold text-slate-900">Order is {order.status.toLowerCase()}</p>
                   </div>
                   <div className="text-right">
                     <p className="text-[10px] font-bold text-slate-400 uppercase tracking-[0.2em] mb-1">Estimated Arrival</p>
                     <p className="text-sm font-bold text-[#1F7A63]">Typically 3-5 Business Days</p>
                   </div>
                </div>

                <div className="relative px-2">
                  <div className="absolute top-5 left-0 w-full h-1 bg-slate-100 -z-1" />
                  <div 
                    className="absolute top-5 left-0 h-1 bg-[#1F7A63] transition-all duration-1000 -z-1" 
                    style={{ width: `${(currentStep / 3) * 100}%` }}
                  />
                  <div className="flex justify-between relative">
                    {[
                      { label: "Received", icon: Clock },
                      { label: "Processing", icon: Package },
                      { label: "Shipped", icon: Truck },
                      { label: "Delivered", icon: CheckCircle2 }
                    ].map((step, idx) => {
                      const Icon = step.icon;
                      const isActive = idx <= currentStep;
                      return (
                        <div key={idx} className="flex flex-col items-center gap-4 text-center">
                          <div className={`w-10 h-10 rounded-full flex items-center justify-center border-4 transition-all duration-500 shadow-sm ${
                            isActive ? "bg-[#1F7A63] border-[#1F7A63] text-white scale-125" : "bg-white border-slate-100 text-slate-300"
                          }`}>
                            <Icon className="w-5 h-5" />
                          </div>
                          <span className={`text-[10px] sm:text-xs font-bold uppercase tracking-widest ${
                            isActive ? "text-[#1F7A63]" : "text-slate-300"
                          }`}>{step.label}</span>
                        </div>
                      )
                    })}
                  </div>
                </div>
              </div>

              {/* Order Info Cards */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                 <div className="bg-white p-8 rounded-[2.5rem] shadow-sm border border-slate-100">
                    <h3 className="text-xs font-bold text-slate-400 uppercase tracking-widest mb-6 flex items-center gap-2">
                      <Package className="w-4 h-4" /> Item Summary
                    </h3>
                    <div className="space-y-4">
                      {order.orderItems.map((item, idx) => (
                        <div key={idx} className="flex items-center gap-4">
                           <div className="w-16 h-16 rounded-2xl bg-slate-50 border border-slate-100 overflow-hidden shrink-0">
                             {item.productVariant?.product?.images?.[0]?.url && (
                               <img src={item.productVariant.product.images[0].url} className="w-full h-full object-cover" />
                             )}
                           </div>
                           <div className="flex-1">
                             <p className="text-sm font-bold text-slate-900 line-clamp-1">{item.productVariant.product.title}</p>
                             <p className="text-[10px] font-bold text-slate-400 uppercase tracking-tighter mt-0.5">{item.productVariant.size} • {item.productVariant.color} • Qty: {item.quantity}</p>
                           </div>
                        </div>
                      ))}
                      <div className="mt-6 pt-6 border-t border-slate-50 flex justify-between items-center text-lg font-bold text-slate-900">
                         <span className="text-slate-400 font-bold uppercase text-xs tracking-widest">Total Amount</span>
                         <span>PKR {order.totalAmount.toLocaleString()}</span>
                      </div>
                    </div>
                 </div>

                 <div className="bg-white p-8 rounded-[2.5rem] shadow-sm border border-slate-100">
                    <h3 className="text-xs font-bold text-slate-400 uppercase tracking-widest mb-6 flex items-center gap-2">
                      <MapPin className="w-4 h-4" /> Shipping Information
                    </h3>
                    <div className="space-y-6">
                       <div>
                         <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Recipient</p>
                         <p className="text-sm font-bold text-slate-900">{order.address.fullName}</p>
                       </div>
                       <div>
                         <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Delivery Address</p>
                         <p className="text-sm font-medium text-slate-600 leading-relaxed italic">{order.address.address}, {order.address.city}</p>
                       </div>
                       <div>
                         <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Order Details</p>
                         <div className="flex items-center gap-2 text-slate-400 mt-1">
                            <Calendar className="w-4 h-4" />
                            <span className="text-[11px] font-bold">{new Date(order.createdAt).toLocaleDateString()}</span>
                            <div className="w-1 h-1 rounded-full bg-slate-200 mx-1" />
                            <span className="text-[11px] font-bold uppercase">Cash on Delivery</span>
                         </div>
                       </div>
                    </div>
                 </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}
