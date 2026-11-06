export interface ShopFilterValues {
  q: string
  category: string
  available: boolean
  min: string
  max: string
  sort: string
}

interface Props {
  values: ShopFilterValues
  categories: string[]
  onChange: (key: keyof ShopFilterValues, value: string) => void
  onReset: () => void
}

const field =
  'w-full border-0 border-b border-line bg-transparent py-2 text-ink placeholder:text-muted focus:border-ink focus:outline-none'

export default function ShopFilters({ values, categories, onChange, onReset }: Props) {
  return (
    <div className="space-y-8">
      <div>
        <label className="label-caps text-secondary" htmlFor="search">Search</label>
        <input
          id="search"
          type="search"
          value={values.q}
          onChange={(e) => onChange('q', e.target.value)}
          placeholder="Search products"
          className={field}
        />
      </div>

      <div>
        <p className="label-caps mb-3 text-secondary">Category</p>
        <div className="flex flex-wrap gap-2">
          {['All', ...categories].map((c) => {
            const active = (c === 'All' && !values.category) || c === values.category
            return (
              <button
                key={c}
                onClick={() => onChange('category', c === 'All' ? '' : c)}
                className={`label-caps border px-3 py-2 ${
                  active ? 'border-ink bg-ink text-canvas' : 'border-line hover:border-ink'
                }`}
              >
                {c}
              </button>
            )
          })}
        </div>
      </div>

      <div>
        <p className="label-caps mb-3 text-secondary">Price</p>
        <div className="flex items-center gap-3">
          <input
            type="number"
            min={0}
            inputMode="numeric"
            value={values.min}
            onChange={(e) => onChange('min', e.target.value)}
            placeholder="Min"
            className={field}
          />
          <span className="text-muted">–</span>
          <input
            type="number"
            min={0}
            inputMode="numeric"
            value={values.max}
            onChange={(e) => onChange('max', e.target.value)}
            placeholder="Max"
            className={field}
          />
        </div>
      </div>

      <label className="flex cursor-pointer items-center gap-3">
        <input
          type="checkbox"
          checked={values.available}
          onChange={(e) => onChange('available', e.target.checked ? '1' : '')}
          className="h-4 w-4 shrink-0 appearance-none border border-ink checked:bg-ink checked:shadow-[inset_0_0_0_2px_var(--color-canvas)]"
        />
        <span className="body-md">Available in this branch</span>
      </label>

      <div>
        <label className="label-caps text-secondary" htmlFor="sort">Sort by</label>
        <select
          id="sort"
          value={values.sort}
          onChange={(e) => onChange('sort', e.target.value)}
          className={field}
        >
          <option value="">Featured</option>
          <option value="price-asc">Price: low to high</option>
          <option value="price-desc">Price: high to low</option>
          <option value="name">Name</option>
        </select>
      </div>

      <button
        onClick={onReset}
        className="label-caps w-full border border-ink px-8 py-4 hover:bg-ink hover:text-canvas"
      >
        Reset filters
      </button>
    </div>
  )
}