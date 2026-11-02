import { useBranch } from '../context/BranchContext'

export default function BranchSelector() {
  const { branches, selectedBranch, isSelectorOpen, closeSelector, selectBranch } = useBranch()
  if (!isSelectorOpen) return null

  const forced = !selectedBranch // first visit: cannot be dismissed

  return (
    <div className="fixed inset-0 z-50 flex justify-end">
      <div className="absolute inset-0 bg-ink/40" onClick={forced ? undefined : closeSelector} />
      <aside
        role="dialog"
        aria-modal="true"
        aria-label="Select your branch"
        className="relative h-full w-full max-w-md overflow-y-auto border-s border-line bg-canvas p-8"
      >
        <div className="mb-8 flex items-start justify-between">
          <div>
            <p className="label-caps text-secondary">Our Branches</p>
            <h2 className="headline-md mt-2">Choose your atelier</h2>
          </div>
          {!forced && (
            <button onClick={closeSelector} className="label-caps text-secondary hover:text-ink">
              Close
            </button>
          )}
        </div>

        <ul className="border-t border-line">
          {branches.map((b) => {
            const active = b.status === 'active'
            const selected = b.id === selectedBranch?.id
            return (
              <li key={b.id} className="border-b border-line">
                <button
                  disabled={!active}
                  onClick={() => selectBranch(b.id)}
                  className="flex w-full items-start gap-4 py-4 text-start enabled:hover:bg-canvas-alt disabled:opacity-50"
                >
                  <span
                    className={`mt-2 h-1.5 w-1.5 shrink-0 rounded-full ${
                      selected ? 'bg-in-stock' : active ? 'bg-bronze' : 'bg-line'
                    }`}
                  />
                  <span className="flex-1">
                    <span className="headline-sm block">{b.name}</span>
                    <span className="body-sm block text-muted">{b.address}</span>
                    <span className="location-tag mt-1 block text-secondary">
                      {active ? b.workingHours : 'Temporarily closed'}
                    </span>
                  </span>
                </button>
              </li>
            )
          })}
        </ul>
      </aside>
    </div>
  )
}