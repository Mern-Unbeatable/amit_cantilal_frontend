import { Button } from '@/components/ui/button'

type BookingPaymentStepProps = {
  total: number
  isLoading: boolean
  onBack: () => void
  onPay: () => void
}

export function BookingPaymentStep({
  total,
  isLoading,
  onBack,
  onPay,
}: BookingPaymentStepProps) {
  return (
    <div className="bg-[#141414] border border-[#C9A84C]/12 p-5 md:p-8 space-y-6">
      <p className="font-serif text-sm md:text-base text-[#C9A84C]">Payment</p>

      {/* Stripe mount point (real one comes later) */}
      <div className="bg-[#0B0B0B] border border-[#C9A84C]/20 p-4 min-h-[80px] flex items-center">
        <span className="text-xs text-[#9A9182]/60">
          Stripe Elements will render here
        </span>
      </div>

      <p className="text-[10px] text-[#9A9182]/60">
        Payments are secured and encrypted by Stripe
      </p>

      <div className="flex gap-3">
        <Button
          onClick={onBack}
          variant="outline"
          className="flex-1 border-[#C9A84C]/20 bg-transparent text-[#9A9182] hover:text-white"
        >
          Back
        </Button>

        <Button
          onClick={onPay}
          disabled={isLoading}
          className="flex-1 bg-[#C9A84C] hover:bg-[#C9A84C]/90 text-[#0B0B0B]"
        >
          {isLoading ? 'Processing...' : `Pay €${total.toLocaleString()}`}
        </Button>
      </div>
    </div>
  )
}
