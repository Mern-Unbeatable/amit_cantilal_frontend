import { ChevronLeft } from 'lucide-react'
import { Link } from '@tanstack/react-router'

export function CorporateHero() {
  return (
    <section className="relative h-[92vh] min-h-[600px] w-full overflow-hidden">
      <img
        src="/partnership-banner.png"
        alt="Corporate Mobility"
        className="absolute inset-0 w-full h-full object-cover scale-105"
        loading="eager"
        fetchPriority="high"
      />
      <div className="absolute inset-0 bg-gradient-to-b from-black/30 via-black/20 to-[#0B0B0B]" />

      <div className="absolute inset-0 flex items-end">
        <div className="container mx-auto px-6 lg:px-12 pb-20 lg:pb-32">
          <Link
            to="/b2b"
            className="inline-flex items-center gap-2 text-[10px] tracking-[0.3em] uppercase text-[#F5F0E8]/50 hover:text-[#C9A84C] transition-colors duration-500 mb-10 font-light"
          >
            <ChevronLeft className="w-3 h-3" strokeWidth={1} />
            Chauffeur
          </Link>
          <p className="text-[10px] tracking-[0.3em] uppercase text-[#C9A84C] mb-6 font-light">
            For companies
          </p>
          <h1 className="font-serif text-5xl md:text-7xl lg:text-[5.5rem] text-[#F5F0E8] leading-[1.05] max-w-4xl font-light">
            Corporate Mobility
          </h1>
          <p className="mt-10 text-base md:text-xl text-[#F5F0E8]/60 max-w-2xl font-light tracking-wide leading-relaxed">
            Quiet logistics for executives, boards and guests.
          </p>
        </div>
      </div>
    </section>
  )
}
