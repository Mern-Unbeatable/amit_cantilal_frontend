export interface Settings {
  id: number
  whatsapp_number: string
  contact_email: string
  booking_notification_email: string
  created_at: string
  updated_at: string
}

export interface PublicSettings {
  whatsapp_number: string
  contact_email: string
}

export interface UpdateSettingsPayload {
  whatsapp_number: string
  contact_email: string
  booking_notification_email: string
}
