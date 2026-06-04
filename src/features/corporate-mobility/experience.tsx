const PILLARS = [
  {
    n: '01',
    title: 'Account based billing',
    desc: 'Monthly consolidated invoicing with a dedicated account manager and single point of contact.',
  },
  {
    n: '02',
    title: 'Multi-vehicle coordination',
    desc: 'From a single S-Class to a full event fleet of twenty, dispatched and tracked centrally.',
  },
  {
    n: '03',
    title: 'NDA on request',
    desc: 'Confidentiality formalised in writing, vetted chauffeurs, sealed itineraries.',
  },
]

export function CorporateExperience() {
  return (
    <section className="py-28 md:py-32 border-y border-[#C9A84C]/10 bg-[#0F0F0F]">
      <div className="container mx-auto px-6 lg:px-12 max-w-6xl">
        <p className="text-center text-[10px] tracking-[0.3em] uppercase text-[#C9A84C] mb-16 font-light">
          The Experience
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
