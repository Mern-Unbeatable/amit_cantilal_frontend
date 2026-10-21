import { api, unwrap } from '@/services/api.ts'
import type {
  GreetAssistBookingPayload,
  GreetAssistBookingResponse,
} from './greet-assist.types.ts'

export const greetAssistService = {
  createBooking: async (
    payload: GreetAssistBookingPayload,
  ): Promise<GreetAssistBookingResponse> => {
    const response = await api.post<{ data: GreetAssistBookingResponse }>(
      '/public/bookings',
      payload,
    )
    return unwrap(response)
  },
}
