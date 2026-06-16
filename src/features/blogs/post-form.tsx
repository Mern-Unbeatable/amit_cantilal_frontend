// src/features/blogs/post-form.tsx

import { useEffect, useRef, useState } from 'react'
import { useForm, Controller } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import { ImagePlus, X } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Textarea } from '@/components/ui/textarea'
import { Switch } from '@/components/ui/switch'
import { RichTextEditor } from '@/components/rich-text-editor.tsx'
import type { AdminPost } from '@/features/blogs/blog.types.ts'

const schema = z.object({
  title:        z.string().min(1, 'Title is required'),
  excerpt:      z.string().optional(),
  content:      z.string().min(1, 'Content is required'),
  author:       z.string().optional(),
  published_at: z.string().nullable().optional(),
})

type PostFormValues = z.infer<typeof schema>

interface PostFormProps {
  defaultValues?: AdminPost
  onSubmit: (values: PostFormValues, coverImage: File | null) => Promise<void>
  isSubmitting: boolean
}

function Field({
                 id, label, required, error, children,
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

export function PostForm({ defaultValues, onSubmit, isSubmitting }: PostFormProps) {
  const [coverPreview, setCoverPreview] = useState<string | null>(
    defaultValues?.cover_image ?? null,
  )
  const [coverFile, setCoverFile] = useState<File | null>(null)
  const [isPublished, setIsPublished] = useState(!!defaultValues?.published_at)
  const fileInputRef = useRef<HTMLInputElement>(null)

  const {
    register,
    handleSubmit,
    control,
    setValue,
    formState: { errors },
  } = useForm<PostFormValues>({
    resolver: zodResolver(schema),
    defaultValues: {
      title:        defaultValues?.title ?? '',
      excerpt:      defaultValues?.excerpt ?? '',
      content:      defaultValues?.content ?? '',
      author:       defaultValues?.author ?? '',
      published_at: defaultValues?.published_at ?? null,
    },
  })

  // sync published toggle → published_at
  useEffect(() => {
    if (isPublished) {
      setValue('published_at', new Date().toISOString())
    } else {
      setValue('published_at', null)
    }
  }, [isPublished, setValue])

  const handleCoverChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (!file) return
    setCoverFile(file)
    setCoverPreview(URL.createObjectURL(file))
  }

  const removeCover = () => {
    setCoverFile(null)
    setCoverPreview(null)
    if (fileInputRef.current) fileInputRef.current.value = ''
  }

  const handleFormSubmit = async (values: PostFormValues) => {
    await onSubmit(values, coverFile)
  }

  return (
    <form onSubmit={handleSubmit(handleFormSubmit)} className="space-y-6">
      {/* Cover image */}
      <Field id="cover_image" label="Cover Image">
        {coverPreview ? (
          <div className="relative w-full h-48 rounded-md overflow-hidden border border-input">
            <img
              src={coverPreview}
              alt="Cover preview"
              className="w-full h-full object-cover"
            />
            <button
              type="button"
              onClick={removeCover}
              className="absolute top-2 right-2 bg-black/60 hover:bg-black/80 rounded-full p-1"
            >
              <X className="w-4 h-4 text-white" />
            </button>
          </div>
        ) : (
          <button
            type="button"
            onClick={() => fileInputRef.current?.click()}
            className="flex flex-col items-center justify-center w-full h-48 border border-dashed border-input rounded-md hover:border-primary transition-colors gap-2 text-muted-foreground hover:text-foreground"
          >
            <ImagePlus className="w-8 h-8" />
            <span className="text-sm">Click to upload cover image</span>
          </button>
        )}
        <input
          ref={fileInputRef}
          type="file"
          accept="image/*"
          className="hidden"
          onChange={handleCoverChange}
        />
      </Field>

      {/* Title */}
      <Field id="title" label="Title" required error={errors.title?.message}>
        <Input
          id="title"
          placeholder="Post title"
          {...register('title')}
        />
      </Field>

      {/* Author */}
      <Field id="author" label="Author" error={errors.author?.message}>
        <Input
          id="author"
          placeholder="e.g. Off We Go Team"
          {...register('author')}
        />
      </Field>

      {/* Excerpt */}
      <Field id="excerpt" label="Excerpt" error={errors.excerpt?.message}>
        <Textarea
          id="excerpt"
          rows={2}
          placeholder="Short description shown in post listings"
          className="resize-none"
          {...register('excerpt')}
        />
      </Field>

      {/* Content */}
      <Field id="content" label="Content" required error={errors.content?.message}>
        <Controller
          name="content"
          control={control}
          render={({ field }) => (
            <RichTextEditor
              value={field.value}
              onChange={field.onChange}
              placeholder="Write your post content here..."
            />
          )}
        />
      </Field>

      {/* Publish toggle */}
      <div className="flex items-center justify-between border border-input rounded-md p-4">
        <div>
          <p className="text-sm font-medium">
            {isPublished ? 'Published' : 'Draft'}
          </p>
          <p className="text-xs text-muted-foreground">
            {isPublished
              ? 'Post is visible to the public'
              : 'Post is hidden from the public'}
          </p>
        </div>
        <Switch checked={isPublished} onCheckedChange={setIsPublished} />
      </div>

      {/* Submit */}
      <Button type="submit" disabled={isSubmitting} className="w-full">
        {isSubmitting ? 'Saving...' : defaultValues ? 'Update Post' : 'Create Post'}
      </Button>
    </form>
  )
}