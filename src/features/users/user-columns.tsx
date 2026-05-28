import { format } from 'date-fns'
import type { ColumnDef } from '@tanstack/react-table'
import type { AdminUser } from '@/features/users/user.types.ts'
import { Badge } from '@/components/ui/badge'
import { useNavigate } from '@tanstack/react-router'
import { MoreHorizontal, Pencil, Trash2, Eye, EyeOff } from 'lucide-react'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import { useDeleteUser, useToggleUserStatus } from '@/features/users/user.hooks.ts'
import { Button } from '@/components/ui/button.tsx'
import { ROLE_LABELS } from '@/types/user'

function getUserStatusColor(isActive: boolean): 'default' | 'secondary' {
  return isActive ? 'secondary' : 'default'
}

function getUserStatusLabel(isActive: boolean): string {
  return isActive ? 'Active' : 'Inactive'
}

export function userColumns(): Array<ColumnDef<AdminUser, unknown>> {
  return [
    {
      accessorKey: 'name',
      header: 'Name',
      cell: ({ row }) => (
        <div>
          <div className="font-medium">{row.original.name}</div>
          <div className="text-xs text-muted-foreground">
            {row.original.email}
          </div>
        </div>
      ),
    },

    {
      accessorKey: 'role',
      header: 'Role',
      cell: ({ row }) => (
        <Badge variant="outline">
          {ROLE_LABELS[row.original.role] || row.original.role}
        </Badge>
      ),
    },

    {
      accessorKey: 'status',
      header: 'Status',
      cell: ({ row }) => (
        <Badge variant="outline">{row.original.status}</Badge>
      ),
    },

    {
      accessorKey: 'is_active',
      header: 'Active',
      cell: ({ row }) => {
        const isActive = row.original.is_active

        return (
          <Badge variant={getUserStatusColor(isActive)}>
            {getUserStatusLabel(isActive)}
          </Badge>
        )
      },
    },

    {
      accessorKey: 'last_login_at',
      header: 'Last Login',
      cell: ({ row }) =>
        row.original.last_login_at
          ? format(new Date(row.original.last_login_at), 'dd MMM yyyy HH:mm')
          : '—',
    },

    {
      accessorKey: 'created_at',
      header: 'Joined',
      cell: ({ row }) =>
        format(new Date(row.original.created_at), 'dd MMM yyyy'),
    },

    {
      id: 'actions',
      header: '',
      cell: ({ row }) => {
        const navigate = useNavigate()
        const { mutate: deleteUser } = useDeleteUser()
        const { mutate: toggleStatus } = useToggleUserStatus()

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
                    to: '/admin/users/$id/edit',
                    params: { id: row.original.id.toString() },
                  })
                }
              >
                <Pencil className="w-4 h-4 mr-2" /> Edit
              </DropdownMenuItem>
              <DropdownMenuItem
                onClick={() => {
                  if (
                    confirm(
                      `${row.original.is_active ? 'Deactivate' : 'Activate'} "${row.original.name}"?`,
                    )
                  ) {
                    toggleStatus(row.original.id)
                  }
                }}
              >
                {row.original.is_active ? (
                  <>
                    <EyeOff className="w-4 h-4 mr-2" /> Deactivate
                  </>
                ) : (
                  <>
                    <Eye className="w-4 h-4 mr-2" /> Activate
                  </>
                )}
              </DropdownMenuItem>
              <DropdownMenuItem
                className="text-destructive focus:text-destructive"
                onClick={() => {
                  if (confirm(`Delete "${row.original.name}"?`)) {
                    deleteUser(row.original.id)
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

