const PILLARS = [
  {
    n: '01',
    title: 'Premium Fleet Selection',
    desc: 'Choose from our luxury Mercedes-Benz fleet, including E-Class, S-Class, V-Class and Sprinter vehicles, tailored to the size and requirements of your event.',
  },
  {
    n: '02',
    title: 'Precise Event Coordination',
    desc: 'Our team carefully plans arrival schedules, departure logistics and guest movements to ensure a smooth and efficient event experience.',
  },
  {
    n: '03',
    title: 'Professional Chauffeurs',
    desc: 'Experienced, professionally dressed chauffeurs delivering the highest standards of service, discretion and reliability.',
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
