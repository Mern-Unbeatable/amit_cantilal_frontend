import { createFileRoute } from '@tanstack/react-router'
import { motion } from 'framer-motion'
import { mainTransitionProps } from '@/lib/utils.ts'
import { PageHero } from '@/components/shared/page-hero.tsx'
import { ToursSection } from '@/components/sections/tour-section.tsx'
import { useTours } from '@/features/tour/tour.hooks.ts'
import { pageHead } from '@/lib/seo.ts'

export const Route = createFileRoute('/_public/tours/')({
  head: () =>
    pageHead({
      title: 'Tours',
      description:
        'Discover Portugal through exclusive private tours — travel with a professional chauffeur in a premium Mercedes vehicle, tailored to your pace.',
      path: '/tours',
    }),
  component: RouteComponent,
})

function RouteComponent() {
  const { data: tours, isFetching } = useTours()

  return (
    <motion.div {...mainTransitionProps}>
      <PageHero
        image="/tour-banner.PNG"
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
