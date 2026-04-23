import { Link, createFileRoute } from '@tanstack/react-router'
import { motion } from 'framer-motion'
import LoginForm from '@/features/auth/login-form.tsx'

export const Route = createFileRoute('/_auth/login')({
  component: RouteComponent,
})

function RouteComponent() {
  return (
    <div className="flex-1 flex items-center justify-center px-6 py-10 overflow-y-auto">
      <motion.div
        className="w-full max-w-3xl"
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        {/* Header */}
        <div className="mb-8">
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white tracking-tight mb-1.5 font-['Syne',sans-serif]">
            Login your account
          </h2>
          <p className="text-sm text-gray-500 dark:text-gray-400">
            Don't have an account?{' '}
            <Link
              to="/"
              className="text-orange-500 font-medium hover:text-orange-600 transition-colors"
            >
              Create account
            </Link>
          </p>
        </div>

        <LoginForm />

      </motion.div>
    </div>
  )
}
