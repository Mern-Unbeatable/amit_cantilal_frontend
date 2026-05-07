export interface StatisticCard {
  id: string;
  title: string;
  value: string | number;
  change: number;
  changeType: 'increase' | 'decrease';
  description?: string;
  icon?: string;
}

export interface MonthlyBooking {
  month: string;
  bookings: number;
  revenue: number;
}

export interface ServiceStatistic {
  name: string;
  count: number;
  percentage: number;
}

// Key Statistics for the dashboard
export const mainStatistics: StatisticCard[] = [
  {
    id: 'total_bookings',
    title: 'Total Bookings',
    value: 2847,
    change: 12.5,
    changeType: 'increase',
    description: 'Last 30 days',
  },
  {
    id: 'total_revenue',
    title: 'Total Revenue',
    value: '€128,450',
    change: 18.2,
    changeType: 'increase',
    description: 'Last 30 days',
  },
  {
    id: 'average_rating',
    title: 'Average Rating',
    value: '4.9/5',
    change: 2.1,
    changeType: 'increase',
    description: 'From 542 reviews',
  },
  {
    id: 'active_customers',
    title: 'Active Customers',
    value: 1234,
    change: 8.3,
    changeType: 'increase',
    description: 'This month',
  },
];

// Monthly booking trends
export const monthlyBookingData: MonthlyBooking[] = [
  { month: 'Jan', bookings: 240, revenue: 9200 },
  { month: 'Feb', bookings: 321, revenue: 12100 },
  { month: 'Mar', bookings: 289, revenue: 11300 },
  { month: 'Apr', bookings: 345, revenue: 13200 },
  { month: 'May', bookings: 412, revenue: 15800 },
  { month: 'Jun', bookings: 389, revenue: 14700 },
  { month: 'Jul', bookings: 456, revenue: 17200 },
  { month: 'Aug', bookings: 478, revenue: 18100 },
  { month: 'Sep', bookings: 398, revenue: 15200 },
  { month: 'Oct', bookings: 467, revenue: 17800 },
  { month: 'Nov', bookings: 512, revenue: 19400 },
  { month: 'Dec', bookings: 564, revenue: 21300 },
];

// Service breakdown
export const serviceStatistics: ServiceStatistic[] = [
  { name: 'Airport Transfers', count: 1123, percentage: 39.5 },
  { name: 'Private Tours', count: 987, percentage: 34.7 },
  { name: 'Chauffeur Service', count: 737, percentage: 25.8 },
];

// Fleet utilization
export const fleetUtilization = [
  { vehicle: 'Mercedes-Benz E-Class', utilization: 87, bookings: 1245 },
  { vehicle: 'Mercedes-Benz S-Class', utilization: 92, bookings: 1456 },
  { vehicle: 'Mercedes-Benz V-Class', utilization: 78, bookings: 896 },
  { vehicle: 'Mercedes-Benz Sprinter', utilization: 65, bookings: 567 },
];

// Top destinations
export const topDestinations = [
  { city: 'Lisbon', trips: 892, percentage: 31.4 },
  { city: 'Porto', trips: 456, percentage: 16 },
  { city: 'Sintra', trips: 389, percentage: 13.7 },
  { city: 'Cascais', trips: 312, percentage: 11 },
  { city: 'Faro', trips: 234, percentage: 8.2 },
  { city: 'Others', trips: 564, percentage: 19.8 },
];

