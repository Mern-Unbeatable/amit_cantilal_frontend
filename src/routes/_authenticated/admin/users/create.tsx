import { createFileRoute, useNavigate } from '@tanstack/react-router'
import PageHeader from '@/components/page-header.tsx'
import AppWrapper from '@/components/layouts/sidebar/app-wrapper.tsx'
import { UserForm } from '@/features/users/user-form.tsx'
import { useCreateUser } from '@/features/users/user.hooks.ts'
import { Card, CardContent } from '@/components/ui/card'

export const Route = createFileRoute('/_authenticated/admin/users/create')({
  component: RouteComponent,
})

function RouteComponent() {
  const navigate = useNavigate()
  const { mutateAsync: createUser, isPending } = useCreateUser()

  const handleSubmit = async (values: any) => {
    await createUser({
      ...values,
      phone: values.phone || null,
      location: values.location || null,
    })
    navigate({ to: '/admin/users' })
  }

  return (
    <AppWrapper>
      <PageHeader pageTitle="New User" pageSubtitle="Add a new user to the system" />
      <div className="p-4 md:p-6">
        <Card className="max-w-2xl mx-auto">
          <CardContent className="p-6">
            <UserForm onSubmit={handleSubmit} isSubmitting={isPending} />
          </CardContent>
        </Card>
      </div>
    </AppWrapper>
  )
}

