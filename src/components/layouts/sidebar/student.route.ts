import type { NavGroup } from '@/@types/navigation.ts'

export const studentRoutes: Array<NavGroup> = [
  {
    id: 1,
    items: [
      {
        title: 'Dashboard',
        url: '/student/dashboard',
        icon: 'material-symbols:dashboard',
      },
      {
        title: 'Book a session',
        url: '/student/book',
        icon: 'material-symbols:calendar-add-on',
      },
      {
        title: 'My sessions',
        url: '/student/sessions',
        icon: 'material-symbols:notes',
      },
      {
        title: 'Profile',
        url: '/student/profile',
        icon: 'material-symbols:person',
      },
      {
        title: 'Change Password',
        url: '/student/change-password',
        icon: 'material-symbols:lock',
      },
    ],
  },
]
