import { zodResolver } from '@hookform/resolvers/zod'
import { createFileRoute, useNavigate } from '@tanstack/react-router'
import { Loader2, Save } from 'lucide-react'
import { useEffect } from 'react'
import { useForm } from 'react-hook-form'
import { z } from 'zod'
import type { AxiosError } from 'axios'
import type { ApiError } from '@/@types/api.ts'
import type {
  AdminUpdateFleetPayload,
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
import { useFleetById, useUpdateFleet } from '@/features/fleet/fleet.hooks.ts'
import { Spinner } from '@/components/ui/spinner.tsx'

export const Route = createFileRoute(
  '/_authenticated/admin/fleet-vehicle/$fleetId/edit',
)({
  component: RouteComponent,
})

const fleetSchema = z.object({
  name: z.string().min(2, { message: 'Name must be at least 2 characters' }),
  description: z.string().optional(),
  image: z
    .instanceof(File)
    .optional()
    .refine((file) => !file || file.size > 0, {
      message: 'Please select a valid image',
    }),
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
  image: undefined,
  passengers: 2,
  suitcases: 2,
  price: 0,
  fuel_type: 'electric',
  sort_order: 1,
}

function RouteComponent() {
  const navigate = useNavigate()
  const { fleetId } = Route.useParams()
  const { data: fleet, isLoading: isLoadingFleet } = useFleetById(fleetId)
  const { mutate: updateFleet, isPending: isUpdating } = useUpdateFleet()
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

  useEffect(() => {
    if (!fleet) {
      return
    }

    form.reset({
      name: fleet.name,
      description: fleet.description ?? '',
      image: undefined,
      passengers: fleet.passengers,
      suitcases: fleet.suitcases,
      price: fleet.price,
      fuel_type: fleet.fuel_type === 'electric' ? 'electric' : 'diesel',
      sort_order: 0,
    })
  }, [fleet, form])

  const onSubmit = (values: FleetFormValues) => {
    const payload: AdminUpdateFleetPayload = {
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

    updateFleet(
      { id: fleetId, payload },
      {
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
              'Could not update fleet vehicle. Please try again.',
          })
        },
      },
    )
  }

  return (
    <AppWrapper>
      <PageHeader
        pageTitle="Edit Fleet Vehicle"
        pageSubtitle="Update a vehicle in your backend fleet"
      />

      <div className="rounded-lg border p-4 md:p-6">
        {isLoadingFleet ? (
          <p className="text-sm text-muted-foreground">
            <Spinner /> Loading fleet details...
          </p>
        ) : (
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
                        <FieldLabel htmlFor="fleet-name">
                          Vehicle Name
                        </FieldLabel>
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
                      <FieldLabel htmlFor="fleet-image">
                        Image (optional)
                      </FieldLabel>
                      <div className="flex flex-col gap-3 md:flex-row md:items-center">
                        <FormControl>
                          <Input
                            id="fleet-image"
                            type="file"
                            accept="image/*"
                            onChange={(event) => {
                              const file = event.target.files?.[0]
                              field.onChange(file)
                              form.clearErrors('image')
                            }}
                            disabled={isUpdating}
                          />
                        </FormControl>
                        <Input
                          value={field.value?.name ?? ''}
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
                <Button type="submit" disabled={isUpdating}>
                  {isUpdating ? (
                    <>
                      <Loader2 className="mr-2 size-4 animate-spin" />
                      Saving...
                    </>
                  ) : (
                    <>
                      <Save className="mr-2 size-4" />
                      Update Fleet
                    </>
                  )}
                </Button>
              </div>
            </form>
          </Form>
        )}
      </div>
    </AppWrapper>
  )
}
