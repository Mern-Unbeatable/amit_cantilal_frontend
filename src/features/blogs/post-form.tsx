import { zodResolver } from '@hookform/resolvers/zod'
import type { AxiosError } from 'axios'
import { useForm } from 'react-hook-form'
import { z } from 'zod'
import type { ApiError } from '@/@types/api.ts'
import { extractApiErrors } from '@/features/auth/auth.hooks.ts'
import { useCreatePost } from '@/features/blogs/blog.hooks.ts'
import type { AdminCreatePostFormValues } from '@/features/blogs/blog.types.ts'
import { Button } from '@/components/ui/button'
import { Field, FieldError, FieldLabel } from '@/components/ui/field'
import { Form, FormControl, FormField, FormItem } from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import { Spinner } from '@/components/ui/spinner.tsx'
import { Textarea } from '@/components/ui/textarea'

const postFormSchema = z.object({
  title: z.string().min(3, { message: 'Title must be at least 3 characters' }),
  slug: z.string().min(3, { message: 'Slug must be at least 3 characters' }),
  date: z.string().min(1, { message: 'Publish date is required' }),
  coverImage: z.string().url({ message: 'Cover image must be a valid URL' }),
  excerpt: z.string().max(500, { message: 'Excerpt must be 500 characters max' }).optional(),
  content: z.string().min(20, { message: 'Content must be at least 20 characters' }),
})

const defaultValues: AdminCreatePostFormValues = {
  title: '',
  slug: '',
  date: '',
  coverImage: '',
  excerpt: '',
  content: '',
}

const PostForm = () => {
  const { mutate: createPost, isPending } = useCreatePost()

  const form = useForm<AdminCreatePostFormValues>({
    resolver: zodResolver(postFormSchema),
    defaultValues,
  })

  const onSubmit = (values: AdminCreatePostFormValues) => {
    createPost(
      {
        title: values.title,
        slug: values.slug,
        excerpt: values.excerpt,
        content: values.content,
        cover_image: values.coverImage,
        published_at: values.date,
        status: 'published',
      },
      {
        onSuccess: () => {
          form.reset(defaultValues)
        },
        onError: (err) => {
          const axiosError = err as AxiosError<ApiError>
          const apiErrors = extractApiErrors(axiosError)

          if (apiErrors) {
            Object.entries(apiErrors).forEach(([field, message]) => {
              const keyMap: Record<string, keyof AdminCreatePostFormValues> = {
                cover_image: 'coverImage',
                published_at: 'date',
              }
              const targetField = keyMap[field] ?? (field as keyof AdminCreatePostFormValues)
              form.setError(targetField, { message })
            })
            return
          }

          form.setError('root', {
            message:
              axiosError.response?.data.message ??
              'Could not create post. Please try again.',
          })
        },
      },
    )
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="flex flex-col gap-6">
        {form.formState.errors.root && (
          <p className="rounded-md border border-destructive/20 bg-destructive/10 px-4 py-3 text-sm text-destructive">
            {form.formState.errors.root.message}
          </p>
        )}

        <FormField
          control={form.control}
          name="title"
          render={({ field }) => (
            <FormItem>
              <Field>
                <FieldLabel htmlFor="title">Title</FieldLabel>
                <FormControl>
                  <Input id="title" placeholder="Enter post title" {...field} />
                </FormControl>
                <FieldError>{form.formState.errors.title?.message}</FieldError>
              </Field>
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="slug"
          render={({ field }) => (
            <FormItem>
              <Field>
                <FieldLabel htmlFor="slug">Slug</FieldLabel>
                <FormControl>
                  <Input id="slug" placeholder="my-awesome-post" {...field} />
                </FormControl>
                <FieldError>{form.formState.errors.slug?.message}</FieldError>
              </Field>
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="date"
          render={({ field }) => (
            <FormItem>
              <Field>
                <FieldLabel htmlFor="date">Publish Date</FieldLabel>
                <FormControl>
                  <Input id="date" type="datetime-local" {...field} />
                </FormControl>
                <FieldError>{form.formState.errors.date?.message}</FieldError>
              </Field>
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="coverImage"
          render={({ field }) => (
            <FormItem>
              <Field>
                <FieldLabel htmlFor="coverImage">Cover Image URL</FieldLabel>
                <FormControl>
                  <Input id="coverImage" placeholder="https://..." {...field} />
                </FormControl>
                <FieldError>{form.formState.errors.coverImage?.message}</FieldError>
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
                <FieldLabel htmlFor="excerpt">Excerpt (Optional)</FieldLabel>
                <FormControl>
                  <Textarea id="excerpt" rows={4} placeholder="Brief summary" {...field} />
                </FormControl>
                <FieldError>{form.formState.errors.excerpt?.message}</FieldError>
              </Field>
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="content"
          render={({ field }) => (
            <FormItem>
              <Field>
                <FieldLabel htmlFor="content">Content (HTML)</FieldLabel>
                <FormControl>
                  <Textarea id="content" rows={12} placeholder="<p>Post content...</p>" {...field} />
                </FormControl>
                <FieldError>{form.formState.errors.content?.message}</FieldError>
              </Field>
            </FormItem>
          )}
        />

        <Button type="submit" disabled={isPending} className="w-fit">
          {isPending ? (
            <>
              <Spinner className="mr-2 size-4" />
              Creating...
            </>
          ) : (
            'Create Post'
          )}
        </Button>
      </form>
    </Form>
  )
}

export default PostForm
