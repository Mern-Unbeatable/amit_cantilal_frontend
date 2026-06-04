import { ArrowUpRight } from 'lucide-react'
import { Link } from '@tanstack/react-router'

export function CorporateCta() {
  return (
    <section className="py-40 bg-[#0F0F0F]">
      <div className="container mx-auto px-6 lg:px-12 max-w-3xl text-center">
        <p className="text-[10px] tracking-[0.3em] uppercase text-[#C9A84C] mb-8 font-light">
          By appointment
        </p>
        <h2 className="font-serif text-4xl md:text-6xl text-[#F5F0E8] mb-10 font-light leading-tight">
          Request Your Experience
        </h2>
        <p className="text-[#F5F0E8]/60 mb-14 font-light text-lg leading-relaxed max-w-xl mx-auto">
          Every journey begins with a quiet conversation. Tell us when, and we compose the rest.
        </p>
        <Link
          to="/booking"
          className="inline-flex items-center gap-4 bg-[#C9A84C] text-[#0B0B0B] px-12 py-5 text-[10px] tracking-[0.3em] uppercase hover:bg-[#E2C97E] transition-all duration-700 font-medium"
        >
          Plan Your Journey <ArrowUpRight className="w-3 h-3" strokeWidth={1} />
        </Link>
        <div className="mt-8 text-sm text-white-cream/40">
          <Link
            to="/vip-concierge"
            className="hover:text-gold transition-colors duration-500"
          >
            Or speak with concierge
          </Link>
        </div>
      </div>
    </section>
  )
}
