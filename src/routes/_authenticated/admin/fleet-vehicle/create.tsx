import { zodResolver } from '@hookform/resolvers/zod'
import { createFileRoute, useNavigate } from '@tanstack/react-router'
import { Loader2, Plus } from 'lucide-react'
import { useForm } from 'react-hook-form'
import { z } from 'zod'
import type { AxiosError } from 'axios'
import type { ApiError } from '@/@types/api.ts'
import type {
  AdminCreateFleetPayload,
  VehicleCategory,
} from '@/features/fleet/fleet.types.ts'
import AppWrapper from '@/components/layouts/sidebar/app-wrapper.tsx'
import PageHeader from '@/components/page-header.tsx'
import { Button } from '@/components/ui/button.tsx'
import { Field, FieldError, FieldLabel } from '@/components/ui/field.tsx'
import {
  Form,
  FormControl,
  FormField,
  FormItem,
} from '@/components/ui/form.tsx'
import { Input } from '@/components/ui/input.tsx'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select.tsx'
import { extractApiErrors } from '@/features/auth/auth.hooks.ts'
import { useCreateFleet } from '@/features/fleet/fleet.hooks.ts'

export const Route = createFileRoute(
  '/_authenticated/admin/fleet-vehicle/create',
)({
  component: RouteComponent,
})

const fleetSchema = z.object({
  name: z.string().min(2, { message: 'Name must be at least 2 characters' }),
  description: z.string().optional(),
  image: z
    .instanceof(File, { message: 'Please select an image' })
    .refine((file) => file.size > 0, { message: 'Please select an image' }),
  passengers: z.coerce
    .number()
    .int()
    .min(1, { message: 'Passengers must be at least 1' }),
  suitcases: z.coerce
    .number()
    .int()
    .min(0, { message: 'Suitcases cannot be negative' }),
  price: z.coerce.number().min(0, { message: 'Price cannot be negative' }),
  fuel_type: z.enum(['electric', 'diesel']),
  sort_order: z.coerce
    .number()
    .int()
    .min(0, { message: 'Sort order cannot be negative' }),
})

type FleetFormInput = z.input<typeof fleetSchema>
type FleetFormValues = z.output<typeof fleetSchema>

const defaultValues: FleetFormInput = {
  name: '',
  description: '',
  image: new File([], ''),
  passengers: 2,
  suitcases: 2,
  price: 0,
  fuel_type: 'electric',
  sort_order: 1,
}

function RouteComponent() {
  const navigate = useNavigate()
  const { mutate: createFleet, isPending: isCreating } = useCreateFleet()
  const formFieldNames: Array<keyof FleetFormValues> = [
    'name',
    'description',
    'image',
    'passengers',
    'suitcases',
    'price',
    'fuel_type',
    'sort_order',
  ]

  const form = useForm<FleetFormInput, unknown, FleetFormValues>({
    resolver: zodResolver(fleetSchema),
    defaultValues,
  })

  const onSubmit = (values: FleetFormValues) => {
    const payload: AdminCreateFleetPayload = {
      name: values.name,
      description: values.description || null,
      image: values.image,
      passengers: values.passengers,
      suitcases: values.suitcases,
      price: values.price,
      fuel_type: values.fuel_type as VehicleCategory,
      sort_order: values.sort_order,
      active: true,
    }

    createFleet(payload, {
      onSuccess: () => {
        navigate({ to: '/admin/fleet-vehicle' })
      },
      onError: (error) => {
        const axiosError = error as AxiosError<ApiError>
        const apiErrors = extractApiErrors(axiosError)

        if (apiErrors) {
          const knownFieldNames = new Set<string>(formFieldNames)
          const unknownErrors: Array<string> = []

          Object.entries(apiErrors).forEach(([field, message]) => {
            if (knownFieldNames.has(field)) {
              form.setError(field as keyof FleetFormValues, { message })
              return
            }

            unknownErrors.push(message)
          })

          if (unknownErrors.length > 0) {
            form.setError('root', {
              message: unknownErrors.join(' '),
            })
          }

          return
        }

        form.setError('root', {
          message:
            axiosError.response?.data.message ??
            'Could not create fleet vehicle. Please try again.',
        })
      },
    })
  }

  return (
    <AppWrapper>
      <PageHeader
        pageTitle="Create Fleet Vehicle"
        pageSubtitle="Add a new vehicle to your backend fleet"
      />

      <div className="rounded-lg border p-4 md:p-6">
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
            {form.formState.errors.root ? (
              <p className="rounded-md border border-destructive/20 bg-destructive/10 px-4 py-3 text-sm text-destructive">
                {form.formState.errors.root.message}
              </p>
            ) : null}

            <div className="grid gap-4 md:grid-cols-2">
              <FormField
                control={form.control}
                name="name"
                render={({ field }) => (
                  <FormItem>
                    <Field>
                      <FieldLabel htmlFor="fleet-name">Vehicle Name</FieldLabel>
                      <FormControl>
                        <Input
                          id="fleet-name"
                          placeholder="Mercedes-Benz EQE"
                          {...field}
                        />
                      </FormControl>
                      <FieldError>
                        {form.formState.errors.name?.message}
                      </FieldError>
                    </Field>
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="fuel_type"
                render={({ field }) => (
                  <FormItem>
                    <Field>
                      <FieldLabel>Fuel Type</FieldLabel>
                      <FormControl>
                        <Select
                          value={field.value}
                          onValueChange={field.onChange}
                        >
                          <SelectTrigger>
                            <SelectValue placeholder="Select fuel type" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="electric">Electric</SelectItem>
                            <SelectItem value="diesel">Diesel</SelectItem>
                          </SelectContent>
                        </Select>
                      </FormControl>
                      <FieldError>
                        {form.formState.errors.fuel_type?.message}
                      </FieldError>
                    </Field>
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="passengers"
                render={({ field }) => (
                  <FormItem>
                    <Field>
                      <FieldLabel htmlFor="fleet-passengers">
                        Passengers
                      </FieldLabel>
                      <FormControl>
                        <Input
                          id="fleet-passengers"
                          type="number"
                          min={1}
                          {...field}
                          value={field.value as number}
                        />
                      </FormControl>
                      <FieldError>
                        {form.formState.errors.passengers?.message}
                      </FieldError>
                    </Field>
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="suitcases"
                render={({ field }) => (
                  <FormItem>
                    <Field>
                      <FieldLabel htmlFor="fleet-suitcases">
                        Suitcases
                      </FieldLabel>
                      <FormControl>
                        <Input
                          id="fleet-suitcases"
                          type="number"
                          min={0}
                          {...field}
                          value={field.value as number}
                        />
                      </FormControl>
                      <FieldError>
                        {form.formState.errors.suitcases?.message}
                      </FieldError>
                    </Field>
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="price"
                render={({ field }) => (
                  <FormItem>
                    <Field>
                      <FieldLabel htmlFor="fleet-price">Price</FieldLabel>
                      <FormControl>
                        <Input
                          id="fleet-price"
                          type="number"
                          min={0}
                          step="0.01"
                          {...field}
                          value={field.value as number}
                        />
                      </FormControl>
                      <FieldError>
                        {form.formState.errors.price?.message}
                      </FieldError>
                    </Field>
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="sort_order"
                render={({ field }) => (
                  <FormItem>
                    <Field>
                      <FieldLabel htmlFor="fleet-sort-order">
                        Sort Order
                      </FieldLabel>
                      <FormControl>
                        <Input
                          id="fleet-sort-order"
                          type="number"
                          min={0}
                          {...field}
                          value={field.value as number}
                        />
                      </FormControl>
                      <FieldError>
                        {form.formState.errors.sort_order?.message}
                      </FieldError>
                    </Field>
                  </FormItem>
                )}
              />
            </div>

            <FormField
              control={form.control}
              name="description"
              render={({ field }) => (
                <FormItem>
                  <Field>
                    <FieldLabel htmlFor="fleet-description">
                      Description (optional)
                    </FieldLabel>
                    <FormControl>
                      <Input
                        id="fleet-description"
                        placeholder="Premium electric executive sedan"
                        {...field}
                      />
                    </FormControl>
                    <FieldError>
                      {form.formState.errors.description?.message}
                    </FieldError>
                  </Field>
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="image"
              render={({ field }) => (
                <FormItem>
                  <Field>
                    <FieldLabel htmlFor="fleet-image">Image</FieldLabel>
                    <div className="flex flex-col gap-3 md:flex-row md:items-center">
                      <FormControl>
                        <Input
                          id="fleet-image"
                          type="file"
                          accept="image/*"
                          onChange={(event) => {
                            const file = event.target.files?.[0]
                            if (file) {
                              field.onChange(file)
                              form.clearErrors('image')
                            }
                          }}
                          disabled={isCreating}
                        />
                      </FormControl>
                      <Input
                        value={field.value.name}
                        readOnly
                        placeholder="Selected image file"
                      />
                    </div>
                    <FieldError>
                      {form.formState.errors.image?.message}
                    </FieldError>
                  </Field>
                </FormItem>
              )}
            />

            <div className="flex items-center gap-3">
              <Button
                type="button"
                variant="outline"
                onClick={() => navigate({ to: '/admin/fleet-vehicle' })}
              >
                Cancel
              </Button>
              <Button type="submit" disabled={isCreating}>
                {isCreating ? (
                  <>
                    <Loader2 className="mr-2 size-4 animate-spin" />
                    Saving...
                  </>
                ) : (
                  <>
                    <Plus className="mr-2 size-4" />
                    Create Fleet
                  </>
                )}
              </Button>
            </div>
          </form>
        </Form>
      </div>
    </AppWrapper>
  )
}
