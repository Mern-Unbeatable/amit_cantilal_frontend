import type { User } from '@/@types/user.ts'
import type { NavGroup } from '@/@types/navigation.ts'
import { adminRoutes } from '@/components/layouts/sidebar/admin.route.ts'
import { studentRoutes } from '@/components/layouts/sidebar/student.route.ts'

interface SideBarItemsProps {
  user: User | null,
}

export const useSidebarItems = ({user}: SideBarItemsProps): Array<NavGroup> => {

  if (!user) return [];

  const role = user.role;

  switch (role) {
    case "admin":
      return adminRoutes;
    case "student":
      return studentRoutes;
    default:
      return [];
  }
};
