import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import type { UpdateSettingsPayload } from '@/features/settings/settings.types.ts'
import { settingsService } from '@/features/settings/settings.service.ts'

export const settingsKeys = {
  all: ['settings'] as const,
  admin: () => [...settingsKeys.all, 'admin'] as const,
  public: () => [...settingsKeys.all, 'public'] as const,
}

export function useSettings() {
  return useQuery({
    queryKey: settingsKeys.admin(),
    queryFn: settingsService.getSettings,
  })
}

export function useUpdateSettings() {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: (payload: UpdateSettingsPayload) =>
      settingsService.updateSettings(payload),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: settingsKeys.all })
    },
  })
}

export function usePublicSettings() {
  return useQuery({
    queryKey: settingsKeys.public(),
    queryFn: settingsService.getPublicSettings,
    staleTime: 1000 * 60 * 60, // an hour — this rarely changes
  })
}
