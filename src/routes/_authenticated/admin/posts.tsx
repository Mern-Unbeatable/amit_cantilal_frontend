import { createFileRoute } from '@tanstack/react-router'
import { Plus } from 'lucide-react'
import { useState } from 'react'
import AppWrapper from '@/components/layouts/sidebar/app-wrapper.tsx'
import PageHeader from '@/components/page-header.tsx'
import { useAdminPosts } from '@/features/blogs/blog.hooks.ts'
import PostForm from '@/features/blogs/post-form.tsx'
import { Button } from '@/components/ui/button'

export const Route = createFileRoute('/_authenticated/admin/posts')({
  component: RouteComponent,
})

function RouteComponent() {
  const [isCreateOpen, setIsCreateOpen] = useState(false)
  const { data: posts = [], isLoading, isError, error } = useAdminPosts()

  return (
    <AppWrapper>
      <PageHeader pageTitle="Posts" pageSubtitle="Manage blog content" />

      <div className="space-y-6">
        <div className="flex items-center justify-between gap-4">
          <h2 className="text-xl font-semibold">All Posts</h2>
          <Button type="button" onClick={() => setIsCreateOpen((prev) => !prev)}>
            <Plus className="mr-2 size-4" />
            {isCreateOpen ? 'Close form' : 'Create Post'}
          </Button>
        </div>

        {isCreateOpen ? (
          <div className="max-w-3xl rounded-lg border p-4">
            <PostForm />
          </div>
        ) : null}

        {isLoading ? <p className="text-sm text-muted-foreground">Loading posts...</p> : null}

        {isError ? (
          <p className="text-sm text-destructive">
            {(error as Error)?.message || 'Could not load posts from backend.'}
          </p>
        ) : null}

        {!isLoading && !isError && posts.length === 0 ? (
          <p className="text-sm text-muted-foreground">No posts found.</p>
        ) : null}

        {!isLoading && !isError && posts.length > 0 ? (
          <div className="overflow-hidden rounded-lg border">
            <table className="w-full text-left text-sm">
              <thead className="bg-muted/50">
                <tr>
                  <th className="px-4 py-3 font-medium">Title</th>
                  <th className="px-4 py-3 font-medium">Slug</th>
                  <th className="px-4 py-3 font-medium">Status</th>
                  <th className="px-4 py-3 font-medium">Published At</th>
                </tr>
              </thead>
              <tbody>
                {posts.map((post) => (
                  <tr key={post.id} className="border-t">
                    <td className="px-4 py-3">{post.title}</td>
                    <td className="px-4 py-3 text-muted-foreground">{post.slug}</td>
                    <td className="px-4 py-3">{post.status ?? 'draft'}</td>
                    <td className="px-4 py-3 text-muted-foreground">
                      {post.published_at || '-'}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        ) : null}
      </div>
    </AppWrapper>
  )
}