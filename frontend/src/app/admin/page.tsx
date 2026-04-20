"use client";

import { useEffect, useState } from "react";
import { 
  TrendingUp, 
  ShoppingBag, 
  Package, 
  AlertCircle,
  Clock,
  CheckCircle2,
  Truck
} from "lucide-react";
import { fetchOrders, fetchProducts, ApiOrder, ApiProduct } from "@/lib/api";

interface StatCardProps {
  title: string;
  value: string | number;
  icon: any;
  trend?: string;
  trendColor?: string;
  color: string;
}

function StatCard({ title, value, icon: Icon, trend, trendColor, color }: StatCardProps) {
  return (
    <div className="bg-white p-6 rounded-[2rem] border border-slate-100 shadow-sm">
      <div className="flex justify-between items-start mb-4">
        <div className={`p-3 rounded-2xl ${color} bg-opacity-10`}>
          <Icon className={`w-6 h-6 ${color.replace('bg-', 'text-')}`} />
        </div>
        {trend && (
          <span className={`text-xs font-bold ${trendColor}`}>
            {trend}
          </span>
        )}
      </div>
      <p className="text-slate-500 text-sm font-medium">{title}</p>
      <h3 className="text-2xl font-bold text-slate-900 mt-1">{value}</h3>
    </div>
  );
}

export default function AdminDashboard() {
  const [orders, setOrders] = useState<ApiOrder[]>([]);
  const [products, setProducts] = useState<ApiProduct[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    Promise.all([fetchOrders(), fetchProducts()])
      .then(([ordersData, productsData]) => {
        setOrders(ordersData);
        setProducts(productsData);
      })
      .finally(() => setLoading(false));
  }, []);

  if (loading) return (
    <div className="flex items-center justify-center min-h-[60vh]">
      <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#1F7A63]"></div>
    </div>
  );

  const totalRevenue = orders.reduce((acc, order) => acc + order.totalAmount, 0);
  const pendingOrders = orders.filter(o => o.status === 'PENDING').length;
  const shippedOrders = orders.filter(o => o.status === 'SHIPPED').length;
  const lowStockProducts = products.filter(p => p.variants.some(v => v.stock < 5)).length;

  const recentOrders = orders.slice(0, 5);

  return (
    <div className="space-y-10">
      <div>
        <h1 className="text-4xl font-bold text-slate-900 tracking-tight">Dashboard Overview</h1>
        <p className="text-slate-500 mt-2">Welcome back! Here's what's happening today.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <StatCard 
          title="Total Revenue" 
          value={`PKR ${totalRevenue.toLocaleString()}`} 
          icon={TrendingUp} 
          trend="+12.5%" 
          trendColor="text-emerald-500"
          color="bg-emerald-500" 
        />
        <StatCard 
          title="Total Orders" 
          value={orders.length} 
          icon={ShoppingBag} 
          color="bg-blue-500" 
        />
        <StatCard 
          title="Active Products" 
          value={products.length} 
          icon={Package} 
          color="bg-amber-500" 
        />
        <StatCard 
          title="Low Stock Warning" 
          value={lowStockProducts} 
          icon={AlertCircle} 
          color="bg-rose-500" 
          trend={lowStockProducts > 0 ? "REQUIRES ACTION" : undefined}
          trendColor="text-rose-500"
        />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 bg-white rounded-[2.5rem] border border-slate-100 shadow-sm overflow-hidden">
          <div className="p-8 border-b border-slate-50 flex justify-between items-center">
            <h3 className="text-xl font-bold text-slate-900">Recent Orders</h3>
            <button className="text-sm font-semibold text-[#1F7A63] hover:underline">View All</button>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full text-left">
              <thead>
                <tr className="bg-slate-50/50">
                  <th className="px-8 py-4 text-xs font-bold text-slate-400 uppercase tracking-widest">Order ID</th>
                  <th className="px-8 py-4 text-xs font-bold text-slate-400 uppercase tracking-widest">Customer</th>
                  <th className="px-8 py-4 text-xs font-bold text-slate-400 uppercase tracking-widest">Status</th>
                  <th className="px-8 py-4 text-xs font-bold text-slate-400 uppercase tracking-widest">Amount</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-50">
                {recentOrders.map((order) => (
                  <tr key={order.id} className="hover:bg-slate-50/30 transition-colors">
                    <td className="px-8 py-5 text-sm font-semibold text-slate-900">#{order.id.slice(-6).toUpperCase()}</td>
                    <td className="px-8 py-5 text-sm text-slate-600">{order.address.fullName}</td>
                    <td className="px-8 py-5">
                      <span className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold ${
                        order.status === 'PENDING' ? 'bg-amber-100 text-amber-700' :
                        order.status === 'SHIPPED' ? 'bg-blue-100 text-blue-700' :
                        order.status === 'DELIVERED' ? 'bg-emerald-100 text-emerald-700' :
                        'bg-slate-100 text-slate-700'
                      }`}>
                        {order.status === 'PENDING' && <Clock className="w-3 h-3" />}
                        {order.status === 'SHIPPED' && <Truck className="w-3 h-3" />}
                        {order.status === 'DELIVERED' && <CheckCircle2 className="w-3 h-3" />}
                        {order.status}
                      </span>
                    </td>
                    <td className="px-8 py-5 text-sm font-bold text-slate-900">PKR {order.totalAmount.toLocaleString()}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        <div className="space-y-8">
          <div className="bg-[#1F7A63] p-8 rounded-[2.5rem] text-white overflow-hidden relative group">
            <div className="relative z-10">
              <h3 className="text-2xl font-bold mb-2">Need Help?</h3>
              <p className="text-white/80 text-sm leading-relaxed mb-6">
                Our support team is here to help you manage your store and inventory.
              </p>
              <button className="bg-white text-[#1F7A63] px-6 py-3 rounded-xl font-bold text-sm shadow-lg shadow-black/10 transition-transform active:scale-95">
                Contact Support
              </button>
            </div>
            <ShoppingBag className="absolute -bottom-6 -right-6 w-32 h-32 text-white/10 group-hover:scale-110 transition-transform duration-500" />
          </div>

          <div className="bg-white p-8 rounded-[2.5rem] border border-slate-100 shadow-sm">
            <h3 className="text-xl font-bold text-slate-900 mb-6">Inventory Summary</h3>
            <div className="space-y-6">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="w-2 h-2 rounded-full bg-emerald-500" />
                  <span className="text-sm font-medium text-slate-600">In Stock</span>
                </div>
                <span className="text-sm font-bold">{products.length - lowStockProducts}</span>
              </div>
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="w-2 h-2 rounded-full bg-rose-500" />
                  <span className="text-sm font-medium text-slate-600">Low Stock</span>
                </div>
                <span className="text-sm font-bold text-rose-500">{lowStockProducts}</span>
              </div>
              <div className="pt-4 border-t border-slate-50">
                <button className="w-full text-center text-sm font-bold text-[#1F7A63] hover:bg-[#1F7A63]/5 p-3 rounded-xl transition-colors">
                  Generate Inventory Report
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
