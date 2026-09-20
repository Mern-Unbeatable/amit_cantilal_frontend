// src/routes/_authenticated/admin/users/$id/edit.tsx

import { createFileRoute, useNavigate } from '@tanstack/react-router'
import PageHeader from '@/components/page-header.tsx'
import AppWrapper from '@/components/layouts/sidebar/app-wrapper.tsx'
import { UserForm } from '@/features/users/user-form.tsx'
import { useAdminUser, useUpdateUser } from '@/features/users/user.hooks.ts'
import { Card, CardContent } from '@/components/ui/card'

export const Route = createFileRoute('/_authenticated/admin/users/$id/edit')({
  component: RouteComponent,
})

function RouteComponent() {
  const { id } = Route.useParams()
  const userId = parseInt(id, 10)
  const navigate = useNavigate()
  const { data: user, isLoading } = useAdminUser(userId)
  const { mutateAsync: updateUser, isPending } = useUpdateUser(userId)

  const handleSubmit = async (values: any) => {
    await updateUser({
      ...values,
      phone: values.phone || null,
      location: values.location || null,
    })
    navigate({ to: '/admin/users' })
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
      <PageHeader
        pageTitle="Edit User"
        pageSubtitle={user?.name ?? 'Loading...'}
      />
      <div className="p-4 md:p-6">
        <Card className="max-w-2xl mx-auto">
          <CardContent className="p-6">
            <UserForm
              defaultValues={user}
              onSubmit={handleSubmit}
              isSubmitting={isPending}
            />
          </CardContent>
        </Card>
      </div>
    </AppWrapper>
  )
}
