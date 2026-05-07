import { createFileRoute } from '@tanstack/react-router'
import AppWrapper from "@/components/layouts/sidebar/app-wrapper.tsx";
import PageHeader from "@/components/page-header.tsx";
import { StatisticsCard } from "@/components/dashboard/statistics-card.tsx";
import {
  BookingTrendsChart,
  FleetUtilizationChart,
  ServiceBreakdownChart,
  TopDestinationsChart,
} from "@/components/dashboard/charts-section.tsx";
import { mainStatistics } from "@/data/statistics";

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

      {/* Main Statistics Section */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
        {mainStatistics.map((stat) => (
          <StatisticsCard
            key={stat.id}
            title={stat.title}
            value={stat.value}
            change={stat.change}
            changeType={stat.changeType}
            description={stat.description}
          />
        ))}
      </div>

      {/* Charts Section */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
        <BookingTrendsChart />
        <ServiceBreakdownChart />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <FleetUtilizationChart />
        <TopDestinationsChart />
      </div>
    </AppWrapper>
  )
}
