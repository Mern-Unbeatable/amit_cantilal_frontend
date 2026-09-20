import { createFileRoute } from '@tanstack/react-router'
import { format } from 'date-fns'
import { BadgeEuro, CalendarCheck, Clock, Users } from 'lucide-react'
import AppWrapper from '@/components/layouts/sidebar/app-wrapper.tsx'
import { StatisticsCard } from '@/components/dashboard/statistics-card.tsx'
import {
  BookingTrendsChart,
  ServiceBreakdownChart,
} from '@/components/dashboard/charts-section.tsx'
import { RecentBookingsCard } from '@/components/dashboard/recent-bookings.tsx'
import { useDashboardStats } from '@/features/dashboard/dashboard.hooks.ts'
import { useAuthStore } from '@/stores/user.ts'

export const Route = createFileRoute('/_authenticated/admin/dashboard')({
  component: RouteComponent,
})

const STAT_ICONS: Record<string, React.ReactNode> = {
  'Total Bookings': <CalendarCheck className="w-5 h-5" />,
  'Total Revenue': <BadgeEuro className="w-5 h-5" />,
  'Active Customers': <Users className="w-5 h-5" />,
  'Pending Bookings': <Clock className="w-5 h-5" />,
}

function getGreeting() {
  const h = new Date().getHours()
  if (h < 12) return 'morning'
  if (h < 17) return 'afternoon'
  return 'evening'
}

function RouteComponent() {
  const { data, isFetching } = useDashboardStats()
  const mainStatistics = data?.main_statistics ?? []
  const user = useAuthStore((state) => state.user)

  return (
    <AppWrapper>
      {/* Hero */}
      <div className="relative overflow-hidden rounded-sm bg-black border border-primary/15 p-7 flex items-center justify-between gap-6 flex-wrap mb-8">
        <div
          className="absolute -top-10 -right-10 size-56 rounded-full opacity-[0.15] blur-3xl pointer-events-none"
          style={{ background: '#C9A84C' }}
        />
        <div
          className="absolute inset-0 opacity-[0.03] pointer-events-none"
          style={{
            backgroundImage:
              'linear-gradient(#F5F0E8 1px, transparent 1px), linear-gradient(90deg, #F5F0E8 1px, transparent 1px)',
            backgroundSize: '32px 32px',
          }}
        />

        <div className="relative">
          <p className="text-[11px] uppercase tracking-[0.18em] text-primary font-medium mb-2">
            {format(new Date(), 'EEEE, do MMMM yyyy')}
          </p>
          <h1 className="font-serif text-2xl sm:text-3xl text-foreground">
            Good {getGreeting()}, {user?.name?.split(' ')[0] ?? 'Admin'}
          </h1>
        </div>

        <div className="relative hidden sm:flex items-center gap-2 rounded-full border border-primary/25 bg-primary/10 px-4 py-2 text-xs text-primary">
          <span className="size-1.5 rounded-full bg-primary animate-pulse" />
          Live
        </div>
      </div>

      {/* Main Statistics Section */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
        {isFetching
          ? Array.from({ length: 4 }).map((_, i) => (
              <div
                key={i}
                className="h-32 animate-pulse bg-muted/20 rounded-md"
              />
            ))
          : mainStatistics.map((stat) => (
              <StatisticsCard
                key={stat.id}
                title={stat.title}
                value={stat.value}
                change={stat.change}
                changeType={stat.change_type}
                description={stat.description}
                icon={STAT_ICONS[stat.title]}
              />
            ))}
      </div>

      {/* Charts Section */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
        <BookingTrendsChart />
        <ServiceBreakdownChart />
      </div>

      {/* Recent Bookings */}
      <RecentBookingsCard />
    </AppWrapper>
  )
}
