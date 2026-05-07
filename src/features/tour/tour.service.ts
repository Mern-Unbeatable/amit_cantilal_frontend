import type {
  AdminCreateTourPayload,
  AdminUpdateTourPayload,
  Tour,
  TourOptionItem,
  TourPaginatedResult,
  TourPaginationParams,
} from '@/features/tour/tour.types.ts'
import { api, unwrap } from '@/services/api.ts'

type TourListResponse = Array<Tour>

type TourPaginatedResponse = {
  data: TourListResponse
  pagination?: {
    total?: number
  }
  meta?: {
    total?: number
  }
  total?: number
}

function normalizeOptionValues(
  items?: Array<string | TourOptionItem>,
): Array<string> {
  return (items ?? [])
    .map((item) => {
      if (typeof item === 'string') {
        return item
      }

      return item.label ?? ''
    })
    .map((item) => item.trim())
    .filter((item) => item.length > 0)
}

export const tourService = {
  all: (): Promise<Array<Tour>> =>
    api.get<{ data: Array<Tour> }>('/public/tours').then(unwrap),

  byId: (id: string | number): Promise<Tour> =>
    api.get<{ data: Tour }>(`/admin/tours/${id}`).then(unwrap),

  bySlug: (slug: string): Promise<Tour> =>
    api.get<{ data: Tour }>(`/public/tours/${slug}`).then(unwrap),

  paginated: ({
    page,
    pageSize,
    search,
    category,
  }: TourPaginationParams): Promise<TourPaginatedResult> =>
    api
      .get<TourPaginatedResponse>('/admin/tours', {
        params: {
          page,
          per_page: pageSize,
          ...(search ? { search } : {}),
          ...(category ? { category } : {}),
        },
      })
      .then((response) => {
        const items = response.data.data
        const totalFromPayload =
          response.data.pagination?.total ??
          response.data.meta?.total ??
          response.data.total

        return {
          items,
          totalCount: totalFromPayload ?? items.length,
        }
      }),

  create: async (payload: AdminCreateTourPayload): Promise<Tour> => {
    const response = await api.post<{ data: Tour }>('/admin/tours', {
      title: payload.title,
      excerpt: payload.excerpt ?? null,
      description: payload.description,
      price: payload.price,
      duration: payload.duration,
      max_guests: payload.max_guests,
      category: payload.category,
      cover_image: payload.cover_image ?? null,
      active: payload.active ?? true,
      ...(typeof payload.sort_order === 'number'
        ? { sort_order: payload.sort_order }
        : {}),
      ...(payload.inclusions && payload.inclusions.length > 0
        ? { inclusions: payload.inclusions }
        : {}),
      ...(payload.exclusions && payload.exclusions.length > 0
        ? { exclusions: payload.exclusions }
        : {}),
    })

    return unwrap(response)
  },

  update: async (
    id: string | number,
    payload: AdminUpdateTourPayload,
  ): Promise<Tour> => {
    const response = await api.put<{ data: Tour }>(`/admin/tours/${id}`, {
      title: payload.title,
      excerpt: payload.excerpt ?? null,
      description: payload.description,
      price: payload.price,
      duration: payload.duration,
      max_guests: payload.max_guests,
      category: payload.category,
      cover_image: payload.cover_image ?? null,
      active: payload.active ?? true,
      ...(typeof payload.sort_order === 'number'
        ? { sort_order: payload.sort_order }
        : {}),
      ...(payload.inclusions && payload.inclusions.length > 0
        ? { inclusions: payload.inclusions }
        : {}),
      ...(payload.exclusions && payload.exclusions.length > 0
        ? { exclusions: payload.exclusions }
        : {}),
    })

    return unwrap(response)
  },

  remove: async (id: string | number): Promise<void> => {
    await api.delete(`/admin/tours/${id}`)
  },

  normalizeOptionValues,
}
