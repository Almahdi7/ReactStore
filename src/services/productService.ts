import type { BranchInventory, Product, ProductWithStock } from '../types/product'

// TEMPORARY: replace with the real API when it exists
const img = (seed: string) => `https://picsum.photos/seed/${seed}/600/750`

const PRODUCTS: Product[] = [
  { id: 'p1', name: 'Wool Overcoat', description: 'Double-faced Italian wool, hand-finished seams.', basePrice: 640, category: 'Fashion', image: img('overcoat'), offerPercent: 15 },
  { id: 'p2', name: 'Silk Scarf', description: 'Hand-rolled edges, printed in small editions.', basePrice: 180, category: 'Fashion', image: img('scarf') },
  { id: 'p3', name: 'Ceramic Vase', description: 'Matte stoneware glaze, thrown by hand.', basePrice: 220, category: 'Home', image: img('vase'), offerPercent: 20 },
  { id: 'p4', name: 'Linen Throw', description: 'Stonewashed European flax linen.', basePrice: 150, category: 'Home', image: img('throw') },
  { id: 'p5', name: 'Amber Candle', description: 'Slow-burning blend of amber and cedar.', basePrice: 70, category: 'Beauty', image: img('candle') },
  { id: 'p6', name: 'Rose Eau de Parfum', description: 'Bulgarian rose over a sandalwood base.', basePrice: 210, category: 'Beauty', image: img('parfum'), offerPercent: 10 },
  { id: 'p7', name: 'Brass Desk Lamp', description: 'Solid brass with a hand-patinated finish.', basePrice: 340, category: 'Objects', image: img('lamp') },
  { id: 'p8', name: 'Leather Notebook', description: 'Vegetable-tanned leather, refillable.', basePrice: 95, category: 'Objects', image: img('notebook') },
]

const inv = (productId: string, b1: number, b2: number, b3: number): BranchInventory[] => [
  { branchId: 'b1', productId, stockQuantity: b1 },
  { branchId: 'b2', productId, stockQuantity: b2 },
  { branchId: 'b3', productId, stockQuantity: b3 },
]

const INVENTORY: BranchInventory[] = [
  ...inv('p1', 12, 3, 0), ...inv('p2', 25, 18, 4), ...inv('p3', 0, 7, 2), ...inv('p4', 9, 0, 5),
  ...inv('p5', 40, 22, 10), ...inv('p6', 4, 15, 0), ...inv('p7', 6, 2, 0), ...inv('p8', 30, 0, 8),
]

export async function getProducts(branchId: string): Promise<ProductWithStock[]> {
  await new Promise((r) => setTimeout(r, 300))
  return PRODUCTS.map((p) => {
    const inventory: Record<string, number> = {}
    INVENTORY.filter((i) => i.productId === p.id).forEach((i) => {
      inventory[i.branchId] = i.stockQuantity
    })
    return { ...p, inventory, stock: inventory[branchId] ?? 0 }
  })
}