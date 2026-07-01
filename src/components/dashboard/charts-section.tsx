import {
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
import { useDashboardChannels, useDashboardMonthly } from "@/features/dashboard/dashboard.hooks.ts";

const COLORS = ["#3b82f6", "#10b981", "#f59e0b", "#ef4444"];

export function BookingTrendsChart() {
  const { data: monthlyBookingData = [], isFetching } = useDashboardMonthly();

  return (
    <Card className="bg-linear-to-br dark:from-slate-900 dark:to-slate-800">
      <CardHeader>
        <CardTitle>Booking & Revenue Trends</CardTitle>
      </CardHeader>
      <CardContent>
        {isFetching ? (
          <div className="h-[300px] animate-pulse bg-muted/20 rounded-md" />
        ) : (
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
        )}
      </CardContent>
    </Card>
  );
}

export function ServiceBreakdownChart() {
  const { data: serviceStatistics = [], isFetching } = useDashboardChannels();

  return (
    <Card className="bg-linear-to-br  dark:from-slate-900 dark:to-slate-800">
      <CardHeader>
        <CardTitle>Service Breakdown</CardTitle>
      </CardHeader>
      <CardContent>
        {isFetching ? (
          <div className="h-32 animate-pulse bg-muted/20 rounded-md" />
        ) : serviceStatistics.length === 0 ? (
          <p className="text-sm text-muted-foreground">No confirmed bookings yet.</p>
        ) : (
          <div className="space-y-4">
            {serviceStatistics.map((service, index) => (
              <div key={service.name} className="flex items-center justify-between">
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
        )}
      </CardContent>
    </Card>
  );
}
