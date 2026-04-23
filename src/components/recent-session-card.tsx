import { Link } from '@tanstack/react-router'
import { Icon } from '@iconify/react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { cn } from '@/lib/utils'

type RecentSession = {
  id: number
  topic: string
  date: string
}

type RecentSessionsCardProps = {
  sessions?: RecentSession[]
  className?: string
}

const RecentSessionsCard = ({ sessions, className }: RecentSessionsCardProps) => {
  const isLoading = sessions === undefined

  return (
    <Card className={cn('rounded-md drop-shadow', className)}>
      <CardHeader className="px-5 pt-4 pb-0">
        <div className="flex items-center justify-between">
          <CardTitle className="text-sm font-medium text-foreground">
            Recent sessions
          </CardTitle>
          <Link
            to="/student/sessions"
            className="text-xs text-orange-500 hover:text-orange-600 transition-colors"
          >
            View all
          </Link>
        </div>
      </CardHeader>
      <CardContent className="px-5 py-4">
        {isLoading ? (
          <div className="space-y-3 animate-pulse">
            {[1, 2, 3].map((i) => (
              <div key={i} className="flex items-center gap-3">
                <div className="size-2 rounded-full bg-muted shrink-0" />
                <div className="h-3 flex-1 rounded bg-muted" />
                <div className="h-3 w-10 rounded bg-muted" />
              </div>
            ))}
          </div>
        ) : sessions && sessions.length > 0 ? (
          <div className="space-y-0">
            {sessions.map((session, i) => (
              <div
                key={session.id}
                className={cn(
                  'flex items-center gap-3 py-3',
                  i < sessions.length - 1
                    ? 'border-b border-border/50'
                    : '',
                )}
              >
                <div className="size-2 rounded-full bg-orange-500 shrink-0" />
                <span className="flex-1 truncate text-sm text-foreground">
                  {session.topic}
                </span>
                <span className="shrink-0 text-xs text-muted-foreground">
                  {session.date}
                </span>
              </div>
            ))}
          </div>
        ) : (
          /* Empty state */
          <div className="flex flex-col items-center justify-center py-4 text-center">
            <div className="flex size-10 items-center justify-center rounded-full bg-muted">
              <Icon
                icon="material-symbols:notes"
                className="size-5 text-muted-foreground"
              />
            </div>
            <p className="mt-2 text-sm text-muted-foreground">
              No sessions yet
            </p>
          </div>
        )}
      </CardContent>
    </Card>
  )
}

export default RecentSessionsCard