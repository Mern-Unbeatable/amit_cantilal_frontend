import type { ReactNode } from 'react'
import { Card, CardContent } from '@/components/ui/card'
import { cn } from '@/lib/utils'
import { Spinner } from '@/components/ui/spinner.tsx'

type StatisticsCardProps = {
  icon: ReactNode
  value?: string | number
  title: string
  className?: string
  iconClassName?: string
  sub?: string
}

const StatisticsCard = ({
  icon,
  value,
  title,
  className,
  iconClassName,
  sub,
}: StatisticsCardProps) => {
  return (
    <Card className={cn('rounded-md h-[88px] py-2 justify-center', className)}>
      <CardContent className="flex items-center gap-3 px-2">
        {/* Icon */}
        <div
          className={cn(
            'text-primary flex rounded-full size-14 shrink-0 items-center justify-center',
            iconClassName,
          )}
        >
          {icon}
        </div>

        {/* Content */}
        <div className="flex flex-col gap-1 min-w-0">
          {value === undefined ? (
            <Spinner />
          ) : (
            <span className="text-xl font-semibold text-foreground leading-none truncate">
              {value}
            </span>
          )}
          <span className="text-sm text-muted-foreground truncate">
            {title}
          </span>
          {sub && (
            <span className="text-xs text-muted-foreground/60 truncate">
              {sub}
            </span>
          )}
        </div>
      </CardContent>
    </Card>
  )
}

export default StatisticsCard
