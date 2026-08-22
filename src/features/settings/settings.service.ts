import type {
  PublicSettings,
  Settings,
  UpdateSettingsPayload,
} from '@/features/settings/settings.types.ts'
import { api, unwrap } from '@/services/api.ts'

export const settingsService = {
  getSettings: (): Promise<Settings> =>
    api.get<{ data: Settings }>('/admin/settings').then(unwrap),

  updateSettings: (payload: UpdateSettingsPayload): Promise<Settings> =>
    api.put<{ data: Settings }>('/admin/settings', payload).then(unwrap),

  getPublicSettings: (): Promise<PublicSettings> =>
    api.get<{ data: PublicSettings }>('/public/settings').then(unwrap),
}
