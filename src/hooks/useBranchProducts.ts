import { useQuery } from '@tanstack/react-query'
import { useBranch } from '../context/BranchContext'
import { getProducts } from '../services/productService'

export function useBranchProducts() {
  const { selectedBranch } = useBranch()
  return useQuery({
    queryKey: ['products', selectedBranch?.id],
    queryFn: () => getProducts(selectedBranch!.id),
    enabled: !!selectedBranch,
  })
}