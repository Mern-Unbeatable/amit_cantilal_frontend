import { ArrowDown, ArrowUp } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { cn } from "@/lib/utils";

interface StatisticsCardProps {
  title: string;
  value: string | number;
  change: number;
  changeType: 'increase' | 'decrease';
  description?: string;
}

export function StatisticsCard({
  title,
  value,
  change,
  changeType,
  description,
}: StatisticsCardProps) {
  const isPositive = changeType === 'increase';

  return (
    <Card className="bg-linear-to-br dark:from-slate-900 dark:to-slate-800">
      <CardHeader className="pb-1">
        <CardTitle className="text-sm font-medium text-white-cream dark:text-gray-400">
          {title}
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-2">
          <div className="text-3xl font-bold text-gold dark:text-white">
            {value}
          </div>
          <div className="flex items-center gap-2">
            <div
              className={cn(
                "flex items-center gap-1 text-sm font-semibold",
                isPositive ? "text-green-600" : "text-red-600"
              )}
            >
              {isPositive ? (
                <ArrowUp className="h-4 w-4" />
              ) : (
                <ArrowDown className="h-4 w-4" />
              )}
              {change}%
            </div>
            {description && (
              <span className="text-xs text-gray-500 dark:text-gray-400">
                {description}
              </span>
            )}
          </div>
        </div>
      </CardContent>
    </Card>
  );
}

