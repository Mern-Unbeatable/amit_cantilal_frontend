import { Sparkles } from 'lucide-react'

export function VipConciergeExperience() {
  return (
    <section className="container mx-auto px-6 md:px-12 py-20 md:py-32">
      <div className="grid lg:grid-cols-2 gap-12 lg:gap-24 items-start max-w-7xl mx-auto">
        <div className="order-2 lg:order-1">
          <span className="inline-flex items-center gap-2 text-[10px] md:text-xs tracking-[0.4em] uppercase text-[#C9A84C] mb-6">
            <Sparkles className="w-3 h-3" />
            The Experience
          </span>
          <h2 className="font-serif text-3xl md:text-5xl font-light text-[#F5F0E8] leading-[1.15] mb-8">
            Airport travel, quietly reimagined
          </h2>
          <div className="w-12 h-px bg-[#C9A84C]/40 mb-8" />
          <p className="text-base md:text-lg text-[#F5F0E8]/70 font-light leading-relaxed">
            Long queues, unfamiliar terminals, the small frictions of international travel — they have a way of dulling the start of every journey. Our private airport concierge removes them entirely. A dedicated host meets you the moment you step off the aircraft or arrive at the terminal, guiding you through every formality with discretion, fluency and unhurried care. You travel as you should: rested, on time, and entirely at ease.
          </p>
        </div>

        <div className="order-1 lg:order-2 w-full max-w-md lg:max-w-sm lg:ml-auto">
          <div className="relative aspect-[4/5] overflow-hidden">
            <img
              src="/airport-transfer.png"
              alt="Airport travel, quietly reimagined"
              className="w-full h-full object-cover"
              loading="lazy"
              width={1200}
              height={1500}
            />
            <div className="absolute inset-0 bg-gradient-to-t from-[#0B0B0B]/40 via-transparent to-transparent" />
          </div>
        </div>
      </div>
    </section>
  )
}
