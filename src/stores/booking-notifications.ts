import { create } from 'zustand'
import { createJSONStorage, persist } from 'zustand/middleware'

export interface BookingNotification {
  id: number
  reference: string
  name: string
  updatedAt: string
}

interface BookingNotificationsState {
  // IDs already surfaced as a toast/notification — never toast for these
  // again, even after the unread list is cleared.
  seenIds: Array<number>
  // Unread items shown in the bell dropdown, newest first.
  notifications: Array<BookingNotification>
  // False until the very first poll resolves. The first poll's results are
  // the existing backlog, not "new" bookings — recording them as seen
  // without notifying avoids flooding the bell with every booking that was
  // already confirmed before this feature shipped.
  hasBaseline: boolean
  markSeen: (ids: Array<number>) => void
  addNotifications: (items: Array<BookingNotification>) => void
  setBaseline: (ids: Array<number>) => void
  clearNotifications: () => void
}

export const useBookingNotificationsStore = create<BookingNotificationsState>()(
  persist(
    (set) => ({
      seenIds: [],
      notifications: [],
      hasBaseline: false,

      markSeen: (ids) =>
        set((state) => ({
          seenIds: [...new Set([...state.seenIds, ...ids])].slice(-500),
        })),

      addNotifications: (items) =>
        set((state) => ({
          notifications: [...items, ...state.notifications].slice(0, 30),
        })),

      setBaseline: (ids) =>
        set((state) => ({
          hasBaseline: true,
          seenIds: [...new Set([...state.seenIds, ...ids])].slice(-500),
        })),

      clearNotifications: () => set({ notifications: [] }),
    }),
    {
      name: 'booking-notifications',
      storage: createJSONStorage(() => localStorage),
    },
  ),
)
