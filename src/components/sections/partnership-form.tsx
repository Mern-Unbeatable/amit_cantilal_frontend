import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { useTranslation } from 'react-i18next'
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
  const { t } = useTranslation()
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
              err?.response?.data?.message ?? t('partnerForm.genericError'),
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
              <div className="tag-gold mb-4">{t('partnerForm.tag')}</div>
              <h3 className="font-serif text-2xl md:text-5xl lg:text-6xl font-light text-gradient-gold">
                {t('partnerForm.title')}
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
                  {t('partnerForm.successTitle')}
                </h4>
                <p className="text-[#9A9182]">{t('partnerForm.successBody')}</p>
              </div>
            ) : (
              <form
                onSubmit={handleSubmit(onSubmit)}
                className="space-y-4 md:space-y-6"
              >
                <Field
                  id="company"
                  label={t('partnerForm.company')}
                  required
                  error={errors.company?.message}
                >
                  <Input
                    id="company"
                    placeholder={t('partnerForm.companyPlaceholder')}
                    className="h-10 md:h-14 text-sm md:text-lg"
                    {...register('company', {
                      required: t('partnerForm.companyRequired'),
                    })}
                  />
                </Field>

                <Field
                  id="businessType"
                  label={t('partnerForm.businessType')}
                  required
                >
                  <Select value={businessType} onValueChange={setBusinessType}>
                    <SelectTrigger className="h-10 !md:h-14 w-full text-sm md:text-lg">
                      <SelectValue
                        placeholder={t('partnerForm.businessTypePlaceholder')}
                      />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="agency">
                        {t('partnerForm.businessTypes.agency')}
                      </SelectItem>
                      <SelectItem value="hotel">
                        {t('partnerForm.businessTypes.hotel')}
                      </SelectItem>
                      <SelectItem value="concierge">
                        {t('partnerForm.businessTypes.concierge')}
                      </SelectItem>
                      <SelectItem value="corporate">
                        {t('partnerForm.businessTypes.corporate')}
                      </SelectItem>
                      <SelectItem value="dmc">
                        {t('partnerForm.businessTypes.dmc')}
                      </SelectItem>
                      <SelectItem value="other">
                        {t('partnerForm.businessTypes.other')}
                      </SelectItem>
                    </SelectContent>
                  </Select>
                </Field>

                <Field
                  id="representative"
                  label={t('partnerForm.representative')}
                  required
                  error={errors.representative?.message}
                >
                  <Input
                    id="representative"
                    placeholder={t('partnerForm.representativePlaceholder')}
                    className="h-10 md:h-14 text-sm md:text-lg"
                    {...register('representative', {
                      required: t('partnerForm.representativeRequired'),
                    })}
                  />
                </Field>

                <Field
                  id="email"
                  label={t('partnerForm.email')}
                  required
                  error={errors.email?.message}
                >
                  <Input
                    id="email"
                    type="email"
                    placeholder={t('partnerForm.emailPlaceholder')}
                    className="h-10 md:h-14 text-sm md:text-lg"
                    {...register('email', {
                      required: t('partnerForm.emailRequired'),
                      pattern: {
                        value: /^\S+@\S+\.\S+$/,
                        message: t('partnerForm.emailInvalid'),
                      },
                    })}
                  />
                </Field>

                <Field
                  id="phone"
                  label={t('partnerForm.phone')}
                  error={errors.phone?.message}
                >
                  <Input
                    id="phone"
                    type="tel"
                    placeholder={t('partnerForm.phonePlaceholder')}
                    className="h-10 md:h-14 text-sm md:text-lg"
                    {...register('phone')}
                  />
                </Field>

                <Field
                  id="message"
                  label={t('partnerForm.message')}
                  error={errors.message?.message}
                >
                  <Textarea
                    id="message"
                    placeholder={t('partnerForm.messagePlaceholder')}
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
                  {isPending
                    ? t('partnerForm.submitting')
                    : t('partnerForm.submit')}
                </Button>
              </form>
            )}
          </div>
        </div>
      </div>
    </section>
  )
}
