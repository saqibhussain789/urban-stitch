"use client";

import { useEffect, useState } from "react";
import {
  fetchOrders,
  updateOrderStatus,
  ApiOrder
} from "@/lib/api";
import {
  Package,
  Search,
  Filter,
  Eye,
  MoreVertical,
  Clock,
  ArrowUpDown,
  ShoppingBag,
  RefreshCcw
} from "lucide-react";
import { toast } from "sonner";
import OrderDetailModal from "@/components/admin/OrderDetailModal";

export default function AdminOrdersPage() {
  const [orders, setOrders] = useState<ApiOrder[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedOrder, setSelectedOrder] = useState<ApiOrder | null>(null);
  const [isDetailOpen, setIsDetailOpen] = useState(false);

  useEffect(() => {
    loadOrders();
  }, []);

  const loadOrders = async () => {
    setLoading(true);
    try {
      const data = await fetchOrders();
      setOrders(data);
    } catch (error) {
      toast.error("Failed to load orders");
    } finally {
      setLoading(false);
    }
  };

  const handleStatusChange = async (orderId: string, newStatus: string) => {
    try {
      const updated = await updateOrderStatus(orderId, newStatus);
      toast.success(`Order ${updated.trackingId} moved to ${newStatus}`);
      
      // Update local state efficiently
      setOrders(prev => prev.map(o => o.id === orderId ? { ...o, status: newStatus as any } : o));
      if (selectedOrder?.id === orderId) {
        setSelectedOrder(prev => prev ? { ...prev, status: newStatus as any } : null);
      }
      
      // Full reload to ensure consistency
      loadOrders();
    } catch (error) {
      toast.error("Failed to update status");
    }
  };

  const viewDetails = (order: ApiOrder) => {
    setSelectedOrder(order);
    setIsDetailOpen(true);
  };

  const filteredOrders = orders.filter(o => 
    o.trackingId.toLowerCase().includes(searchQuery.toLowerCase()) ||
    o.address.fullName.toLowerCase().includes(searchQuery.toLowerCase()) ||
    o.address.phone.includes(searchQuery)
  );

  if (loading && orders.length === 0) return (
    <div className="flex items-center justify-center min-h-[60vh]">
      <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#1F7A63]"></div>
    </div>
  );

  return (
    <div className="space-y-10 pb-20">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-end gap-4">
        <div>
          <h1 className="text-4xl font-bold text-slate-900 tracking-tight">Fulfillment Hub</h1>
          <p className="text-slate-500 mt-2">Manage customer logistics and order lifecycles.</p>
        </div>
        <div className="flex gap-3">
          <button 
            onClick={loadOrders} 
            className="flex items-center gap-2 px-6 py-3 bg-white border border-slate-200 rounded-xl text-sm font-bold text-slate-700 hover:bg-slate-50 transition-all shadow-sm"
          >
            <RefreshCcw className={`w-4 h-4 ${loading ? 'animate-spin' : ''}`} />
            Sync Logs
          </button>
        </div>
      </div>

      <div className="bg-white rounded-[2.5rem] border border-slate-100 shadow-sm overflow-hidden">
        <div className="p-8 border-b border-slate-50 flex flex-col sm:flex-row gap-6 justify-between items-center bg-slate-50/30">
          <div className="relative w-full sm:w-96">
            <Search className="absolute left-5 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
            <input 
              type="text" 
              placeholder="Search ID, Name or Phone..." 
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-14 pr-6 py-4 bg-white border-none rounded-2xl text-sm font-medium shadow-sm focus:ring-2 focus:ring-[#1F7A63] outline-none transition-all"
            />
          </div>
          <div className="flex items-center gap-3">
             <span className="text-xs font-bold text-slate-400 uppercase tracking-widest mr-2">Showing {filteredOrders.length} Results</span>
             <button className="p-3 bg-white border border-slate-100 text-slate-500 rounded-xl hover:bg-slate-50 transition-colors shadow-sm">
              <Filter className="w-5 h-5" />
            </button>
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left">
            <thead>
              <tr className="bg-slate-50/50">
                <th className="px-8 py-6 text-[10px] font-bold text-slate-400 uppercase tracking-[0.2em]">Ref ID</th>
                <th className="px-8 py-6 text-[10px] font-bold text-slate-400 uppercase tracking-[0.2em]">Customer Details</th>
                <th className="px-8 py-6 text-[10px] font-bold text-slate-400 uppercase tracking-[0.2em]">Status</th>
                <th className="px-8 py-6 text-[10px] font-bold text-slate-400 uppercase tracking-[0.2em]">Items</th>
                <th className="px-8 py-6 text-[10px] font-bold text-slate-400 uppercase tracking-[0.2em]">Value</th>
                <th className="px-8 py-6 text-[10px] font-bold text-slate-400 uppercase tracking-[0.2em]">Date</th>
                <th className="px-8 py-6 text-[10px] font-bold text-slate-400 uppercase tracking-[0.2em]">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-50">
              {filteredOrders.map((order) => (
                <tr 
                  key={order.id} 
                  className="hover:bg-slate-50/50 transition-all cursor-pointer group"
                  onClick={() => viewDetails(order)}
                >
                  <td className="px-8 py-6">
                    <span className="text-sm font-bold text-slate-900 bg-slate-100 px-3 py-1.5 rounded-lg border border-slate-200/50 group-hover:border-[#1F7A63]/30 transition-colors">
                      {order.trackingId}
                    </span>
                  </td>
                  <td className="px-8 py-6">
                    <div>
                      <p className="text-sm font-bold text-slate-900 line-clamp-1">{order.address.fullName}</p>
                      <p className="text-xs font-medium text-slate-400 mt-0.5">{order.address.city}</p>
                    </div>
                  </td>
                  <td className="px-8 py-6">
                    <span className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-tighter ${
                      order.status === 'PENDING' ? 'bg-amber-100 text-amber-700' :
                      order.status === 'PROCESSING' ? 'bg-blue-100 text-blue-700' :
                      order.status === 'SHIPPED' ? 'bg-indigo-100 text-indigo-700' :
                      order.status === 'DELIVERED' ? 'bg-emerald-100 text-emerald-700' :
                      'bg-slate-100 text-slate-700'
                    }`}>
                      <span className={`w-1.5 h-1.5 rounded-full ${
                        order.status === 'PENDING' ? 'bg-amber-500' :
                        order.status === 'PROCESSING' ? 'bg-blue-500' :
                        order.status === 'SHIPPED' ? 'bg-indigo-500' :
                        order.status === 'DELIVERED' ? 'bg-emerald-500' :
                        'bg-slate-500'
                      }`} />
                      {order.status}
                    </span>
                  </td>
                  <td className="px-8 py-6">
                     <p className="text-xs font-bold text-slate-600">
                       {order.orderItems.length} {order.orderItems.length === 1 ? 'item' : 'items'}
                     </p>
                  </td>
                  <td className="px-8 py-6">
                    <p className="text-sm font-bold text-slate-900">PKR {order.totalAmount.toLocaleString()}</p>
                  </td>
                  <td className="px-8 py-6">
                    <div className="flex items-center gap-2 text-slate-400">
                      <Clock className="w-3.5 h-3.5" />
                      <span className="text-xs font-medium">{new Date(order.createdAt).toLocaleDateString(undefined, { month: 'short', day: 'numeric' })}</span>
                    </div>
                  </td>
                  <td className="px-8 py-6">
                    <button 
                      className="p-3 text-slate-400 hover:text-[#1F7A63] hover:bg-[#1F7A63]/5 rounded-xl transition-all"
                      onClick={(e) => {
                        e.stopPropagation();
                        viewDetails(order);
                      }}
                    >
                      <Eye className="w-5 h-5" />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {filteredOrders.length === 0 && (
          <div className="p-24 flex flex-col items-center text-center">
            <ShoppingBag className="w-20 h-20 text-slate-100 mb-6" />
            <h3 className="text-2xl font-bold text-slate-900">No logs found</h3>
            <p className="text-slate-500 mt-2 max-w-xs text-sm">Either no orders exist yet or your filter criteria did not yield any results.</p>
          </div>
        )}
      </div>

      <OrderDetailModal 
        isOpen={isDetailOpen} 
        onClose={() => setIsDetailOpen(false)} 
        order={selectedOrder} 
        onStatusChange={handleStatusChange}
      />
    </div>
  );
}
