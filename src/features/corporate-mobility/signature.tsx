const ITEMS = [
  { n: '01', text: 'Dedicated corporate account manager' },
  { n: '02', text: 'Monthly consolidated invoicing, GDPR compliant' },
  { n: '03', text: 'Vetted, trained chauffeurs with NDA on file' },
  { n: '04', text: 'Multi-vehicle coordination for events and roadshows' },
  { n: '05', text: 'Priority dispatch, 24/7 support line' },
  { n: '06', text: 'Integration with travel management platforms on request' },
]

export function CorporateSignature() {
  return (
    <section className="py-28 md:py-36 bg-[#0B0B0B]">
      <div className="container mx-auto px-6 lg:px-12 max-w-5xl">
        <div className="text-center mb-16">
          <p className="text-[10px] tracking-[0.3em] uppercase text-[#C9A84C] mb-6 font-light">
            Always included
          </p>
          <h2 className="font-serif text-3xl md:text-5xl text-[#F5F0E8] font-light leading-tight">
            The Signature
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
