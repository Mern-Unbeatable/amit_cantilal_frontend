import { Link, createFileRoute } from '@tanstack/react-router'
import { motion } from 'framer-motion'
import { z } from 'zod'
import RegisterForm from '@/features/auth/register-form.tsx'

export const Route = createFileRoute('/_auth/apply')({
  validateSearch: z.object({
    plan: z.enum(['frontend', 'fullstack', 'backend']).optional(),
  }),
  component: RouteComponent,
})

function RouteComponent() {
  const { plan } = Route.useSearch()
  const selectedPlanLabel = plan
    ? `${plan.charAt(0).toUpperCase()}${plan.slice(1)}`
    : null

  return (
    <>
      <div className="flex-1 flex items-center justify-center px-6 py-10 overflow-y-auto">
        <motion.div
          className="w-full max-w-3xl"
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          {/* Header */}
          <div className="mb-8">
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white tracking-tight mb-1.5">
              Enroll and create your account
            </h2>
          </div>
          {selectedPlanLabel && (
            <p className="mb-2 text-sm font-medium text-orange-500">
              Selected plan: {selectedPlanLabel}
            </p>
          )}
          <p className="text-sm text-gray-500 dark:text-gray-400">
            Already have an account?{' '}
            <Link
              to="/login"
              className="text-orange-500 font-medium hover:text-orange-600 transition-colors"
            >
              Sign in
            </Link>
          </p>
          <RegisterForm />
        </motion.div>
      </div>
    </>
  )
}
