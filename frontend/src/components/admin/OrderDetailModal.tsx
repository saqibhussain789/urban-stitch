"use client";

import { 
  X, 
  MapPin, 
  Phone, 
  User, 
  Clock, 
  Truck, 
  Hash,
  ShieldCheck,
  Package,
  ArrowRight
} from "lucide-react";
import { ApiOrder } from "@/lib/api";
import { motion } from "framer-motion";

interface OrderDetailModalProps {
  isOpen: boolean;
  onClose: () => void;
  order: ApiOrder | null;
  onStatusChange: (id: string, status: string) => void;
}

export default function OrderDetailModal({ isOpen, onClose, order, onStatusChange }: OrderDetailModalProps) {
  if (!isOpen || !order) return null;

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 sm:p-6 lg:p-10 bg-slate-900/40 backdrop-blur-sm">
      <motion.div 
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0, scale: 0.95 }}
        className="relative w-full max-w-4xl bg-white rounded-[3rem] shadow-2xl overflow-hidden flex flex-col max-h-full"
      >
        {/* Header */}
        <div className="px-10 py-8 border-b border-slate-100 flex items-center justify-between shrink-0">
          <div className="flex items-center gap-4">
             <div className="p-3 bg-[#1F7A63]/5 rounded-2xl text-[#1F7A63]">
              <Package className="w-8 h-8" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h2 className="text-2xl font-bold text-slate-900 leading-none">Order Details</h2>
                <span className="bg-slate-100 px-3 py-1 rounded-lg text-xs font-bold text-slate-500 uppercase tracking-widest translate-y-0.5">#{order.trackingId}</span>
              </div>
              <p className="text-sm text-slate-500 mt-1 font-medium italic">Placed on {new Date(order.createdAt).toLocaleDateString()} at {new Date(order.createdAt).toLocaleTimeString()}</p>
            </div>
          </div>
          <button 
            onClick={onClose}
            className="p-3 hover:bg-slate-100 rounded-2xl text-slate-400 transition-colors"
          >
            <X className="w-7 h-7" />
          </button>
        </div>

        {/* Content */}
        <div className="p-10 overflow-y-auto flex-1 bg-slate-50/30 custom-scrollbar">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
            {/* Left Column: Customer & Items */}
            <div className="space-y-8">
              {/* Customer Info */}
              <div className="bg-white p-8 rounded-[2.5rem] border border-slate-100 shadow-sm space-y-6">
                <h3 className="text-xs font-bold text-slate-400 uppercase tracking-[0.2em] mb-4">Customer Intelligence</h3>
                
                <div className="space-y-4">
                  <div className="flex items-center gap-4">
                    <div className="w-10 h-10 rounded-xl bg-blue-50 flex items-center justify-center text-blue-500">
                      <User className="w-5 h-5" />
                    </div>
                    <div>
                      <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Full Name</p>
                      <p className="text-sm font-bold text-slate-900">{order.address.fullName}</p>
                    </div>
                  </div>

                  <div className="flex items-center gap-4">
                    <div className="w-10 h-10 rounded-xl bg-amber-50 flex items-center justify-center text-amber-500">
                      <Phone className="w-5 h-5" />
                    </div>
                    <div>
                      <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Primary Contact</p>
                      <p className="text-sm font-bold text-slate-900">{order.address.phone}</p>
                    </div>
                  </div>

                  <div className="flex items-start gap-4">
                    <div className="w-10 h-10 rounded-xl bg-emerald-50 flex items-center justify-center text-emerald-500">
                      <MapPin className="w-5 h-5" />
                    </div>
                    <div>
                      <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Destination</p>
                      <p className="text-sm font-bold text-slate-900 leading-relaxed">
                        {order.address.address}, {order.address.city}
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Order Status Timeline (Simplified) */}
              <div className="bg-white p-8 rounded-[2.5rem] border border-slate-100 shadow-sm">
                 <h3 className="text-xs font-bold text-slate-400 uppercase tracking-[0.2em] mb-6">Order Status Control</h3>
                 <div className="flex flex-col gap-3">
                   {["PENDING", "PROCESSING", "SHIPPED", "DELIVERED", "CANCELLED"].map((status) => (
                     <button
                       key={status}
                       onClick={() => onStatusChange(order.id, status)}
                       className={`flex items-center justify-between px-6 py-4 rounded-2xl border transition-all ${
                         order.status === status
                           ? "bg-[#1F7A63] border-[#1F7A63] text-white shadow-lg"
                           : "bg-slate-50 border-slate-100 text-slate-600 hover:border-[#1F7A63]/30"
                       }`}
                     >
                       <span className="text-sm font-bold tracking-wide">{status}</span>
                       {order.status === status && <ShieldCheck className="w-5 h-5" />}
                     </button>
                   ))}
                 </div>
              </div>
            </div>

            {/* Right Column: Order Content */}
            <div className="space-y-8">
              <div className="bg-white p-8 rounded-[2.5rem] border border-slate-100 shadow-sm flex flex-col h-full">
                <h3 className="text-xs font-bold text-slate-400 uppercase tracking-[0.2em] mb-6">Package Manifest</h3>
                
                <div className="flex-1 space-y-4">
                  {order.orderItems.map((item, idx) => (
                    <div key={idx} className="flex items-center justify-between p-4 rounded-2xl bg-slate-50 border border-slate-100/50">
                      <div className="flex items-center gap-4">
                         <div className="w-16 h-16 rounded-xl bg-slate-200 overflow-hidden shrink-0 border border-slate-100">
                          {item.productVariant?.product?.images?.[0]?.url && (
                            <img
                              src={item.productVariant.product.images[0].url}
                              alt=""
                              className="w-full h-full object-cover"
                            />
                          )}
                        </div>
                        <div>
                          <p className="text-sm font-bold text-slate-900 line-clamp-1">{item.productVariant.product.title}</p>
                          <p className="text-xs font-medium text-slate-500 mt-0.5">
                            {item.productVariant.size} • {item.productVariant.color}
                          </p>
                          <p className="text-[10px] font-bold text-[#1F7A63] mt-1 bg-[#1F7A63]/5 inline-block px-2 py-0.5 rounded shadow-sm italic">
                            Qty: {item.quantity}
                          </p>
                        </div>
                      </div>
                      <div className="text-right">
                         <p className="text-sm font-bold text-slate-900">PKR {(item.price * item.quantity).toLocaleString()}</p>
                         <p className="text-[10px] font-medium text-slate-400">@ {item.price.toLocaleString()}/ea</p>
                      </div>
                    </div>
                  ))}
                </div>

                <div className="mt-10 pt-8 border-t border-slate-100">
                   <div className="flex justify-between items-center mb-2">
                     <span className="text-sm font-bold text-slate-400 uppercase tracking-widest">Subtotal</span>
                     <span className="text-sm font-bold text-slate-900">PKR {order.totalAmount.toLocaleString()}</span>
                   </div>
                   <div className="flex justify-between items-center mb-6">
                     <span className="text-sm font-bold text-slate-400 uppercase tracking-widest">Delivery Charge</span>
                     <span className="text-sm font-bold text-emerald-600 uppercase tracking-widest">Free</span>
                   </div>
                   <div className="flex justify-between items-center p-6 bg-slate-900 rounded-[1.5rem] shadow-xl shadow-slate-900/10">
                     <span className="text-base font-bold text-white uppercase tracking-[0.2em]">Grand Total</span>
                     <span className="text-2xl font-bold text-white tracking-tight leading-none">PKR {order.totalAmount.toLocaleString()}</span>
                   </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Footer Actions */}
        <div className="px-10 py-8 bg-slate-50 border-t border-slate-100 flex items-center justify-end gap-4 shrink-0">
          <button 
            onClick={onClose}
            className="px-10 py-4 bg-white border border-slate-200 rounded-2xl text-sm font-bold text-slate-700 hover:bg-slate-100 transition-all font-bold"
          >
            Close Detail
          </button>
          <button 
            className="flex items-center gap-2 bg-slate-900 text-white px-10 py-4 rounded-[1.5rem] font-bold shadow-xl shadow-slate-900/10 hover:scale-[1.02] active:scale-[0.98] transition-all"
            onClick={() => {
              window.print();
            }}
          >
            <Hash className="w-5 h-5" />
            Print Invoice
          </button>
        </div>
      </motion.div>

      <style jsx>{`
        .custom-scrollbar::-webkit-scrollbar {
          width: 8px;
        }
        .custom-scrollbar::-webkit-scrollbar-track {
          background: #f8fafc;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb {
          background: #e2e8f0;
          border-radius: 10px;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb:hover {
          background: #cbd5e1;
        }
      `}</style>
    </div>
  );
}
