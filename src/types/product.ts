export interface Product {
  id: string
  name: string
  description: string
  basePrice: number
  category: string
  image: string
  offerPercent?: number
}

// Mirrors the Branch_Inventory table in the brief
export interface BranchInventory {
  branchId: string
  productId: string
  stockQuantity: number
}

// What the UI consumes: the product plus stock for the selected branch and every branch
export interface ProductWithStock extends Product {
  stock: number
  inventory: Record<string, number> // branchId -> quantity
}