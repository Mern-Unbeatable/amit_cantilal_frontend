export type ConciergeRequestStatus = 'new' | 'in_progress' | 'resolved'

export interface ConciergeRequestPayload {
  name: string
  email: string
  phone?: string
  airport: string
  flight_details?: string
  passengers?: number
  contact_method: 'Email' | 'Phone' | 'WhatsApp'
  notes?: string
}

export interface ConciergeRequestState {
  id: number
  name: string
  email: string
  phone: string | null
  airport: string
  flight_details: string | null
  passengers: number | null
  contact_method: string
  notes: string | null
  status: ConciergeRequestStatus
  created_at: string
  updated_at: string
}

export interface ConciergeRequestPaginatedResponse {
  data: Array<ConciergeRequestState>
  pagination: {
    current_page: number
    last_page: number
    per_page: number
    total: number
  }
}
