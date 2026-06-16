import { PaymentElement, useElements, useStripe } from '@stripe/react-stripe-js'
import { useState } from 'react'
import { toast } from 'sonner'
import { Button } from '@/components/ui/button'

type Props = {
  returnUrl: string
  onBack: () => void
}

export function StripeCheckoutForm({ returnUrl, onBack }: Props) {
  const stripe = useStripe()
  const elements = useElements()

  const [loading, setLoading] = useState(false)

  const handleSubmit = async () => {
    if (!stripe || !elements || loading) return

    setLoading(true)

    try {
      const { error } = await stripe.confirmPayment({
        elements,
        confirmParams: {
          return_url: returnUrl,
        },
      })

      if (error) {
        toast.error(error.message || 'Payment failed')
      }
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="space-y-6">
      <PaymentElement
        options={{
          layout: 'tabs',
        }}
      />
      <div className="flex gap-3 pt-2">
        <Button
          onClick={onBack}
          variant="outline"
          className="flex-1 border-gold/20 bg-transparent text-white-dim hover:text-white hover:border-gold/50 rounded-none h-11"
        >
          Back
        </Button>
        <Button
          onClick={handleSubmit}
          disabled={!stripe || loading}
          className="w-full bg-gold hover:bg-gold/90 text-black"
        >
          {loading ? 'Processing...' : 'Pay Now'}
        </Button>
      </div>
    </div>
  )
}
