// src/features/users/user-form.tsx

import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import type { AdminUser } from '@/features/users/user.types.ts'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import { ROLE_LABELS } from '@/@types/user'

const ROLES = ['admin', 'student'] as const
const STATUSES = [
  'Student',
  'Graduate',
  'Employed',
  'Self-employed',
  'Other',
] as const

const schema = z
  .object({
    name: z.string().min(1, 'Name is required'),
    email: z.string().email('Invalid email'),
    phone: z.string().optional(),
    location: z.string().optional(),
    password: z.string().optional(),
    password_confirmation: z.string().optional(),
    role: z.enum(ROLES),
    status: z.enum(STATUSES),
  })
  .refine(
    (data) => {
      if (data.password && data.password !== data.password_confirmation) {
        return false
      }
      return true
    },
    {
      message: "Passwords don't match",
      path: ['password_confirmation'],
    },
  )

type UserFormValues = z.infer<typeof schema>

interface UserFormProps {
  defaultValues?: AdminUser
  onSubmit: (values: UserFormValues) => Promise<void>
  isSubmitting: boolean
}

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
    <div className="space-y-2">
      <Label htmlFor={id} className="text-sm font-medium">
        {label} {required && <span className="text-destructive">*</span>}
      </Label>
      {children}
      {error && <p className="text-xs text-destructive">{error}</p>}
    </div>
  )
}

export function UserForm({
  defaultValues,
  onSubmit,
  isSubmitting,
}: UserFormProps) {
  const {
    register,
    handleSubmit,
    setValue,
    watch,
    formState: { errors },
  } = useForm<UserFormValues>({
    resolver: zodResolver(schema),
    defaultValues: {
      name: defaultValues?.name ?? '',
      email: defaultValues?.email ?? '',
      phone: defaultValues?.phone ?? '',
      location: defaultValues?.location ?? '',
      role: defaultValues?.role ?? 'student',
      status: defaultValues?.status ?? 'Student',
      password: '',
      password_confirmation: '',
    },
  })

  const role = watch('role')
  const status = watch('status')

  const handleFormSubmit = async (values: UserFormValues) => {
    await onSubmit(values)
  }

  return (
    <form onSubmit={handleSubmit(handleFormSubmit)} className="space-y-6">
      {/* Name */}
      <Field id="name" label="Name" required error={errors.name?.message}>
        <Input id="name" placeholder="Full name" {...register('name')} />
      </Field>

      {/* Email */}
      <Field id="email" label="Email" required error={errors.email?.message}>
        <Input
          id="email"
          type="email"
          placeholder="user@example.com"
          {...register('email')}
        />
      </Field>

      {/* Phone */}
      <Field id="phone" label="Phone" error={errors.phone?.message}>
        <Input
          id="phone"
          placeholder="+1 234 567 8900"
          {...register('phone')}
        />
      </Field>

      {/* Location */}
      <Field id="location" label="Location" error={errors.location?.message}>
        <Input
          id="location"
          placeholder="City or region"
          {...register('location')}
        />
      </Field>

      {/* Role */}
      <Field id="role" label="Role" required error={errors.role?.message}>
        <Select
          value={role}
          onValueChange={(value) => setValue('role', value as any)}
        >
          <SelectTrigger id="role">
            <SelectValue placeholder="Select a role" />
          </SelectTrigger>
          <SelectContent>
            {ROLES.map((role) => (
              <SelectItem key={role} value={role}>
                {ROLE_LABELS[role as keyof typeof ROLE_LABELS] || role}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </Field>

      {/* Status */}
      <Field id="status" label="Status" required error={errors.status?.message}>
        <Select
          value={status}
          onValueChange={(value) => setValue('status', value as any)}
        >
          <SelectTrigger id="status">
            <SelectValue placeholder="Select a status" />
          </SelectTrigger>
          <SelectContent>
            {STATUSES.map((status) => (
              <SelectItem key={status} value={status}>
                {status}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </Field>

      {/* Password */}
      <Field
        id="password"
        label={
          defaultValues
            ? 'New Password (leave empty to keep current)'
            : 'Password'
        }
        required={!defaultValues}
        error={errors.password?.message}
      >
        <Input
          id="password"
          type="password"
          placeholder="••••••••"
          {...register('password')}
        />
      </Field>

      {/* Password Confirmation */}
      <Field
        id="password_confirmation"
        label={defaultValues ? 'Confirm New Password' : 'Confirm Password'}
        required={!defaultValues}
        error={errors.password_confirmation?.message}
      >
        <Input
          id="password_confirmation"
          type="password"
          placeholder="••••••••"
          {...register('password_confirmation')}
        />
      </Field>

      {/* Submit */}
      <Button type="submit" disabled={isSubmitting} className="w-full">
        {isSubmitting
          ? 'Saving...'
          : defaultValues
            ? 'Update User'
            : 'Create User'}
      </Button>
    </form>
  )
}
