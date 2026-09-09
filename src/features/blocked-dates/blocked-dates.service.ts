import type {
  BlockedDateRange,
  CreateBlockedDateRangePayload,
  PublicBlockedDateRange,
} from '@/features/blocked-dates/blocked-dates.types.ts'
import { api, unwrap } from '@/services/api.ts'

export const blockedDatesService = {
  // public
  getPublicBlockedDates: (): Promise<Array<PublicBlockedDateRange>> =>
    api
      .get<{ data: Array<PublicBlockedDateRange> }>('/public/blocked-dates')
      .then(unwrap),

  // admin
  getAdminBlockedDates: (): Promise<Array<BlockedDateRange>> =>
    api
      .get<{ data: Array<BlockedDateRange> }>('/admin/blocked-dates')
      .then(unwrap),

  create: (payload: CreateBlockedDateRangePayload): Promise<BlockedDateRange> =>
    api
      .post<{ data: BlockedDateRange }>('/admin/blocked-dates', payload)
      .then(unwrap),

  remove: (id: number): Promise<void> =>
    api.delete(`/admin/blocked-dates/${id}`).then(() => undefined),
}
