import { useState } from 'react'
import {
  Calendar,
  ChevronRight,
  Clock,
  MapPin,
  Minus,
  Navigation,
  Plus,
  X,
} from 'lucide-react'
import { format } from 'date-fns'
import type { Stop, TripDetails } from '@/features/booking/booking.types.ts'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Tabs, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { Calendar as CalendarUI } from '@/components/ui/calendar'
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover'

interface Props {
  data: TripDetails
  onChange: (data: TripDetails) => void
  onNext: () => void
}

function generateId() {
  return Math.random().toString(36).slice(2, 8)
}

// ─── Time Picker ──────────────────────────────────────────────────────────────

function TimePicker({
  value,
  onChange,
}: {
  value: string
  onChange: (val: string) => void
}) {
  const [open, setOpen] = useState(false)

  const [hour, minute] = value ? value.split(':').map(Number) : [null, null]

  const hours = Array.from({ length: 24 }, (_, i) => i)
  const minutes = [0, 15, 30, 45]

  const select = (h: number, m: number) => {
    onChange(`${String(h).padStart(2, '0')}:${String(m).padStart(2, '0')}`)
    setOpen(false)
  }

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <button className="w-full h-14 flex items-center gap-3 px-4 bg-[#0B0B0B] border border-[#C9A84C]/20 hover:border-[#C9A84C]/50 text-left transition-colors">
          <Clock
            className="w-5 h-5 text-[#9A9182] flex-shrink-0"
            strokeWidth={1.5}
          />
          <span
            className={`text-base ${value ? 'text-white' : 'text-[#9A9182]/50'}`}
          >
            {value || 'Select time'}
          </span>
        </button>
      </PopoverTrigger>
      <PopoverContent
        className="w-64 p-0 bg-[#141414] border border-[#C9A84C]/20 rounded-none"
        align="start"
      >
        <div className="h-px bg-[#C9A84C] w-full" />
        <div className="p-3">
          <p className="text-xs text-[#9A9182] mb-3 tracking-[.12em] uppercase">
            Select Time
          </p>
          <div className="flex gap-2">
            {/* Hours */}
            <div className="flex-1">
              <p className="text-[10px] text-[#9A9182] mb-1.5 text-center">
                Hour
              </p>
              <div className="h-48 overflow-y-auto space-y-0.5 scrollbar-thin">
                {hours.map((h) => (
                  <button
                    key={h}
                    onClick={() => select(h, minute ?? 0)}
                    className={`w-full text-center py-1.5 text-sm transition-colors ${
                      hour === h
                        ? 'bg-[#C9A84C] text-[#0B0B0B] font-medium'
                        : 'text-[#9A9182] hover:text-white hover:bg-[#1C1C1C]'
                    }`}
                  >
                    {String(h).padStart(2, '0')}
                  </button>
                ))}
              </div>
            </div>

            {/* Divider */}
            <div className="w-px bg-[#C9A84C]/15 self-stretch" />

            {/* Minutes */}
            <div className="flex-1">
              <p className="text-[10px] text-[#9A9182] mb-1.5 text-center">
                Min
              </p>
              <div className="space-y-0.5">
                {minutes.map((m) => (
                  <button
                    key={m}
                    onClick={() => select(hour ?? 0, m)}
                    className={`w-full text-center py-1.5 text-sm transition-colors ${
                      minute === m
                        ? 'bg-[#C9A84C] text-[#0B0B0B] font-medium'
                        : 'text-[#9A9182] hover:text-white hover:bg-[#1C1C1C]'
                    }`}
                  >
                    {String(m).padStart(2, '0')}
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>
      </PopoverContent>
    </Popover>
  )
}

// ─── Date Picker ──────────────────────────────────────────────────────────────

function DatePicker({
  value,
  onChange,
}: {
  value: Date | undefined
  onChange: (d: Date | undefined) => void
}) {
  const [open, setOpen] = useState(false)

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <button className="w-full h-14 flex items-center gap-3 px-4 bg-[#0B0B0B] border border-[#C9A84C]/20 hover:border-[#C9A84C]/50 text-left transition-colors">
          <Calendar
            className="w-5 h-5 text-[#9A9182] flex-shrink-0"
            strokeWidth={1.5}
          />
          <span
            className={`text-base ${value ? 'text-white' : 'text-[#9A9182]/50'}`}
          >
            {value ? format(value, 'd MMMM yyyy') : 'Select date'}
          </span>
        </button>
      </PopoverTrigger>
      <PopoverContent
        className="w-auto p-0 bg-[#141414] border border-[#C9A84C]/20 rounded-none"
        align="start"
      >
        <div className="h-px bg-[#C9A84C] w-full" />
        <CalendarUI
          mode="single"
          selected={value}
          onSelect={(d) => {
            onChange(d)
            setOpen(false)
          }}
          disabled={{ before: new Date() }}
          className="bg-transparent text-white p-3
            [&_.rdp-day_button:hover]:bg-[#C9A84C]/20
            [&_.rdp-day_button:hover]:text-white
            [&_[aria-selected=true]_.rdp-day_button]:bg-[#C9A84C]
            [&_[aria-selected=true]_.rdp-day_button]:text-[#0B0B0B]
            [&_.rdp-nav_button]:text-[#9A9182]
            [&_.rdp-nav_button:hover]:text-white
            [&_.rdp-head_cell]:text-[#9A9182]
            [&_.rdp-day_button]:text-[#F5F0E8]
            [&_.rdp-day_button:disabled]:text-[#9A9182]/30"
        />
      </PopoverContent>
    </Popover>
  )
}

// ─── Main Step ────────────────────────────────────────────────────────────────

export default function Step1TripDetails({ data, onChange, onNext }: Props) {
  const update = (patch: Partial<TripDetails>) =>
    onChange({ ...data, ...patch })

  const addStop = () =>
    update({ stops: [...data.stops, { id: generateId(), value: '' }] })

  const removeStop = (id: string) =>
    update({ stops: data.stops.filter((s: Stop) => s.id !== id) })

  const updateStop = (id: string, value: string) =>
    update({
      stops: data.stops.map((s: Stop) => (s.id === id ? { ...s, value } : s)),
    })

  const canProceed =
    data.pickup.trim() !== '' &&
    data.dropoff.trim() !== '' &&
    !!data.date &&
    data.time !== ''

  return (
    <div className="bg-[#141414] border border-[#C9A84C]/12 p-5 md:p-8 space-y-5">
      <h2 className="font-serif text-2xl md:text-3xl font-light text-gradient-gold">
        Trip Details
      </h2>

      {/* Service type tabs */}
      <Tabs
        value={data.serviceType}
        onValueChange={(v) =>
          update({ serviceType: v as TripDetails['serviceType'] })
        }
      >
        <TabsList className="w-full grid grid-cols-2 h-12 bg-[#0B0B0B] rounded-none p-0">
          <TabsTrigger
            value="transfer"
            className="rounded-none h-full data-[state=active]:bg-[#C9A84C] data-[state=active]:text-[#0B0B0B] text-[#9A9182] font-medium"
          >
            Transfer
          </TabsTrigger>
          <TabsTrigger
            value="hourly"
            className="rounded-none h-full data-[state=active]:bg-[#C9A84C] data-[state=active]:text-[#0B0B0B] text-[#9A9182] font-medium"
          >
            Hourly Service
          </TabsTrigger>
        </TabsList>
      </Tabs>

      {/* Route inputs */}
      <div className="relative space-y-0">
        <div className="absolute left-[26px] top-7 bottom-7 w-px bg-[#C9A84C]/20 z-0" />

        {/* Pickup */}
        <div className="relative flex items-center gap-3 pb-2">
          <div className="w-3 h-3 rounded-full bg-[#C9A84C] z-10 flex-shrink-0 ml-[17px]" />
          <div className="flex-1 relative">
            <MapPin
              className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-[#9A9182] z-10"
              strokeWidth={1.5}
            />
            <Input
              value={data.pickup}
              onChange={(e) => update({ pickup: e.target.value })}
              placeholder="From: Address, airport, hotel..."
              className="pl-12 pr-12 h-14 text-base bg-[#0B0B0B] border-[#C9A84C]/20 focus:border-[#C9A84C]/50 rounded-none text-white placeholder:text-[#9A9182]/50"
            />
            <button className="absolute right-3 top-1/2 -translate-y-1/2 text-[#C9A84C] hover:text-[#E2C97E] transition-colors">
              <Navigation className="w-5 h-5" strokeWidth={1.5} />
            </button>
          </div>
        </div>

        {/* Stops */}
        {data.stops.map((stop: Stop) => (
          <div key={stop.id} className="relative flex items-center gap-1 py-2">
            <div className="w-2.5 h-2.5 rounded-full border-2 border-[#C9A84C] bg-[#0B0B0B] z-10 flex-shrink-0 ml-[18px]" />
            <div className="flex-1 relative">
              <MapPin
                className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-[#9A9182] z-10"
                strokeWidth={1.5}
              />
              <Input
                value={stop.value}
                onChange={(e) => updateStop(stop.id, e.target.value)}
                placeholder={`Stop ${data.stops.indexOf(stop) + 1}`}
                className="pl-12 pr-12 h-14 text-base bg-[#0B0B0B] border-[#C9A84C]/20 focus:border-[#C9A84C]/50 rounded-none text-white placeholder:text-[#9A9182]/50"
              />
            </div>
            <button
              onClick={() => removeStop(stop.id)}
              className="p-2 text-[#9A9182] hover:text-red-400 transition-colors"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        ))}

        {/* Dropoff */}
        <div className="relative flex items-center gap-3 pt-2">
          <div className="w-3 h-3 rounded-sm bg-[#C9A84C] z-10 flex-shrink-0 ml-[17px]" />
          <div className="flex-1 relative">
            <MapPin
              className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-[#9A9182] z-10"
              strokeWidth={1.5}
            />
            <Input
              value={data.dropoff}
              onChange={(e) => update({ dropoff: e.target.value })}
              placeholder="To: Address, airport, hotel..."
              className="pl-12 pr-12 h-14 text-base bg-[#0B0B0B] border-[#C9A84C]/20 focus:border-[#C9A84C]/50 rounded-none text-white placeholder:text-[#9A9182]/50"
            />
            <button className="absolute right-3 top-1/2 -translate-y-1/2 text-[#C9A84C] hover:text-[#E2C97E] transition-colors">
              <Navigation className="w-5 h-5" strokeWidth={1.5} />
            </button>
          </div>
        </div>
      </div>

      {/* Add stop */}
      <button
        onClick={addStop}
        className="flex items-center gap-2 text-sm text-[#C9A84C] hover:text-[#E2C97E] transition-colors ml-10"
      >
        <Plus className="w-3.5 h-3.5" />
        Add Stop
      </button>

      {/* Hourly duration */}
      {data.serviceType === 'hourly' && (
        <div className="flex items-center justify-between bg-[#0B0B0B] border border-[#C9A84C]/20 px-4 py-3">
          <span className="text-sm text-[#9A9182]">Duration (hours)</span>
          <div className="flex items-center gap-4">
            <button
              onClick={() =>
                update({ hours: Math.max(3, (data.hours ?? 3) - 1) })
              }
              className="w-8 h-8 border border-[#C9A84C]/30 hover:border-[#C9A84C] text-[#C9A84C] flex items-center justify-center transition-colors"
            >
              <Minus className="w-3.5 h-3.5" />
            </button>
            <span className="text-white font-medium w-6 text-center tabular-nums">
              {data.hours ?? 3}
            </span>
            <button
              onClick={() =>
                update({ hours: Math.min(24, (data.hours ?? 3) + 1) })
              }
              className="w-8 h-8 border border-[#C9A84C]/30 hover:border-[#C9A84C] text-[#C9A84C] flex items-center justify-center transition-colors"
            >
              <Plus className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>
      )}

      {/* Date + Time */}
      <div className="grid grid-cols-2 gap-4">
        <DatePicker value={data.date} onChange={(d) => update({ date: d })} />
        <TimePicker value={data.time} onChange={(t) => update({ time: t })} />
      </div>

      <p className="text-sm text-[#9A9182] text-center">
        Driver will wait 60 minutes free for airport pickups, 15 minutes for
        other locations
      </p>

      <Button
        onClick={onNext}
        disabled={!canProceed}
        className="w-full h-14 rounded-none bg-[#C9A84C] hover:bg-[#E2C97E] text-[#0B0B0B] font-medium text-base tracking-[.1em] uppercase disabled:opacity-40"
      >
        Schedule Now
        <ChevronRight className="w-5 h-5 ml-2" />
      </Button>
    </div>
  )
}
