import { StrictMode } from 'react'
import ReactDOM from 'react-dom/client'
import { RouterProvider, createRouter } from '@tanstack/react-router'
// Supports weights 100-900
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
import '@fontsource-variable/inter';

import * as TanStackQueryProvider from './integrations/tanstack-query/root-provider.tsx'

// Import the generated route tree
import { routeTree } from './routeTree.gen'

import './styles.css'
import './i18n'
import reportWebVitals from './reportWebVitals.ts'
// eslint-disable-next-line import/order
import { Toaster } from 'sonner'
import {TooltipProvider} from "@/components/ui/tooltip.tsx";
import NotFound from '@/components/not-found.tsx'
import { DefaultCatchBoundary } from '@/components/default-catch-boundary.tsx'
import { initAnalytics, trackPageview } from '@/lib/analytics.ts'

// Create a new router instance

const TanStackQueryProviderContext = TanStackQueryProvider.getContext()
const router = createRouter({
  routeTree,
  context: {
    ...TanStackQueryProviderContext,
  },
  defaultPreload: 'intent',
  scrollRestoration: true,
  defaultStructuralSharing: true,
  defaultPreloadStaleTime: 0,
  defaultNotFoundComponent: () => <NotFound />,
  defaultErrorComponent: DefaultCatchBoundary,
})

initAnalytics()
// The very first load doesn't reliably fire 'onResolved' below — that event
// only emits on a captured pending→resolved transition (see TanStack
// Router's Transitioner), and a route with no loader (e.g. the homepage)
// can resolve on mount before any render captures it as pending. Track the
// initial pageview directly so it's never silently skipped.
trackPageview(window.location.pathname)
router.subscribe('onResolved', ({ toLocation, pathChanged, fromLocation }) => {
  // fromLocation is only undefined on the router's first-ever resolution
  // (whichever route that happens to be) — already covered by the direct
  // call above, so skip it here to avoid double-counting that one pageview.
  // Every subsequent event has a real fromLocation.
  if (!fromLocation) return
  if (pathChanged) trackPageview(toLocation.pathname)
})

// Register the router instance for type safety
declare module '@tanstack/react-router' {
  interface Register {
    router: typeof router
  }
}

// Render the app
const rootElement = document.getElementById('app')
if (rootElement && !rootElement.innerHTML) {
  const root = ReactDOM.createRoot(rootElement)
  root.render(
    <StrictMode>
      <TanStackQueryProvider.Provider {...TanStackQueryProviderContext}>
        <TooltipProvider>
        <Toaster richColors position='top-center' expand />
        <RouterProvider router={router} />
        </TooltipProvider>
      </TanStackQueryProvider.Provider>
    </StrictMode>
  )
}

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals()
