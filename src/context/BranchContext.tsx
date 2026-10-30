/* eslint-disable react-refresh/only-export-components */
import { createContext, useCallback, useContext, useMemo, useState, type ReactNode } from 'react'
import { useQuery } from '@tanstack/react-query'
import { getBranches } from '../services/branchService'
import type { Branch } from '../types/branch'

const STORAGE_KEY = 'selectedBranchId'

interface BranchContextValue {
  branches: Branch[]
  selectedBranch: Branch | null
  isLoading: boolean
  isSelectorOpen: boolean
  selectBranch: (id: string) => void
  openSelector: () => void
  closeSelector: () => void
}

const BranchContext = createContext<BranchContextValue | undefined>(undefined)

function readStoredId(): string | null {
  try {
    return localStorage.getItem(STORAGE_KEY)
  } catch {
    return null
  }
}

export function BranchProvider({ children }: { children: ReactNode }) {
  const { data: branches = [], isLoading } = useQuery({
    queryKey: ['branches'],
    queryFn: getBranches,
  })

  const [selectedId, setSelectedId] = useState<string | null>(readStoredId)
  const [manualOpen, setManualOpen] = useState(false)

  // Stored id must still exist and be active, otherwise treat as "no branch selected"
  const selectedBranch = useMemo(
    () => branches.find((b) => b.id === selectedId && b.status === 'active') ?? null,
    [branches, selectedId],
  )

  const needsSelection = !isLoading && !selectedBranch
  const isSelectorOpen = manualOpen || needsSelection

  const selectBranch = useCallback((id: string) => {
    setSelectedId(id)
    try {
      localStorage.setItem(STORAGE_KEY, id)
    } catch {
      /* storage unavailable: selection still works for this session */
    }
    setManualOpen(false)
  }, [])

  const openSelector = useCallback(() => setManualOpen(true), [])
  const closeSelector = useCallback(() => setManualOpen(false), [])

  const value = useMemo(
    () => ({ branches, selectedBranch, isLoading, isSelectorOpen, selectBranch, openSelector, closeSelector }),
    [branches, selectedBranch, isLoading, isSelectorOpen, selectBranch, openSelector, closeSelector],
  )

  return <BranchContext.Provider value={value}>{children}</BranchContext.Provider>
}

export function useBranch() {
  const ctx = useContext(BranchContext)
  if (!ctx) throw new Error('useBranch must be used inside <BranchProvider>')
  return ctx
}