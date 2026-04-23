import {
  ErrorComponent,
  Link,
  rootRouteId,
  useMatch,
  useRouter,
} from '@tanstack/react-router'
import type { ErrorComponentProps } from '@tanstack/react-router'
import { Icon } from '@iconify/react'
import { Button } from '@/components/ui/button'

export function DefaultCatchBoundary({ error }: ErrorComponentProps) {
  const router = useRouter()
  const isRoot = useMatch({
    strict: false,
    select: (state) => state.id === rootRouteId,
  })

  console.error(error)

  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-gray-50 dark:bg-zinc-950 px-4 text-center">
      <div className="flex size-20 items-center justify-center rounded-full bg-red-50 dark:bg-red-950/30 mb-6">
        <Icon
          icon="material-symbols:error-outline"
          className="size-10 text-red-500"
        />
      </div>

      <h1 className="text-2xl font-bold text-[#0E2A46] dark:text-white mb-2">
        Something went wrong
      </h1>
      <p className="text-sm text-gray-500 dark:text-gray-400 max-w-sm mb-4">
        An unexpected error occurred. You can try again or go back.
      </p>

      <div className="mb-8 w-full max-w-sm rounded-xl border border-red-200 dark:border-red-900/40 bg-red-50 dark:bg-red-950/30 px-4 py-3 text-left">
        <ErrorComponent error={error} />
      </div>

      <div className="flex items-center gap-3">
        <Button
          variant="outline"
          onClick={() => router.invalidate()}
        >
          <Icon icon="material-symbols:refresh" className="mr-2 size-4" />
          Try again
        </Button>

        {isRoot ? (
          <Button
            asChild
            className="bg-orange-500 hover:bg-orange-600 text-white"
          >
            <Link to="/">
              <Icon icon="material-symbols:home" className="mr-2 size-4" />
              Home
            </Link>
          </Button>
        ) : (
          <Button
            asChild
            className="bg-orange-500 hover:bg-orange-600 text-white"
          >
            <Link
              to="/"
              onClick={(e) => {
                e.preventDefault()
                window.history.back()
              }}
            >
              <Icon icon="material-symbols:arrow-back" className="mr-2 size-4" />
              Go back
            </Link>
          </Button>
        )}
      </div>
    </div>
  )
}