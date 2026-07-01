import { useQuery } from '@tanstack/react-query'
import { dashboardService } from '@/features/dashboard/dashboard.service.ts'

export const dashboardKeys = {
  all: ['dashboard'] as const,
  stats: () => [...dashboardKeys.all, 'stats'] as const,
  monthly: () => [...dashboardKeys.all, 'monthly'] as const,
  channels: () => [...dashboardKeys.all, 'channels'] as const,
}

export function useDashboardStats() {
  return useQuery({
    queryKey: dashboardKeys.stats(),
    queryFn: dashboardService.getStats,
  })
}

export function useDashboardMonthly() {
  return useQuery({
    queryKey: dashboardKeys.monthly(),
    queryFn: dashboardService.getMonthly,
  })
}

export function useDashboardChannels() {
  return useQuery({
    queryKey: dashboardKeys.channels(),
    queryFn: dashboardService.getChannels,
  })
}
