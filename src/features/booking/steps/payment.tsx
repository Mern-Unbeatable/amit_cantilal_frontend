import { ChevronLeft, Lock } from 'lucide-react'
import { Button } from '@/components/ui/button'
import type { Vehicle } from '../booking.types'

interface Props {
  vehicle: Vehicle
  onBack: () => void
  onSubmit: () => void
  isSubmitting: boolean
}

export default function Step4Payment({ vehicle, onBack, onSubmit, isSubmitting }: Props) {
  return (
    <div className="bg-[#141414] border border-[#C9A84C]/12 p-5 md:p-8 space-y-6">

      <h2 className="font-serif text-2xl md:text-3xl font-light text-gradient-gold">
        Payment
      </h2>

      {/* Stripe card element mount point */}
      <div className="space-y-4">
        <div className="space-y-1.5">
          <label className="text-sm text-[#9A9182]">Card Details</label>
          {/* TODO: Mount <CardElement /> from @stripe/react-stripe-js here */}
          <div
            id="stripe-card-element"
            className="bg-[#0B0B0B] border border-[#C9A84C]/20 p-4 h-14 flex items-center"
          >
            <span className="text-sm text-[#9A9182]/50">
              Stripe card element mounts here
            </span>
          </div>
        </div>
      </div>

      {/* Secure notice */}
      <p className="text-[11px] text-[#9A9182]/60 flex items-center gap-1.5">
        <Lock className="w-3 h-3" />
        Payments are secured and encrypted by Stripe
      </p>

      {/* Navigation */}
      <div className="flex gap-3">
        <Button
          onClick={onBack}
          variant="outline"
          className="flex-1 h-14 rounded-none border-[#C9A84C]/20 bg-transparent text-[#9A9182] hover:text-white hover:border-[#C9A84C]/40 text-base"
        >
          <ChevronLeft className="w-5 h-5 mr-2" />
          Previous
        </Button>
        <Button
          onClick={onSubmit}
          disabled={isSubmitting}
          className="flex-1 h-14 rounded-none bg-[#C9A84C] hover:bg-[#E2C97E] text-[#0B0B0B] font-semibold text-base tracking-[.08em] uppercase disabled:opacity-40"
        >
          {isSubmitting ? 'Processing...' : `Pay €${vehicle.price}`}
        </Button>
      </div>
    </div>
  )
}