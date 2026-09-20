import { ArrowDown, ArrowUp } from 'lucide-react'
import type { ReactNode } from 'react'
import { Card } from '@/components/ui/card'
import { cn } from '@/lib/utils'

interface StatisticsCardProps {
  title: string
  value: string | number
  change: number
  changeType: 'increase' | 'decrease'
  description?: string
  icon?: ReactNode
}

export function StatisticsCard({
  title,
  value,
  change,
  changeType,
  description,
  icon,
}: StatisticsCardProps) {
  const isPositive = changeType === 'increase'

  return (
    <Card className="p-5 gap-3">
      <div className="flex items-center gap-3">
        {icon && (
          <div className="w-11 h-11 rounded-full bg-primary/10 border border-primary/25 text-primary flex items-center justify-center flex-shrink-0">
            {icon}
          </div>
        )}
        <p className="text-[11px] uppercase tracking-wider text-muted-foreground font-medium">
          {title}
        </p>
      </div>
      <div className="space-y-1.5">
        <div className="font-serif text-3xl text-foreground">{value}</div>
        <div className="flex items-center gap-2">
          <div
            className={cn(
              'flex items-center gap-1 text-xs font-semibold',
              isPositive ? 'text-primary' : 'text-destructive',
            )}
          >
            {isPositive ? (
              <ArrowUp className="h-3.5 w-3.5" />
            ) : (
              <ArrowDown className="h-3.5 w-3.5" />
            )}
            {change}%
          </div>
          {description && (
            <span className="text-xs text-muted-foreground">{description}</span>
          )}
        </div>
      </div>
    </Card>
  )
}
