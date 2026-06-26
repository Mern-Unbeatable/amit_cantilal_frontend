import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import { ArrowUpRight, Clock, MessageCircle } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Textarea } from '@/components/ui/textarea'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import { useCreateConciergeRequest } from './concierge-request.hooks.ts'

// ─── Schema ───────────────────────────────────────────────────────────────────

const schema = z.object({
  name: z.string().min(2, 'Name is required'),
  email: z.string().email('Valid email required'),
  phone: z.string().optional(),
  airport: z.string().min(1, 'Airport is required'),
  flightDetails: z.string().optional(),
  passengers: z.string().optional(),
  contactMethod: z.string().min(1, 'Please select a contact method'),
  notes: z.string().optional(),
})

type FormValues = z.infer<typeof schema>

// ─── Field wrapper ────────────────────────────────────────────────────────────

function Field({
  id,
  label,
  required,
  error,
  children,
}: {
  id: string
  label: string
  required?: boolean
  error?: string
  children: React.ReactNode
}) {
  return (
    <div className="space-y-1.5">
      <Label htmlFor={id} className="text-xs md:text-sm font-medium text-[#F5F0E8]">
        {label} {required && <span className="text-[#C9A84C]">*</span>}
      </Label>
      {children}
      {error && <p className="text-xs text-red-400">{error}</p>}
    </div>
  )
}

// ─── Component ────────────────────────────────────────────────────────────────

export function VipConciergeForm() {
  const [submitted, setSubmitted] = useState(false)

  const { mutate: createRequest, isPending } = useCreateConciergeRequest()

  const {
    register,
    handleSubmit,
    formState: { errors },
    setError,
    setValue,
    watch,
    reset,
  } = useForm<FormValues>({
    resolver: zodResolver(schema),
    defaultValues: { contactMethod: 'Email' },
  })

  const contactMethod = watch('contactMethod')

  const onSubmit = (data: FormValues) => {
    createRequest(
      {
        name: data.name,
        email: data.email,
        phone: data.phone || undefined,
        airport: data.airport,
        flight_details: data.flightDetails || undefined,
        passengers: data.passengers ? Number(data.passengers) : undefined,
        contact_method: data.contactMethod as 'Email' | 'Phone' | 'WhatsApp',
        notes: data.notes || undefined,
      },
      {
        onSuccess: () => {
          setSubmitted(true)
          reset()
        },
        onError: (err: any) =>
          setError('root', {
            message: err?.response?.data?.message ?? 'Something went wrong. Please try again.',
          }),
      }
    )
  }

  return (
    <section id="concierge" className="container mx-auto px-6 md:px-12 py-20 md:py-32">
      <div className="max-w-3xl mx-auto">
        {/* Header */}
        <div className="text-center mb-12 md:mb-16">
          <span className="inline-flex items-center gap-2 text-[10px] md:text-xs tracking-[0.4em] uppercase text-[#C9A84C] mb-5">
            <Clock className="w-3 h-3" />
            Concierge
          </span>
          <h2 className="font-serif text-3xl md:text-5xl font-light text-[#F5F0E8] leading-[1.15] mb-8">
            Request Airport Concierge Assistance
          </h2>
          <div className="w-12 h-px bg-[#C9A84C]/40 mx-auto mb-8" />
          <p className="text-base md:text-lg text-[#F5F0E8]/65 font-light leading-relaxed max-w-2xl mx-auto">
            Tell us about your travel plans and our team will coordinate the most suitable airport assistance service for your arrival or departure.
          </p>
        </div>

        {/* Card */}
        <div className="border border-white/10 bg-white/[0.015] backdrop-blur-sm p-6 md:p-12">
          {submitted ? (
            <div className="text-center py-12 space-y-4">
              <div className="w-16 h-16 bg-[#C9A84C] flex items-center justify-center mx-auto">
                <svg className="w-8 h-8 text-[#0B0B0B]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
              </div>
              <h4 className="font-serif text-2xl font-light text-[#C9A84C]">Request Received</h4>
              <p className="text-[#F5F0E8]/60">
                Our concierge team will be in touch shortly.
              </p>
            </div>
          ) : (
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
              <div className="grid sm:grid-cols-2 gap-6">
                {/* Name */}
                <Field id="name" label="Name" required error={errors.name?.message}>
                  <Input
                    id="name"
                    className="h-11 rounded-none bg-transparent border-white/15 text-[#F5F0E8] placeholder:text-[#F5F0E8]/30 focus:border-[#C9A84C]"
                    {...register('name')}
                  />
                </Field>

                {/* Email */}
                <Field id="email" label="Email" required error={errors.email?.message}>
                  <Input
                    id="email"
                    type="email"
                    className="h-11 rounded-none bg-transparent border-white/15 text-[#F5F0E8] placeholder:text-[#F5F0E8]/30 focus:border-[#C9A84C]"
                    {...register('email')}
                  />
                </Field>

                {/* Phone */}
                <Field id="phone" label="Phone" error={errors.phone?.message}>
                  <Input
                    id="phone"
                    type="tel"
                    className="h-11 rounded-none bg-transparent border-white/15 text-[#F5F0E8] placeholder:text-[#F5F0E8]/30 focus:border-[#C9A84C]"
                    {...register('phone')}
                  />
                </Field>

                {/* Airport */}
                <Field id="airport" label="Airport" required error={errors.airport?.message}>
                  <Input
                    id="airport"
                    placeholder="Lisbon or Porto"
                    className="h-11 rounded-none bg-transparent border-white/15 text-[#F5F0E8] placeholder:text-[#F5F0E8]/30 focus:border-[#C9A84C]"
                    {...register('airport')}
                  />
                </Field>

                {/* Flight Details */}
                <div className="sm:col-span-2">
                  <Field id="flightDetails" label="Arrival / Departure">
                    <Input
                      id="flightDetails"
                      placeholder="Date, flight number, terminal"
                      className="h-11 rounded-none bg-transparent border-white/15 text-[#F5F0E8] placeholder:text-[#F5F0E8]/30 focus:border-[#C9A84C]"
                      {...register('flightDetails')}
                    />
                  </Field>
                </div>

                {/* Passengers */}
                <Field id="passengers" label="Number of Passengers">
                  <Input
                    id="passengers"
                    type="text"
                    inputMode="numeric"
                    className="h-11 rounded-none bg-transparent border-white/15 text-[#F5F0E8] placeholder:text-[#F5F0E8]/30 focus:border-[#C9A84C]"
                    {...register('passengers')}
                  />
                </Field>

                {/* Contact Method */}
                <Field id="contactMethod" label="Preferred Contact Method" required error={errors.contactMethod?.message}>
                  <Select value={contactMethod} onValueChange={(v) => setValue('contactMethod', v, { shouldValidate: true })}>
                    <SelectTrigger className="h-11 rounded-none bg-transparent border-white/15 text-[#F5F0E8] focus:border-[#C9A84C]">
                      <SelectValue placeholder="Select method" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="Email">Email</SelectItem>
                      <SelectItem value="Phone">Phone</SelectItem>
                      <SelectItem value="WhatsApp">WhatsApp</SelectItem>
                    </SelectContent>
                  </Select>
                </Field>
              </div>

              {/* Notes */}
              <Field id="notes" label="Additional Notes">
                <Textarea
                  id="notes"
                  rows={4}
                  className="rounded-none bg-transparent border-white/15 text-[#F5F0E8] placeholder:text-[#F5F0E8]/30 focus:border-[#C9A84C] resize-none"
                  {...register('notes')}
                />
              </Field>

              {/* Root error */}
              {errors.root && (
                <p className="text-sm text-red-400 text-center">{errors.root.message}</p>
              )}

              {/* Buttons */}
              <div className="pt-2 flex flex-col sm:flex-row gap-4">
                <Button
                  type="submit"
                  disabled={isPending}
                  className="flex-1 h-12 rounded-none bg-[#C9A84C] hover:bg-[#E2C97E] text-[#0B0B0B] font-medium tracking-[0.1em] uppercase"
                >
                  {isPending ? 'Sending...' : (
                    <span className="inline-flex items-center gap-2">
                      Request Assistance <ArrowUpRight className="w-4 h-4" />
                    </span>
                  )}
                </Button>
                <Button
                  type="button"
                  variant="outline"
                  asChild
                  className="flex-1 h-12 rounded-none border-[#C9A84C]/60 text-[#C9A84C] hover:bg-[#C9A84C] hover:text-[#0B0B0B] tracking-[0.1em] uppercase"
                >
                  <a href="https://wa.me/351914578214" target="_blank" rel="noopener noreferrer">
                    <MessageCircle className="w-4 h-4 mr-2" />
                    WhatsApp
                  </a>
                </Button>
              </div>
            </form>
          )}
        </div>
      </div>
    </section>
  )
}
