export type TourCategory = 'private' | 'on_demand'

export interface TourOptionItem {
  id?: string | number
  label?: string
  sort_order?: number
}

export interface Tour {
  id: string | number
  title?: string
  name?: string
  slug?: string
  excerpt?: string | null
  description: string
  detailed_description?: string | null
  price: number
  price_eur?: number
  price_display?: string
  duration?: string
  duration_minutes?: number
  max_guests: number
  category: TourCategory
  cover_image?: string | null
  is_available?: boolean
  active?: boolean
  sort_order?: number | null
  inclusions?: Array<string | TourOptionItem>
  exclusions?: Array<string | TourOptionItem>
  images?: Array<TourImage>
  start_times?: Array<string>
  pickup_info?: string | null
  itinerary?: Array<{ title?: string; body?: string }>
  pricing_tiers?: Array<{ pax: number; price: number }>
  max_pax?: number
}

export interface TourImage {
  id: number
  is_cover: boolean
  sort_order: number
  url: string
  alt?: string
  tour_id: string | number
}

export interface AllTourResponse {
  data: Array<Tour>
}

export interface TourPaginationParams {
  page: number
  pageSize: number
  search?: string
  category?: TourCategory
}

export interface TourPaginatedResult {
  items: Array<Tour>
  totalCount: number
}

export interface AdminCreateTourPayload {
  title: string
  excerpt?: string | null
  description: string
  price: number
  duration: string
  max_guests: number
  category: TourCategory
  cover_image?: string | null
  active?: boolean
  sort_order?: number
  inclusions?: Array<string>
  exclusions?: Array<string>
}

export interface AdminUpdateTourPayload extends AdminCreateTourPayload {}
