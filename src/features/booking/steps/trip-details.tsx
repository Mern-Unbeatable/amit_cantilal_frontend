import { useCallback, useEffect, useRef, useState } from 'react'
import {
  Calendar,
  ChevronRight,
  Clock,
  MapPin,
  Minus,
  Navigation,
  Plus,
  Users,
  X,
} from 'lucide-react'
import { format } from 'date-fns'
import {
  AdvancedMarker,
  Map,
  useMap,
  useMapsLibrary,
} from '@vis.gl/react-google-maps'
import type { Stop, TripDetails } from '@/features/booking/booking.types.ts'
import { usePublicSettings } from '@/features/settings/settings.hooks.ts'
import { toWhatsAppUrl } from '@/lib/utils.ts'
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

type LatLng = { lat: number; lng: number }

// ─── Direction renderer ──────────────────────────────────────────────────────
// Draws the route on the map and fits bounds when both points are known.

function DirectionsLayer({
  pickup,
  dropoff,
}: {
  pickup: LatLng | null
  dropoff: LatLng | null
}) {
  const map = useMap()
  const routesLib = useMapsLibrary('routes')
  const [directionsService, setDirectionsService] =
    useState<google.maps.DirectionsService | null>(null)
  const [directionsRenderer, setDirectionsRenderer] =
    useState<google.maps.DirectionsRenderer | null>(null)

  // Initialise service + renderer once the library is ready
  useEffect(() => {
    if (!routesLib || !map) return

    const service = new routesLib.DirectionsService()
    const renderer = new routesLib.DirectionsRenderer({
      suppressMarkers: true, // we render our own AdvancedMarkers
      polylineOptions: {
        strokeColor: '#C9A84C',
        strokeWeight: 4,
        strokeOpacity: 0.9,
      },
    })
    renderer.setMap(map)
    setDirectionsService(service)
    setDirectionsRenderer(renderer)

    return () => renderer.setMap(null)
  }, [routesLib, map])

  // Request a new route whenever pickup/dropoff change
  useEffect(() => {
    if (!directionsService || !directionsRenderer || !pickup || !dropoff) {
      directionsRenderer?.setDirections({ routes: [] } as never)
      return
    }

    directionsService.route(
      {
        origin: pickup,
        destination: dropoff,
        travelMode: google.maps.TravelMode.DRIVING,
      },
      (result, status) => {
        if (status === google.maps.DirectionsStatus.OK && result) {
          directionsRenderer.setDirections(result)
        }
      },
    )
  }, [directionsService, directionsRenderer, pickup, dropoff])

  // Fit map bounds when both markers are present but no route yet
  useEffect(() => {
    if (!map || !pickup || !dropoff) return
    const bounds = new google.maps.LatLngBounds()
    bounds.extend(pickup)
    bounds.extend(dropoff)
    map.fitBounds(bounds, 80)
  }, [map, pickup, dropoff])

  return null
}

// ─── Places Autocomplete input ────────────────────────────────────────────────

interface AutocompleteInputProps {
  value: string
  onChange: (value: string) => void
  onSelect: (place: { label: string; lat: number; lng: number }) => void
  placeholder: string
  icon?: React.ReactNode
}

function AutocompleteInput({
  value,
  onChange,
  onSelect,
  placeholder,
  icon,
}: AutocompleteInputProps) {
  const placesLib = useMapsLibrary('places')
  const inputRef = useRef<HTMLInputElement>(null)
  const autocompleteRef = useRef<google.maps.places.Autocomplete | null>(null)
  const onSelectRef = useRef(onSelect)

  useEffect(() => {
    onSelectRef.current = onSelect
  }, [onSelect])

  useEffect(() => {
    if (!placesLib || !inputRef.current || autocompleteRef.current) return

    const autocomplete = new placesLib.Autocomplete(inputRef.current, {
      fields: ['formatted_address', 'geometry', 'name'],
      componentRestrictions: undefined,
      bounds: new google.maps.LatLngBounds(
        { lat: 36.8, lng: -9.6 },
        { lat: 42.2, lng: -6.0 },
      ),
      strictBounds: false,
    })

    autocomplete.addListener('place_changed', () => {
      const place = autocomplete.getPlace()
      if (!place.geometry?.location) return

      const lat = place.geometry.location.lat()
      const lng = place.geometry.location.lng()
      const label = place.formatted_address ?? place.name ?? ''

      onSelectRef.current({ label, lat, lng })
    })

    autocompleteRef.current = autocomplete

    return () => {
      google.maps.event.clearInstanceListeners(autocomplete)
      autocompleteRef.current = null
    }
  }, [placesLib])

  return (
    <div className="flex-1 relative min-w-0">
      {icon && (
        <div className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-[#9A9182] z-10 pointer-events-none">
          {icon}
        </div>
      )}
      <input
        ref={inputRef}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        className={`
          w-full h-14 text-sm bg-[#0B0B0B] border border-[#C9A84C]/20
          focus:border-[#C9A84C]/50 focus:outline-none
          text-white placeholder:text-[#9A9182]/50
          ${icon ? 'pl-12' : 'pl-4'} pr-10
        `}
      />
    </div>
  )
}

// ─── Route Preview (Google Map) ───────────────────────────────────────────────

function RoutePreview({
  pickup,
  dropoff,
}: {
  pickup: LatLng | null
  dropoff: LatLng | null
}) {
  if (!pickup && !dropoff) return null

  const center = pickup ?? dropoff ?? { lat: 38.7169, lng: -9.1399 }

  return (
    <div className="border border-[#C9A84C]/20 bg-[#0B0B0B] h-64 overflow-hidden">
      <Map
        defaultCenter={center}
        defaultZoom={12}
        mapId={import.meta.env.VITE_GOOGLE_MAPS_MAP_ID || 'offwego-map'}
        disableDefaultUI
        gestureHandling="cooperative"
        className="h-full w-full"
        colorScheme="DARK"
      >
        {pickup && (
          <AdvancedMarker position={pickup}>
            <div className="w-4 h-4 rounded-full bg-[#C9A84C] border-2 border-[#0B0B0B] shadow-lg" />
          </AdvancedMarker>
        )}
        {dropoff && (
          <AdvancedMarker position={dropoff}>
            <div className="w-4 h-4 rounded-full bg-[#F5F0E8] border-2 border-[#0B0B0B] shadow-lg" />
          </AdvancedMarker>
        )}
        <DirectionsLayer pickup={pickup} dropoff={dropoff} />
      </Map>
    </div>
  )
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
            <div className="w-px bg-[#C9A84C]/15 self-stretch" />
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
  const { data: settings } = usePublicSettings()
  const [pickupLatLng, setPickupLatLng] = useState<LatLng | null>(null)
  const [dropoffLatLng, setDropoffLatLng] = useState<LatLng | null>(null)

  const update = useCallback(
    (patch: Partial<TripDetails>) => onChange({ ...data, ...patch }),
    [data, onChange],
  )

  const addStop = () =>
    update({ stops: [...data.stops, { id: generateId(), value: '' }] })

  const removeStop = (id: string) =>
    update({ stops: data.stops.filter((s: Stop) => s.id !== id) })

  const updateStop = (id: string, value: string) =>
    update({
      stops: data.stops.map((s: Stop) => (s.id === id ? { ...s, value } : s)),
    })

  const pickupDateTime =
    data.date && data.time
      ? new Date(`${format(data.date, 'yyyy-MM-dd')}T${data.time}:00`)
      : null

  const isWithin24Hours =
    !!pickupDateTime && pickupDateTime.getTime() - Date.now() < 24 * 60 * 60 * 1000

  const canProceed =
    data.pickup.trim() !== '' &&
    (data.serviceType === 'hourly' || data.dropoff.trim() !== '') &&
    data.passengers >= 1 &&
    !!data.date &&
    data.time !== '' &&
    !isWithin24Hours

  return (
    <div className="bg-[#141414] border border-[#C9A84C]/12 p-5 md:p-8 space-y-5 w-full min-w-0 overflow-hidden">
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
      <div className="relative space-y-0 min-w-0">
        <div className="absolute left-6.5 top-7 bottom-7 w-px bg-[#C9A84C]/20 z-0" />

        {/* Pickup */}
        <div className="relative flex items-center gap-3 pb-2 min-w-0">
          <div className="w-3 h-3 rounded-full bg-[#C9A84C] z-10 flex-shrink-0 ml-[17px]" />
          <AutocompleteInput
            value={data.pickup}
            onChange={(val) => {
              setPickupLatLng(null)
              update({ pickup: val, pickupCoords: undefined })
            }}
            onSelect={({ label, lat, lng }) => {
              setPickupLatLng({ lat, lng })
              update({ pickup: label, pickupCoords: [lat, lng] })
            }}
            placeholder="From: Address, airport, hotel..."
            icon={<MapPin className="w-5 h-5" strokeWidth={1.5} />}
          />
          <button className="absolute right-3 top-1/2 -translate-y-1/2 text-[#C9A84C] hover:text-[#E2C97E] transition-colors pr-1">
            <Navigation className="w-5 h-5" strokeWidth={1.5} />
          </button>
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

        {/* Dropoff — hidden for hourly */}
        {data.serviceType === 'transfer' && (
          <div className="relative flex items-center gap-3 pt-2 min-w-0">
            <div className="w-3 h-3 rounded-sm bg-[#C9A84C] z-10 flex-shrink-0 ml-[17px]" />
            <AutocompleteInput
              value={data.dropoff}
              onChange={(val) => {
                setDropoffLatLng(null)
                update({ dropoff: val, dropoffCoords: undefined })
              }}
              onSelect={({ label, lat, lng }) => {
                setDropoffLatLng({ lat, lng })
                update({ dropoff: label, dropoffCoords: [lat, lng] })
              }}
              placeholder="To: Address, airport, hotel..."
              icon={<MapPin className="w-5 h-5" strokeWidth={1.5} />}
            />
            <button className="absolute right-3 top-1/2 -translate-y-1/2 text-[#C9A84C] hover:text-[#E2C97E] transition-colors pr-1">
              <Navigation className="w-5 h-5" strokeWidth={1.5} />
            </button>
          </div>
        )}
      </div>

      {/* Map */}
      <RoutePreview pickup={pickupLatLng} dropoff={dropoffLatLng} />

      {/* Add stop — transfer only */}
      {data.serviceType === 'transfer' && (
        <button
          onClick={addStop}
          className="flex items-center gap-2 text-sm text-[#C9A84C] hover:text-[#E2C97E] transition-colors ml-10"
        >
          <Plus className="w-3.5 h-3.5" />
          Add Stop
        </button>
      )}

      {/* Hourly duration */}
      {data.serviceType === 'hourly' && (
        <div className="flex items-center justify-between bg-[#0B0B0B] border border-[#C9A84C]/20 px-4 py-3">
          <span className="text-sm text-[#9A9182]">Duration (hours)</span>
          <div className="flex items-center gap-4">
            <button
              onClick={() =>
                update({ hours: Math.max(1, (data.hours ?? 1) - 1) })
              }
              className="w-8 h-8 border border-[#C9A84C]/30 hover:border-[#C9A84C] text-[#C9A84C] flex items-center justify-center transition-colors"
            >
              <Minus className="w-3.5 h-3.5" />
            </button>
            <span className="text-white font-medium w-6 text-center tabular-nums">
              {data.hours ?? 1}
            </span>
            <button
              onClick={() =>
                update({ hours: Math.min(24, (data.hours ?? 1) + 1) })
              }
              className="w-8 h-8 border border-[#C9A84C]/30 hover:border-[#C9A84C] text-[#C9A84C] flex items-center justify-center transition-colors"
            >
              <Plus className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>
      )}

      <div className="relative">
        <Users
          className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-[#9A9182] pointer-events-none z-10"
          strokeWidth={1.5}
        />
      <Input
        type="text"
        inputMode="numeric"
        value={data.passengers === 0 ? '' : data.passengers}
        onChange={(e) => {
          const raw = e.target.value.replace(/\D/g, '')
          update({ passengers: raw === '' ? 0 : Math.min(20, Number(raw)) })
        }}
        onBlur={() => {
          if (!data.passengers) update({ passengers: 1 })
        }}
        placeholder="Passengers"
        className="h-14 text-base bg-[#0B0B0B] border-[#C9A84C]/20 focus:border-[#C9A84C]/50 rounded-none text-white placeholder:text-[#9A9182]/50 pl-12"
      />
      </div>

      {/* Date + Time */}
      <div className="grid grid-cols-2 gap-4">
        <DatePicker value={data.date} onChange={(d) => update({ date: d })} />
        <TimePicker value={data.time} onChange={(t) => update({ time: t })} />
      </div>

      {isWithin24Hours ? (
        <div className="bg-[#C9A84C]/10 border border-[#C9A84C]/30 p-4 space-y-3">
          <p className="text-sm text-[#F5F0E8] leading-relaxed">
            Bookings less than 24 hours away can't be scheduled online. Please
            contact us directly to check if we can accommodate your trip.
          </p>
          <div className="flex flex-col sm:flex-row gap-2">
            <a
              href={toWhatsAppUrl(settings?.whatsapp_number ?? '+351914578214')}
              target="_blank"
              rel="noopener noreferrer"
              className="flex-1 text-center h-11 flex items-center justify-center bg-[#C9A84C] hover:bg-[#E2C97E] text-[#0B0B0B] text-sm font-medium transition-colors"
            >
              WhatsApp Us
            </a>
            <a
              href={`mailto:${settings?.contact_email ?? 'bookings@offwego.pt'}`}
              className="flex-1 text-center h-11 flex items-center justify-center border border-[#C9A84C]/40 hover:border-[#C9A84C] text-[#F5F0E8] text-sm font-medium transition-colors"
            >
              Email Us
            </a>
          </div>
        </div>
      ) : (
        <p className="text-sm text-[#9A9182] text-center">
          Driver will wait 60 minutes free for airport pickups, 15 minutes for
          other locations
        </p>
      )}

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