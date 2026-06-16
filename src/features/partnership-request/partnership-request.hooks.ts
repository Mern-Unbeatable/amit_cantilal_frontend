import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import type { PartnershipRequestStatus } from '@/features/partnership-request/partnership-request.types.ts'
import { partnershipRequestService } from '@/features/partnership-request/partnership-request.service.ts'
export const partnershipRequestKeys = {
  all: ['partnership-request'] as const,
  paginatedList: (params: object) =>
    [...partnershipRequestKeys.all, 'list', params] as const,
}

export function usePartnershipRequest() {
  return useMutation({
    mutationFn: partnershipRequestService.request,
    onSuccess: async (data) => {
      console.log('Partnership request successful:', data)
    },
  })
}

export function useGetPaginatedPartnershipRequest(params: {
  page: number
  pageSize: number
  source?: string
  status?: string
}) {
  return useQuery({
    queryKey: partnershipRequestKeys.paginatedList(params),
    queryFn: () => partnershipRequestService.getPaginatedPartnershipRequests(params),
    staleTime: 1000 * 60 * 5,
  })
}

export function useUpdatePartnershipRequestStatus() {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: ({
      id,
      status,
    }: {
      id: number | string
      status: PartnershipRequestStatus
    }) => partnershipRequestService.updateStatus(id, status),
    onSuccess: async () => {
      await queryClient.invalidateQueries({
        queryKey: partnershipRequestKeys.all,
      })
    },
  })
}