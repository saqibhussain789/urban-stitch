"use client";

import { useEffect, Suspense } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import { 
  CheckCircle2, 
  ArrowRight, 
  ShoppingBag, 
  Truck, 
  Copy,
  Clock,
  ArrowLeft
} from "lucide-react";
import Link from "next/link";
import { motion } from "framer-motion";
import { toast } from "sonner";

function SuccessContent() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const trackingId = searchParams.get("trackingId");

  useEffect(() => {
    if (!trackingId) {
      router.push("/");
    }
  }, [trackingId, router]);

  const copyTrackingId = () => {
    if (trackingId) {
      navigator.clipboard.writeText(trackingId);
      toast.success("Tracking ID copied to clipboard!");
    }
  };

  if (!trackingId) return null;

  return (
    <div className="min-h-screen bg-white pt-32 pb-20 px-4">
      <div className="max-w-3xl mx-auto">
        {/* Success Branding */}
        <div className="text-center mb-16">
          <motion.div
            initial={{ scale: 0, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ type: "spring", damping: 12, stiffness: 100 }}
            className="inline-flex items-center justify-center w-24 h-24 bg-[#E6F2EA] rounded-full text-[#1F7A63] mb-8"
          >
            <CheckCircle2 className="w-12 h-12" />
          </motion.div>
          
          <motion.h1 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="text-4xl md:text-5xl font-black text-slate-900 tracking-tight mb-4"
          >
            Order Confirmed!
          </motion.h1>
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="text-slate-500 text-lg max-w-lg mx-auto"
          >
             Thank you for choosing Baloch Fabrics. Your order has been registered and is now being prepared for fulfillment.
          </motion.p>
        </div>

        {/* Tracking Card */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="bg-slate-900 rounded-[3rem] p-8 md:p-12 text-white shadow-2xl shadow-slate-900/20 relative overflow-hidden"
        >
          {/* Decorative background elements */}
          <div className="absolute top-0 right-0 w-64 h-64 bg-[#1F7A63]/10 blur-[100px] -z-0" />
          <div className="absolute -bottom-10 -left-10 w-48 h-48 bg-[#1F7A63]/10 blur-[80px] -z-0" />

          <div className="relative z-10 flex flex-col md:flex-row items-center justify-between gap-8">
            <div className="text-center md:text-left">
              <p className="text-[#1F7A63] font-bold uppercase tracking-[0.2em] text-xs mb-2">Save your Tracking ID</p>
              <h2 className="text-4xl font-black tracking-widest">{trackingId}</h2>
              <div className="flex items-center gap-4 mt-4 justify-center md:justify-start">
                 <button 
                  onClick={copyTrackingId}
                  className="flex items-center gap-2 text-sm font-bold text-slate-400 hover:text-white transition-colors"
                >
                   <Copy className="w-4 h-4" />
                   Copy ID
                 </button>
                 <div className="w-1 h-1 rounded-full bg-slate-700" />
                 <p className="text-sm font-medium text-slate-400">Status: <span className="text-[#1F7A63] font-bold">Pending</span></p>
              </div>
            </div>

            <div className="shrink-0">
               <Link 
                href={`/track-order?id=${trackingId}`}
                className="bg-[#1F7A63] text-white px-10 py-5 rounded-full font-bold shadow-lg shadow-[#1F7A63]/20 hover:scale-[1.05] active:scale-[0.95] transition-all flex items-center gap-3 group"
              >
                Track My Order
                <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </Link>
            </div>
          </div>
        </motion.div>

        {/* Next Steps */}
        <div className="mt-16 grid grid-cols-1 md:grid-cols-3 gap-8">
           {[
             { title: "Confirmation", desc: "Our team will contact you via phone shortly.", icon: Clock },
             { title: "Shipment", desc: "Expect delivery within 3-5 business days.", icon: Truck },
             { title: "Support", desc: "Contact us via WhatsApp for quick queries.", icon: ShoppingBag }
           ].map((item, idx) => (
             <motion.div 
               key={idx}
               initial={{ opacity: 0, scale: 0.9 }}
               animate={{ opacity: 1, scale: 1 }}
               transition={{ delay: 0.5 + (idx * 0.1) }}
               className="p-8 bg-slate-50 rounded-[2.5rem] border border-slate-100 flex flex-col items-center text-center"
             >
               <div className="p-3 bg-white rounded-2xl text-[#1F7A63] shadow-sm mb-4">
                 <item.icon className="w-6 h-6" />
               </div>
               <h3 className="font-bold text-slate-900 mb-2">{item.title}</h3>
               <p className="text-xs text-slate-500 font-medium leading-relaxed">{item.desc}</p>
             </motion.div>
           ))}
        </div>

        {/* Action Bar */}
        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1 }}
          className="mt-16 flex flex-col items-center gap-6"
        >
          <Link 
            href="/"
            className="flex items-center gap-2 text-slate-400 hover:text-slate-900 font-bold transition-all group"
          >
            <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
            Continue Shopping
          </Link>
        </motion.div>
      </div>
    </div>
  );
}

export default function OrderSuccessPage() {
  return (
    <Suspense fallback={
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#1F7A63]"></div>
      </div>
    }>
      <SuccessContent />
    </Suspense>
  );
}
