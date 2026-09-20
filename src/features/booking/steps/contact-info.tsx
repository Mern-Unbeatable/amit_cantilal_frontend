import { ChevronLeft, ChevronRight, MapPin } from 'lucide-react'
import { COUNTRY_CODES } from '../booking.types'
import type { ContactDetails, TripDetails, Vehicle } from '../booking.types'
import { getHourlyRate } from '@/features/booking/pricing.ts'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'

interface Props {
  data: ContactDetails
  trip: TripDetails
  vehicle: Vehicle
  onChange: (data: ContactDetails) => void
  onNext: () => void
  onBack: () => void
  isLoading?: boolean
}

function Field({
  id,
  label,
  required,
  children,
}: {
  id: string
  label: string
  required?: boolean
  children: React.ReactNode
}) {
  return (
    <div className="space-y-1.5">
      <Label htmlFor={id} className="text-sm text-[#9A9182]">
        {label} {required && <span className="text-[#C9A84C]">*</span>}
      </Label>
      {children}
    </div>
  )
}

export default function Step3ContactInfo({
  data,
  trip,
  vehicle,
  onChange,
  onNext,
  onBack,
  isLoading,
}: Props) {
  const update = (patch: Partial<ContactDetails>) =>
    onChange({ ...data, ...patch })

  const canProceed =
    data.fullName.trim() !== '' &&
    data.email.trim() !== '' &&
    data.phone.trim() !== ''

  const hourlyRate = getHourlyRate(vehicle.name)

  return (
    <div className="bg-[#141414] border border-[#C9A84C]/12 p-5 md:p-8 space-y-5">
      <h2 className="font-serif text-2xl md:text-3xl font-light text-gradient-gold">
        Contact Information
      </h2>

      {/* Trip summary */}
      <div className="bg-[#C9A84C]/08 border border-[#C9A84C]/20 p-4 space-y-2">
        <p className="text-xs font-medium text-[#C9A84C] flex items-center gap-2 mb-2">
          <MapPin className="w-3.5 h-3.5" strokeWidth={1.5} />
          Trip Summary
        </p>
        <div className="grid grid-cols-1 gap-1.5 text-xs">
          {[
            { label: 'From', value: trip.pickup },
            ...(trip.serviceType === 'transfer'
              ? [{ label: 'To', value: trip.dropoff }]
              : [{ label: 'Duration', value: `${trip.hours ?? 1}h` }]),
            {
              label: 'When',
              value: `${trip.date?.toLocaleDateString('en-GB') ?? '—'} • ${trip.time}`,
            },
            { label: 'Vehicle', value: vehicle.name },
            ...(hourlyRate
              ? [{ label: 'Rate', value: `€${hourlyRate.toFixed(2)}/hr` }]
              : []),
          ].map(({ label, value }) => (
            <div key={label} className="flex items-start gap-2">
              <span className="text-[#9A9182] min-w-[60px]">{label}:</span>
              <span className="text-[#F5F0E8] font-medium truncate">
                {value}
              </span>
            </div>
          ))}
          <div className="flex items-center gap-2 pt-2 mt-1 border-t border-[#C9A84C]/15">
            <span className="text-[#9A9182] min-w-[60px]">Total:</span>
            <span className="font-serif text-lg text-gradient-gold">
              €
              {(trip.serviceType === 'hourly'
                ? vehicle.price * (trip.hours ?? 1)
                : vehicle.price
              ).toFixed(2)}
            </span>
          </div>
        </div>
      </div>

      {/* Form fields */}
      <div className="space-y-4">
        <Field id="fullName" label="Full Name" required>
          <Input
            id="fullName"
            value={data.fullName}
            onChange={(e) => update({ fullName: e.target.value })}
            placeholder="John Smith"
            className="h-14 text-base bg-[#0B0B0B] border-[#C9A84C]/20 focus:border-[#C9A84C]/50 rounded-none text-white placeholder:text-[#9A9182]/50"
          />
        </Field>

        <Field id="email" label="Email" required>
          <Input
            id="email"
            type="email"
            value={data.email}
            onChange={(e) => update({ email: e.target.value })}
            placeholder="john@example.com"
            className="h-14 text-base bg-[#0B0B0B] border-[#C9A84C]/20 focus:border-[#C9A84C]/50 rounded-none text-white placeholder:text-[#9A9182]/50"
          />
        </Field>

        <Field id="phone" label="Phone / WhatsApp" required>
          <div className="flex gap-2 shrink-0">
            <Select
              value={data.countryCode}
              onValueChange={(v) => update({ countryCode: v })}
            >
              <SelectTrigger className="w-27.5 h-14! rounded-none bg-[#0B0B0B] border-[#C9A84C]/20 text-white flex-shrink-0">
                <SelectValue />
              </SelectTrigger>
              <SelectContent className="bg-black-2 border-gold/20">
                {COUNTRY_CODES.map((c) => (
                  <SelectItem
                    key={c.code}
                    value={c.code}
                    className="text-white"
                  >
                    <span className="flex items-center gap-1.5">
                      <span className="text-lg">{c.flag}</span>
                      <span className="text-sm text-[#9A9182]">{c.code}</span>
                    </span>
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            <Input
              id="phone"
              type="tel"
              value={data.phone}
              onChange={(e) => update({ phone: e.target.value })}
              placeholder="912 345 678"
              className="flex-1 h-14 text-base bg-[#0B0B0B] border-[#C9A84C]/20 focus:border-[#C9A84C]/50 rounded-none text-white placeholder:text-[#9A9182]/50"
            />
          </div>
        </Field>

        <Field id="flightNumber" label="Flight Number (optional)">
          <Input
            id="flightNumber"
            value={data.flightNumber}
            onChange={(e) => update({ flightNumber: e.target.value })}
            placeholder="TP1234"
            className="h-14 text-base bg-[#0B0B0B] border-[#C9A84C]/20 focus:border-[#C9A84C]/50 rounded-none text-white placeholder:text-[#9A9182]/50"
          />
        </Field>
      </div>

      {/* Navigation */}
      <div className="flex gap-3 pt-2">
        <Button
          onClick={onBack}
          variant="outline"
          className="flex-1 h-14 rounded-none border-[#C9A84C]/20 bg-transparent text-[#9A9182] hover:text-white hover:border-[#C9A84C]/40 text-base"
        >
          <ChevronLeft className="w-5 h-5 mr-2" />
          Previous
        </Button>
        <Button
          onClick={onNext}
          disabled={isLoading || !canProceed}
          className="flex-1 h-14 rounded-none bg-[#C9A84C] hover:bg-[#E2C97E] text-[#0B0B0B] font-medium text-base tracking-[.08em] uppercase disabled:opacity-40"
        >
          {isLoading ? (
            <>
              <div className="w-4 h-4 border border-[#0B0B0B]/40 border-t-[#0B0B0B] rounded-full animate-spin mr-2" />
              Processing...
            </>
          ) : (
            <>
              Next
              <ChevronRight className="w-5 h-5 ml-2" />
            </>
          )}
        </Button>
      </div>
    </div>
  )
}
