export type PartnershipRequestStatus = 'pending' | 'approved' | 'rejected'

export type PartnershipRequestReSource = 'partnerships' | 'b2b'

export interface PartnershipRequestPayload {
  source: 'b2b' | 'partnerships'
  company_name: string
  contact_name: string
  position?: string
  email: string
  phone?: string
  message?: string
  company_type?: string
}

export interface PartnershipRequestState {
  id: number
  source: PartnershipRequestReSource
  company_name: string
  contact_name: string
  position: string | null
  email: string
  phone: string | null
  message: string | null
  company_type: string | null
  status: PartnershipRequestStatus
  created_at: string
  updated_at: string
}

export interface UpdatePartnershipRequestStatusPayload {
  status: PartnershipRequestStatus
}

export interface PartnershipRequestPaginatedResponse {
  data: Array<PartnershipRequestState>
  pagination: {
    current_page: number
    last_page: number
    per_page: number
    total: number
  }
}