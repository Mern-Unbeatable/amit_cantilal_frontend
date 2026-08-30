import { createFileRoute } from '@tanstack/react-router'
import { useEffect, useState } from 'react'
import { toast } from 'sonner'
import AppWrapper from '@/components/layouts/sidebar/app-wrapper.tsx'
import PageHeader from '@/components/page-header.tsx'
import { Card } from '@/components/ui/card.tsx'
import { Input } from '@/components/ui/input.tsx'
import { Label } from '@/components/ui/label.tsx'
import { Button } from '@/components/ui/button.tsx'
import { useSettings, useUpdateSettings } from '@/features/settings/settings.hooks.ts'

export const Route = createFileRoute('/_authenticated/admin/settings')({
  component: RouteComponent,
})

function RouteComponent() {
  const { data: settings, isLoading } = useSettings()
  const { mutate: updateSettings, isPending } = useUpdateSettings()

  const [whatsappNumber, setWhatsappNumber] = useState('')
  const [contactEmail, setContactEmail] = useState('')
  const [bookingNotificationEmail, setBookingNotificationEmail] = useState('')
  const [bookingNotificationWhatsapp, setBookingNotificationWhatsapp] = useState('')

  useEffect(() => {
    if (!settings) return
    setWhatsappNumber(settings.whatsapp_number)
    setContactEmail(settings.contact_email)
    setBookingNotificationEmail(settings.booking_notification_email)
    setBookingNotificationWhatsapp(settings.booking_notification_whatsapp ?? '')
  }, [settings])

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    updateSettings(
      {
        whatsapp_number: whatsappNumber,
        contact_email: contactEmail,
        booking_notification_email: bookingNotificationEmail,
        booking_notification_whatsapp: bookingNotificationWhatsapp || null,
      },
      {
        onSuccess: () => toast.success('Settings saved.'),
        onError: () => toast.error('Could not save settings.'),
      },
    )
  }

  if (isLoading) {
    return (
      <AppWrapper>
        <PageHeader pageTitle="Settings" pageSubtitle="Business contact details" />
        <div className="h-64 animate-pulse bg-muted/20 rounded-md mt-6" />
      </AppWrapper>
    )
  }

  return (
    <AppWrapper>
      <PageHeader pageTitle="Settings" pageSubtitle="Business contact details" />

      <Card className="max-w-xl p-7 mt-6">
        <form onSubmit={handleSubmit} className="space-y-5">
          <div className="space-y-1.5">
            <Label htmlFor="whatsapp_number">WhatsApp Number</Label>
            <Input
              id="whatsapp_number"
              value={whatsappNumber}
              onChange={(e) => setWhatsappNumber(e.target.value)}
              placeholder="+351914578214"
              required
            />
            <p className="text-xs text-muted-foreground">
              Shown across the site and in booking emails — the "Contact Us on WhatsApp" button, the 24h-cutoff message, and more.
            </p>
          </div>

          <div className="space-y-1.5">
            <Label htmlFor="contact_email">Contact Email</Label>
            <Input
              id="contact_email"
              type="email"
              value={contactEmail}
              onChange={(e) => setContactEmail(e.target.value)}
              placeholder="bookings@offwego.pt"
              required
            />
            <p className="text-xs text-muted-foreground">
              Shown to customers in booking confirmation and payment-link emails.
            </p>
          </div>

          <div className="space-y-1.5">
            <Label htmlFor="booking_notification_email">Booking Notification Email</Label>
            <Input
              id="booking_notification_email"
              type="email"
              value={bookingNotificationEmail}
              onChange={(e) => setBookingNotificationEmail(e.target.value)}
              placeholder="you@offwego.pt"
              required
            />
            <p className="text-xs text-muted-foreground">
              Where you receive an email every time a booking is confirmed.
            </p>
          </div>

          <div className="space-y-1.5">
            <Label htmlFor="booking_notification_whatsapp">Booking Notification WhatsApp</Label>
            <Input
              id="booking_notification_whatsapp"
              value={bookingNotificationWhatsapp}
              onChange={(e) => setBookingNotificationWhatsapp(e.target.value)}
              placeholder="+351966240153"
            />
            <p className="text-xs text-muted-foreground">
              Where you receive a WhatsApp message every time a booking is confirmed. Leave blank to disable.
            </p>
          </div>

          <Button type="submit" disabled={isPending} className="min-w-[120px]">
            {isPending ? 'Saving...' : 'Save Changes'}
          </Button>
        </form>
      </Card>
    </AppWrapper>
  )
}
