import { Link } from 'react-router-dom'
import { useBranch } from '../context/BranchContext'
import type { ProductWithStock } from '../types/product'
import { formatPrice, getFinalPrice } from '../utils/price'
import { getStockStatus, STOCK_STYLE } from '../utils/stock'

export default function ProductCard({ product }: { product: ProductWithStock }) {
  const { branches } = useBranch()
  const status = STOCK_STYLE[getStockStatus(product.stock)]
  const finalPrice = getFinalPrice(product.basePrice, product.offerPercent)

  return (
    <Link to={`/product/${product.id}`} className="group block border border-line bg-canvas">
      <div className="relative aspect-[4/5] overflow-hidden bg-canvas-alt">
        <img src={product.image} alt={product.name} loading="lazy" className="h-full w-full object-cover" />
        {product.offerPercent && (
          <span className="label-caps absolute start-3 top-3 bg-parchment px-2.5 py-1">
            -{product.offerPercent}%
          </span>
        )}
        <div className="absolute inset-x-0 bottom-0 translate-y-full border-t border-line bg-canvas p-4 transition-transform duration-300 group-hover:translate-y-0">
          {branches
            .filter((b) => b.status === 'active')
            .map((b) => (
              <p key={b.id} className="body-sm flex justify-between">
                <span>{b.name}</span>
                <span className="text-secondary">{STOCK_STYLE[getStockStatus(product.inventory[b.id] ?? 0)].label}</span>
              </p>
            ))}
        </div>
      </div>

      <div className="p-4">
        <p className="label-caps text-secondary">{product.category}</p>
        <h3 className="headline-sm mt-1">{product.name}</h3>
        <div className="mt-3 flex items-center justify-between">
          <p className="body-md">
            {formatPrice(finalPrice)}
            {product.offerPercent && (
              <span className="body-sm ms-2 text-muted line-through">{formatPrice(product.basePrice)}</span>
            )}
          </p>
          <span className="flex items-center gap-2">
            <span className={`h-1.5 w-1.5 rounded-full ${status.dot}`} />
            <span className="label-caps text-secondary">{status.label}</span>
          </span>
        </div>
      </div>
    </Link>
  )
}