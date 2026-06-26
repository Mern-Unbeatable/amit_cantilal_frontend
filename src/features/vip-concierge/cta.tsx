import { ArrowUpRight } from 'lucide-react'
import { Link } from '@tanstack/react-router'

export function VipConciergeCta() {
  return (
    <section className="relative py-24 md:py-40 overflow-hidden border-t border-white/5">
      <div className="absolute inset-0 bg-gradient-to-b from-[#C9A84C]/[0.03] via-transparent to-transparent" />
      <div className="container mx-auto px-6 md:px-12 relative z-10">
        <div className="max-w-3xl mx-auto text-center">
          <h2 className="font-serif text-3xl md:text-5xl lg:text-6xl font-light italic text-[#F5F0E8] leading-[1.15] mb-8">
            Travel With Confidence
          </h2>
          <div className="w-12 h-px bg-[#C9A84C]/40 mx-auto mb-8" />
          <p className="text-base md:text-xl text-[#F5F0E8]/70 font-light leading-relaxed italic mb-10">
            At Off We Go Portugal, we believe every journey should begin and end with exceptional service. Our airport concierge solutions are designed to complement our premium chauffeur services, ensuring a seamless experience from terminal to destination.
          </p>
          <Link
            to="/booking"
            className="inline-flex items-center gap-3 border border-[#C9A84C]/60 text-[#C9A84C] px-10 py-5 text-xs tracking-[0.3em] uppercase hover:bg-[#C9A84C] hover:text-[#0B0B0B] transition-all duration-500"
          >
            Book Now <ArrowUpRight className="w-4 h-4" />
          </Link>
        </div>
      </div>
    </section>
  )
}
