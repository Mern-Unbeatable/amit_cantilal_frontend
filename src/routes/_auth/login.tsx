import { createFileRoute } from '@tanstack/react-router'
import { Shield } from 'lucide-react'
import LoginForm from '@/features/auth/login-form.tsx'

export const Route = createFileRoute('/_auth/login')({
  component: RouteComponent,
})

function RouteComponent() {
  return (
    <div className="bg-[#141414] border border-[#C9A84C]/12 p-8">
      {/* Header */}
      <div className="text-center mb-8">
        <div className="mx-auto w-12 h-12 bg-[#C9A84C] flex items-center justify-center mb-4">
          <Shield className="w-5 h-5 text-[#0B0B0B]" strokeWidth={1.5} />
        </div>
        <h1 className="font-serif text-2xl font-light text-gradient-gold">
          Admin Login
        </h1>
        <p className="text-xs text-[#9A9182] mt-1">
          Access the management panel
        </p>
      </div>

      <LoginForm/>
    </div>
  )
}
