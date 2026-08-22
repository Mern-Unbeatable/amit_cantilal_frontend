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
        title: 'Fleet Vehicle',
        url: '/admin/fleet-vehicle',
        icon: 'material-symbols:directions-car-outline-rounded',
      },
      {
        title: 'Tours',
        url: '/admin/tours',
        icon: 'material-symbols:travel-explore-rounded',
      },
      {
        title: 'Bookings',
        url: '/admin/bookings',
        icon: 'material-symbols:calendar-month',
      },
      {
        title: 'Posts',
        url: '/admin/posts',
        icon: 'material-symbols:article-outline-rounded',
      },
      {
        title: 'Partnerships',
        url: '/admin/partnerships',
        icon: 'material-symbols:handshake-outline-rounded',
      },
      {
        title: 'Concierge Requests',
        url: '/admin/concierge-requests',
        icon: 'material-symbols:concierge-outline-rounded',
      },
      {
        title: 'Users',
        url: '/admin/users',
        icon: 'material-symbols:group-outline-rounded',
      },
    ],
  },
  {
    id: 3,
    items: [
      {
        title: 'Settings',
        url: '/admin/settings',
        icon: 'material-symbols:settings-outline-rounded',
      },
    ],
  },
]