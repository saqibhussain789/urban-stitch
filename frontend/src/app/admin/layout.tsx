"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useRouter } from "next/navigation";
import { useAdminStore } from "@/store/adminStore";
import { 
  LayoutDashboard, 
  ShoppingBag, 
  Users, 
  Settings, 
  LogOut,
  ChevronRight,
  Package
} from "lucide-react";

interface SidebarItemProps {
  href: string;
  icon: any;
  label: string;
  active?: boolean;
}

function SidebarItem({ href, icon: Icon, label, active }: SidebarItemProps) {
  return (
    <Link
      href={href}
      className={`flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-200 group ${
        active 
          ? "bg-[#1F7A63] text-white shadow-lg shadow-[#1F7A63]/20" 
          : "text-slate-600 hover:bg-slate-100"
      }`}
    >
      <Icon className={`w-5 h-5 ${active ? "text-white" : "text-slate-400 group-hover:text-slate-600"}`} />
      <span className="font-medium">{label}</span>
      {active && <ChevronRight className="w-4 h-4 ml-auto" />}
    </Link>
  );
}

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  const router = useRouter();
  const { isLoggedIn, logout } = useAdminStore();
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  const isLoginPage = pathname === "/admin/login";

  useEffect(() => {
    if (isClient && !isLoggedIn && !isLoginPage) {
      router.push("/admin/login");
    }
  }, [isLoggedIn, isLoginPage, isClient, router]);

  if (!isClient) return null;

  // Don't wrap the login page with the admin sidebar/layout
  if (isLoginPage) {
    return <div className="min-h-screen bg-slate-50">{children}</div>;
  }

  if (!isLoggedIn) return null;

  const handleLogout = () => {
    logout();
    router.push("/admin/login");
  };

  return (
    <div className="flex min-h-screen bg-slate-50">
      {/* Sidebar */}
      <aside className="w-72 bg-white border-r border-slate-200 flex flex-col fixed inset-y-0 h-screen overflow-y-auto">
        <div className="p-8">
          <Link href="/" className="flex flex-col">
            <span className="text-2xl font-bold tracking-[0.2em] text-slate-900">BALOCH</span>
            <span className="text-xs tracking-[0.3em] text-[#1F7A63] font-semibold -mt-1 uppercase">Fabrics Admin</span>
          </Link>
        </div>

        <nav className="flex-1 px-4 space-y-2">
          <div className="px-4 py-2 text-[10px] font-bold text-slate-400 uppercase tracking-widest">Main</div>
          <SidebarItem 
            href="/admin" 
            icon={LayoutDashboard} 
            label="Dashboard" 
            active={pathname === "/admin"} 
          />
          <SidebarItem 
            href="/admin/orders" 
            icon={ShoppingBag} 
            label="Orders" 
            active={pathname.startsWith("/admin/orders")} 
          />
          <SidebarItem 
            href="/admin/products" 
            icon={Package} 
            label="Inventory" 
            active={pathname.startsWith("/admin/products")} 
          />
          
          <div className="pt-6 px-4 py-2 text-[10px] font-bold text-slate-400 uppercase tracking-widest">Management</div>
          <SidebarItem 
            href="/admin/customers" 
            icon={Users} 
            label="Customers" 
            active={pathname === "/admin/customers"} 
          />
          <SidebarItem 
            href="/admin/settings" 
            icon={Settings} 
            label="Settings" 
            active={pathname === "/admin/settings"} 
          />
        </nav>

        <div className="p-4 mt-auto border-t border-slate-100">
          <button 
            onClick={handleLogout}
            className="w-full flex items-center gap-3 px-4 py-3 rounded-xl text-slate-600 hover:bg-red-50 hover:text-red-600 transition-all duration-200"
          >
            <LogOut className="w-5 h-5" />
            <span className="font-medium">Sign Out</span>
          </button>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 ml-72 p-10 overflow-x-hidden">
        {children}
      </main>
    </div>
  );
}
