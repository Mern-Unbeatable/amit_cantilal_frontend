import { Progress } from '@/components/ui/progress'
import { Card, CardContent } from '@/components/ui/card'
import { cn } from '@/lib/utils'

type EnrollmentProgressProps = {
  planName?: string
  sessionsTotal?: number
  sessionsUsed?: number
  enrolledAt?: string
  className?: string
}

const EnrollmentProgress = ({
                              planName,
                              sessionsTotal,
                              sessionsUsed,
                              enrolledAt,
                              className,
                            }: EnrollmentProgressProps) => {
  const percentage =
    sessionsTotal && sessionsUsed !== undefined
      ? Math.round((sessionsUsed / sessionsTotal) * 100)
      : 0

  const isLoading = sessionsTotal === undefined || sessionsUsed === undefined

  return (
    <Card className={cn('rounded-md drop-shadow', className)}>
      <CardContent className="px-5 py-4 space-y-3">

        {/* Header */}
        <div className="flex items-center justify-between gap-4">
          <div className="min-w-0">
            <p className="text-sm font-medium text-foreground truncate">
              {planName ?? '—'}
            </p>
            {enrolledAt && (
              <p className="text-xs text-muted-foreground mt-0.5">
                Started {enrolledAt}
              </p>
            )}
          </div>
          <span className="text-sm font-semibold text-orange-500 shrink-0">
            {isLoading ? '—' : `${percentage}% complete`}
          </span>
        </div>

        {/* Progress bar */}
        <Progress
          value={isLoading ? 0 : percentage}
          className="h-2.5 bg-muted [&>div]:bg-orange-500"
        />

        {/* Footer labels */}
        <div className="flex items-center justify-between">
          <span className="text-xs text-muted-foreground">
            {isLoading ? '—' : `${sessionsUsed} of ${sessionsTotal} sessions done`}
          </span>
          <span className="text-xs text-muted-foreground">
            {isLoading ? '—' : `${sessionsTotal! - sessionsUsed!} remaining`}
          </span>
        </div>

      </CardContent>
    </Card>
  )
}

export default EnrollmentProgress