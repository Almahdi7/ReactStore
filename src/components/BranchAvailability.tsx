import { useBranch } from '../context/BranchContext'
import type { ProductWithStock } from '../types/product'
import { getStockStatus, STOCK_STYLE } from '../utils/stock'

export default function BranchAvailability({ product }: { product: ProductWithStock }) {
  const { branches, selectedBranch, selectBranch } = useBranch()

  return (
    <div>
      <p className="label-caps mb-3 text-secondary">Availability by branch</p>
      <ul className="border-t border-line">
        {branches
          .filter((b) => b.status === 'active')
          .map((b) => {
            const qty = product.inventory[b.id] ?? 0
            const status = STOCK_STYLE[getStockStatus(qty)]
            const isCurrent = b.id === selectedBranch?.id
            return (
              <li key={b.id} className="flex items-center justify-between border-b border-line py-4">
                <div>
                  <p className="headline-sm">{b.name}</p>
                  <p className="body-sm text-muted">{b.address}</p>
                </div>
                <div className="flex items-center gap-4">
                  <span className="flex items-center gap-2">
                    <span className={`h-1.5 w-1.5 rounded-full ${status.dot}`} />
                    <span className="label-caps text-secondary">{status.label}</span>
                  </span>
                  {isCurrent ? (
                    <span className="label-caps border border-line px-3 py-2 text-secondary">Current</span>
                  ) : (
                    qty > 0 && (
                      <button
                        onClick={() => selectBranch(b.id)}
                        className="label-caps border border-ink px-3 py-2 hover:bg-ink hover:text-canvas"
                      >
                        Switch
                      </button>
                    )
                  )}
                </div>
              </li>
            )
          })}
      </ul>
    </div>
  )
}