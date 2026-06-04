import { Users } from 'lucide-react'

const PROFILES = [
  { n: '01', title: 'Business Executives', desc: 'Arrive composed, depart on schedule.' },
  { n: '02', title: 'International Travellers', desc: 'A familiar welcome in an unfamiliar terminal.' },
  { n: '03', title: 'Families', desc: 'Children, luggage and timings, gracefully handled.' },
  { n: '04', title: 'VIP Guests', desc: 'A discreet, protocol-aware reception.' },
  { n: '05', title: 'Luxury Leisure Clients', desc: 'Begin the holiday before leaving the airport.' },
  { n: '06', title: 'Senior Travellers', desc: 'A patient hand from kerb to cabin.' },
  { n: '07', title: 'High-Profile Passengers', desc: 'Privacy, fluency, complete discretion.' },
  { n: '08', title: 'Diplomatic Delegations', desc: 'Protocol-aware reception with absolute discretion.' },
  { n: '09', title: 'Private Aviation Guests', desc: 'A seamless bridge between terminal and chauffeur.' },
]

export function VipConciergeForWhom() {
  return (
    <section className="relative container mx-auto px-6 md:px-12 py-20 md:py-32">
      <div className="text-center max-w-3xl mx-auto mb-16 md:mb-24">
        <span className="inline-flex items-center gap-2 text-[10px] md:text-xs tracking-[0.5em] uppercase text-[#C9A84C] mb-6">
          <Users className="w-3 h-3" />
          For Whom
        </span>
        <h2 className="font-serif text-3xl md:text-5xl font-light text-[#F5F0E8] leading-[1.15]">
          Designed for travellers who value their time
        </h2>
        <div className="flex items-center justify-center gap-3 mt-8">
          <span className="w-8 h-px bg-[#C9A84C]/30" />
          <span className="w-1 h-1 rotate-45 bg-[#C9A84C]/70" />
          <span className="w-8 h-px bg-[#C9A84C]/30" />
        </div>
      </div>

      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-px bg-[#C9A84C]/10 max-w-6xl mx-auto border border-[#C9A84C]/10">
        {PROFILES.map((p) => (
          <div
            key={p.n}
            className="relative bg-[#0B0B0B] p-10 md:p-12 hover:bg-gradient-to-br hover:from-[#C9A84C]/[0.04] hover:to-transparent transition-all duration-700 group"
          >
            <span className="absolute top-6 right-6 font-serif text-xs text-[#C9A84C]/40 tracking-widest">
              {p.n}
            </span>
            <h3 className="font-serif text-lg md:text-xl text-[#F5F0E8] mb-4 font-light leading-tight">
              {p.title}
            </h3>
            <div className="w-6 h-px bg-[#C9A84C]/40 mb-4 transition-all duration-700 group-hover:w-12 group-hover:bg-[#C9A84C]/60" />
            <p className="text-sm text-[#F5F0E8]/60 font-light leading-relaxed">{p.desc}</p>
          </div>
        ))}
      </div>
    </section>
  )
}
