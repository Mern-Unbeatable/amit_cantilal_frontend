const PILLARS = [
  {
    n: '01',
    title: 'Tailored vehicles',
    desc: 'From a single Maybach to a coordinated convoy, dressed and prepared to the occasion.',
  },
  {
    n: '02',
    title: 'Timed choreography',
    desc: 'Synchronised arrivals and departures, rehearsed in advance with your planner.',
  },
  {
    n: '03',
    title: 'Discreet chauffeurs',
    desc: 'Formal attire, silent presence, perfect timing, invisible until needed.',
  },
]

export function EventsExperience() {
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
