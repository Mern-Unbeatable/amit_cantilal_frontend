import type {
  AdminCreateFleetPayload,
  AdminUpdateFleetPayload,
  FleetPaginatedResult,
  FleetPaginationParams,
  FleetVehicle,
} from '@/features/fleet/fleet.types.ts'
import { api, unwrap } from '@/services/api.ts'

type FleetListResponse = Array<FleetVehicle>

type FleetPaginatedResponse = {
  data: FleetListResponse
  pagination?: {
    total?: number
  }
  meta?: {
    total?: number
  }
  total?: number
}

export const fleetService = {
  all: (): Promise<Array<FleetVehicle>> =>
    api
      .get<{ data: FleetListResponse }>('/public/fleet')
      .then(unwrap),
  byId: (id: string | number): Promise<FleetVehicle> =>
    api
      .get<{ data: FleetVehicle }>(`/public/fleet/${id}`)
      .then(unwrap),
  paginated: ({ page, pageSize, search }: FleetPaginationParams): Promise<FleetPaginatedResult> =>
    api
      .get<FleetPaginatedResponse>('/public/fleet', {
        params: {
          page,
          per_page: pageSize,
          ...(search ? { search } : {}),
        },
      })
      .then((response) => {
        const items = response.data.data
        const totalFromPayload =
          response.data.pagination?.total
          ?? response.data.meta?.total
          ?? response.data.total

        return {
          items,
          totalCount: totalFromPayload ?? items.length,
        }
      }),

  create: async (payload: AdminCreateFleetPayload): Promise<FleetVehicle> => {
    const formData = new FormData()
    formData.append('name', payload.name)

    if (payload.description) {
      formData.append('description', payload.description)
    }

    formData.append('image', payload.image)
    formData.append('passengers', String(payload.passengers))
    formData.append('suitcases', String(payload.suitcases))
    formData.append('price', String(payload.price))
    formData.append('fuel_type', payload.fuel_type)

    if (typeof payload.sort_order === 'number') {
      formData.append('sort_order', String(payload.sort_order))
    }

    if (typeof payload.active === 'boolean') {
      formData.append('active', String(payload.active))
    }

    const response = await api.post<{
      data: FleetVehicle
    }>('/admin/fleet', formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    })

    return unwrap(response)
  },

  update: async (id: string | number, payload: AdminUpdateFleetPayload): Promise<FleetVehicle> => {
    const formData = new FormData()
    formData.append('_method', 'PUT')
    formData.append('name', payload.name)

    if (payload.description) {
      formData.append('description', payload.description)
    }

    if (payload.image) {
      formData.append('image', payload.image)
    }

    formData.append('passengers', String(payload.passengers))
    formData.append('suitcases', String(payload.suitcases))
    formData.append('price', String(payload.price))
    formData.append('fuel_type', payload.fuel_type)

    if (typeof payload.sort_order === 'number') {
      formData.append('sort_order', String(payload.sort_order))
    }

    if (typeof payload.active === 'boolean') {
      formData.append('active', String(payload.active))
    }

    const response = await api.post<{
      data: FleetVehicle
    }>(`/admin/fleet/${id}`, formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    })

    return unwrap(response)
  },

  remove: async (id: string | number): Promise<void> => {
    await api.delete(`/admin/fleet/${id}`)
  },
}
