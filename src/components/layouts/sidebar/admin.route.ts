import type { NavGroup } from '@/@types/navigation.ts'

export const adminRoutes: Array<NavGroup> = [
  {
    id: 1,
    items: [
      {
        title: 'Dashboard',
        url: '/admin/dashboard',
        icon: 'material-symbols:dashboard',
      },
    ],
  },
  {
    id: 2,
    label: 'Management',
    items: [
      {
        title: 'Availability',
        url: '/admin/availability',
        icon: 'material-symbols:calendar-add-on',
      },
      {
        title: 'Students',
        url: '/admin/students',
        icon: 'material-symbols:group',
      },
      {
        title: 'Bookings',
        url: '/admin/bookings',
        icon: 'material-symbols:book-online',
      },
      {
        title: 'Sessions',
        url: '/admin/sessions',
        icon: 'material-symbols:notes',
      },
    ],
  },
]