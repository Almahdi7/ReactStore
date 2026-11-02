import { Link } from 'react-router-dom'
import { useBranch } from '../context/BranchContext'

export default function Header() {
  const { selectedBranch, openSelector } = useBranch()

  return (
    <header className="flex items-center justify-between border-b border-line px-5 py-4 md:px-16">
      <Link to="/" className="headline-sm">Atelier</Link>
      <button
        onClick={openSelector}
        className="flex items-center gap-2 border border-line px-3 py-2 hover:bg-canvas-alt"
      >
        <span className="h-1.5 w-1.5 rounded-full bg-in-stock" />
        <span className="label-caps">{selectedBranch?.name ?? 'Select branch'}</span>
      </button>
    </header>
  )
}