import { useState } from 'react'
import { createFileRoute, useNavigate } from '@tanstack/react-router'
import { motion } from 'framer-motion'
import { Search } from 'lucide-react'
import { mainTransitionProps } from '@/lib/utils.ts'
import { useLookupBooking } from '@/features/booking/booking.hooks.ts'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'

export const Route = createFileRoute('/_public/booking/lookup')({
  component: RouteComponent,
})

function RouteComponent() {
  const [reference, setReference] = useState('')
  const [email, setEmail] = useState('')
  const [error, setError] = useState('')
  const navigate = useNavigate()
  const lookup = useLookupBooking()

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError('')

    try {
      const booking = await lookup.mutateAsync({ reference: reference.trim().toUpperCase(), email: email.trim() })

      if (booking.status === 'confirmed') {
        navigate({ to: '/booking/confirm', search: { already_confirmed: booking.reference } as never })
        return
      }

      navigate({ to: '/booking/pay/$reference', params: { reference: booking.reference }, search: { email: email.trim() } as never })
    } catch {
      setError('No booking found with that reference and email. Please check and try again.')
    }
  }

  return (
    <motion.div {...mainTransitionProps}>
      <section className="relative min-h-screen flex items-center justify-center bg-[#0B0B0B] overflow-hidden">
        <div
          className="absolute inset-0 pointer-events-none"
          style={{ background: 'radial-gradient(ellipse 60% 40% at 50% 20%, rgba(201,168,76,0.05) 0%, transparent 70%)' }}
        />

        <div className="container mx-auto px-4 py-20 max-w-md">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <div className="text-center mb-10">
              <div className="inline-flex items-center justify-center w-14 h-14 border border-[#C9A84C]/30 mb-6">
                <Search className="w-6 h-6 text-[#C9A84C]" strokeWidth={1.5} />
              </div>
              <h1 className="font-serif text-3xl md:text-4xl font-light text-gradient-gold mb-3">
                Find Your Booking
              </h1>
              <p className="text-sm text-[#9A9182]">
                Enter your booking reference and email to retrieve your booking and complete payment.
              </p>
            </div>

            <form onSubmit={handleSubmit} className="bg-[#141414] border border-[#C9A84C]/12 p-6 md:p-8 space-y-5">
              <div className="space-y-1.5">
                <Label className="text-sm text-[#9A9182]">
                  Booking Reference <span className="text-[#C9A84C]">*</span>
                </Label>
                <Input
                  value={reference}
                  onChange={(e) => setReference(e.target.value.toUpperCase())}
                  placeholder="OWG-A1B2C3"
                  required
                  className="h-14 text-base bg-[#0B0B0B] border-[#C9A84C]/20 focus:border-[#C9A84C]/50 rounded-none text-white placeholder:text-[#9A9182]/50 tracking-widest font-mono"
                />
              </div>

              <div className="space-y-1.5">
                <Label className="text-sm text-[#9A9182]">
                  Email Address <span className="text-[#C9A84C]">*</span>
                </Label>
                <Input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="john@example.com"
                  required
                  className="h-14 text-base bg-[#0B0B0B] border-[#C9A84C]/20 focus:border-[#C9A84C]/50 rounded-none text-white placeholder:text-[#9A9182]/50"
                />
              </div>

              {error && (
                <p className="text-sm text-red-400 bg-red-400/10 border border-red-400/20 px-4 py-3">
                  {error}
                </p>
              )}

              <Button
                type="submit"
                disabled={lookup.isPending || !reference || !email}
                className="w-full h-14 rounded-none bg-[#C9A84C] hover:bg-[#E2C97E] text-[#0B0B0B] font-medium text-base tracking-[.1em] uppercase disabled:opacity-40"
              >
                {lookup.isPending ? (
                  <span className="flex items-center gap-2">
                    <span className="w-4 h-4 border-2 border-[#0B0B0B]/30 border-t-[#0B0B0B] rounded-full animate-spin" />
                    Looking up...
                  </span>
                ) : (
                  'Find Booking'
                )}
              </Button>

              <p className="text-xs text-[#9A9182]/60 text-center">
                Your reference was sent to your email when you made the booking.
              </p>
            </form>
          </motion.div>
        </div>
      </section>
    </motion.div>
  )
}
