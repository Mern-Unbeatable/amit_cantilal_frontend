import { createFileRoute } from '@tanstack/react-router'
import AppWrapper from "@/components/layouts/sidebar/app-wrapper.tsx";
import PageHeader from "@/components/page-header.tsx";

export const Route = createFileRoute('/_authenticated/admin/dashboard')({
  component: RouteComponent,
})

function RouteComponent() {
  return (
    <AppWrapper>
      <PageHeader
        pageTitle="Dashboard"
        pageSubtitle="Overview of Off We Go Portugal"
      />

    </AppWrapper>
  )
}
