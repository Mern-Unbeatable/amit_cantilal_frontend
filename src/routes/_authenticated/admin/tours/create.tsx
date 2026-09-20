import { zodResolver } from '@hookform/resolvers/zod'
import { createFileRoute, useNavigate } from '@tanstack/react-router'
import { Loader2, Plus } from 'lucide-react'
import { useForm } from 'react-hook-form'
import { z } from 'zod'
import type { AxiosError } from 'axios'
import type { ApiError } from '@/@types/api.ts'
import type {
  AdminCreateTourPayload,
  TourCategory,
} from '@/features/tour/tour.types.ts'
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
import { Textarea } from '@/components/ui/textarea.tsx'
import { extractApiErrors } from '@/features/auth/auth.hooks.ts'
import { useCreateTour } from '@/features/tour/tour.hooks.ts'

export const Route = createFileRoute('/_authenticated/admin/tours/create')({
  component: RouteComponent,
})

const tourSchema = z.object({
  title: z
    .string()
    .min(2, { message: 'Title must be at least 2 characters' })
    .max(255),
  excerpt: z.string().max(500).optional(),
  description: z.string().min(1, { message: 'Description is required' }),
  price: z.coerce.number().int().min(0, { message: 'Price must be 0 or more' }),
  duration: z.string().min(1, { message: 'Duration is required' }).max(100),
  max_guests: z.coerce
    .number()
    .int()
    .min(1, { message: 'Max guests must be at least 1' })
    .max(50),
  category: z.enum(['private', 'on_demand']),
  cover_image: z.string().optional(),
  active: z.boolean(),
  sort_order: z.coerce
    .number()
    .int()
    .min(0, { message: 'Sort order must be 0 or more' }),
  inclusions: z.string().optional(),
  exclusions: z.string().optional(),
})

type TourFormInput = z.input<typeof tourSchema>
type TourFormValues = z.output<typeof tourSchema>

const defaultValues: TourFormInput = {
  title: '',
  excerpt: '',
  description: '',
  price: 0,
  duration: '',
  max_guests: 1,
  category: 'private',
  cover_image: '',
  active: true,
  sort_order: 0,
  inclusions: '',
  exclusions: '',
}

function parseListValue(value?: string): Array<string> {
  return (value ?? '')
    .split('\n')
    .map((item) => item.trim())
    .filter((item) => item.length > 0)
}

function RouteComponent() {
  const navigate = useNavigate()
  const { mutate: createTour, isPending: isCreating } = useCreateTour()
  const formFieldNames: Array<keyof TourFormValues> = [
    'title',
    'excerpt',
    'description',
    'price',
    'duration',
    'max_guests',
    'category',
    'cover_image',
    'active',
    'sort_order',
    'inclusions',
    'exclusions',
  ]

  const form = useForm<TourFormInput, unknown, TourFormValues>({
    resolver: zodResolver(tourSchema),
    defaultValues,
  })

  const onSubmit = (values: TourFormValues) => {
    const payload: AdminCreateTourPayload = {
      title: values.title,
      excerpt: values.excerpt || null,
      description: values.description,
      price: values.price,
      duration: values.duration,
      max_guests: values.max_guests,
      category: values.category as TourCategory,
      cover_image: values.cover_image || null,
      active: values.active,
      sort_order: values.sort_order,
      inclusions: parseListValue(values.inclusions),
      exclusions: parseListValue(values.exclusions),
    }

    createTour(payload, {
      onSuccess: () => {
        navigate({ to: '/admin/tours' })
      },
      onError: (error) => {
        const axiosError = error as AxiosError<ApiError>
        const apiErrors = extractApiErrors(axiosError)

        if (apiErrors) {
          const knownFieldNames = new Set<string>(formFieldNames)
          const unknownErrors: Array<string> = []

          Object.entries(apiErrors).forEach(([field, message]) => {
            if (knownFieldNames.has(field)) {
              form.setError(field as keyof TourFormValues, { message })
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
          message: 'Failed to create tour. Please try again.',
        })
      },
    })
  }

  return (
    <AppWrapper>
      <PageHeader
        pageTitle="Create Tour"
        pageSubtitle="Add a new tour offering"
      />

      <div className="p-4 md:p-6">
        <div className="mx-auto w-full max-w-3xl rounded-lg border bg-card p-4 md:p-6">
          <Form {...form}>
            <form
              onSubmit={form.handleSubmit(onSubmit)}
              className="space-y-5"
              noValidate
            >
              <FormField
                control={form.control}
                name="title"
                render={({ field }) => (
                  <FormItem>
                    <Field>
                      <FieldLabel htmlFor="title">Title</FieldLabel>
                      <FormControl>
                        <Input id="title" placeholder="Tour title" {...field} />
                      </FormControl>
                      <FieldError errors={[form.formState.errors.title]} />
                    </Field>
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="excerpt"
                render={({ field }) => (
                  <FormItem>
                    <Field>
                      <FieldLabel htmlFor="excerpt">Excerpt</FieldLabel>
                      <FormControl>
                        <Textarea
                          id="excerpt"
                          rows={3}
                          placeholder="Short summary"
                          {...field}
                        />
                      </FormControl>
                      <FieldError errors={[form.formState.errors.excerpt]} />
                    </Field>
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="description"
                render={({ field }) => (
                  <FormItem>
                    <Field>
                      <FieldLabel htmlFor="description">Description</FieldLabel>
                      <FormControl>
                        <Textarea
                          id="description"
                          rows={6}
                          placeholder="Detailed description"
                          {...field}
                        />
                      </FormControl>
                      <FieldError
                        errors={[form.formState.errors.description]}
                      />
                    </Field>
                  </FormItem>
                )}
              />

              <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                <FormField
                  control={form.control}
                  name="price"
                  render={({ field }) => (
                    <FormItem>
                      <Field>
                        <FieldLabel htmlFor="price">Price</FieldLabel>
                        <FormControl>
                          <Input
                            id="price"
                            type="number"
                            min={0}
                            value={
                              typeof field.value === 'number' ? field.value : 0
                            }
                            onChange={(event) =>
                              field.onChange(event.target.value)
                            }
                            onBlur={field.onBlur}
                            name={field.name}
                            ref={field.ref}
                          />
                        </FormControl>
                        <FieldError errors={[form.formState.errors.price]} />
                      </Field>
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="duration"
                  render={({ field }) => (
                    <FormItem>
                      <Field>
                        <FieldLabel htmlFor="duration">Duration</FieldLabel>
                        <FormControl>
                          <Input
                            id="duration"
                            placeholder="e.g. 2 hours"
                            {...field}
                          />
                        </FormControl>
                        <FieldError errors={[form.formState.errors.duration]} />
                      </Field>
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="max_guests"
                  render={({ field }) => (
                    <FormItem>
                      <Field>
                        <FieldLabel htmlFor="max_guests">Max Guests</FieldLabel>
                        <FormControl>
                          <Input
                            id="max_guests"
                            type="number"
                            min={1}
                            max={50}
                            value={
                              typeof field.value === 'number' ? field.value : 1
                            }
                            onChange={(event) =>
                              field.onChange(event.target.value)
                            }
                            onBlur={field.onBlur}
                            name={field.name}
                            ref={field.ref}
                          />
                        </FormControl>
                        <FieldError
                          errors={[form.formState.errors.max_guests]}
                        />
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
                        <FieldLabel htmlFor="sort_order">Sort Order</FieldLabel>
                        <FormControl>
                          <Input
                            id="sort_order"
                            type="number"
                            min={0}
                            value={
                              typeof field.value === 'number' ? field.value : 0
                            }
                            onChange={(event) =>
                              field.onChange(event.target.value)
                            }
                            onBlur={field.onBlur}
                            name={field.name}
                            ref={field.ref}
                          />
                        </FormControl>
                        <FieldError
                          errors={[form.formState.errors.sort_order]}
                        />
                      </Field>
                    </FormItem>
                  )}
                />
              </div>

              <FormField
                control={form.control}
                name="category"
                render={({ field }) => (
                  <FormItem>
                    <Field>
                      <FieldLabel>Category</FieldLabel>
                      <FormControl>
                        <Select
                          value={field.value}
                          onValueChange={field.onChange}
                        >
                          <SelectTrigger>
                            <SelectValue placeholder="Select category" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="private">Private</SelectItem>
                            <SelectItem value="on_demand">On demand</SelectItem>
                          </SelectContent>
                        </Select>
                      </FormControl>
                      <FieldError errors={[form.formState.errors.category]} />
                    </Field>
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="cover_image"
                render={({ field }) => (
                  <FormItem>
                    <Field>
                      <FieldLabel htmlFor="cover_image">
                        Cover Image URL
                      </FieldLabel>
                      <FormControl>
                        <Input
                          id="cover_image"
                          placeholder="/images/tour.jpg"
                          {...field}
                        />
                      </FormControl>
                      <FieldError
                        errors={[form.formState.errors.cover_image]}
                      />
                    </Field>
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="inclusions"
                render={({ field }) => (
                  <FormItem>
                    <Field>
                      <FieldLabel htmlFor="inclusions">
                        Inclusions (one per line)
                      </FieldLabel>
                      <FormControl>
                        <Textarea
                          id="inclusions"
                          rows={4}
                          placeholder="Hotel pickup"
                          {...field}
                        />
                      </FormControl>
                      <FieldError errors={[form.formState.errors.inclusions]} />
                    </Field>
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="exclusions"
                render={({ field }) => (
                  <FormItem>
                    <Field>
                      <FieldLabel htmlFor="exclusions">
                        Exclusions (one per line)
                      </FieldLabel>
                      <FormControl>
                        <Textarea
                          id="exclusions"
                          rows={4}
                          placeholder="Lunch"
                          {...field}
                        />
                      </FormControl>
                      <FieldError errors={[form.formState.errors.exclusions]} />
                    </Field>
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="active"
                render={({ field }) => (
                  <FormItem>
                    <Field className="flex-row items-center justify-between rounded-md border p-3">
                      <FieldLabel htmlFor="active" className="mb-0">
                        Active
                      </FieldLabel>
                      <FormControl>
                        <Input
                          id="active"
                          type="checkbox"
                          checked={field.value}
                          onChange={(event) =>
                            field.onChange(event.target.checked)
                          }
                          className="h-4 w-4"
                        />
                      </FormControl>
                    </Field>
                    <FieldError errors={[form.formState.errors.active]} />
                  </FormItem>
                )}
              />

              {form.formState.errors.root?.message && (
                <div className="rounded-md border border-destructive/40 bg-destructive/10 p-3 text-sm text-destructive">
                  {form.formState.errors.root.message}
                </div>
              )}

              <div className="flex justify-end gap-2">
                <Button
                  type="button"
                  variant="outline"
                  onClick={() => navigate({ to: '/admin/tours' })}
                >
                  Cancel
                </Button>
                <Button type="submit" disabled={isCreating}>
                  {isCreating ? (
                    <>
                      <Loader2 className="mr-2 size-4 animate-spin" />
                      Creating...
                    </>
                  ) : (
                    <>
                      <Plus className="mr-2 size-4" />
                      Create Tour
                    </>
                  )}
                </Button>
              </div>
            </form>
          </Form>
        </div>
      </div>
    </AppWrapper>
  )
}
