import type {
  CreateBookingResponse,
} from '@/features/booking/booking.types.ts'
import type {
  PartnershipRequestPaginatedResponse,
  PartnershipRequestPayload,
  PartnershipRequestState,
  PartnershipRequestStatus,
} from '@/features/partnership-request/partnership-request.types.ts'
import { api, unwrap } from '@/services/api.ts'

export const partnershipRequestService = {
  request: async (payload: PartnershipRequestPayload) => {
    const response = await api.post<{ data: CreateBookingResponse }>(
      '/public/partnership-requests',
      payload,
    )
    return unwrap(response)
  },

  getPaginatedPartnershipRequests: async (params: {
    page: number
    pageSize: number
    source?: string
    status?: string
  }) => {
    const response = await api.get<{ data: PartnershipRequestPaginatedResponse }>(
      '/admin/partnerships',
      {
        params: {
          page: params.page,
          per_page: params.pageSize,
          source: params.source,
          status: params.status,
        },
      },
    )
    return unwrap(response)
  },

  updateStatus: (
    id: number | string,
    status: PartnershipRequestStatus,
  ): Promise<PartnershipRequestState> =>
    api
      .put<{ data: PartnershipRequestState }>(
        `/admin/partnerships/${id}/status`,
        { status },
      )
      .then(unwrap),
}


