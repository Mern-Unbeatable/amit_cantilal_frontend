import { Link } from '@tanstack/react-router'
import { Icon } from '@iconify/react'
import { Button } from '@/components/ui/button'

const NotFound = ({ children }: { children?: any }) => {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-gray-50 dark:bg-zinc-950 px-4 text-center">
      <div className="flex size-20 items-center justify-center rounded-full bg-orange-50 dark:bg-orange-950/30 mb-6">
        <Icon
          icon="material-symbols:search-off"
          className="size-10 text-orange-500"
        />
      </div>

      <h1 className="text-6xl font-bold text-[#0E2A46] dark:text-white mb-2">
        404
      </h1>
      <h2 className="text-xl font-semibold text-gray-700 dark:text-gray-300 mb-3">
        Page not found
      </h2>
      <p className="text-sm text-gray-500 dark:text-gray-400 max-w-sm mb-8">
        {children || <p>The page you are looking for does not exist.</p>}
      </p>

      <Button asChild className="bg-orange-500 hover:bg-orange-600 text-white px-8">
        <Link to="/">Go back home</Link>
      </Button>
    </div>
  )
}

export default NotFound