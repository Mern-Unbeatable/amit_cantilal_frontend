import type { IconifyIcon } from '@iconify/types'

export interface NavSubItem {
  title: string;
  url: string;
  icon: string | IconifyIcon;
  comingSoon?: boolean;
  newTab?: boolean;
  isNew?: boolean;
}

export interface NavMainItem {
  title: string;
  url: string;
  icon: string | IconifyIcon;
  subItems?: Array<NavSubItem>;
  comingSoon?: boolean;
  newTab?: boolean;
  isNew?: boolean;
}

export interface NavGroup {
  id: number;
  label?: string;
  items: Array<NavMainItem>;
}