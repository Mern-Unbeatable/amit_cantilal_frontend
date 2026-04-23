import { Link } from '@tanstack/react-router'
import { Icon } from '@iconify/react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { cn } from '@/lib/utils'

type NextSessionCardProps = {
  topic?: string
  day?: string
  month?: string
  datetime?: string
  status?: 'confirmed' | 'pending'
  className?: string
}

const NextSessionCard = ({
  topic,
  day,
  month,
  datetime,
  status,
  className,
}: NextSessionCardProps) => {
  const isLoading = topic === undefined

  return (
    <Card className={cn('rounded-md drop-shadow', className)}>
      <CardHeader className="px-5 pt-4 pb-0">
        <CardTitle className="text-sm font-medium text-foreground">
          Next session
        </CardTitle>
      </CardHeader>
      <CardContent className="px-5 py-4">
        {isLoading ? (
          <div className="flex items-center gap-3 animate-pulse">
            <div className="size-14 rounded-xl bg-muted shrink-0" />
            <div className="space-y-2 flex-1">
              <div className="h-3.5 w-2/3 rounded bg-muted" />
              <div className="h-3 w-1/2 rounded bg-muted" />
            </div>
          </div>
        ) : topic ? (
          <div className="flex items-start gap-4">
            {/* Date badge */}
            <div className="flex shrink-0 flex-col items-center justify-center rounded-xl border border-orange-200 bg-orange-50 px-3.5 py-2.5 text-center dark:border-orange-900/40 dark:bg-orange-950/30">
              <span className="text-2xl font-semibold leading-none text-orange-500">
                {day}
              </span>
              <span className="mt-1 text-[10px] font-semibold uppercase tracking-widest text-orange-400">
                {month}
              </span>
            </div>

            {/* Info */}
            <div className="min-w-0 flex-1">
              <p className="truncate text-sm font-medium text-foreground">
                {topic}
              </p>
              <p className="mt-1 text-xs text-muted-foreground">{datetime}</p>
              {status && (
                <Badge
                  variant="outline"
                  className={cn(
                    'mt-2 text-[11px] font-medium',
                    status === 'confirmed'
                      ? 'border-green-200 bg-green-50 text-green-700 dark:border-green-900/40 dark:bg-green-950/30 dark:text-green-400'
                      : 'border-amber-200 bg-amber-50 text-amber-700 dark:border-amber-900/40 dark:bg-amber-950/30 dark:text-amber-400',
                  )}
                >
                  <Icon
                    icon={
                      status === 'confirmed'
                        ? 'material-symbols:check-circle'
                        : 'material-symbols:schedule'
                    }
                    className="mr-1 size-3"
                  />
                  {status === 'confirmed' ? 'Confirmed' : 'Pending'}
                </Badge>
              )}
            </div>
          </div>
        ) : (
          /* Empty state */
          <div className="flex flex-col items-center justify-center py-4 text-center">
            <div className="flex size-10 items-center justify-center rounded-full bg-muted">
              <Icon
                icon="material-symbols:calendar-month"
                className="size-5 text-muted-foreground"
              />
            </div>
            <p className="mt-2 text-sm text-muted-foreground">
              No upcoming session
            </p>
            <Button
              asChild
              variant="outline"
              size="sm"
              className="mt-3 text-xs"
            >
              <Link to="/">Book now</Link>
            </Button>
          </div>
        )}
      </CardContent>
    </Card>
  )
}

export default NextSessionCard
