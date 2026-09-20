import {
  HeadContent,
  Outlet,
  createRootRouteWithContext,
} from '@tanstack/react-router'
import { TanStackRouterDevtoolsPanel } from '@tanstack/react-router-devtools'
import { TanStackDevtools } from '@tanstack/react-devtools'

import TanStackQueryDevtools from '../integrations/tanstack-query/devtools'
import type { QueryClient } from '@tanstack/react-query'
import { pageHead } from '@/lib/seo.ts'


interface MyRouterContext {
  queryClient: QueryClient
}

export const Route = createRootRouteWithContext<MyRouterContext>()({
  head: () =>
    pageHead({
      title: 'Luxury Chauffeur Service Portugal',
      description:
        'Premium chauffeur service & airport transfers in Lisbon, Porto & Algarve. Private tours, Mercedes-Benz electric fleet, 24/7.',
      path: '/',
    }),
  component: () => (
    <>
      <HeadContent />
      <Outlet />
      {import.meta.env.DEV && (
        <TanStackDevtools
          config={{ position: 'bottom-right' }}
          plugins={[
            {
              name: 'TanStack Router',
              render: <TanStackRouterDevtoolsPanel />,
            },
            TanStackQueryDevtools,
          ]}
        />
      )}
    </>
  ),
})
