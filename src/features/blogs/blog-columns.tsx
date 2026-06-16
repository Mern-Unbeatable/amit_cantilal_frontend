import { format } from 'date-fns'
import type { ColumnDef } from '@tanstack/react-table'
import type { AdminPost, PostStatus } from '@/features/blogs/blog.types.ts'
import { Badge } from '@/components/ui/badge'
import { useNavigate } from '@tanstack/react-router'
import { MoreHorizontal, Pencil, Trash2 } from 'lucide-react'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import { useDeletePost } from '@/features/blogs/blog.hooks.ts'
import { Button } from '@/components/ui/button.tsx'

export const POST_STATUS_MAP: Record<PostStatus, 'default' | 'secondary'> = {
  draft: 'default',
  published: 'secondary',
}

const statusLabel: Record<PostStatus, string> = {
  draft: 'Draft',
  published: 'Published',
}

function deriveStatus(published_at?: string | null): PostStatus {
  if (!published_at) return 'draft'

  return new Date(published_at) <= new Date() ? 'published' : 'draft'
}

export function blogColumns(): Array<ColumnDef<AdminPost, unknown>> {
  return [
    {
      accessorKey: 'title',
      header: 'Title',
      cell: ({ row }) => (
        <div>
          <div className="font-medium">{row.original.title}</div>

          <div className="text-xs text-muted-foreground">
            {row.original.slug}
          </div>
        </div>
      ),
    },

    {
      accessorKey: 'author',
      header: 'Author',
      cell: ({ row }) => row.original.author ?? '—',
    },

    {
      accessorKey: 'published_at',
      header: 'Published',
      cell: ({ row }) =>
        row.original.published_at
          ? format(new Date(row.original.published_at), 'dd MMM yyyy')
          : '—',
    },

    {
      accessorKey: 'status',
      header: 'Status',
      cell: ({ row }) => {
        const status = deriveStatus(row.original.published_at)

        return (
          <Badge variant={POST_STATUS_MAP[status]}>{statusLabel[status]}</Badge>
        )
      },
    },
    {
      id: 'actions',
      header: '',
      cell: ({ row }) => {
        const navigate = useNavigate()
        const { mutate: deletePost } = useDeletePost()

        return (
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
                <MoreHorizontal className="w-4 h-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuItem
                onClick={() =>
                  navigate({
                    to: '/admin/posts/$slug/edit',
                    params: { slug: row.original.slug },
                  })
                }
              >
                <Pencil className="w-4 h-4 mr-2" /> Edit
              </DropdownMenuItem>
              <DropdownMenuItem
                className="text-destructive focus:text-destructive"
                onClick={() => {
                  if (confirm(`Delete "${row.original.title}"?`)) {
                    deletePost(row.original.slug)
                  }
                }}
              >
                <Trash2 className="w-4 h-4 mr-2" /> Delete
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        )
      },
    },
  ]
}
