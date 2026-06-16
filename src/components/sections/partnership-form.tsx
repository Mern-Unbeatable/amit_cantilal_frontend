import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Button } from '@/components/ui/button'
import { Textarea } from '@/components/ui/textarea'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import { usePartnershipRequest } from '@/features/partnership-request/partnership-request.hooks.ts'

// ─── Types ────────────────────────────────────────────────────────────────────

interface PartnerFormData {
  company: string
  businessType: string
  representative: string
  email: string
  phone: string
  message: string
}

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
    <div className="space-y-2 md:space-y-3">
      <Label
        htmlFor={id}
        className="text-sm md:text-xl font-medium text-[#F5F0E8]"
      >
        {label} {required && <span className="text-[#C9A84C]">*</span>}
      </Label>
      {children}
      {error && <p className="text-xs text-red-400">{error}</p>}
    </div>
  )
}

// ─── Form ─────────────────────────────────────────────────────────────────────

export default function PartnerForm() {
  const [submitted, setSubmitted] = useState(false)
  const [businessType, setBusinessType] = useState('')

  const { mutate: submitRequest, isPending } = usePartnershipRequest()

  const {
    register,
    handleSubmit,
    formState: { errors },
    setError,
  } = useForm<PartnerFormData>()

  const onSubmit = (data: PartnerFormData) => {
    submitRequest(
      {
        source: 'partnerships',
        company_name: data.company,
        contact_name: data.representative,
        email: data.email,
        phone: data.phone,
        message: data.message,
        company_type: businessType,
      },
      {
        onSuccess: () => setSubmitted(true),
        onError: (err: any) =>
          setError('root', {
            message:
              err?.response?.data?.message ??
              'Something went wrong. Please try again.',
          }),
      },
    )
  }
  return (
    <section id="apply" className="py-10 md:py-32 bg-[#141414]">
      <div className="container mx-auto px-4 md:px-12">
        <div className="max-w-3xl mx-auto">
          <div className="bg-[#0B0B0B] border border-[#C9A84C]/15 p-5 md:p-16">
            <div className="text-center mb-6 md:mb-12">
              <div className="tag-gold mb-4">Partner Application</div>
              <h3 className="font-serif text-2xl md:text-5xl lg:text-6xl font-light text-gradient-gold">
                Become a Corporate Partner
              </h3>
            </div>

            {/* Success state */}
            {submitted ? (
              <div className="text-center py-12 space-y-4">
                <div className="w-16 h-16 bg-[#C9A84C] flex items-center justify-center mx-auto">
                  <svg
                    className="w-8 h-8 text-[#0B0B0B]"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M5 13l4 4L19 7"
                    />
                  </svg>
                </div>
                <h4 className="font-serif text-2xl font-light text-gradient-gold">
                  Request Submitted
                </h4>
                <p className="text-[#9A9182]">
                  Thank you! Our partnerships team will be in touch within 24
                  hours.
                </p>
              </div>
            ) : (
              <form
                onSubmit={handleSubmit(onSubmit)}
                className="space-y-4 md:space-y-6"
              >
                <Field
                  id="company"
                  label="Company Name"
                  required
                  error={errors.company?.message}
                >
                  <Input
                    id="company"
                    placeholder="Your Company"
                    className="h-10 md:h-14 text-sm md:text-lg"
                    {...register('company', {
                      required: 'Company name is required',
                    })}
                  />
                </Field>

                <Field id="businessType" label="Business Type" required>
                  <Select value={businessType} onValueChange={setBusinessType}>
                    <SelectTrigger className="h-10 !md:h-14 w-full text-sm md:text-lg">
                      <SelectValue placeholder="Select your business type" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="agency">Travel Agency</SelectItem>
                      <SelectItem value="hotel">Luxury Hotel</SelectItem>
                      <SelectItem value="concierge">
                        Concierge Service
                      </SelectItem>
                      <SelectItem value="corporate">Corporate</SelectItem>
                      <SelectItem value="dmc">DMC</SelectItem>
                      <SelectItem value="other">Other</SelectItem>
                    </SelectContent>
                  </Select>
                </Field>

                <Field
                  id="representative"
                  label="Representative Name"
                  required
                  error={errors.representative?.message}
                >
                  <Input
                    id="representative"
                    placeholder="John Doe"
                    className="h-10 md:h-14 text-sm md:text-lg"
                    {...register('representative', {
                      required: 'Representative name is required',
                    })}
                  />
                </Field>

                <Field
                  id="email"
                  label="Corporate Email"
                  required
                  error={errors.email?.message}
                >
                  <Input
                    id="email"
                    type="email"
                    placeholder="contact@company.com"
                    className="h-10 md:h-14 text-sm md:text-lg"
                    {...register('email', {
                      required: 'Email is required',
                      pattern: {
                        value: /^\S+@\S+\.\S+$/,
                        message: 'Invalid email address',
                      },
                    })}
                  />
                </Field>

                <Field id="phone" label="Phone" error={errors.phone?.message}>
                  <Input
                    id="phone"
                    type="tel"
                    placeholder="+351 912 345 678"
                    className="h-10 md:h-14 text-sm md:text-lg"
                    {...register('phone')}
                  />
                </Field>

                <Field
                  id="message"
                  label="Message"
                  error={errors.message?.message}
                >
                  <Textarea
                    id="message"
                    placeholder="Tell us about your partnership needs..."
                    rows={4}
                    className="text-sm md:text-lg resize-none"
                    {...register('message')}
                  />
                </Field>

                {/* Root error */}
                {errors.root && (
                  <p className="text-sm text-red-400 text-center">
                    {errors.root.message}
                  </p>
                )}

                <Button
                  type="submit"
                  disabled={isPending}
                  className="w-full h-12 md:h-16 text-base md:text-xl bg-[#C9A84C] hover:bg-[#E2C97E] text-[#0B0B0B] font-medium tracking-[.1em] rounded-none"
                >
                  {isPending ? 'Submitting...' : 'Submit Partnership Request'}
                </Button>
              </form>
            )}
          </div>
        </div>
      </div>
    </section>
  )
}
