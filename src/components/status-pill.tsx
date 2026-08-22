import { cn } from '@/lib/utils.ts'

const pillClasses: Record<string, string> = {
  confirmed: 'bg-primary/15 text-primary border-primary/40',
  succeeded: 'bg-primary/15 text-primary border-primary/40',
  pending: 'bg-muted-foreground/10 text-muted-foreground border-muted-foreground/30',
  processing: 'bg-muted-foreground/10 text-muted-foreground border-muted-foreground/30',
  created: 'bg-muted-foreground/10 text-muted-foreground border-muted-foreground/30',
  cancelled: 'bg-destructive/10 text-destructive border-destructive/30',
  failed: 'bg-destructive/10 text-destructive border-destructive/30',
}

export function StatusPill({ status }: { status: string }) {
  return (
    <span
      className={cn(
        'inline-flex items-center gap-1.5 rounded-full border px-3.5 py-1 text-[11px] font-semibold uppercase tracking-wider',
        pillClasses[status] ?? pillClasses.pending,
      )}
    >
      {status}
    </span>
  )
}
