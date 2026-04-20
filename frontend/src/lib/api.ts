const API_BASE = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000/api';

// --- Types matching the backend Prisma models ---

export interface ApiProductVariant {
  id: string;
  productId: string;
  size: string;
  color: string;
  stock: number;
  sku: string;
}

export interface ApiProductImage {
  id: string;
  productId: string;
  url: string;
}

export interface ApiCategory {
  id: string;
  name: string;
}

export interface ApiProduct {
  id: string;
  title: string;
  description: string;
  price: number;
  isSale: boolean;
  isNew: boolean;
  gender: 'MEN' | 'WOMEN' | 'UNISEX';
  category: ApiCategory | null;
  categoryId: string | null;
  images: ApiProductImage[];
  variants: ApiProductVariant[];
  createdAt: string;
  updatedAt: string;
}

export interface OrderItem {
  productVariantId: string;
  quantity: number;
}

export interface CreateOrderPayload {
  items: OrderItem[];
  fullName: string;
  phone: string;
  address: string;
  city: string;
}

export interface ApiAddress {
  id: string;
  fullName: string;
  phone: string;
  address: string;
  city: string;
}

export interface ApiOrder {
  id: string;
  trackingId: string;
  totalAmount: number;
  status: 'PENDING' | 'PROCESSING' | 'SHIPPED' | 'DELIVERED' | 'CANCELLED';
  address: ApiAddress;
  orderItems: (OrderItem & {
    price: number;
    productVariant: ApiProductVariant & {
      product: ApiProduct;
    };
  })[];
  createdAt: string;
  updatedAt: string;
}

// --- API Functions ---

export async function fetchProducts(): Promise<ApiProduct[]> {
  const res = await fetch(`${API_BASE}/products`, { cache: 'no-store' });
  if (!res.ok) throw new Error('Failed to fetch products');
  return res.json();
}

export async function fetchProductById(id: string): Promise<ApiProduct> {
  const res = await fetch(`${API_BASE}/products/${id}`, { cache: 'no-store' });
  if (!res.ok) throw new Error('Failed to fetch product');
  return res.json();
}

export async function placeOrder(payload: CreateOrderPayload) {
  const res = await fetch(`${API_BASE}/orders`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(payload),
  });
  if (!res.ok) {
    const err = await res.json();
    throw new Error(err.error || 'Failed to place order');
  }
  return res.json();
}

export async function fetchOrderByTrackingId(id: string): Promise<ApiOrder> {
  const res = await fetch(`${API_BASE}/orders/track/${id}`, { cache: 'no-store' });
  if (!res.ok) {
    if (res.status === 404) throw new Error('Order not found');
    throw new Error('Failed to fetch order');
  }
  return res.json();
}

// --- Admin Section ---

export async function fetchOrders(): Promise<ApiOrder[]> {
  const res = await fetch(`${API_BASE}/orders`, { cache: 'no-store' });
  if (!res.ok) throw new Error('Failed to fetch orders');
  return res.json();
}

export async function updateOrderStatus(id: string, status: string): Promise<ApiOrder> {
  const res = await fetch(`${API_BASE}/orders/${id}/status`, {
    method: 'PATCH',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ status }),
  });
  if (!res.ok) throw new Error('Failed to update order status');
  return res.json();
}

export async function deleteProduct(id: string): Promise<void> {
  const res = await fetch(`${API_BASE}/products/${id}`, {
    method: 'DELETE',
  });
  if (!res.ok) throw new Error('Failed to delete product');
}

export async function createProduct(payload: any): Promise<ApiProduct> {
  const res = await fetch(`${API_BASE}/products`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(payload),
  });
  if (!res.ok) throw new Error('Failed to create product');
  return res.json();
}

export async function updateProduct(id: string, payload: any): Promise<ApiProduct> {
  const res = await fetch(`${API_BASE}/products/${id}`, {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(payload),
  });
  if (!res.ok) throw new Error('Failed to update product');
  return res.json();
}

