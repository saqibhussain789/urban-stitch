"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { useAdminStore } from "@/store/adminStore";
import { Lock, User as UserIcon, ArrowRight } from "lucide-react";
import { motion } from "framer-motion";

export default function AdminLoginPage() {
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const { login } = useAdminStore();
  const router = useRouter();

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (login(password)) {
      router.push("/admin");
    } else {
      setError("Invalid password");
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 flex items-center justify-center p-6 bg-[radial-gradient(circle_at_top_right,rgba(31,122,99,0.05),transparent_40%),radial-gradient(circle_at_bottom_left,rgba(31,122,99,0.03),transparent_40%)]">
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="w-full max-w-md"
      >
        <div className="text-center mb-10">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-white rounded-2xl shadow-xl shadow-slate-200/50 mb-6">
            <Lock className="w-8 h-8 text-[#1F7A63]" />
          </div>
          <h1 className="text-3xl font-bold text-slate-900 tracking-tight">Admin Access</h1>
          <p className="text-slate-500 mt-2">Enter your credentials to manage Baloch Fabrics</p>
        </div>

        <div className="bg-white p-10 rounded-[2.5rem] shadow-xl shadow-slate-200/50 border border-slate-100">
          <form onSubmit={handleLogin} className="space-y-6">
            <div className="space-y-2">
              <label className="text-xs font-bold text-slate-400 uppercase tracking-widest ml-1">Admin Password</label>
              <div className="relative group">
                <div className="absolute left-5 top-1/2 -translate-y-1/2 flex items-center justify-center text-slate-400 group-focus-within:text-[#1F7A63] transition-colors">
                  <Lock className="w-5 h-5" />
                </div>
                <input 
                  autoFocus
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••"
                  className="w-full pl-14 pr-6 py-5 bg-slate-50 border-none rounded-2xl text-slate-900 focus:ring-2 focus:ring-[#1F7A63] outline-none transition-all placeholder:text-slate-300"
                />
              </div>
              {error && <p className="text-rose-500 text-xs font-bold ml-1 animate-shake">{error}</p>}
            </div>

            <button 
              type="submit"
              className="group w-full bg-[#1F7A63] text-white py-5 rounded-2xl font-bold shadow-xl shadow-[#1F7A63]/20 hover:scale-[1.02] active:scale-[0.98] transition-all flex items-center justify-center gap-2"
            >
              Sign In
              <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </button>
          </form>
        </div>

        <div className="text-center mt-10">
          <button 
            onClick={() => router.push("/")}
            className="text-sm font-bold text-slate-400 hover:text-[#1F7A63] transition-colors"
          >
            ← Back to Storefront
          </button>
        </div>
      </motion.div>

      <style jsx global>{`
        @keyframes shake {
          0%, 100% { transform: translateX(0); }
          25% { transform: translateX(-4px); }
          75% { transform: translateX(4px); }
        }
        .animate-shake {
          animation: shake 0.2s ease-in-out 0s 2;
        }
      `}</style>
    </div>
  );
}
