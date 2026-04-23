import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import { Icon } from '@iconify/react'
import { Link } from '@tanstack/react-router'
import type { AxiosError } from 'axios'
import type { ApiError } from '@/@types/api.ts'
import { Form, FormControl, FormField, FormItem } from '@/components/ui/form'
import { Field, FieldError, FieldLabel } from '@/components/ui/field'
import { Button } from '@/components/ui/button'
import {
  InputGroup,
  InputGroupAddon,
  InputGroupInput,
} from '@/components/ui/input-group'
import { Checkbox } from '@/components/ui/checkbox'
import { Spinner } from '@/components/ui/spinner.tsx'
import { extractApiErrors, useLogin } from '@/features/auth/auth.hooks.ts'

const loginFormSchema = z.object({
  username: z.string().min(1, { message: 'Username or email is required' }),
  password: z.string().min(1, { message: 'Password is required' }),
  rememberMe: z.boolean(),
})

type LoginFormValues = z.infer<typeof loginFormSchema>

const LoginForm = () => {
  const [showPassword, setShowPassword] = useState(false)
  const { mutate: login, isPending } = useLogin()

  const form = useForm<LoginFormValues>({
    resolver: zodResolver(loginFormSchema),
    defaultValues: {
      username: '',
      password: '',
      rememberMe: false,
    },
  })

  const onSubmit = (values: LoginFormValues) => {
    login(
      { username: values.username, password: values.password },
      {
        onError: (err) => {
          const axiosError = err as AxiosError<ApiError>

          // Field-level validation errors (422)
          const apiErrors = extractApiErrors(axiosError)
          if (apiErrors) {
            Object.entries(apiErrors).forEach(([field, message]) => {
              form.setError(field as keyof LoginFormValues, { message })
            })
            return
          }

          const status = axiosError.response?.status
          const message = axiosError.response?.data.message

          if (status === 401) {
            form.setError('root', {
              message:
                'Invalid credentials. Please check your username or password.',
            })
            return
          }

          if (status === 429) {
            form.setError('root', {
              message:
                message ??
                'Too many attempts. Please wait a few minutes before trying again.',
            })
            return
          }

          // Fallback
          form.setError('root', {
            message:
              message ??
              'Something went wrong. Please try again or contact support.',
          })
        },
      },
    )
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
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

        {/* ── Username / Email ── */}
        <FormField
          control={form.control}
          name="username"
          render={({ field }) => (
            <FormItem>
              <Field>
                <FieldLabel htmlFor="username" className="uppercase">
                  Username / Email
                </FieldLabel>
                <FormControl>
                  <InputGroup className="h-[47px]">
                    <InputGroupAddon>
                      <Icon
                        icon="tabler:user"
                        className="text-[#6868E1]"
                        width="24"
                        height="24"
                      />
                    </InputGroupAddon>
                    <InputGroupInput
                      id="username"
                      placeholder="Username or email"
                      autoComplete="username"
                      {...field}
                    />
                  </InputGroup>
                </FormControl>
                <FieldError>
                  {form.formState.errors.username?.message}
                </FieldError>
              </Field>
            </FormItem>
          )}
        />

        {/* ── Password ── */}
        <div className="space-y-2">
          <FormField
            control={form.control}
            name="password"
            render={({ field }) => (
              <FormItem>
                <Field>
                  <FieldLabel htmlFor="password" className="uppercase">
                    Password
                  </FieldLabel>
                  <FormControl>
                    <InputGroup className="h-[47px]">
                      <InputGroupAddon>
                        <Icon
                          icon="mdi:password-outline"
                          className="text-[#6868E1]"
                          width="24"
                          height="24"
                        />
                      </InputGroupAddon>
                      <InputGroupInput
                        id="password"
                        type={showPassword ? 'text' : 'password'}
                        placeholder="Enter your password"
                        autoComplete="current-password"
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
                  <FieldError>
                    {form.formState.errors.password?.message}
                  </FieldError>
                </Field>
              </FormItem>
            )}
          />

          {/* ── Remember Me + Forgot Password ── */}
          <div className="flex justify-between items-center">
            <FormField
              control={form.control}
              name="rememberMe"
              render={({ field }) => (
                <FormItem>
                  <Field
                    orientation="horizontal"
                    className="items-center gap-1"
                  >
                    <FormControl>
                      <Checkbox
                        id="remember-me"
                        checked={field.value}
                        onCheckedChange={field.onChange}
                      />
                    </FormControl>
                    <FieldLabel
                      htmlFor="remember-me"
                      className="cursor-pointer text-sm font-normal text-foreground"
                    >
                      Remember Me
                    </FieldLabel>
                  </Field>
                </FormItem>
              )}
            />

            <Link
              to="/"
              className="text-sm font-normal text-primary hover:underline transition-colors"
            >
              Forgot Password?
            </Link>
          </div>
        </div>

        {/* ── Submit ── */}
        <Button
          type="submit"
          disabled={isPending}
          className="w-full bg-primary h-[47px] text-white text-sm hover:opacity-90"
        >
          {isPending && <Spinner />}
          {isPending ? 'Signing in...' : 'Login'}
        </Button>
      </form>
    </Form>
  )
}

export default LoginForm
