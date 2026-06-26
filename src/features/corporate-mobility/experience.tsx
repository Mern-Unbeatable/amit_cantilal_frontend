const PILLARS = [
  {
    n: '01',
    title: 'Executive Transfers',
    desc: 'Reliable transportation for executives, clients and VIP guests throughout Portugal.',
  },
  {
    n: '02',
    title: 'Event Transportation',
    desc: 'Coordinated fleet management for conferences, meetings, incentives and corporate events.',
  },
  {
    n: '03',
    title: 'Dedicated Account Support',
    desc: 'A single point of contact to manage reservations, changes and special requirements.',
  },
]

export function CorporateExperience() {
  return (
    <section className="py-28 md:py-32 border-y border-[#C9A84C]/10 bg-[#0F0F0F]">
      <div className="container mx-auto px-6 lg:px-12 max-w-6xl">
        <p className="text-center text-[10px] tracking-[0.3em] uppercase text-[#C9A84C] mb-16 font-light">
          Experience
        </p>
        <div className="grid md:grid-cols-3 gap-16 md:gap-24">
          {PILLARS.map((p) => (
            <div key={p.n} className="text-center md:text-left">
              <div className="text-[10px] tracking-[0.3em] uppercase text-[#C9A84C] mb-6 font-light">
                {p.n}
              </div>
              <h2 className="font-serif text-2xl md:text-3xl text-[#F5F0E8] mb-5 font-light leading-tight">
                {p.title}
              </h2>
              <p className="text-[#F5F0E8]/60 leading-relaxed font-light">{p.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
