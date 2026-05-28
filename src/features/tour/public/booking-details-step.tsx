import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { Spinner } from '@/components/ui/spinner.tsx'

export type BookingDetailsForm = {
  name: string
  email: string
  phone: string
  notes: string
}

type BookingDetailsStepProps = {
  form: BookingDetailsForm
  onChange: (field: keyof BookingDetailsForm, value: string) => void
  onBack: () => void
  onContinue: () => void
  isLoading: boolean
}

export function BookingDetailsStep({
  form,
  onChange,
  onBack,
  onContinue,
  isLoading
}: BookingDetailsStepProps) {
  const canContinue =
    form.name.trim() !== '' &&
    form.email.trim() !== '' &&
    form.phone.trim() !== ''

  return (
    <div className="bg-[#141414] border border-[#C9A84C]/12 p-5 md:p-8 space-y-5">
      <p className="font-serif text-sm md:text-base text-[#C9A84C] mb-2">
        Your Details
      </p>

      {/* Name + Email */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="space-y-1.5">
          <label className="text-xs text-[#9A9182]">Full Name *</label>

          <Input
            value={form.name}
            onChange={(e) => onChange('name', e.target.value)}
            placeholder="John Smith"
            className="bg-[#0B0B0B] border-[#C9A84C]/20 focus:border-[#C9A84C] rounded-none text-white placeholder:text-[#9A9182]/50 h-11"
          />
        </div>

        <div className="space-y-1.5">
          <label className="text-xs text-[#9A9182]">Email Address *</label>

          <Input
            type="email"
            value={form.email}
            onChange={(e) => onChange('email', e.target.value)}
            placeholder="john@example.com"
            className="bg-[#0B0B0B] border-[#C9A84C]/20 focus:border-[#C9A84C] rounded-none text-white placeholder:text-[#9A9182]/50 h-11"
          />
        </div>
      </div>

      {/* Phone */}
      <div className="space-y-1.5">
        <label className="text-xs text-[#9A9182]">Phone Number *</label>

        <Input
          type="tel"
          value={form.phone}
          onChange={(e) => onChange('phone', e.target.value)}
          placeholder="+351 900 000 000"
          className="bg-[#0B0B0B] border-[#C9A84C]/20 focus:border-[#C9A84C] rounded-none text-white placeholder:text-[#9A9182]/50 h-11"
        />
      </div>

      {/* Notes */}
      <div className="space-y-1.5">
        <label className="text-xs text-[#9A9182]">Special Requests</label>

        <Textarea
          value={form.notes}
          onChange={(e) => onChange('notes', e.target.value)}
          placeholder="Any special requirements or requests..."
          className="bg-[#0B0B0B] border-[#C9A84C]/20 focus:border-[#C9A84C] rounded-none text-white placeholder:text-[#9A9182]/50 min-h-[100px] resize-none"
        />
      </div>

      {/* Actions */}
      <div className="flex gap-3 pt-2">
        <Button
          onClick={onBack}
          variant="outline"
          className="flex-1 border-[#C9A84C]/20 bg-transparent text-[#9A9182] hover:text-white hover:border-[#C9A84C]/50 rounded-none h-11"
        >
          Back
        </Button>

        <Button
          onClick={onContinue}
          disabled={!canContinue || isLoading}
          className="flex-1 bg-[#C9A84C] hover:bg-[#C9A84C]/90 text-[#0B0B0B] font-medium rounded-none h-11"
        >
          {isLoading && <Spinner/>}
          {isLoading ? 'Processing...' : 'Continue'}
        </Button>
      </div>
    </div>
  )
}
