import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { Mail, MessageCircle, Phone } from 'lucide-react'
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
import {usePartnershipRequest} from "@/features/partnership-request/partnership-request.hooks.ts";

// ─── Constants ────────────────────────────────────────────────────────────────

const PHONE = '+351 914 578 214'
const EMAIL = 'partners@offwego.pt'
const WHATSAPP = `https://wa.me/351914578214?text=${encodeURIComponent("Hi Off We Go Portugal, I'd like to request a B2B partnership.")}`

// ─── Types ────────────────────────────────────────────────────────────────────

interface B2BFormData {
  companyName: string
  contactName: string
  position: string
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
    <div className="space-y-1 md:space-y-2">
      <Label
        htmlFor={id}
        className="text-xs md:text-base font-medium text-[#F5F0E8]"
      >
        {label} {required && <span className="text-[#C9A84C]">*</span>}
      </Label>
      {children}
      {error && <p className="text-xs text-red-400">{error}</p>}
    </div>
  )
}

// ─── Component ────────────────────────────────────────────────────────────────

export default function B2BRequestForm() {
  const [submitted, setSubmitted] = useState(false)
  const [partnerType, setPartnerType] = useState('')

  const { mutate: submitRequest, isPending } = usePartnershipRequest()

  const {
    register,
    handleSubmit,
    formState: { errors },
    setError,
  } = useForm<B2BFormData>()

  const onSubmit = async (data: B2BFormData) => {
    submitRequest(
      {
        source: 'b2b',
        company_name: data.companyName,
        contact_name: data.contactName,
        position: data.position,
        email: data.email,
        phone: data.phone,
        message: data.message,
        company_type: partnerType,
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
    <section id="apply" className="py-10 md:py-20 bg-[#141414]">
      <div className="container mx-auto px-4 md:px-12">
        <div className="max-w-2xl mx-auto">
          {/* Header */}
          <div className="text-center mb-6 md:mb-10">
            <div className="tag-gold mb-4">Get Started</div>
            <h2 className="font-serif text-2xl md:text-4xl font-light text-gradient-gold mb-2 md:mb-4">
              Request Partnership
            </h2>
            <p className="text-xs md:text-base text-[#9A9182]">
              Fill out the form and we'll contact you within 24 hours.
            </p>
          </div>

          {/* Form card */}
          <div className="bg-[#0B0B0B] border border-[#C9A84C]/15 p-4 md:p-8">
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
                  Our team will be in touch within 24 hours.
                </p>
              </div>
            ) : (
              <form
                onSubmit={handleSubmit(onSubmit)}
                className="space-y-3 md:space-y-6"
              >
                {/* Partner type */}
                <Field id="partnerType" label="Partner Type" required>
                  <Select
                    value={partnerType}
                    onValueChange={setPartnerType}
                    required
                  >
                    <SelectTrigger className="h-10 text-xs md:text-base">
                      <SelectValue placeholder="Select type" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="hotel">Hotel</SelectItem>
                      <SelectItem value="travel-agency">
                        Travel Agency
                      </SelectItem>
                      <SelectItem value="concierge">
                        Concierge Service
                      </SelectItem>
                      <SelectItem value="corporate">Corporate</SelectItem>
                      <SelectItem value="other">Other</SelectItem>
                    </SelectContent>
                  </Select>
                </Field>

                {/* Company name */}
                <Field
                  id="companyName"
                  label="Company Name"
                  required
                  error={errors.companyName?.message}
                >
                  <Input
                    id="companyName"
                    placeholder="Hotel or agency name"
                    className="h-10 text-xs md:text-base"
                    {...register('companyName', {
                      required: 'Company name is required',
                    })}
                  />
                </Field>

                {/* Name + Position */}
                <div className="grid grid-cols-2 gap-3 md:gap-4">
                  <Field
                    id="contactName"
                    label="Name"
                    required
                    error={errors.contactName?.message}
                  >
                    <Input
                      id="contactName"
                      className="h-10 text-xs md:text-base"
                      {...register('contactName', {
                        required: 'Name is required',
                      })}
                    />
                  </Field>
                  <Field
                    id="position"
                    label="Position"
                    error={errors.position?.message}
                  >
                    <Input
                      id="position"
                      className="h-10 text-xs md:text-base"
                      {...register('position')}
                    />
                  </Field>
                </div>

                {/* Email + Phone */}
                <div className="grid grid-cols-2 gap-3 md:gap-4">
                  <Field
                    id="email"
                    label="Email"
                    required
                    error={errors.email?.message}
                  >
                    <Input
                      id="email"
                      type="email"
                      className="h-10 text-xs md:text-base"
                      {...register('email', {
                        required: 'Email is required',
                        pattern: {
                          value: /^\S+@\S+\.\S+$/,
                          message: 'Invalid email',
                        },
                      })}
                    />
                  </Field>
                  <Field
                    id="phone"
                    label="Phone"
                    required
                    error={errors.phone?.message}
                  >
                    <Input
                      id="phone"
                      type="tel"
                      placeholder="+351 912 345 678"
                      className="h-10 text-xs md:text-base"
                      {...register('phone', { required: 'Phone is required' })}
                    />
                  </Field>
                </div>

                {/* Message */}
                <Field id="message" label="Message">
                  <Textarea
                    id="message"
                    rows={3}
                    className="text-xs md:text-base resize-none"
                    {...register('message')}
                  />
                </Field>

                {/* Root error */}
                {errors.root && (
                  <p className="text-sm text-red-400 text-center">
                    {errors.root.message}
                  </p>
                )}

                {/* Buttons */}
                <div className="flex flex-col sm:flex-row gap-3">
                  <Button
                    type="submit"
                    disabled={isPending}
                    className="flex-1 h-10 rounded-none bg-[#C9A84C] hover:bg-[#E2C97E] text-[#0B0B0B] font-medium text-sm md:text-base"
                  >
                    {isPending ? 'Submitting...' : 'Submit Request'}
                  </Button>
                  <Button
                    type="button"
                    variant="outline"
                    asChild
                    className="flex-1 h-10 rounded-none border-gold/30 text-white-cream hover:bg-gold/10 hover:text-white-cream text-sm md:text-base"
                  >
                    <a
                      href={WHATSAPP}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      <MessageCircle className="w-4 h-4 mr-2" />
                      WhatsApp
                    </a>
                  </Button>
                </div>
              </form>
            )}
          </div>

          {/* Direct contact */}
          <div className="mt-6 md:mt-10 text-center space-y-2 md:space-y-4">
            <p className="text-[#9A9182] text-xs md:text-sm">
              Or contact us directly:
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4 md:gap-6">
              <a
                href={`tel:${PHONE}`}
                className="flex items-center gap-2 text-xs md:text-base text-[#9A9182] hover:text-[#C9A84C] transition-colors"
              >
                <Phone className="w-4 h-4" strokeWidth={1.5} />
                {PHONE}
              </a>
              <a
                href={`mailto:${EMAIL}`}
                className="flex items-center gap-2 text-xs md:text-base text-[#9A9182] hover:text-[#C9A84C] transition-colors"
              >
                <Mail className="w-4 h-4" strokeWidth={1.5} />
                {EMAIL}
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
