const ITEMS = [
  { n: '01', text: 'Luxury Mercedes-Benz vehicles suited to your event requirements' },
  { n: '02', text: 'Vehicle customization options available upon request' },
  { n: '03', text: 'Coordination with event planners, venues and organizers' },
  { n: '04', text: 'Scheduled transportation for guests, speakers or VIP attendees' },
  { n: '05', text: 'Complimentary bottled water and premium onboard amenities' },
  { n: '06', text: 'Flexible scheduling and return transportation options' },
]

export function EventsSignature() {
  return (
    <section className="py-28 md:py-36 bg-[#0B0B0B]">
      <div className="container mx-auto px-6 lg:px-12 max-w-5xl">
        <div className="text-center mb-16">
          <p className="text-[10px] tracking-[0.3em] uppercase text-[#C9A84C] mb-6 font-light">
            Always included
          </p>
          <h2 className="font-serif text-3xl md:text-5xl text-[#F5F0E8] font-light leading-tight">
            What's Included
          </h2>
        </div>

        <ul className="grid md:grid-cols-2 gap-x-16 gap-y-0 max-w-3xl mx-auto">
          {ITEMS.map((item) => (
            <li
              key={item.n}
              className="flex items-start gap-5 py-5 border-b border-[#C9A84C]/10"
            >
              <span className="text-[10px] tracking-[0.3em] text-[#C9A84C] mt-1.5 font-light shrink-0">
                {item.n}
              </span>
              <span className="text-[#F5F0E8]/75 font-light leading-relaxed">{item.text}</span>
            </li>
          ))}
        </ul>
      </div>
    </section>
  )
}
