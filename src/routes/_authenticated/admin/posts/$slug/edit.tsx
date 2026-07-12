// src/routes/_authenticated/admin/posts/$slug/edit.tsx

import { createFileRoute, useNavigate } from '@tanstack/react-router'
import PageHeader from '@/components/page-header.tsx'
import AppWrapper from '@/components/layouts/sidebar/app-wrapper.tsx'
import { PostForm } from '@/features/blogs/post-form.tsx'
import { useAdminPost, useUpdatePost } from '@/features/blogs/blog.hooks.ts'
import { Card } from '@/components/ui/card'

export const Route = createFileRoute('/_authenticated/admin/posts/$slug/edit')({
  component: RouteComponent,
})

function RouteComponent() {
  const { slug } = Route.useParams()
  const navigate = useNavigate()
  const { data: post, isLoading } = useAdminPost(slug)
  const { mutateAsync: updatePost, isPending } = useUpdatePost(slug)

  const handleSubmit = async (values: any, coverImage: File | null) => {
    await updatePost({
      ...values,
      cover_image: coverImage,
    })
    navigate({ to: '/admin/posts' })
  }

  if (isLoading) {
    return (
      <AppWrapper>
        <div className="p-6 space-y-4">
          {Array.from({ length: 4 }).map((_, i) => (
            <div key={i} className="h-12 bg-muted animate-pulse rounded-md" />
          ))}
        </div>
      </AppWrapper>
    )
  }

  return (
    <AppWrapper>
      <PageHeader pageTitle="Edit Post" pageSubtitle={post?.title ?? ''} />
      <div className="p-4 md:p-6">
        <Card className="max-w-5xl mx-auto overflow-hidden">
          <PostForm
            defaultValues={post}
            onSubmit={handleSubmit}
            isSubmitting={isPending}
          />
        </Card>
      </div>
    </AppWrapper>
  )
}
