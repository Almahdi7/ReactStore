// ==========================================
// 1. Users & Roles (الصلاحيات والمستخدمون)
// ==========================================
export type UserRole = 'super_admin' | 'branch_manager' | 'staff' | 'customer';

export interface User {
  id: string;
  name: string;
  email: string;
  role: UserRole;
  branchId?: string | null; // مرتبط بفرع محدد إذا كان مدير فرع أو موظف
  createdAt: string;
}

// ==========================================
// 2. Branches (الفروع)
// ==========================================
export interface Branch {
  id: string;
  name: string;
  address: string;
  location: {
    lat: number;
    lng: number;
  };
  workingHours: string;
  isActive: boolean;
}

// ==========================================
// 3. Products & Inventory (المنتجات ومخزون الفروع)
// ==========================================
export interface Product {
  id: string;
  name: string;
  description: string;
  basePrice: number;
  category: string;
  images: string[];
}

// ربط المنتج بالفرع والكمية المستقلة لكل فرع
export interface BranchInventory {
  id: string;
  branchId: string;
  productId: string;
  stockQuantity: number;
  isAvailable: boolean;
}

// ==========================================
// 4. Cart & Shopping (سلة التسوق)
// ==========================================
export interface CartItem {
  product: Product;
  quantity: number;
  branchId: string; // السلة مرتبطة بالفرع المحدد حالياً
}

// ==========================================
// 5. Orders (الطلبات)
// ==========================================
export type OrderStatus = 'new' | 'preparing' | 'ready_for_pickup' | 'out_for_delivery' | 'completed' | 'cancelled';
export type OrderType = 'pickup' | 'delivery';

export interface OrderItem {
  productId: string;
  productName: string;
  quantity: number;
  price: number;
}

export interface Order {
  id: string;
  customerId: string;
  branchId: string; // الطلب يتبع لفرع محدد لمعالجة المخزون
  items: OrderItem[];
  status: OrderStatus;
  orderType: OrderType;
  totalAmount: number;
  shippingAddress?: string;
  createdAt: string;
}

// ==========================================
// 6. Stock Transfers (نقل المخزون بين الفروع - ميزة إضافية)
// ==========================================
export type TransferStatus = 'requested' | 'approved' | 'shipped' | 'received';

export interface StockTransfer {
  id: string;
  sourceBranchId: string;
  destinationBranchId: string;
  productId: string;
  quantity: number;
  status: TransferStatus;
  createdAt: string;
}