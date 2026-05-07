import {
  Bar,
  BarChart,
  CartesianGrid,
  Legend,
  Line,
  LineChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  fleetUtilization,
  monthlyBookingData,
  serviceStatistics,
  topDestinations,
} from "@/data/statistics";

const COLORS = ["#3b82f6", "#10b981", "#f59e0b", "#ef4444"];

export function BookingTrendsChart() {
  return (
    <Card className="bg-linear-to-br dark:from-slate-900 dark:to-slate-800">
      <CardHeader>
        <CardTitle>Booking & Revenue Trends</CardTitle>
      </CardHeader>
      <CardContent>
        <ResponsiveContainer width="100%" height={300}>
          <LineChart data={monthlyBookingData}>
            <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
            <XAxis dataKey="month" stroke="#9ca3af" />
            <YAxis stroke="#9ca3af" />
            <Tooltip
              contentStyle={{
                backgroundColor: "#1f2937",
                border: "1px solid #4b5563",
                borderRadius: "8px",
                color: "#fff",
              }}
            />
            <Legend />
            <Line
              type="monotone"
              dataKey="bookings"
              stroke="#3b82f6"
              strokeWidth={2}
              dot={{ fill: "#3b82f6", r: 4 }}
              activeDot={{ r: 6 }}
            />
            <Line
              type="monotone"
              dataKey="revenue"
              stroke="#10b981"
              strokeWidth={2}
              dot={{ fill: "#10b981", r: 4 }}
              activeDot={{ r: 6 }}
            />
          </LineChart>
        </ResponsiveContainer>
      </CardContent>
    </Card>
  );
}

export function ServiceBreakdownChart() {
  return (
    <Card className="bg-linear-to-br  dark:from-slate-900 dark:to-slate-800">
      <CardHeader>
        <CardTitle>Service Breakdown</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {serviceStatistics.map((service, index) => (
            <div key={index} className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div
                  className="w-3 h-3 rounded-full"
                  style={{ backgroundColor: COLORS[index % COLORS.length] }}
                />
                <span className="text-sm font-medium text-gray-700 dark:text-gray-300">
                  {service.name}
                </span>
              </div>
              <div className="flex items-center gap-4">
                <div className="text-right">
                  <div className="text-sm font-semibold text-gray-900 dark:text-white">
                    {service.count}
                  </div>
                  <div className="text-xs text-gray-500 dark:text-gray-400">
                    {service.percentage}%
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}

export function FleetUtilizationChart() {
  return (
    <Card className="bg-linear-to-br  dark:from-slate-900 dark:to-slate-800">
      <CardHeader>
        <CardTitle>Fleet Utilization</CardTitle>
      </CardHeader>
      <CardContent>
        <ResponsiveContainer width="100%" height={300}>
          <BarChart data={fleetUtilization}>
            <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
            <XAxis dataKey="vehicle" stroke="#9ca3af" />
            <YAxis stroke="#9ca3af" />
            <Tooltip
              contentStyle={{
                backgroundColor: "#1f2937",
                border: "1px solid #4b5563",
                borderRadius: "8px",
                color: "#fff",
              }}
            />
            <Legend />
            <Bar dataKey="utilization" fill="#3b82f6" name="Utilization %" />
            <Bar dataKey="bookings" fill="#10b981" name="Total Bookings" />
          </BarChart>
        </ResponsiveContainer>
      </CardContent>
    </Card>
  );
}

export function TopDestinationsChart() {
  return (
    <Card className="bg-linear-to-br dark:from-slate-900 dark:to-slate-800">
      <CardHeader>
        <CardTitle>Top Destinations</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-3">
          {topDestinations.map((destination, index) => (
            <div key={index} className="flex items-center justify-between">
              <div className="flex-1">
                <div className="flex items-center justify-between mb-1">
                  <span className="text-sm font-medium text-gold dark:text-gray-300">
                    {destination.city}
                  </span>
                  <span className="text-sm font-semibold text-gold-dim dark:text-white">
                    {destination.trips} trips
                  </span>
                </div>
                <div className="w-full text-gold dark:bg-gray-700 rounded-full h-2">
                  <div
                    className="bg-blue-500 h-2 rounded-full"
                    style={{ width: `${destination.percentage}%` }}
                  />
                </div>
              </div>
              <span className="text-xs text-gray-500 dark:text-gray-400 ml-3">
                {destination.percentage}%
              </span>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}

