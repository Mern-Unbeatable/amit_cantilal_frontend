import { createFileRoute } from '@tanstack/react-router'
import { motion } from 'framer-motion'
import { Elements } from '@stripe/react-stripe-js'
import { loadStripe } from '@stripe/stripe-js'
import {APIProvider} from "@vis.gl/react-google-maps";
import { mainTransitionProps } from '@/lib/utils.ts'
import BookingWidget from '@/features/booking/booking-widget.tsx'

export const Route = createFileRoute('/_public/booking/')({
  component: RouteComponent,
})

const stripePromise = loadStripe(import.meta.env.VITE_STRIPE_PUBLISHABLE_KEY)

function RouteComponent() {
  return (
    <motion.div {...mainTransitionProps}>
      <section className="relative min-h-screen flex items-center justify-center pt-10 bg-black overflow-hidden">
        <div className="container mx-auto px-4 md:px-12 py-20">
          <h1 className="font-serif text-3xl md:text-5xl font-light text-gradient-gold text-center mb-8">
            Book Your Ride
          </h1>
          <Elements stripe={stripePromise}>
            <APIProvider apiKey={import.meta.env.VITE_GOOGLE_MAPS_API_KEY}>
              <BookingWidget />
            </APIProvider>
          </Elements>
        </div>
      </section>
    </motion.div>
  )
}
