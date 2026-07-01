export interface StatisticCard {
  id: string
  title: string
  value: string | number
  change: number
  change_type: 'increase' | 'decrease'
  description?: string
}

export interface DashboardStats {
  main_statistics: Array<StatisticCard>
}

export interface MonthlyBooking {
  month: string
  bookings: number
  revenue: number
}

export interface ServiceStatistic {
  name: string
  count: number
  percentage: number
}
