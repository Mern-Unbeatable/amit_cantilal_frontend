import { createFileRoute } from '@tanstack/react-router'
import { motion } from 'framer-motion'
import { mainTransitionProps } from '@/lib/utils.ts'
import BookingWidget from '@/features/booking/booking-widget.tsx'

export const Route = createFileRoute('/_public/booking')({
  component: RouteComponent,
})

function RouteComponent() {
  return (
    <motion.div {...mainTransitionProps}>
      <section className="relative min-h-screen flex items-center justify-center pt-20 bg-[#0B0B0B] overflow-hidden">
        <div className="container mx-auto px-4 md:px-12 py-20">
          <h1 className="font-serif text-3xl md:text-5xl font-light text-gradient-gold text-center mb-8">
            Book Your Ride
          </h1>
          <BookingWidget />
        </div>
      </section>
    </motion.div>
  )
}
