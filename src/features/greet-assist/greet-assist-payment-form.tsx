import { useState } from 'react'
import { PaymentElement, useElements, useStripe } from '@stripe/react-stripe-js'
import { Check, ShieldCheck } from 'lucide-react'

interface GreetAssistPaymentFormProps {
  reference: string
  amountFormatted: string
  onPaymentSuccess: () => void
}

export function GreetAssistPaymentForm({
  reference,
  amountFormatted,
  onPaymentSuccess,
}: GreetAssistPaymentFormProps) {
  const stripe = useStripe()
  const elements = useElements()

  const [isSubmitting, setIsSubmitting] = useState(false)
  const [errorMessage, setErrorMessage] = useState<string | null>(null)
  const [isSuccess, setIsSuccess] = useState(false)

  const handlePay = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!stripe || !elements) return

    setIsSubmitting(true)
    setErrorMessage(null)

    try {
      const { error: submitError } = await elements.submit()
      if (submitError) {
        setErrorMessage(
          submitError.message || 'Please check your card details.',
        )
        setIsSubmitting(false)
        return
      }

      const { error, paymentIntent } = await stripe.confirmPayment({
        elements,
        redirect: 'if_required',
        confirmParams: {
          return_url: `${window.location.origin}/airport-greet-and-assist?success=true&ref=${encodeURIComponent(reference)}`,
        },
      })

      if (error) {
        setErrorMessage(error.message || 'Payment failed. Please try again.')
      } else if (
        paymentIntent &&
        (paymentIntent.status === 'succeeded' ||
          paymentIntent.status === 'processing')
      ) {
        setIsSuccess(true)
        onPaymentSuccess()
      }
    } catch (err: unknown) {
      const msg = err instanceof Error ? err.message : 'An error occurred during payment.'
      setErrorMessage(msg)
    } finally {
      setIsSubmitting(false)
    }
  }

  if (isSuccess) {
    return (
      <div className="bg-[#141414] border border-[#C9A84C]/30 p-8 rounded-sm text-center space-y-4">
        <div className="w-14 h-14 bg-[#C9A84C] flex items-center justify-center mx-auto rounded-full">
          <Check className="w-7 h-7 text-[#0B0B0B]" strokeWidth={2.5} />
        </div>
        <h3 className="font-serif text-2xl text-[#F5F0E8] font-light">
          Payment Confirmed
        </h3>
        <p className="text-sm text-[#9A9182]">
          Thank you! Your payment for booking{' '}
          <strong className="text-[#C9A84C]">{reference}</strong> has been received.
          Our VIP operations team will oversee your airport assistance.
        </p>
      </div>
    )
  }

  return (
    <form onSubmit={handlePay} className="space-y-4">
      <div className="flex items-center justify-between text-xs text-[#9A9182] border-b border-[#2A2A2A] pb-3">
        <span>
          Reference: <strong className="text-[#F5F0E8]">{reference}</strong>
        </span>
        <span>
          Amount to charge:{' '}
          <strong className="text-[#C9A84C] text-sm">{amountFormatted}</strong>
        </span>
      </div>

      <div className="rounded-sm border border-[#C9A84C]/15 p-4 bg-[#111111]">
        <PaymentElement
          options={{
            layout: 'tabs',
          }}
        />
      </div>

      {errorMessage && (
        <div className="text-xs text-red-400 bg-red-400/10 border border-red-400/20 rounded-sm p-3">
          {errorMessage}
        </div>
      )}

      <button
        type="submit"
        disabled={!stripe || !elements || isSubmitting}
        className="w-full py-4 bg-[#C9A84C] text-[#0B0B0B] text-xs font-semibold uppercase tracking-[0.25em]
                   hover:bg-[#D4B55A] transition-all duration-300 rounded-sm
                   disabled:opacity-40 disabled:cursor-not-allowed flex items-center justify-center gap-2"
      >
        {isSubmitting ? (
          <>
            <span className="w-4 h-4 border-2 border-[#0B0B0B]/30 border-t-[#0B0B0B] rounded-full animate-spin" />
            <span>Processing Payment...</span>
          </>
        ) : (
          <>
            <ShieldCheck className="w-4 h-4" />
            <span>Pay {amountFormatted} Now</span>
          </>
        )}
      </button>

      <p className="text-[11px] text-[#9A9182]/70 text-center">
        Encrypted &amp; securely processed by Stripe.
      </p>
    </form>
  )
}
