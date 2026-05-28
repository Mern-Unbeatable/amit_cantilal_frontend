import { createFileRoute, useNavigate } from '@tanstack/react-router'
import PageHeader from '@/components/page-header.tsx'
import AppWrapper from '@/components/layouts/sidebar/app-wrapper.tsx'
import { PostForm } from '@/features/blogs/post-form.tsx'
import { useCreatePost } from '@/features/blogs/blog.hooks.ts'
import { Card, CardContent } from '@/components/ui/card'

export const Route = createFileRoute('/_authenticated/admin/posts/create')({
  component: RouteComponent,
})

function RouteComponent() {
  const navigate = useNavigate()
  const { mutateAsync: createPost, isPending } = useCreatePost()

  const handleSubmit = async (values: any, coverImage: File | null) => {
    await createPost({
      ...values,
      cover_image: coverImage,
    })
    navigate({ to: '/admin/posts' })
  }

  return (
    <AppWrapper>
      <PageHeader pageTitle="New Post" pageSubtitle="Create a new blog post" />
      <div className="p-4 md:p-6">
        <Card className="max-w-3xl mx-auto">
          <CardContent className="p-6">
            <PostForm onSubmit={handleSubmit} isSubmitting={isPending} />
          </CardContent>
        </Card>
      </div>
    </AppWrapper>
  )
}