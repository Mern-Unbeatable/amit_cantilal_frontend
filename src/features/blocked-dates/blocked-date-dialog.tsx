import { Mail, MessageCircle } from 'lucide-react'
import type { PublicBlockedDateRange } from '@/features/blocked-dates/blocked-dates.types.ts'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog.tsx'
import { Button } from '@/components/ui/button.tsx'
import { toWhatsAppUrl } from '@/lib/utils.ts'
import { usePublicSettings } from '@/features/settings/settings.hooks.ts'
import { blockedRangeMessage } from '@/features/blocked-dates/blocked-dates.utils.ts'

interface BlockedDateDialogProps {
  range: PublicBlockedDateRange | null
  onOpenChange: (open: boolean) => void
}

export function BlockedDateDialog({ range, onOpenChange }: BlockedDateDialogProps) {
  const { data: settings } = usePublicSettings()

  return (
    <Dialog open={!!range} onOpenChange={onOpenChange}>
      <DialogContent className="bg-[#141414] border-[#C9A84C]/20 text-[#F5F0E8]">
        <DialogHeader>
          <DialogTitle className="font-serif text-[#C9A84C] text-xl">
            Limited Availability
          </DialogTitle>
          <DialogDescription className="text-[#F5F0E8]/80 pt-2">
            {range ? blockedRangeMessage(range) : ''}
          </DialogDescription>
        </DialogHeader>
        <DialogFooter className="flex-col sm:flex-col gap-2">
          {settings?.whatsapp_number && (
            <Button
              asChild
              className="w-full bg-[#C9A84C] hover:bg-[#C9A84C]/90 text-[#0B0B0B] rounded-none"
            >
              <a
                href={toWhatsAppUrl(
                  settings.whatsapp_number,
                  "Hi, I'd like to book for a date you have marked as limited availability.",
                )}
                target="_blank"
                rel="noopener noreferrer"
              >
                <MessageCircle className="w-4 h-4" /> Contact us on WhatsApp
              </a>
            </Button>
          )}
          {settings?.contact_email && (
            <Button
              asChild
              variant="outline"
              className="w-full border-[#C9A84C]/30 text-[#F5F0E8] hover:bg-[#C9A84C]/10 rounded-none"
            >
              <a href={`mailto:${settings.contact_email}`}>
                <Mail className="w-4 h-4" /> Email us
              </a>
            </Button>
          )}
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}
