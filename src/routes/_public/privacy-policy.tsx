import { createFileRoute } from '@tanstack/react-router'
import { motion } from 'framer-motion'
import { mainTransitionProps } from '@/lib/utils.ts'
import { PageHero } from '@/components/shared/page-hero.tsx'

export const Route = createFileRoute('/_public/privacy-policy')({
  component: RouteComponent,
})

function RouteComponent() {
  return (
    <motion.div {...mainTransitionProps}>
      <PageHero
        title="Privacy Policy"
        subtitle="check out privacy policy"
      />

    </motion.div>
  )
}
