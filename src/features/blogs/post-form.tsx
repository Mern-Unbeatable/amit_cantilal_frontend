import { useEffect, useRef, useState } from 'react'
import { useForm, Controller } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import { ImagePlus, X, FileText, User, AlignLeft, Eye, EyeOff } from 'lucide-react'
import { toast } from 'sonner'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Textarea } from '@/components/ui/textarea'
import { Switch } from '@/components/ui/switch'
import { Separator } from '@/components/ui/separator'
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

function SectionHeading({ icon, title, description }: { icon: React.ReactNode; title: string; description?: string }) {
  return (
    <div className="flex items-start gap-3 mb-5">
      <div className="mt-0.5 p-2 rounded-md bg-muted text-muted-foreground">
        {icon}
      </div>
      <div>
        <p className="text-sm font-semibold text-foreground">{title}</p>
        {description && <p className="text-xs text-muted-foreground mt-0.5">{description}</p>}
      </div>
    </div>
  )
}

function Field({
  id, label, required, error, hint, children,
}: {
  id: string
  label: string
  required?: boolean
  error?: string
  hint?: string
  children: React.ReactNode
}) {
  return (
    <div className="space-y-1.5">
      <Label htmlFor={id} className="text-sm font-medium">
        {label} {required && <span className="text-destructive">*</span>}
      </Label>
      {children}
      {hint && !error && <p className="text-xs text-muted-foreground">{hint}</p>}
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
    mode: 'onTouched',
    defaultValues: {
      title:        defaultValues?.title ?? '',
      excerpt:      defaultValues?.excerpt ?? '',
      content:      defaultValues?.content ?? '',
      author:       defaultValues?.author ?? '',
      published_at: defaultValues?.published_at ?? null,
    },
  })

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

  const handleInvalid = (errors: Record<string, { message?: string }>) => {
    const messages = Object.values(errors)
      .map((e) => e.message)
      .filter(Boolean)
    toast.error(
      <div className="space-y-1">
        <p className="font-medium">Please fix the following:</p>
        <ul className="list-disc list-inside text-sm space-y-0.5">
          {messages.map((msg) => <li key={msg}>{msg}</li>)}
        </ul>
      </div>
    )
  }

  return (
    <form onSubmit={handleSubmit(handleFormSubmit, handleInvalid)}>
      <div className="grid grid-cols-1 md:grid-cols-12">

        {/* ── LEFT: Main content (col-9) ─────────────────────────────── */}
        <div className="md:col-span-9 border-r border-border divide-y divide-border">

          {/* Post Details */}
          <div className="p-6 space-y-5">
            <SectionHeading
              icon={<FileText className="w-4 h-4" />}
              title="Post Details"
              description="Core metadata that defines the post."
            />
            <Field id="title" label="Title" required error={errors.title?.message} hint="Keep it concise and descriptive.">
              <Input
                id="title"
                placeholder="e.g. The Best Transfers in Lisbon"
                className="h-10"
                {...register('title')}
              />
            </Field>
            <Field id="excerpt" label="Excerpt" error={errors.excerpt?.message} hint="Shown in post listings and SEO previews. 1–2 sentences.">
              <Textarea
                id="excerpt"
                rows={2}
                placeholder="A short summary of what this post covers..."
                className="resize-none"
                {...register('excerpt')}
              />
            </Field>
            <Field id="author" label="Author" error={errors.author?.message}>
              <Input
                id="author"
                placeholder="e.g. Off We Go Team"
                className="h-10"
                {...register('author')}
              />
            </Field>
          </div>

          {/* Content */}
          <div className="p-6 space-y-4">
            <SectionHeading
              icon={<AlignLeft className="w-4 h-4" />}
              title="Content"
              description="The full body of the post. Use headings, images and formatting."
            />
            <Field id="content" label="Body" required error={errors.content?.message}>
              <Controller
                name="content"
                control={control}
                render={({ field }) => (
                  <RichTextEditor
                    value={field.value}
                    onChange={field.onChange}
                    onBlur={field.onBlur}
                    placeholder="Start writing your post..."
                  />
                )}
              />
            </Field>
          </div>

          {/* Submit */}
          <div className="p-6 flex items-center justify-end">
            <Button type="submit" disabled={isSubmitting} className="min-w-[140px]">
              {isSubmitting ? 'Saving...' : defaultValues ? 'Update Post' : 'Publish Post'}
            </Button>
          </div>
        </div>

        {/* ── RIGHT: Sidebar (col-3) ─────────────────────────────────── */}
        <div className="md:col-span-3 divide-y divide-border">

          {/* Cover Image */}
          <div className="p-4 space-y-3">
            <SectionHeading
              icon={<ImagePlus className="w-4 h-4" />}
              title="Cover Image"
              description="Shown in listings and at the top of the post."
            />
            {coverPreview ? (
              <div className="relative w-full aspect-video rounded-lg overflow-hidden border border-border">
                <img src={coverPreview} alt="Cover preview" className="w-full h-full object-cover" />
                <button
                  type="button"
                  onClick={removeCover}
                  className="absolute top-2 right-2 bg-black/60 hover:bg-black/80 rounded-full p-1.5 transition-colors"
                >
                  <X className="w-3 h-3 text-white" />
                </button>
              </div>
            ) : (
              <button
                type="button"
                onClick={() => fileInputRef.current?.click()}
                className="flex flex-col items-center justify-center w-full aspect-video border-2 border-dashed border-border rounded-lg hover:border-primary/50 hover:bg-muted/30 transition-all gap-2 text-muted-foreground group"
              >
                <div className="p-2.5 rounded-full bg-muted group-hover:bg-muted/80 transition-colors">
                  <ImagePlus className="w-4 h-4" />
                </div>
                <div className="text-center px-2">
                  <p className="text-xs font-medium text-foreground">Upload cover</p>
                  <p className="text-[10px] text-muted-foreground mt-0.5">1200×630px recommended</p>
                </div>
              </button>
            )}
            {coverPreview && (
              <button
                type="button"
                onClick={() => fileInputRef.current?.click()}
                className="text-xs text-muted-foreground hover:text-foreground transition-colors"
              >
                Replace image
              </button>
            )}
            <input
              ref={fileInputRef}
              type="file"
              accept="image/*"
              className="hidden"
              onChange={handleCoverChange}
            />
          </div>

          {/* Visibility */}
          <div className="p-4 space-y-3">
            <SectionHeading
              icon={isPublished ? <Eye className="w-4 h-4" /> : <EyeOff className="w-4 h-4" />}
              title="Visibility"
              description="Control whether this post is public."
            />
            <div className={`flex items-center justify-between rounded-lg p-3 border transition-colors ${
              isPublished
                ? 'border-green-500/40 bg-green-500/5'
                : 'border-orange-400/40 bg-orange-400/5'
            }`}>
              <div>
                <p className={`text-xs font-semibold ${isPublished ? 'text-green-600 dark:text-green-400' : 'text-orange-600 dark:text-orange-400'}`}>
                  {isPublished ? 'Published' : 'Draft'}
                </p>
                <p className="text-[10px] text-muted-foreground mt-0.5">
                  {isPublished ? 'Visible to the public' : 'Hidden from the public'}
                </p>
              </div>
              <Switch checked={isPublished} onCheckedChange={setIsPublished} />
            </div>
          </div>

        </div>
      </div>
    </form>
  )
}
