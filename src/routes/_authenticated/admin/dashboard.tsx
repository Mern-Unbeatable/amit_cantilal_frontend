import { createFileRoute } from '@tanstack/react-router'
import AppWrapper from "@/components/layouts/sidebar/app-wrapper.tsx";
import PageHeader from "@/components/page-header.tsx";
import { StatisticsCard } from "@/components/dashboard/statistics-card.tsx";
import {
  BookingTrendsChart,
  ServiceBreakdownChart,
} from "@/components/dashboard/charts-section.tsx";
import { useDashboardStats } from "@/features/dashboard/dashboard.hooks.ts";

export const Route = createFileRoute('/_authenticated/admin/dashboard')({
  component: RouteComponent,
})

function RouteComponent() {
  const { data, isFetching } = useDashboardStats()
  const mainStatistics = data?.main_statistics ?? []

  return (
    <AppWrapper>
      <PageHeader
        pageTitle="Dashboard"
        pageSubtitle="Overview of Off We Go Portugal"
      />

      {/* Main Statistics Section */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
        {isFetching
          ? Array.from({ length: 4 }).map((_, i) => (
              <div key={i} className="h-32 animate-pulse bg-muted/20 rounded-md" />
            ))
          : mainStatistics.map((stat) => (
              <StatisticsCard
                key={stat.id}
                title={stat.title}
                value={stat.value}
                change={stat.change}
                changeType={stat.change_type}
                description={stat.description}
              />
            ))}
      </div>

      {/* Charts Section */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <BookingTrendsChart />
        <ServiceBreakdownChart />
      </div>
    </AppWrapper>
  )
}
