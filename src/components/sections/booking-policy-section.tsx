import { AlertCircle, Bus, Car, Clock, RefreshCw, ShieldOff } from 'lucide-react'

const sedanVanRules = [
  { label: 'Less than 24 hours', charge: '100% charged', severity: 'high' },
  { label: 'Less than 48 hours', charge: '50% charged', severity: 'mid' },
  { label: 'More than 48 hours', charge: 'Full refund', severity: 'low' },
]

const rescheduleOptions = [
  'Propose a new date',
  'Credit of paid amount + 20% bonus towards other services',
  'Full refund according to cancellation policy',
]

const severityBar: Record<string, string> = {
  high: 'bg-red-500',
  mid: 'bg-yellow-500',
  low: 'bg-green-500',
}

const severityText: Record<string, string> = {
  high: 'text-red-400',
  mid: 'text-yellow-400',
  low: 'text-green-400',
}

export function BookingPoliciesSection() {
  return (
    <section className="py-10 md:py-24 bg-[#0B0B0B]">
      <div className="container mx-auto px-4 md:px-12">
        <div className="max-w-5xl mx-auto">
          {/* Header */}
          <div className="text-center mb-10 md:mb-16">
            <div className="tag-gold mb-4">Policies</div>
            <h2 className="font-serif text-2xl md:text-5xl font-light text-gradient-gold mb-3 md:mb-6">
              Booking <em className="italic">Policies</em>
            </h2>
            <p className="text-sm md:text-lg text-[#9A9182] max-w-2xl mx-auto">
              Transparent terms so you always know where you stand.
            </p>
          </div>

          {/* Vehicle policy cards */}
          <div className="grid md:grid-cols-2 gap-4 md:gap-6 mb-6 md:mb-8">

            {/* Sedan & Van */}
            <div className="bg-[#141414] border border-[#C9A84C]/12 hover:border-[#C9A84C]/30 transition-colors duration-200">
              <div className="flex items-center gap-3 px-5 py-4 md:px-8 md:py-6 border-b border-[#C9A84C]/12">
                <div className="w-9 h-9 md:w-12 md:h-12 bg-[#C9A84C] flex items-center justify-center flex-shrink-0">
                  <Car className="w-4 h-4 md:w-5 md:h-5 text-[#0B0B0B]" strokeWidth={1.5} />
                </div>
                <h3 className="font-serif text-lg md:text-2xl font-light text-gradient-gold">Sedan & Van</h3>
              </div>
              <div className="px-5 py-4 md:px-8 md:py-6 space-y-0 divide-y divide-[#C9A84C]/08">
                {sedanVanRules.map(({ label, charge, severity }) => (
                  <div key={label} className="flex items-center justify-between py-3 md:py-4 gap-4">
                    <div className="flex items-center gap-3">
                      <span className={`w-1 h-8 flex-shrink-0 ${severityBar[severity]}`} />
                      <div className="flex items-center gap-2 text-[#9A9182]">
                        <Clock className="w-3.5 h-3.5 flex-shrink-0" strokeWidth={1.5} />
                        <span className="text-xs md:text-sm">{label}</span>
                      </div>
                    </div>
                    <span className={`text-xs md:text-sm font-medium tabular-nums ${severityText[severity]}`}>
                      {charge}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            {/* Sprinter — non-refundable */}
            <div className="bg-[#141414] border border-red-500/30 hover:border-red-500/50 transition-colors duration-200">
              <div className="flex items-center gap-3 px-5 py-4 md:px-8 md:py-6 border-b border-red-500/20">
                <div className="w-9 h-9 md:w-12 md:h-12 bg-red-500 flex items-center justify-center flex-shrink-0">
                  <Bus className="w-4 h-4 md:w-5 md:h-5 text-white" strokeWidth={1.5} />
                </div>
                <h3 className="font-serif text-lg md:text-2xl font-light text-red-400">Sprinter</h3>
              </div>
              <div className="px-5 py-5 md:px-8 md:py-6 space-y-4">
                {/* Big badge */}
                <div className="flex items-center gap-3">
                  <span className="w-1 h-10 flex-shrink-0 bg-red-500" />
                  <div>
                    <p className="text-sm md:text-base font-semibold text-red-400">100% charged for any cancellation</p>
                    <p className="text-xs text-[#9A9182] mt-0.5">Applies regardless of notice period</p>
                  </div>
                </div>
                {/* Non-refundable notice */}
                <div className="flex items-start gap-3 p-4 bg-red-500/08 border border-red-500/20">
                  <ShieldOff className="w-4 h-4 text-red-400 flex-shrink-0 mt-0.5" strokeWidth={1.5} />
                  <p className="text-xs md:text-sm text-[#9A9182] leading-relaxed">
                    All Sprinter bookings are <span className="text-red-400 font-medium">non-refundable</span>. No refunds will be issued under any circumstances after booking confirmation.
                  </p>
                </div>
              </div>
            </div>

          </div>

          {/* Rescheduling */}
          <div className="bg-[#141414] border border-[#C9A84C]/12 hover:border-[#C9A84C]/30 transition-colors duration-200 mb-6 md:mb-8">
            <div className="flex items-center gap-3 px-5 py-4 md:px-8 md:py-6 border-b border-[#C9A84C]/12">
              <div className="w-9 h-9 md:w-12 md:h-12 bg-[#C9A84C] flex items-center justify-center flex-shrink-0">
                <RefreshCw
                  className="w-4 h-4 md:w-5 md:h-5 text-[#0B0B0B]"
                  strokeWidth={1.5}
                />
              </div>
              <h3 className="font-serif text-lg md:text-2xl font-light text-gradient-gold">
                Rescheduling Options
              </h3>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 divide-y md:divide-y-0 md:divide-x divide-[#C9A84C]/08">
              {rescheduleOptions.map((option, i) => (
                <div
                  key={i}
                  className="px-5 py-5 md:px-8 md:py-8 flex items-start gap-3"
                >
                  <span className="font-serif text-2xl md:text-3xl text-[#C9A84C]/30 leading-none font-light flex-shrink-0">
                    {String(i + 1).padStart(2, '0')}
                  </span>
                  <p className="text-xs md:text-sm text-[#9A9182] leading-relaxed pt-1">
                    {option}
                  </p>
                </div>
              ))}
            </div>
          </div>

          {/* Notice */}
          <div className="flex items-start gap-3 md:gap-4 p-4 md:p-6 border-l-2 border-[#C9A84C] bg-[#C9A84C]/05">
            <AlertCircle
              className="w-4 h-4 md:w-5 md:h-5 text-[#C9A84C] flex-shrink-0 mt-0.5"
              strokeWidth={1.5}
            />
            <div className="space-y-1 md:space-y-2">
              <p className="text-xs md:text-sm text-[#9A9182] leading-relaxed">
                All bookings are subject to availability confirmation.
              </p>
              <p className="text-xs md:text-sm text-[#9A9182] leading-relaxed">
                Same-day bookings are not available online —{' '}
                <a
                  href="https://wa.me/351914578214"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-[#C9A84C] underline underline-offset-2 hover:text-[#C9A84C]/70 transition-colors"
                >
                  contact us on WhatsApp
                </a>{' '}
                for last-minute requests.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
