import { createFileRoute } from '@tanstack/react-router'
import { motion } from 'framer-motion'
import { mainTransitionProps } from '@/lib/utils.ts'
import { PageHero } from '@/components/shared/page-hero.tsx'
import { ToursSection } from '@/components/sections/tour-section.tsx'
import { useTours } from '@/features/tour/tour.hooks.ts'

export const Route = createFileRoute('/_public/tours/')({
  component: RouteComponent,
})

function RouteComponent() {
  const { data: tours, isFetching } = useTours()

  return (
    <motion.div {...mainTransitionProps}>
      <PageHero
        image="/80b4782c-0188-480d-9c68-db3524d24158-1920w.webp"
        title="Tours"
        subtitle="Discover Portugal through exclusive private experiences designed for comfort, authenticity, and elegance. Travel with our professional chauffeurs in premium Mercedes vehicles and enjoy unforgettable journeys tailored to your pace."
      />

      {isFetching && (
        <div className="flex items-center justify-center w-full h-screen bg-black">
          <div className="w-12 h-12 border-4 border-gold/20 border-t-gold rounded-full animate-spin" />
        </div>
      )}

      {tours && !isFetching && <ToursSection tours={tours} />}
    </motion.div>
  )
}
