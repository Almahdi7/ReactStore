export type BranchStatus = 'active' | 'inactive'

export interface Branch {
  id: string
  name: string
  address: string
  location: { lat: number; lng: number }
  workingHours: string
  status: BranchStatus
}