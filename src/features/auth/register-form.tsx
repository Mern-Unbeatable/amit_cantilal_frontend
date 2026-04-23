import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import { Icon } from '@iconify/react'
import { Link } from '@tanstack/react-router'
import { AnimatePresence, motion } from 'framer-motion'
import { ArrowRight } from 'lucide-react'
import type { AxiosError } from 'axios'
import type {ApiError} from "@/@types/api.ts";
import { Form, FormControl, FormField, FormItem } from '@/components/ui/form'
import { Field, FieldError, FieldLabel } from '@/components/ui/field'
import { Button } from '@/components/ui/button'
import {
  InputGroup,
  InputGroupAddon,
  InputGroupInput,
} from '@/components/ui/input-group'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import { Spinner } from '@/components/ui/spinner'
import SectionLabel from "@/features/auth/section-label.tsx";
import {
  extractApiErrors,
  useRegister,
} from '@/features/auth/auth.hooks.ts'

// ─── Schema ──────────────────────────────────────────────────────────────────

const registerFormSchema = z
  .object({
    name: z.string().min(1, { message: 'Full name is required' }),
    phone: z.string().min(1, { message: 'Phone number is required' }),
    email: z.string().min(1, { message: 'Email is required' }).email({ message: 'Invalid email address' }),
    location: z.string().optional(),
    password: z.string().min(8, { message: 'Password must be at least 8 characters' }),
    password_confirmation: z.string().min(1, { message: 'Please confirm your password' }),
    current_status: z.enum(['Student', 'Graduate'], { required_error: 'Please select your current status' }),
    prior_experience: z.enum(['yes', 'no'], { required_error: 'Please select an option' }),
    experience_description: z.string().optional(),
  })
  .refine((data) => data.password === data.password_confirmation, {
    message: 'Passwords do not match',
    path: ['password_confirmation'],
  })

type RegisterFormValues = z.infer<typeof registerFormSchema>

// ─── Component ───────────────────────────────────────────────────────────────

const RegisterForm = () => {
  const [showPassword, setShowPassword] = useState(false)
  const [showConfirm, setShowConfirm] = useState(false)

  const { mutate: register, isPending } = useRegister()

  const form = useForm<RegisterFormValues>({
    resolver: zodResolver(registerFormSchema),
    defaultValues: {
      name: '',
      phone: '',
      email: '',
      location: '',
      password: '',
      password_confirmation: '',
      current_status: 'Student',
      prior_experience: undefined,
      experience_description: '',
    },
  })

  const priorExperience = form.watch('prior_experience')

  const onSubmit = (values: RegisterFormValues) => {
    register(values, {
      onError: (err) => {
        const axiosError = err as AxiosError<ApiError>

        // Field-level validation errors (422)
        const apiErrors = extractApiErrors(axiosError)
        if (apiErrors) {
          Object.entries(apiErrors).forEach(([field, message]) => {
            form.setError(field as keyof RegisterFormValues, { message })
          })
          return
        }

        // Global errors → root error (shown in banner)
        const status = axiosError.response?.status
        const message = axiosError.response?.data.message

        if (status === 422) {
          form.setError('root', {
            message: message ?? 'Please check the form for errors.',
          })
          return
        }

        // Fallback
        form.setError('root', {
          message: message ?? 'Something went wrong. Please try again or contact support.',
        })
      },
    })
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-5">

        {/* ── Global error banner ── */}
        {form.formState.errors.root && (
          <div
            role="alert"
            className="flex items-start gap-3 rounded-md border border-destructive/20 bg-destructive/10 px-4 py-3"
          >
            <Icon
              icon="tabler:alert-circle-filled"
              className="text-destructive shrink-0 mt-0.5"
              width="16"
              height="16"
            />
            <p className="text-sm text-destructive leading-snug">
              {form.formState.errors.root.message}
            </p>
          </div>
        )}

        {/* ── Section: Personal info ── */}
        <SectionLabel>Personal info</SectionLabel>

        <div className="grid grid-cols-2 gap-4">
          {/* Full name */}
          <FormField
            control={form.control}
            name="name"
            render={({ field }) => (
              <FormItem>
                <Field>
                  <FieldLabel htmlFor="name" className="uppercase text-xs">Full name</FieldLabel>
                  <FormControl>
                    <InputGroup className="h-10">
                      <InputGroupAddon>
                        <Icon icon="tabler:user" className="text-orange-500" width="24" height="24" />
                      </InputGroupAddon>
                      <InputGroupInput
                        id="name"
                        placeholder="Adedayo Okafor"
                        autoComplete="name"
                        {...field}
                      />
                    </InputGroup>
                  </FormControl>
                  <FieldError>{form.formState.errors.name?.message}</FieldError>
                </Field>
              </FormItem>
            )}
          />

          {/* Phone */}
          <FormField
            control={form.control}
            name="phone"
            render={({ field }) => (
              <FormItem>
                <Field>
                  <FieldLabel htmlFor="phone" className="uppercase text-xs">Phone number</FieldLabel>
                  <FormControl>
                    <InputGroup className="h-10">
                      <InputGroupAddon>
                        <Icon icon="tabler:phone" className="text-orange-500" width="24" height="24" />
                      </InputGroupAddon>
                      <InputGroupInput
                        id="phone"
                        type="tel"
                        placeholder="080 0000 0000"
                        autoComplete="tel"
                        {...field}
                      />
                    </InputGroup>
                  </FormControl>
                  <FieldError>{form.formState.errors.phone?.message}</FieldError>
                </Field>
              </FormItem>
            )}
          />
        </div>

        <div className="grid grid-cols-2 gap-4">
          {/* Email */}
          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem>
                <Field>
                  <FieldLabel htmlFor="email" className="uppercase text-xs">Email address</FieldLabel>
                  <FormControl>
                    <InputGroup className="h-10">
                      <InputGroupAddon>
                        <Icon icon="tabler:mail" className="text-orange-500" width="24" height="24" />
                      </InputGroupAddon>
                      <InputGroupInput
                        id="email"
                        type="email"
                        placeholder="you@example.com"
                        autoComplete="email"
                        {...field}
                      />
                    </InputGroup>
                  </FormControl>
                  <FieldError>{form.formState.errors.email?.message}</FieldError>
                </Field>
              </FormItem>
            )}
          />

          {/* Location */}
          <FormField
            control={form.control}
            name="location"
            render={({ field }) => (
              <FormItem>
                <Field>
                  <FieldLabel htmlFor="location" className="uppercase text-xs">Location</FieldLabel>
                  <FormControl>
                    <InputGroup className="h-10">
                      <InputGroupAddon>
                        <Icon icon="tabler:map-pin" className="text-orange-500" width="24" height="24" />
                      </InputGroupAddon>
                      <InputGroupInput
                        id="location"
                        placeholder="Lagos, Nigeria"
                        {...field}
                      />
                    </InputGroup>
                  </FormControl>
                  <FieldError>{form.formState.errors.location?.message}</FieldError>
                </Field>
              </FormItem>
            )}
          />
        </div>

        <div className="grid grid-cols-2 gap-4">
          {/* Password */}
          <FormField
            control={form.control}
            name="password"
            render={({ field }) => (
              <FormItem>
                <Field>
                  <FieldLabel htmlFor="password" className="uppercase text-xs">Password</FieldLabel>
                  <FormControl>
                    <InputGroup className="h-10">
                      <InputGroupAddon>
                        <Icon icon="mdi:password-outline" className="text-orange-500" width="24" height="24" />
                      </InputGroupAddon>
                      <InputGroupInput
                        id="password"
                        type={showPassword ? 'text' : 'password'}
                        placeholder="Min. 8 characters"
                        autoComplete="new-password"
                        {...field}
                      />
                      <InputGroupAddon
                        align="inline-end"
                        onClick={() => setShowPassword((p) => !p)}
                        className="cursor-pointer"
                      >
                        <Icon
                          icon={showPassword ? 'tabler:eye-off' : 'tabler:eye'}
                          className="text-muted-foreground"
                          width="20"
                          height="20"
                        />
                      </InputGroupAddon>
                    </InputGroup>
                  </FormControl>
                  <FieldError>{form.formState.errors.password?.message}</FieldError>
                </Field>
              </FormItem>
            )}
          />

          {/* Confirm password */}
          <FormField
            control={form.control}
            name="password_confirmation"
            render={({ field }) => (
              <FormItem>
                <Field>
                  <FieldLabel htmlFor="password_confirmation" className="uppercase text-xs">
                    Confirm password
                  </FieldLabel>
                  <FormControl>
                    <InputGroup className="h-10">
                      <InputGroupAddon>
                        <Icon icon="mdi:password-check-outline" className="text-orange-500" width="24" height="24" />
                      </InputGroupAddon>
                      <InputGroupInput
                        id="password_confirmation"
                        type={showConfirm ? 'text' : 'password'}
                        placeholder="Repeat password"
                        autoComplete="new-password"
                        {...field}
                      />
                      <InputGroupAddon
                        align="inline-end"
                        onClick={() => setShowConfirm((p) => !p)}
                        className="cursor-pointer"
                      >
                        <Icon
                          icon={showConfirm ? 'tabler:eye-off' : 'tabler:eye'}
                          className="text-muted-foreground"
                          width="20"
                          height="20"
                        />
                      </InputGroupAddon>
                    </InputGroup>
                  </FormControl>
                  <FieldError>{form.formState.errors.password_confirmation?.message}</FieldError>
                </Field>
              </FormItem>
            )}
          />
        </div>

        {/* ── Section: Background ── */}
        <SectionLabel>Background</SectionLabel>

        <div className="grid grid-cols-2 gap-4">
          {/* Current status */}
          <FormField
            control={form.control}
            name="current_status"
            render={({ field }) => (
              <FormItem>
                <Field>
                  <FieldLabel htmlFor="current_status" className="uppercase text-xs">
                    Current status
                  </FieldLabel>
                  <FormControl>
                    <Select onValueChange={field.onChange} defaultValue={field.value}>
                      <SelectTrigger className="h-10" id="current_status">
                        <InputGroupAddon>
                          <Icon icon="tabler:briefcase" className="text-orange-500" width="24" height="24" />
                        </InputGroupAddon>
                        <SelectValue placeholder="Select status" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="Student">Student</SelectItem>
                        <SelectItem value="Graduate">Graduate</SelectItem>
                        <SelectItem value="Employed">Employed</SelectItem>
                        <SelectItem value="Self-employed">Self-employed</SelectItem>
                        <SelectItem value="Other">Other</SelectItem>
                      </SelectContent>
                    </Select>
                  </FormControl>
                  <FieldError>{form.formState.errors.current_status?.message}</FieldError>
                </Field>
              </FormItem>
            )}
          />

          {/* Prior experience toggle */}
          <FormField
            control={form.control}
            name="prior_experience"
            render={({ field }) => (
              <FormItem>
                <Field>
                  <FieldLabel className="uppercase text-xs">Prior tech experience?</FieldLabel>
                  <FormControl>
                    <div className="flex gap-2.5 h-9">
                      {(['yes', 'no'] as const).map((val) => (
                        <button
                          key={val}
                          type="button"
                          onClick={() => field.onChange(val)}
                          className={`flex-1 h-full h-9 rounded-md border text-sm font-medium flex items-center justify-center gap-2 transition-all
                            ${field.value === val
                            ? 'border-primary bg-primary/5 text-primary'
                            : 'border-input text-muted-foreground hover:border-primary/40'
                          }`}
                        >
                          <span
                            className={`w-3.5 h-3.5 rounded-full border-2 flex items-center justify-center transition-all
                              ${field.value === val ? 'border-primary' : 'border-muted-foreground/40'}`}
                          >
                            {field.value === val && (
                              <span className="w-1.5 h-1.5 rounded-full bg-primary block" />
                            )}
                          </span>
                          {val.charAt(0).toUpperCase() + val.slice(1)}
                        </button>
                      ))}
                    </div>
                  </FormControl>
                  <FieldError>{form.formState.errors.prior_experience?.message}</FieldError>
                </Field>
              </FormItem>
            )}
          />
        </div>

        {/* Experience description — shown only when prior_experience = yes */}
        <AnimatePresence>
          {priorExperience === 'yes' && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.2 }}
              className="overflow-hidden"
            >
              <FormField
                control={form.control}
                name="experience_description"
                render={({ field }) => (
                  <FormItem>
                    <Field>
                      <FieldLabel htmlFor="experience_description" className="uppercase text-xs">
                        Briefly describe your experience
                      </FieldLabel>
                      <FormControl>
                        <InputGroup className="h-10">
                          <InputGroupAddon>
                            <Icon icon="tabler:code" className="text-orange-500" width="24" height="24" />
                          </InputGroupAddon>
                          <InputGroupInput
                            id="experience_description"
                            placeholder="e.g. Built a few HTML pages, know basic Python..."
                            {...field}
                          />
                        </InputGroup>
                      </FormControl>
                      <FieldError>{form.formState.errors.experience_description?.message}</FieldError>
                    </Field>
                  </FormItem>
                )}
              />
            </motion.div>
          )}
        </AnimatePresence>

        {/* ── Submit ── */}
        <Button
          type="submit"
          disabled={isPending}
          className="w-full h-10 bg-primary text-white text-sm hover:opacity-90"
        >
          {isPending && <Spinner />}
          {isPending ? 'Creating account...' : (
            <>
              <ArrowRight size={16} className="mr-1" />
              Create account
            </>
          )}
        </Button>

        <p className="text-xs text-muted-foreground text-center leading-relaxed">
          Already have an account?{' '}
          <Link to="/login" className="text-primary font-medium hover:underline transition-colors">
            Sign in
          </Link>
        </p>

      </form>
    </Form>
  )
}

export default RegisterForm