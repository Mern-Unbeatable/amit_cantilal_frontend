import { createFileRoute } from '@tanstack/react-router'
import { Shield } from 'lucide-react'
import LoginForm from '@/features/auth/login-form.tsx'

export const Route = createFileRoute('/_auth/login')({
  component: RouteComponent,
})

function RouteComponent() {
  return (
    <div className="bg-black-2 border border-gold/12 p-8">
      {/* Header */}
      <div className="text-center mb-8">
        <div className="mx-auto w-12 h-12 bg-gold flex items-center justify-center mb-4">
          <Shield className="w-5 h-5 text-black" strokeWidth={1.5} />
        </div>
        <h1 className="font-serif text-2xl font-light text-gradient-gold">
          Admin Login
        </h1>
        <p className="text-xs text-white-dim mt-1">
          Access the management panel
        </p>
      </div>

      <LoginForm />
    </div>
  )
}
