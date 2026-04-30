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

    ],
  },
]