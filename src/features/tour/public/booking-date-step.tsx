import { Clock, Minus, Plus } from 'lucide-react'
import { Calendar } from '@/components/ui/calendar'
import { Button } from '@/components/ui/button'

type BookingDateStepProps = {
  date?: Date
  time?: string
  adults: number
  startTimes?: Array<string>
  onDateChange: (date: Date | undefined) => void
  onTimeChange: (time: string) => void
  onAdultsChange: (value: number) => void
  onContinue: () => void
}

export function BookingDateStep({
  date,
  time,
  adults,
  startTimes = ['07:00', '08:00', '09:00'],
  onDateChange,
  onTimeChange,
  onAdultsChange,
  onContinue,
}: BookingDateStepProps) {
  const canContinue = !!date && !!time && adults >= 1

  return (
    <div className="bg-[#141414] border border-[#C9A84C]/12 p-5 md:p-8 space-y-8">
      {/* Date */}
      <div>
        <p className="font-serif text-sm md:text-base text-[#C9A84C] mb-4">
          Select a Date
        </p>
        <Calendar
          mode="single"
          selected={date}
          onSelect={onDateChange}
          disabled={{ before: new Date() }}
          className="bg-transparent text-white w-full [&_.rdp-day_button:hover]:bg-[#C9A84C]/20 [&_.rdp-day_button.rdp-day_selected]:bg-[#C9A84C] [&_.rdp-day_button.rdp-day_selected]:text-[#0B0B0B]"
        />
      </div>

      {/* Time — shown after date is selected */}
      {date && (
        <div className="border-t border-[#C9A84C]/10 pt-6">
          <p className="font-serif text-sm md:text-base text-[#C9A84C] mb-4 flex items-center gap-2">
            <Clock className="w-4 h-4" strokeWidth={1.5} />
            Select a Start Time
          </p>
          <div className="grid grid-cols-3 gap-2">
            {startTimes.map((t) => (
              <button
                key={t}
                type="button"
                onClick={() => onTimeChange(t)}
                className={`h-11 text-sm font-medium border transition-all duration-200 ${
                  time === t
                    ? 'bg-[#C9A84C] text-[#0B0B0B] border-[#C9A84C]'
                    : 'bg-transparent text-[#F5F0E8] border-[#C9A84C]/20 hover:border-[#C9A84C]/60'
                }`}
              >
                {t}
              </button>
            ))}
          </div>
        </div>
      )}

      {/* Guests */}
      <div className="border-t border-[#C9A84C]/10 pt-6">
        <p className="font-serif text-sm md:text-base text-[#C9A84C] mb-4">
          Guests
        </p>
        <div className="flex items-center justify-between">
          <div>
            <p className="text-sm text-white/80">Adults</p>
            <p className="text-xs text-[#9A9182]">Age 18+</p>
          </div>
          <div className="flex items-center gap-4">
            <button
              type="button"
              onClick={() => onAdultsChange(Math.max(1, adults - 1))}
              className="w-8 h-8 border border-[#C9A84C]/30 hover:border-[#C9A84C] text-[#C9A84C] flex items-center justify-center transition-colors"
            >
              <Minus className="w-3.5 h-3.5" strokeWidth={2} />
            </button>
            <span className="text-white font-medium w-4 text-center tabular-nums">
              {adults}
            </span>
            <button
              type="button"
              onClick={() => onAdultsChange(adults + 1)}
              className="w-8 h-8 border border-[#C9A84C]/30 hover:border-[#C9A84C] text-[#C9A84C] flex items-center justify-center transition-colors"
            >
              <Plus className="w-3.5 h-3.5" strokeWidth={2} />
            </button>
          </div>
        </div>
      </div>

      {/* Continue */}
      <Button
        onClick={onContinue}
        disabled={!canContinue}
        className="w-full bg-[#C9A84C] hover:bg-[#C9A84C]/90 text-[#0B0B0B] font-medium rounded-none h-11"
      >
        Continue
      </Button>
    </div>
  )
}
