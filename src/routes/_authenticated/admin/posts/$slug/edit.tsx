import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/_authenticated/admin/posts/$slug/edit')({
  component: RouteComponent,
})

function RouteComponent() {
  return <div>Hello "/_authenticated/admin/posts/$slug/edit"!</div>
}
