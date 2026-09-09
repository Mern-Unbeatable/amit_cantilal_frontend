export interface PublicBlockedDateRange {
  start_date: string
  end_date: string
  message: string | null
}

export interface BlockedDateRange extends PublicBlockedDateRange {
  id: number
  label: string
  created_at: string
  updated_at: string
}

export interface CreateBlockedDateRangePayload {
  label: string
  start_date: string
  end_date: string
  message?: string
}
