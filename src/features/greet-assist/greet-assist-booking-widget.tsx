import { useEffect, useMemo, useRef, useState } from 'react'
import { loadStripe } from '@stripe/stripe-js'
import { Elements, PaymentElement, useElements, useStripe } from '@stripe/react-stripe-js'
import type {
  GreetAssistAirport,
  GreetAssistBookingPayload,
  GreetAssistBookingResponse,
  GreetAssistServiceType,
  GreetAssistServicesSelection,
} from './greet-assist.types.ts'
import { calculatePricing } from './greet-assist-pricing.ts'
import { greetAssistService } from './greet-assist.service.ts'

interface GreetAssistBookingWidgetProps {
  id?: string
}

// ─── Payment Form Component (Exact replica of HTML paymentBox) ──────────────
function PaymentBoxInner({
  reference,
  amountCents,
  onSuccess,
}: {
  reference: string
  amountCents: number
  onSuccess: (status: string) => void
}) {
  const stripe = useStripe()
  const elements = useElements()
  const [isProcessing, setIsProcessing] = useState(false)
  const [errorMsg, setErrorMsg] = useState<string | null>(null)

  const handleConfirmPayment = async () => {
    if (!stripe || !elements) return
    setIsProcessing(true)
    setErrorMsg(null)

    try {
      const { error: submitError } = await elements.submit()
      if (submitError) {
        setErrorMsg(submitError.message || 'Payment failed.')
        setIsProcessing(false)
        return
      }

      const { error, paymentIntent } = await stripe.confirmPayment({
        elements,
        redirect: 'if_required',
        confirmParams: {
          return_url: `${location.href.split('#')[0]}#book`,
        },
      })

      if (error) {
        setErrorMsg(error.message || 'Payment failed.')
      } else if (paymentIntent) {
        onSuccess(paymentIntent.status)
      }
    } catch (e: unknown) {
      setErrorMsg(e instanceof Error ? e.message : 'Payment error.')
    } finally {
      setIsProcessing(false)
    }
  }

  return (
    <div className="space-y-4">
      <div className="text-sm text-[#d1c7b7] space-y-1 font-sans">
        <div>
          Reference: <b>{reference}</b>
        </div>
        <div>
          Amount: <b>€{(amountCents / 100).toFixed(2)}</b>
        </div>
      </div>

      <div className="py-2">
        <PaymentElement
          options={{
            layout: 'tabs',
          }}
        />
      </div>

      {errorMsg && <p className="text-xs text-red-400 font-sans">{errorMsg}</p>}

      <button
        type="button"
        onClick={handleConfirmPayment}
        disabled={!stripe || !elements || isProcessing}
        className="w-full bg-[#c5a059] text-[#0b0b0b] hover:bg-[#d4af37] text-sm uppercase tracking-widest py-3.5 rounded-sm font-sans font-medium transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
      >
        {isProcessing ? 'Processing...' : 'Pay now'}
      </button>

      <p className="text-[11px] text-gray-500 font-sans">
        Stripe test card: 4242 4242 4242 4242 · any future date · any CVC.
      </p>
    </div>
  )
}

// ─── Main Booking Form (100% exact text from replica) ────────────────────────
export function GreetAssistBookingWidget({ id = 'book' }: GreetAssistBookingWidgetProps) {
  // Inputs
  const [airport, setAirport] = useState<GreetAssistAirport>('LIS')
  const [serviceType, setServiceType] = useState<GreetAssistServiceType>('arrival')
  const [flightDate, setFlightDate] = useState<string>('')
  const [flightTime, setFlightTime] = useState<string>('')
  const [flightNumber, setFlightNumber] = useState<string>('')
  const [terminal, setTerminal] = useState<string>('')

  const [adults, setAdults] = useState<number>(1)
  const [children, setChildren] = useState<number>(0)
  const [bags, setBags] = useState<number>(0)
  const [pets, setPets] = useState<number>(0)

  const [services, setServices] = useState<GreetAssistServicesSelection>({
    fast_track_immigration: false,
    security_fast_track: false,
    board_to_board_transit: false,
    tax_free_escort: false,
  })

  const [customerName, setCustomerName] = useState<string>('')
  const [customerEmail, setCustomerEmail] = useState<string>('')
  const [customerPhone, setCustomerPhone] = useState<string>('')
  const [customerNotes, setCustomerNotes] = useState<string>('')
  const [acceptConditions, setAcceptConditions] = useState<boolean>(false)

  // Status & submission state
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false)
  const [statusMessage, setStatusMessage] = useState<{
    text: string
    type: 'info' | 'error' | 'success'
  }>({
    text: 'Please complete airport, date, time and your contact details.',
    type: 'info',
  })
  const [bookingResult, setBookingResult] = useState<GreetAssistBookingResponse | null>(null)
  const [paymentFinished, setPaymentFinished] = useState<boolean>(false)

  const paymentBoxRef = useRef<HTMLDivElement>(null)

  // Recalculate timer (every 60s for 24h surcharge window)
  const [tick, setTick] = useState<number>(0)
  useEffect(() => {
    const timer = setInterval(() => setTick((t) => t + 1), 60 * 1000)
    return () => clearInterval(timer)
  }, [])

  const pricing = useMemo(() => {
    return calculatePricing({
      adults,
      children,
      bags,
      pets,
      services,
      date: flightDate,
      time: flightTime,
    })
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [adults, children, bags, pets, services, flightDate, flightTime, tick])

  const adjustCount = (
    setter: React.Dispatch<React.SetStateAction<number>>,
    delta: number,
    min: number,
    max: number,
  ) => {
    setter((prev) => Math.min(max, Math.max(min, prev + delta)))
  }

  const stripePromise = useMemo(() => {
    const key =
      bookingResult?.publishable_key ||
      import.meta.env.VITE_STRIPE_PUBLISHABLE_KEY
    return key ? loadStripe(key) : null
  }, [bookingResult?.publishable_key])

  // Submit booking exactly as in submitBooking() of replica
  const handleSubmit = async () => {
    if (!acceptConditions) {
      setStatusMessage({
        text: 'Please accept the service conditions.',
        type: 'error',
      })
      return
    }

    setIsSubmitting(true)
    setStatusMessage({
      text: 'Sending booking to the server...',
      type: 'info',
    })

    const payload: GreetAssistBookingPayload = {
      service_type: 'greet_assist',
      name: customerName.trim(),
      email: customerEmail.trim(),
      phone: customerPhone.trim(),
      notes: customerNotes.trim() || null,

      airport,
      greet_service_type: serviceType,
      date: flightDate,
      flight_time: flightTime,
      flight_number: flightNumber.trim(),
      terminal: terminal.trim() || null,

      adults,
      children,
      bags,
      pets,

      services: {
        fast_track_immigration: services.fast_track_immigration,
        security_fast_track: services.security_fast_track,
        board_to_board_transit: services.board_to_board_transit,
        tax_free_escort: services.tax_free_escort,
      },

      accepted_conditions: acceptConditions,
      amount: pricing.amountCents,
    }

    try {
      const response = await greetAssistService.createBooking(payload)
      setBookingResult(response)
      setStatusMessage({
        text: `Booking created: <b>${response.booking.reference}</b> · €${(response.booking.amount / 100).toFixed(2)}<br>Complete the payment below.`,
        type: 'success',
      })

      setTimeout(() => {
        paymentBoxRef.current?.scrollIntoView({ behavior: 'smooth' })
      }, 100)
    } catch (err: unknown) {
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      const data = (err as any)?.response?.data
      if (data?.pricing) {
        const p = data.pricing
        setStatusMessage({
          text: `${data.message}<br>Server total: <b>€${Number(p.total).toFixed(2)}</b>${p.surcharge_applied ? ` (includes €${Number(p.surcharge).toFixed(2)} late booking surcharge)` : ''}`,
          type: 'error',
        })
      } else {
        const msg = data?.message || (err instanceof Error ? err.message : 'Booking failed.')
        setStatusMessage({
          text: msg,
          type: 'error',
        })
      }
    } finally {
      setIsSubmitting(false)
    }
  }

  const statusBorderClass =
    statusMessage.type === 'error'
      ? 'text-red-300 border-red-900'
      : statusMessage.type === 'success'
        ? 'text-green-300 border-green-900'
        : 'text-gray-400 border-gray-800'

  return (
    <section id={id} className="view px-4 sm:px-6 lg:px-8 py-16 bg-[#0b0b0b] text-[#d1c7b7]">
      {/* Top Header Title */}
      <div className="text-center mb-12 sm:mb-16">
        <span className="text-[10px] md:text-xs uppercase tracking-[0.4em] text-[#C9A84C] mb-4 block font-medium">
          Greet &amp; Assist
        </span>
        <h2 className="font-serif text-3xl sm:text-4xl md:text-5xl font-light text-[#F5F0E8] leading-tight mb-4 tracking-tight">
          Airport Greet &amp; Assist Booking
        </h2>
        <div className="w-12 h-px bg-[#C9A84C]/40 mx-auto mb-6" />
        <p className="text-sm md:text-base text-[#F5F0E8]/70 max-w-2xl mx-auto font-light leading-relaxed">
          Configure your service, see the final price and pay right away.
        </p>
      </div>

      {/* Main Container Layout */}
      <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* LEFT COLUMN: Form Inputs */}
        <div className="lg:col-span-7 bg-[#121212] border border-[#2a2a2a] p-6 sm:p-8 rounded-sm shadow-2xl space-y-6">
          {/* Row 1: Airport & Service Type */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-[11px] uppercase tracking-wider text-gray-400 font-sans mb-1.5">
                Airport
              </label>
              <select
                id="airport"
                value={airport}
                onChange={(e) => setAirport(e.target.value as GreetAssistAirport)}
                className="w-full bg-[#171717] border border-[#2e2e2e] focus:border-[#c5a059] text-[#f3f4f6] p-3 rounded-sm text-sm font-sans focus:outline-none"
              >
                <option value="LIS">Lisbon Airport (LIS)</option>
                <option value="OPO">Porto Airport (OPO)</option>
              </select>
            </div>
            <div>
              <label className="block text-[11px] uppercase tracking-wider text-gray-400 font-sans mb-1.5">
                Service Type
              </label>
              <select
                id="serviceType"
                value={serviceType}
                onChange={(e) => setServiceType(e.target.value as GreetAssistServiceType)}
                className="w-full bg-[#171717] border border-[#2e2e2e] focus:border-[#c5a059] text-[#f3f4f6] p-3 rounded-sm text-sm font-sans focus:outline-none"
              >
                <option value="arrival">Arrival</option>
                <option value="departure">Departure</option>
                <option value="transit">Transit</option>
              </select>
            </div>
          </div>

          {/* Row 2: Flight Date & Time */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-[11px] uppercase tracking-wider text-gray-400 font-sans mb-1.5">
                Flight Date
              </label>
              <input
                type="date"
                id="flightDate"
                value={flightDate}
                onChange={(e) => setFlightDate(e.target.value)}
                style={{ colorScheme: 'dark' }}
                className="w-full bg-[#171717] border border-[#2e2e2e] focus:border-[#c5a059] text-[#f3f4f6] p-3 rounded-sm text-sm font-sans focus:outline-none"
              />
            </div>
            <div>
              <label className="block text-[11px] uppercase tracking-wider text-gray-400 font-sans mb-1.5">
                Flight Time (Lisbon time)
              </label>
              <input
                type="time"
                id="flightTime"
                value={flightTime}
                onChange={(e) => setFlightTime(e.target.value)}
                style={{ colorScheme: 'dark' }}
                className="w-full bg-[#171717] border border-[#2e2e2e] focus:border-[#c5a059] text-[#f3f4f6] p-3 rounded-sm text-sm font-sans focus:outline-none"
              />
            </div>
          </div>

          {/* Row 3: Flight Number & Terminal */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-[11px] uppercase tracking-wider text-gray-400 font-sans mb-1.5">
                Flight Number
              </label>
              <input
                type="text"
                id="flightNumber"
                maxLength={20}
                placeholder="TP1234"
                value={flightNumber}
                onChange={(e) => setFlightNumber(e.target.value)}
                className="w-full bg-[#171717] border border-[#2e2e2e] focus:border-[#c5a059] text-[#f3f4f6] p-3 rounded-sm text-sm font-sans placeholder-gray-600 focus:outline-none"
              />
            </div>
            <div>
              <label className="block text-[11px] uppercase tracking-wider text-gray-400 font-sans mb-1.5">
                Terminal
              </label>
              <input
                type="text"
                id="terminal"
                maxLength={20}
                placeholder="1"
                value={terminal}
                onChange={(e) => setTerminal(e.target.value)}
                className="w-full bg-[#171717] border border-[#2e2e2e] focus:border-[#c5a059] text-[#f3f4f6] p-3 rounded-sm text-sm font-sans placeholder-gray-600 focus:outline-none"
              />
            </div>
          </div>

          {/* PASSENGERS SECTION */}
          <div>
            <label className="block text-[11px] uppercase tracking-wider text-gray-400 font-sans mb-3">
              Passengers
            </label>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {/* Adults */}
              <div className="bg-[#171717] border border-[#2e2e2e] p-3 rounded-sm flex items-center justify-between">
                <span className="text-sm font-sans">Adults</span>
                <div className="flex items-center space-x-2">
                  <button
                    type="button"
                    onClick={() => adjustCount(setAdults, -1, 1, 20)}
                    className="w-7 h-7 bg-[#222] text-gray-300 hover:bg-[#333] flex items-center justify-center rounded text-sm"
                  >
                    -
                  </button>
                  <input
                    type="number"
                    id="adults"
                    value={adults}
                    min={1}
                    max={20}
                    onChange={(e) =>
                      setAdults(Math.max(1, Math.min(20, parseInt(e.target.value) || 1)))
                    }
                    className="w-8 text-center bg-transparent text-white text-sm font-sans focus:outline-none"
                  />
                  <button
                    type="button"
                    onClick={() => adjustCount(setAdults, 1, 1, 20)}
                    className="w-7 h-7 bg-[#222] text-gray-300 hover:bg-[#333] flex items-center justify-center rounded text-sm"
                  >
                    +
                  </button>
                </div>
              </div>

              {/* Children */}
              <div className="bg-[#171717] border border-[#2e2e2e] p-3 rounded-sm flex items-center justify-between">
                <div>
                  <span className="text-sm font-sans block leading-tight">Children until</span>
                  <span className="text-sm font-sans block leading-tight">14 years</span>
                </div>
                <div className="flex items-center space-x-2">
                  <button
                    type="button"
                    onClick={() => adjustCount(setChildren, -1, 0, 20)}
                    className="w-7 h-7 bg-[#222] text-gray-300 hover:bg-[#333] flex items-center justify-center rounded text-sm"
                  >
                    -
                  </button>
                  <input
                    type="number"
                    id="children"
                    value={children}
                    min={0}
                    max={20}
                    onChange={(e) =>
                      setChildren(Math.max(0, Math.min(20, parseInt(e.target.value) || 0)))
                    }
                    className="w-8 text-center bg-transparent text-white text-sm font-sans focus:outline-none"
                  />
                  <button
                    type="button"
                    onClick={() => adjustCount(setChildren, 1, 0, 20)}
                    className="w-7 h-7 bg-[#222] text-gray-300 hover:bg-[#333] flex items-center justify-center rounded text-sm"
                  >
                    +
                  </button>
                </div>
              </div>

              {/* Bags with porter */}
              <div className="bg-[#171717] border border-[#2e2e2e] p-3 rounded-sm flex items-center justify-between">
                <div>
                  <span className="text-sm font-sans block leading-tight">Bags with</span>
                  <span className="text-sm font-sans block leading-tight">porter</span>
                </div>
                <div className="flex items-center space-x-2">
                  <button
                    type="button"
                    onClick={() => adjustCount(setBags, -1, 0, 50)}
                    className="w-7 h-7 bg-[#222] text-gray-300 hover:bg-[#333] flex items-center justify-center rounded text-sm"
                  >
                    -
                  </button>
                  <input
                    type="number"
                    id="bags"
                    value={bags}
                    min={0}
                    max={50}
                    onChange={(e) =>
                      setBags(Math.max(0, Math.min(50, parseInt(e.target.value) || 0)))
                    }
                    className="w-8 text-center bg-transparent text-white text-sm font-sans focus:outline-none"
                  />
                  <button
                    type="button"
                    onClick={() => adjustCount(setBags, 1, 0, 50)}
                    className="w-7 h-7 bg-[#222] text-gray-300 hover:bg-[#333] flex items-center justify-center rounded text-sm"
                  >
                    +
                  </button>
                </div>
              </div>

              {/* Pets */}
              <div className="bg-[#171717] border border-[#2e2e2e] p-3 rounded-sm flex items-center justify-between">
                <div>
                  <span className="text-sm font-sans block leading-tight">Pets (vet</span>
                  <span className="text-sm font-sans block leading-tight">assistance)</span>
                </div>
                <div className="flex items-center space-x-2">
                  <button
                    type="button"
                    onClick={() => adjustCount(setPets, -1, 0, 10)}
                    className="w-7 h-7 bg-[#222] text-gray-300 hover:bg-[#333] flex items-center justify-center rounded text-sm"
                  >
                    -
                  </button>
                  <input
                    type="number"
                    id="pets"
                    value={pets}
                    min={0}
                    max={10}
                    onChange={(e) =>
                      setPets(Math.max(0, Math.min(10, parseInt(e.target.value) || 0)))
                    }
                    className="w-8 text-center bg-transparent text-white text-sm font-sans focus:outline-none"
                  />
                  <button
                    type="button"
                    onClick={() => adjustCount(setPets, 1, 0, 10)}
                    className="w-7 h-7 bg-[#222] text-gray-300 hover:bg-[#333] flex items-center justify-center rounded text-sm"
                  >
                    +
                  </button>
                </div>
              </div>
            </div>
          </div>

          {/* ADDITIONAL SERVICES */}
          <div>
            <label className="block text-[11px] uppercase tracking-wider text-gray-400 font-sans mb-3">
              Additional Services
            </label>
            <div className="space-y-3">
              <label className="bg-[#171717] border border-[#2e2e2e] p-3.5 rounded-sm flex items-center space-x-3 cursor-pointer">
                <input
                  type="checkbox"
                  id="fastTrack"
                  checked={services.fast_track_immigration}
                  onChange={(e) =>
                    setServices((prev) => ({
                      ...prev,
                      fast_track_immigration: e.target.checked,
                    }))
                  }
                  className="accent-[#c5a059] w-4 h-4 cursor-pointer"
                />
                <span className="text-sm font-sans text-gray-200">
                  Fast Track Immigration / Passport Control
                </span>
              </label>

              <label className="bg-[#171717] border border-[#2e2e2e] p-3.5 rounded-sm flex items-center space-x-3 cursor-pointer">
                <input
                  type="checkbox"
                  id="securityFast"
                  checked={services.security_fast_track}
                  onChange={(e) =>
                    setServices((prev) => ({
                      ...prev,
                      security_fast_track: e.target.checked,
                    }))
                  }
                  className="accent-[#c5a059] w-4 h-4 cursor-pointer"
                />
                <span className="text-sm font-sans text-gray-200">
                  Security fast track (departure)
                </span>
              </label>

              <label className="bg-[#171717] border border-[#2e2e2e] p-3.5 rounded-sm flex items-center space-x-3 cursor-pointer">
                <input
                  type="checkbox"
                  id="boardTransit"
                  checked={services.board_to_board_transit}
                  onChange={(e) =>
                    setServices((prev) => ({
                      ...prev,
                      board_to_board_transit: e.target.checked,
                    }))
                  }
                  className="accent-[#c5a059] w-4 h-4 cursor-pointer"
                />
                <span className="text-sm font-sans text-gray-200">
                  Board to board (transit)
                </span>
              </label>

              <label className="bg-[#171717] border border-[#2e2e2e] p-3.5 rounded-sm flex items-center space-x-3 cursor-pointer">
                <input
                  type="checkbox"
                  id="taxFree"
                  checked={services.tax_free_escort}
                  onChange={(e) =>
                    setServices((prev) => ({
                      ...prev,
                      tax_free_escort: e.target.checked,
                    }))
                  }
                  className="accent-[#c5a059] w-4 h-4 cursor-pointer"
                />
                <span className="text-sm font-sans text-gray-200">
                  Tax free escort
                </span>
              </label>
            </div>
            <p className="text-[11px] text-gray-400 italic font-sans mt-2">
              Fast Track Immigration / Passport Control: charged per group of up to 2 passengers.
            </p>
          </div>

          {/* CONTACT DETAILS */}
          <div>
            <label className="block text-[11px] uppercase tracking-wider text-gray-400 font-sans mb-3">
              Contact Details
            </label>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <input
                type="text"
                id="customerName"
                placeholder="Full name"
                maxLength={255}
                value={customerName}
                onChange={(e) => setCustomerName(e.target.value)}
                className="bg-[#171717] border border-[#2e2e2e] focus:border-[#c5a059] text-[#f3f4f6] p-3 rounded-sm text-sm font-sans placeholder-gray-600 focus:outline-none"
              />
              <input
                type="email"
                id="customerEmail"
                placeholder="Email"
                maxLength={255}
                value={customerEmail}
                onChange={(e) => setCustomerEmail(e.target.value)}
                className="bg-[#171717] border border-[#2e2e2e] focus:border-[#c5a059] text-[#f3f4f6] p-3 rounded-sm text-sm font-sans placeholder-gray-600 focus:outline-none"
              />
              <input
                type="text"
                id="customerPhone"
                placeholder="Phone (e.g. +351912345678)"
                maxLength={20}
                value={customerPhone}
                onChange={(e) => setCustomerPhone(e.target.value)}
                className="bg-[#171717] border border-[#2e2e2e] focus:border-[#c5a059] text-[#f3f4f6] p-3 rounded-sm text-sm font-sans placeholder-gray-600 focus:outline-none"
              />
              <input
                type="text"
                id="customerNotes"
                placeholder="Additional notes"
                maxLength={1000}
                value={customerNotes}
                onChange={(e) => setCustomerNotes(e.target.value)}
                className="bg-[#171717] border border-[#2e2e2e] focus:border-[#c5a059] text-[#f3f4f6] p-3 rounded-sm text-sm font-sans placeholder-gray-600 focus:outline-none"
              />
            </div>
          </div>
        </div>

        {/* RIGHT COLUMN: Price Summary & Conditions */}
        <div className="lg:col-span-5 space-y-6">
          {/* PRICE SUMMARY BOX */}
          <div className="bg-[#121212] border border-[#c5a059] p-6 sm:p-8 rounded-sm shadow-2xl">
            <h2 className="text-[11px] uppercase tracking-widest text-[#c5a059] font-sans mb-6">
              Price Summary
            </h2>

            {/* Dynamic Items Container */}
            <div
              id="summaryItems"
              className="space-y-3 text-sm font-sans border-b border-gray-800 pb-6"
            >
              {pricing.items.map((item, idx) => (
                <div key={idx} className="flex justify-between">
                  <span>{item.label}</span>
                  <span>€{item.amount.toFixed(2)}</span>
                </div>
              ))}
            </div>

            {/* Totals Section */}
            <div className="pt-6 space-y-3 font-sans">
              <div className="flex justify-between text-sm text-gray-300">
                <span>Subtotal</span>
                <span id="subtotalDisplay">€{pricing.subtotal.toFixed(2)}</span>
              </div>

              {pricing.surchargeApplied && (
                <div id="surchargeRow" className="flex justify-between text-sm text-[#c5a059]">
                  <span>Late booking surcharge (30%)</span>
                  <span id="surchargeDisplay">€{pricing.surcharge.toFixed(2)}</span>
                </div>
              )}

              <div className="flex justify-between text-sm text-gray-300">
                <span>VAT (23%)</span>
                <span id="vatDisplay">€{pricing.vat.toFixed(2)}</span>
              </div>

              {pricing.surchargeApplied && (
                <p id="surchargeNotice" className="text-[11px] text-[#c5a059] italic">
                  Your service is less than 24 hours away, so a 30% late booking surcharge applies (VAT is charged on top).
                </p>
              )}

              <div className="pt-6 flex justify-between items-baseline border-t border-gray-800 mt-6">
                <span className="text-xs uppercase tracking-widest text-gray-400">
                  Total to pay
                </span>
                <span
                  id="grandTotalDisplay"
                  className="text-3xl font-serif text-[#d4af37] font-normal tracking-wide"
                >
                  €{pricing.grandTotal.toFixed(2)}
                </span>
              </div>
            </div>
          </div>

          {/* SERVICE CONDITIONS BOX */}
          <div className="bg-[#121212] border border-[#2a2a2a] p-6 sm:p-8 rounded-sm shadow-2xl space-y-4">
            <h3 className="text-[11px] uppercase tracking-widest text-[#c5a059] font-sans">
              Service Conditions
            </h3>
            <div className="text-[12px] text-gray-400 space-y-3 font-sans leading-relaxed">
              <p>
                Bookings can be made at any time. Bookings made less than 24 hours before the scheduled service are subject to a 30% surcharge.
              </p>
              <p>
                The 30% surcharge for bookings made less than 24 hours before the scheduled service is an additional charge and does not replace the 23% VAT.
              </p>
              <p>
                Cancellation less than 48 working hours before service time: 100% charge applies.
              </p>
              <p>
                Delays or changes are subject to availability and additional charges. A previously confirmed service is non-refundable.
              </p>
              <p>
                This service is non-refundable in the event of complaints once delivered.
              </p>
            </div>

            <label className="flex items-start space-x-3 pt-2 cursor-pointer font-sans">
              <input
                type="checkbox"
                id="acceptConditions"
                checked={acceptConditions}
                onChange={(e) => setAcceptConditions(e.target.checked)}
                className="mt-0.5 accent-[#c5a059]"
              />
              <span className="text-xs text-gray-300">
                I have read and accept the service conditions.
              </span>
            </label>

            <button
              id="bookBtn"
              type="button"
              onClick={handleSubmit}
              disabled={isSubmitting}
              className="w-full bg-[#c5a059] text-[#0b0b0b] hover:bg-[#d4af37] font-sans text-sm uppercase tracking-widest py-3.5 rounded-sm font-medium transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isSubmitting ? 'Creating booking...' : 'Book & Pay'}
            </button>
          </div>

          {/* STATUS BOX */}
          <div
            id="statusBox"
            dangerouslySetInnerHTML={{ __html: statusMessage.text }}
            className={`bg-[#121212] p-4 rounded-sm text-center text-xs font-sans border ${statusBorderClass}`}
          />

          {/* PAYMENT BOX (shown after the booking is created) */}
          {bookingResult && (
            <div
              ref={paymentBoxRef}
              id="paymentBox"
              className="bg-[#121212] border border-[#c5a059] p-6 sm:p-8 rounded-sm shadow-2xl space-y-4 font-sans"
            >
              <h3 className="text-[11px] uppercase tracking-widest text-[#c5a059]">Payment</h3>

              {paymentFinished ? (
                <div className="text-xs text-green-300 font-sans p-3 bg-green-950/30 border border-green-800 rounded-sm">
                  Payment confirmed for <b>{bookingResult.booking.reference}</b>.
                </div>
              ) : stripePromise && bookingResult.client_secret ? (
                <Elements
                  stripe={stripePromise}
                  options={{
                    clientSecret: bookingResult.client_secret,
                    appearance: {
                      theme: 'night',
                      variables: { colorPrimary: '#c5a059' },
                    },
                  }}
                >
                  <PaymentBoxInner
                    reference={bookingResult.booking.reference}
                    amountCents={bookingResult.booking.amount}
                    onSuccess={(status) => {
                      setPaymentFinished(true)
                      setStatusMessage({
                        text: `Payment ${status} for <b>${bookingResult.booking.reference}</b>.<br>The booking is confirmed automatically by the Stripe webhook.`,
                        type: 'success',
                      })
                    }}
                  />
                </Elements>
              ) : (
                <div className="text-xs text-red-300">
                  Stripe is not configured on the server (missing publishable key).
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </section>
  )
}
