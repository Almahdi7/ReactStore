import { useMemo } from 'react'
import { useSearchParams } from 'react-router-dom'
import Container from '../../components/Container'
import ProductCard from '../../components/ProductCard'
import ShopFilters, { type ShopFilterValues } from '../../components/ShopFilters'
import { useBranch } from '../../context/BranchContext'
import { useBranchProducts } from '../../hooks/useBranchProducts'
import { getFinalPrice } from '../../utils/price'

export default function Shop() {
  const { selectedBranch } = useBranch()
  const { data: products = [], isLoading } = useBranchProducts()
  const [params, setParams] = useSearchParams()

  const values: ShopFilterValues = {
    q: params.get('q') ?? '',
    category: params.get('category') ?? '',
    available: params.get('available') === '1',
    min: params.get('min') ?? '',
    max: params.get('max') ?? '',
    sort: params.get('sort') ?? '',
  }

  const setFilter = (key: keyof ShopFilterValues, value: string) => {
    const next = new URLSearchParams(params)
    if (value) next.set(key, value)
    else next.delete(key)
    setParams(next, { replace: true })
  }

  const categories = useMemo(() => [...new Set(products.map((p) => p.category))], [products])

  const filtered = useMemo(() => {
    const q = values.q.trim().toLowerCase()
    const min = values.min === '' ? null : Number(values.min)
    const max = values.max === '' ? null : Number(values.max)

    const list = products.filter((p) => {
      const price = getFinalPrice(p.basePrice, p.offerPercent)
      if (q && !`${p.name} ${p.description} ${p.category}`.toLowerCase().includes(q)) return false
      if (values.category && p.category !== values.category) return false
      if (values.available && p.stock <= 0) return false
      if (min !== null && price < min) return false
      if (max !== null && price > max) return false
      return true
    })

    const byPrice = (p: (typeof list)[number]) => getFinalPrice(p.basePrice, p.offerPercent)
    if (values.sort === 'price-asc') list.sort((a, b) => byPrice(a) - byPrice(b))
    if (values.sort === 'price-desc') list.sort((a, b) => byPrice(b) - byPrice(a))
    if (values.sort === 'name') list.sort((a, b) => a.name.localeCompare(b.name))
    return list
  }, [products, values.q, values.category, values.available, values.min, values.max, values.sort])

  return (
    <main className="py-12">
      <Container>
        <p className="label-caps text-secondary">{selectedBranch?.name}</p>
        <h1 className="headline-lg mt-2">The collection</h1>

        <div className="mt-10 grid gap-10 lg:grid-cols-12">
          <aside className="lg:col-span-3">
            <ShopFilters
              values={values}
              categories={categories}
              onChange={setFilter}
              onReset={() => setParams({}, { replace: true })}
            />
          </aside>

          <section className="lg:col-span-9">
            <p className="label-caps mb-6 border-b border-line pb-4 text-secondary">
              {isLoading ? 'Loading…' : `${filtered.length} ${filtered.length === 1 ? 'piece' : 'pieces'}`}
            </p>

            {!isLoading && filtered.length === 0 ? (
              <p className="body-md text-muted">No products match your filters.</p>
            ) : (
              <div className="grid grid-cols-2 gap-6 xl:grid-cols-3">
                {filtered.map((p) => (
                  <ProductCard key={p.id} product={p} />
                ))}
              </div>
            )}
          </section>
        </div>
      </Container>
    </main>
  )
}