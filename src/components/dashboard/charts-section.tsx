import {
  CartesianGrid,
  Cell,
  Legend,
  Line,
  LineChart,
  Pie,
  PieChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import { Card } from "@/components/ui/card";
import { useDashboardChannels, useDashboardMonthly } from "@/features/dashboard/dashboard.hooks.ts";

const SERVICE_COLORS = ["#C9A84C", "#E2C97E", "#9A9182", "#8B6914"];

function SectionHeading({ title }: { title: string }) {
  return (
    <p className="text-[11px] uppercase tracking-wider text-primary font-medium mb-5">
      {title}
    </p>
  );
}

export function BookingTrendsChart() {
  const { data: monthlyBookingData = [], isFetching } = useDashboardMonthly();

  return (
    <Card className="p-6">
      <SectionHeading title="Booking & Revenue Trends" />
      {isFetching ? (
        <div className="h-[300px] animate-pulse bg-muted/20 rounded-md" />
      ) : (
        <ResponsiveContainer width="100%" height={300}>
          <LineChart data={monthlyBookingData}>
            <CartesianGrid strokeDasharray="3 3" stroke="rgba(201,168,76,0.12)" />
            <XAxis dataKey="month" stroke="#9A9182" fontSize={12} />
            <YAxis stroke="#9A9182" fontSize={12} />
            <Tooltip
              contentStyle={{
                backgroundColor: "#141414",
                border: "1px solid rgba(201,168,76,0.25)",
                borderRadius: "4px",
                color: "#F5F0E8",
              }}
            />
            <Legend wrapperStyle={{ fontSize: 12, color: "#9A9182" }} />
            <Line
              type="monotone"
              dataKey="bookings"
              stroke="#C9A84C"
              strokeWidth={2}
              dot={{ fill: "#C9A84C", r: 4 }}
              activeDot={{ r: 6 }}
            />
            <Line
              type="monotone"
              dataKey="revenue"
              stroke="#F5F0E8"
              strokeWidth={2}
              dot={{ fill: "#F5F0E8", r: 4 }}
              activeDot={{ r: 6 }}
            />
          </LineChart>
        </ResponsiveContainer>
      )}
    </Card>
  );
}

export function ServiceBreakdownChart() {
  const { data: serviceStatistics = [], isFetching } = useDashboardChannels();
  const total = serviceStatistics.reduce((sum, s) => sum + s.count, 0);

  return (
    <Card className="p-6">
      <SectionHeading title="Service Breakdown" />
      {isFetching ? (
        <div className="h-32 animate-pulse bg-muted/20 rounded-md" />
      ) : serviceStatistics.length === 0 ? (
        <p className="text-sm text-muted-foreground">No confirmed bookings yet.</p>
      ) : (
        <div className="flex flex-col sm:flex-row items-center gap-6">
          <div className="relative w-full sm:w-44 h-44 flex-shrink-0">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={serviceStatistics}
                  dataKey="count"
                  nameKey="name"
                  innerRadius="65%"
                  outerRadius="100%"
                  paddingAngle={2}
                  stroke="none"
                >
                  {serviceStatistics.map((service, index) => (
                    <Cell key={service.name} fill={SERVICE_COLORS[index % SERVICE_COLORS.length]} />
                  ))}
                </Pie>
                <Tooltip
                  contentStyle={{
                    backgroundColor: "#141414",
                    border: "1px solid rgba(201,168,76,0.25)",
                    borderRadius: "4px",
                    color: "#F5F0E8",
                  }}
                />
              </PieChart>
            </ResponsiveContainer>
            <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none">
              <span className="font-serif text-2xl text-foreground">{total}</span>
              <span className="text-[10px] uppercase tracking-wider text-muted-foreground">Bookings</span>
            </div>
          </div>

          <div className="w-full space-y-3">
            {serviceStatistics.map((service, index) => (
              <div key={service.name} className="flex items-center justify-between">
                <div className="flex items-center gap-2.5">
                  <div
                    className="w-2.5 h-2.5 rounded-full flex-shrink-0"
                    style={{ backgroundColor: SERVICE_COLORS[index % SERVICE_COLORS.length] }}
                  />
                  <span className="text-sm font-medium text-foreground">
                    {service.name}
                  </span>
                </div>
                <div className="text-right">
                  <span className="text-sm font-semibold text-foreground">{service.count}</span>
                  <span className="text-xs text-muted-foreground ml-2">{service.percentage}%</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </Card>
  );
}
