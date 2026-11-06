export type StockStatus = 'in' | 'low' | 'out'

export const getStockStatus = (qty: number): StockStatus => (qty <= 0 ? 'out' : qty <= 5 ? 'low' : 'in')

export const STOCK_STYLE: Record<StockStatus, { label: string; dot: string }> = {
  in: { label: 'Available', dot: 'bg-in-stock' },
  low: { label: 'Low Stock', dot: 'bg-low-stock' },
  out: { label: 'Unavailable', dot: 'bg-muted' },
}