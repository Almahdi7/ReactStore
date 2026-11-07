import { Link } from 'react-router-dom'
import Container from '../../components/Container'
import ProductCard from '../../components/ProductCard'
import { useBranch } from '../../context/BranchContext'
import { useBranchProducts } from '../../hooks/useBranchProducts'
  
export default function Home() {
  const { selectedBranch } = useBranch()
  const { data: products = [], isLoading } = useBranchProducts()

  const available = products.filter((p) => p.stock > 0)
  const offers = available.filter((p) => p.offerPercent)

  return (
    <main>
      {/* Hero */}
      <Container className="grid gap-10 py-12 md:grid-cols-12 md:items-center md:py-20">
        <div className="md:col-span-7">
          <p className="label-caps text-bronze">{selectedBranch?.name ?? 'Atelier'}</p>
          <h1 className="display-hero mt-4">Curated objects for a considered life.</h1>
          <p className="body-lg mt-6 max-w-xl text-secondary">
            Fashion, home, beauty and refined objects, available at your branch today.
          </p>
          <Link
            to="/shop"
            className="label-caps mt-8 inline-block border border-ink bg-ink px-8 py-4 text-canvas hover:bg-ink-hover"
          >
            Explore the collection
          </Link>
        </div>
        <div className="aspect-[4/5] overflow-hidden border border-line bg-canvas-alt md:col-span-5">
          <img src="https://picsum.photos/seed/atelier-hero/800/1000" alt="" className="h-full w-full object-cover" />
        </div>
      </Container>

      {isLoading && <Container className="py-16"><p className="label-caps text-secondary">Loading…</p></Container>}

      {/* Offers */}
      {offers.length > 0 && (
        <section className="border-y border-line bg-canvas-alt py-16">
          <Container>
            <p className="label-caps text-bronze">Limited</p>
            <h2 className="headline-lg mb-10 mt-2">Current offers</h2>
            <div className="grid grid-cols-2 gap-6 lg:grid-cols-4">
              {offers.map((p) => <ProductCard key={p.id} product={p} />)}
            </div>
          </Container>
        </section>
      )}

      {/* Available in this branch */}
      {!isLoading && (
        <section className="py-16">
          <Container>
            <p className="label-caps text-secondary">At {selectedBranch?.name}</p>
            <div className="mb-10 mt-2 flex items-end justify-between">
              <h2 className="headline-lg">Available now</h2>
              <Link to="/shop" className="label-caps border-b border-ink pb-1">View all</Link>
            </div>
            {available.length === 0 ? (
              <p className="body-md text-muted">Nothing is available in this branch right now.</p>
            ) : (
              <div className="grid grid-cols-2 gap-6 lg:grid-cols-4">
                {available.slice(0, 8).map((p) => <ProductCard key={p.id} product={p} />)}
              </div>
            )}
          </Container>
        </section>
      )}
    </main>
  )
}