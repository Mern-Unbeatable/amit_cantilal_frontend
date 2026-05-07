import { createFileRoute } from '@tanstack/react-router'
import AppWrapper from '@/components/layouts/sidebar/app-wrapper.tsx'
import PageHeader from '@/components/page-header.tsx'

export const Route = createFileRoute('/_authenticated/admin/faqs')({
  component: RouteComponent,
})

function RouteComponent() {
  return (
    <AppWrapper>
      <PageHeader pageTitle="FAQs" pageSubtitle="Manage frequently asked questions" />
    </AppWrapper>
  )
}