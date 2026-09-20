import type {
  ConciergeRequestPaginatedResponse,
  ConciergeRequestPayload,
  ConciergeRequestState,
  ConciergeRequestStatus,
} from './concierge-request.types.ts'
import { api, unwrap } from '@/services/api.ts'

export const conciergeRequestService = {
  create: (payload: ConciergeRequestPayload): Promise<ConciergeRequestState> =>
    api
      .post<{
        data: ConciergeRequestState
      }>('/public/concierge-requests', payload)
      .then(unwrap),

  getPaginated: (params: {
    page: number
    pageSize: number
    status?: string
  }): Promise<ConciergeRequestPaginatedResponse> =>
    api
      .get<{ data: ConciergeRequestPaginatedResponse }>(
        '/admin/concierge-requests',
        {
          params: {
            page: params.page,
            per_page: params.pageSize,
            status: params.status,
          },
        },
      )
      .then(unwrap),

  updateStatus: (
    id: number | string,
    status: ConciergeRequestStatus,
  ): Promise<ConciergeRequestState> =>
    api
      .put<{
        data: ConciergeRequestState
      }>(`/admin/concierge-requests/${id}/status`, { status })
      .then(unwrap),

  destroy: (id: number | string): Promise<void> =>
    api.delete(`/admin/concierge-requests/${id}`).then(() => undefined),
}
