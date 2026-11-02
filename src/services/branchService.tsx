import type { Branch } from '../types/branch'

// TEMPORARY: replace with the real API call when L's mock API / backend is ready
const MOCK_BRANCHES: Branch[] = [
  { id: 'b1', name: 'Atelier I', address: 'Downtown Flagship, 12 Main Street', location: { lat: 24.7136, lng: 46.6753 }, workingHours: '10:00 – 22:00', status: 'active' },
  { id: 'b2', name: 'Atelier II', address: 'Uptown Sanctuary, 48 Garden Avenue', location: { lat: 24.7743, lng: 46.7386 }, workingHours: '10:00 – 21:00', status: 'active' },
  { id: 'b3', name: 'Atelier III', address: 'Harbor District, 3 Pier Road', location: { lat: 24.6408, lng: 46.7728 }, workingHours: '12:00 – 20:00', status: 'inactive' },
]

export async function getBranches(): Promise<Branch[]> {
  await new Promise((r) => setTimeout(r, 300))
  return MOCK_BRANCHES
}