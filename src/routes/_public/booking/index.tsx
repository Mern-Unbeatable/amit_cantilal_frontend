import { createFileRoute } from '@tanstack/react-router'
import { motion } from 'framer-motion'
import {APIProvider} from "@vis.gl/react-google-maps";
import { mainTransitionProps } from '@/lib/utils.ts'
import BookingWidget from '@/features/booking/booking-widget.tsx'

export const Route = createFileRoute('/_public/booking/')({
  component: RouteComponent,
})

function RouteComponent() {
  return (
    <motion.div {...mainTransitionProps}>
      <section className="relative min-h-screen flex items-center justify-center pt-10 bg-black">
        <div className="container mx-auto px-4 md:px-12 py-20 w-full min-w-0 overflow-x-hidden">
          <h1 className="font-serif text-3xl md:text-5xl font-light text-gradient-gold text-center mb-8">
            Book Your Ride
          </h1>
          <APIProvider apiKey={import.meta.env.VITE_GOOGLE_MAPS_API_KEY}>
            <BookingWidget />
          </APIProvider>
        </div>
      </section>
    </motion.div>
  )
}
