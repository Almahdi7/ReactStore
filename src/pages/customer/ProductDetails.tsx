import { useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import BranchAvailability from '../../components/BranchAvailability'
import Container from '../../components/Container'
import QuantityStepper from '../../components/QuantityStepper'
import { useBranch } from '../../context/BranchContext'
import { useBranchProducts } from '../../hooks/useBranchProducts'
import { formatPrice, getFinalPrice } from '../../utils/price'
import { getStockStatus, STOCK_STYLE } from '../../utils/stock'

export default function ProductDetails() {
  const { id } = useParams<{ id: string }>()
  const { selectedBranch, branches, selectBranch } = useBranch()
  const { data: products = [], isLoading } = useBranchProducts()
  const quantityKey = `${id ?? ''}:${selectedBranch?.id ?? ''}`
  const [quantityState, setQuantityState] = useState({ key: '', value: 1 })
  const quantity = quantityState.key === quantityKey ? quantityState.value : 1

  const product = products.find((p) => p.id === id)

  if (isLoading) {
    return <Container className="py-16"><p className="label-caps text-secondary">Loading…</p></Container>
  }

  if (!product) {
    return (
      <Container className="py-16">
        <h1 className="headline-lg">Product not found</h1>
        <Link to="/shop" className="label-caps mt-6 inline-block border-b border-ink pb-1">Back to the collection</Link>
      </Container>
    )
  }

  const status = getStockStatus(product.stock)
  const style = STOCK_STYLE[status]
  const finalPrice = getFinalPrice(product.basePrice, product.offerPercent)
  const inStock = product.stock > 0

  // Branches that still have the product, offered when the current one is out
  const alternatives = branches.filter(
    (b) => b.status === 'active' && b.id !== selectedBranch?.id && (product.inventory[b.id] ?? 0) > 0,
  )

  const handleAddToCart = () => {
    // TODO(N): replace with CartContext, e.g. addItem(product, quantity)
    console.log('Add to cart', { productId: product.id, quantity, branchId: selectedBranch?.id })
  }

  return (
    <main className="py-10">
      <Container>
        <Link to="/shop" className="label-caps text-secondary hover:text-ink">← Back to the collection</Link>

        <div className="mt-8 grid gap-10 md:grid-cols-12">
          {/* Image: 7 columns on desktop, per the editorial grid */}
          <div className="md:col-span-7">
            <div className="relative aspect-[4/5] overflow-hidden border border-line bg-canvas-alt">
              <img src={product.image} alt={product.name} className="h-full w-full object-cover" />
              {product.offerPercent && (
                <span className="label-caps absolute start-4 top-4 bg-parchment px-2.5 py-1">
                  -{product.offerPercent}%
                </span>
              )}
            </div>
          </div>

          {/* Product context panel: 5 columns */}
          <div className="space-y-8 md:col-span-5">
            <div>
              <p className="label-caps text-secondary">{product.category}</p>
              <h1 className="headline-lg mt-2">{product.name}</h1>
              <p className="headline-md mt-4">
                {formatPrice(finalPrice)}
                {product.offerPercent && (
                  <span className="body-md ms-3 text-muted line-through">{formatPrice(product.basePrice)}</span>
                )}
              </p>
            </div>

            <p className="body-lg text-secondary">{product.description}</p>

            <div className="flex items-center gap-2 border-y border-line py-4">
              <span className={`h-1.5 w-1.5 rounded-full ${style.dot}`} />
              <span className="label-caps">
                {inStock
                  ? `${style.label} at ${selectedBranch?.name}${status === 'low' ? ` · only ${product.stock} left` : ''}`
                  : `Not available at ${selectedBranch?.name}`}
              </span>
            </div>

            {inStock ? (
              <div className="flex items-center gap-4">
                <QuantityStepper
                  value={quantity}
                  max={product.stock}
                  onChange={(value) => setQuantityState({ key: quantityKey, value })}
                />
                <button
                  onClick={handleAddToCart}
                  className="label-caps flex-1 border border-ink bg-ink px-8 py-4 text-canvas hover:bg-ink-hover"
                >
                  Add to bag
                </button>
              </div>
            ) : (
              <div className="border border-line bg-canvas-alt p-5">
                <p className="body-md">This piece is not available in this branch.</p>
                {alternatives.length > 0 ? (
                  <div className="mt-4 flex flex-wrap gap-3">
                    {alternatives.map((b) => (
                      <button
                        key={b.id}
                        onClick={() => selectBranch(b.id)}
                        className="label-caps border border-ink px-4 py-3 hover:bg-ink hover:text-canvas"
                      >
                        Switch to {b.name}
                      </button>
                    ))}
                  </div>
                ) : (
                  <p className="body-sm mt-2 text-muted">It is currently unavailable in all branches.</p>
                )}
              </div>
            )}

            <BranchAvailability product={product} />
          </div>
        </div>
      </Container>
    </main>
  )
}