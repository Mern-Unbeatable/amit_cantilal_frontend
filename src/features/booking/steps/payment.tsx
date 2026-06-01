import { PaymentElement, useElements, useStripe } from '@stripe/react-stripe-js'
import type { Stripe, StripeElements } from '@stripe/stripe-js'
import type { Vehicle } from '@/features/booking/booking.types.ts'

interface Step4PaymentProps {
  vehicle: Vehicle
  onBack: () => void
  onSubmit: (stripe: Stripe, elements: StripeElements) => Promise<void>
  isSubmitting: boolean
  stripeError: string | null
}

export default function Step4Payment({
  onBack,
  onSubmit,
  isSubmitting,
  stripeError,
}: Step4PaymentProps) {
  const stripe = useStripe()
  const elements = useElements()

  const handlePay = async () => {
    if (!stripe || !elements) return
    await onSubmit(stripe, elements)
  }

  const ready = !!stripe && !!elements

  return (
    <div className="bg-[#141414] border border-[#C9A84C]/12 p-5 md:p-8 space-y-6">
      <div>
        <h2 className="font-serif text-xl text-[#F5F0E8] font-light mb-1">
          Payment
        </h2>
        <p className="text-sm text-[#9A9182]">
          Your payment is secured by Stripe.
        </p>
      </div>

      {/* Stripe's PaymentElement renders the card form */}
      <div className="rounded-sm border border-[#C9A84C]/15 p-4 bg-[#111111]">
        <PaymentElement
          options={{
            layout: 'tabs',
          }}
        />
      </div>

      {/* Stripe error message */}
      {stripeError && (
        <p className="text-sm text-red-400 bg-red-400/10 border border-red-400/20 rounded-sm px-4 py-3">
          {stripeError}
        </p>
      )}

      {/* Actions */}
      <div className="flex gap-3 pt-2">
        <button
          type="button"
          onClick={onBack}
          disabled={isSubmitting}
          className="flex-1 py-3 px-6 border border-[#C9A84C]/30 text-[#9A9182] text-sm
                     hover:border-[#C9A84C]/60 hover:text-[#F5F0E8] transition-colors duration-200
                     disabled:opacity-40 disabled:cursor-not-allowed"
        >
          Back
        </button>

        <button
          type="button"
          onClick={handlePay}
          disabled={!ready || isSubmitting}
          className="flex-[2] py-3 px-6 bg-[#C9A84C] text-[#0B0B0B] text-sm font-medium
                     hover:bg-[#D4B55A] transition-colors duration-200
                     disabled:opacity-40 disabled:cursor-not-allowed
                     flex items-center justify-center gap-2"
        >
          {isSubmitting ? (
            <>
              <span className="w-4 h-4 border-2 border-[#0B0B0B]/30 border-t-[#0B0B0B] rounded-full animate-spin" />
              Processing...
            </>
          ) : (
            'Pay Now'
          )}
        </button>
      </div>

      <p className="text-xs text-[#9A9182]/60 text-center">
        By completing payment you agree to our terms of service.
      </p>
    </div>
  )
}
