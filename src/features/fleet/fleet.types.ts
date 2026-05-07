
export type VehicleCategory = 'electric' | 'diesel'

export interface FleetVehicle {
  id: number | string
  name: string
  description?: string | null
  image?: string | null
  passengers: number
  suitcases: number
  price: number
  fuel_type?: VehicleCategory | null
  category?: VehicleCategory | null
  is_electric?: boolean | null
}

export interface AllFleetResponse {
  data:    Array<FleetVehicle>
}

export interface FleetPaginationParams {
  page: number
  pageSize: number
  search?: string
}

export interface FleetPaginatedResult {
  items: Array<FleetVehicle>
  totalCount: number
}

export interface AdminCreateFleetPayload {
  name: string
  description?: string | null
  image: File
  passengers: number
  suitcases: number
  price: number
  fuel_type: VehicleCategory
  active?: boolean
  sort_order?: number
}

export interface AdminUpdateFleetPayload {
  name: string
  description?: string | null
  image?: File
  passengers: number
  suitcases: number
  price: number
  fuel_type: VehicleCategory
  active?: boolean
  sort_order?: number
}
