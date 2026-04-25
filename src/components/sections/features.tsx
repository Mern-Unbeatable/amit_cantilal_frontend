import {
  Car,
  Check,
  DollarSign,
  Leaf,
  Mail,
  MessageCircle,
  Phone,
  Users,
} from 'lucide-react'

// ─── Reusable sub-components ──────────────────────────────────────────────────

function Tag({
  icon: Icon,
  label,
  green,
}: {
  icon: React.ElementType
  label: string
  green?: boolean
}) {
  return (
    <div
      className={`inline-flex items-center gap-2 px-3 py-1.5 md:px-4 md:py-2 border ${
        green
          ? 'bg-green-500/10 border-green-500/25 text-green-500'
          : 'bg-[#C9A84C]/10 border-[#C9A84C]/20 text-[#C9A84C]'
      }`}
    >
      <Icon className="w-3.5 h-3.5 md:w-4 md:h-4" strokeWidth={1.5} />
      <span className="text-xs md:text-sm font-medium">{label}</span>
    </div>
  )
}

function CheckList({ items, green }: { items: string[]; green?: boolean }) {
  return (
    <ul className="space-y-2">
      {items.map((item) => (
        <li key={item} className="flex items-center gap-2 text-xs md:text-base">
          <Check
            className={`w-4 h-4 flex-shrink-0 ${green ? 'text-green-500' : 'text-[#C9A84C]'}`}
            strokeWidth={2}
          />
          <span className="text-[#9A9182]">{item}</span>
        </li>
      ))}
    </ul>
  )
}

function StatCard({
  icon: Icon,
  value,
  label,
}: {
  icon: React.ElementType
  value: string
  label: string
}) {
  return (
    <div className="bg-[#141414] border border-[#C9A84C]/12 p-3 md:p-6 text-center">
      <Icon
        className="w-6 h-6 md:w-10 md:h-10 text-[#C9A84C] mx-auto mb-2"
        strokeWidth={1.5}
      />
      <h4 className="font-serif text-lg md:text-2xl font-light text-gradient-gold">
        {value}
      </h4>
      <p className="text-[10px] md:text-sm text-[#9A9182]">{label}</p>
    </div>
  )
}

function ContactCard({
  icon: Icon,
  title,
  subtitle,
}: {
  icon: React.ElementType
  title: string
  subtitle: string
}) {
  return (
    <div className="bg-[#141414] border border-[#C9A84C]/12 p-3 md:p-6 flex items-start gap-3 md:gap-4">
      <Icon
        className="w-5 h-5 md:w-8 md:h-8 text-[#C9A84C] flex-shrink-0 mt-0.5"
        strokeWidth={1.5}
      />
      <div>
        <h4 className="text-sm md:text-base font-medium text-[#F5F0E8] mb-0.5">
          {title}
        </h4>
        <p className="text-[10px] md:text-sm text-[#9A9182]">{subtitle}</p>
      </div>
    </div>
  )
}

// ─── Section ──────────────────────────────────────────────────────────────────

export default function B2BFeatures() {
  return (
    <section className="py-10 md:py-20 bg-[#0B0B0B]">
      <div className="container mx-auto px-4 md:px-12">
        <div className="max-w-6xl mx-auto space-y-12 md:space-y-20">
          {/* Block 1 — Fleet */}
          <div className="grid lg:grid-cols-2 gap-6 md:gap-12 items-center">
            {/* Text */}
            <div className="space-y-3 md:space-y-6">
              <Tag icon={Car} label="Premium Fleet" />
              <h2 className="font-serif text-xl md:text-4xl font-light text-gradient-gold">
                Luxury Fleet &amp; Group Transport
              </h2>
              <p className="text-xs md:text-lg text-[#9A9182] leading-relaxed">
                We provide a fleet of premium vehicles that match the highest
                market standards. From executive sedans to VIP vans, we offer
                capacity for groups of 6 to 48 people.
              </p>
              <CheckList
                items={[
                  'Tesla Model S, Mercedes EQE, EQS, EQV',
                  'Mercedes E-Class, S-Class, Sprinter',
                  'Groups of 6 to 48 people',
                ]}
              />
            </div>

            {/* Stats */}
            <div className="grid grid-cols-2 gap-3 md:gap-4">
              <StatCard icon={Car} value="7+" label="Premium Models" />
              <StatCard icon={Users} value="48" label="Max. People" />
            </div>
          </div>

          {/* Block 2 — Commissions (reversed) */}
          <div className="grid lg:grid-cols-2 gap-6 md:gap-12 items-center">
            {/* Commission card */}
            <div className="order-2 lg:order-1 bg-[#141414] border border-[#C9A84C]/25 p-5 md:p-8 relative">
              <DollarSign
                className="w-10 h-10 md:w-16 md:h-16 text-[#C9A84C] mb-3 md:mb-6"
                strokeWidth={1.5}
              />
              <h3 className="font-serif text-2xl md:text-4xl font-light text-gradient-gold mb-2 md:mb-4">
                15-20%
              </h3>
              <p className="text-sm md:text-xl text-[#9A9182]">
                Commission per booking
              </p>
              <div className="mt-4 md:mt-6 pt-4 md:pt-6 border-t border-[#C9A84C]/12">
                <p className="text-xs md:text-sm text-[#9A9182]">
                  Special conditions for volume contracts and long-term
                  partnerships
                </p>
              </div>
            </div>

            {/* Text */}
            <div className="order-1 lg:order-2 space-y-3 md:space-y-6">
              <Tag icon={DollarSign} label="Attractive Conditions" />
              <h2 className="font-serif text-xl md:text-4xl font-light text-gradient-gold">
                Commissions &amp; Competitive Pricing
              </h2>
              <p className="text-xs md:text-lg text-[#9A9182] leading-relaxed">
                We offer attractive commission conditions between 15% and 20%
                per booking. With volume contracts, benefit from even more
                competitive prices.
              </p>
              <CheckList
                items={[
                  '15-20% commission per booking',
                  'Volume contracts with discounts',
                  'Guaranteed monthly payments',
                ]}
              />
            </div>
          </div>

          {/* Block 3 — Sustainability */}
          <div className="grid lg:grid-cols-2 gap-6 md:gap-12 items-center">
            {/* Text */}
            <div className="space-y-3 md:space-y-6">
              <Tag icon={Leaf} label="Sustainability" green />
              <h2 className="font-serif text-xl md:text-4xl font-light text-gradient-gold">
                Decarbonization Goals
              </h2>
              <p className="text-xs md:text-lg text-[#9A9182] leading-relaxed">
                We help companies achieve their corporate decarbonization goals.
                With a mostly electric fleet, we offer carbon-zero certificates
                and ESG reports.
              </p>
              <CheckList
                green
                items={[
                  'Carbon-zero certificates',
                  'Quarterly ESG reports',
                  'Mostly electric fleet',
                ]}
              />
            </div>

            {/* Contact cards */}
            <div className="space-y-3 md:space-y-4">
              <ContactCard
                icon={Phone}
                title="Direct Hotline"
                subtitle="Priority access"
              />
              <ContactCard
                icon={MessageCircle}
                title="WhatsApp Business"
                subtitle="Quick responses"
              />
              <ContactCard
                icon={Mail}
                title="Dedicated Manager"
                subtitle="Single point of contact"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
