import { Outlet, useMatch, useMatches } from '@tanstack/react-router'
import { AnimatePresence } from 'framer-motion'
import { Separator } from '@/components/ui/separator'
import {
  SidebarInset,
  SidebarProvider,
  SidebarTrigger,
} from '@/components/ui/sidebar'
import ThemeSwitcher from '@/components/shadcn-studio/blocks/theme-switcher.tsx'
import AccountSwitcher from '@/components/layouts/sidebar/account-switcher.tsx'
import { cn } from '@/lib/utils.ts'
import AppSidebar from '@/components/layouts/sidebar/app-sidebar.tsx'

const MainLayout = () => {
  const matches = useMatches()
  const match = useMatch({ strict: false })
  const nextMatchIndex = matches.findIndex((d) => d.id === match.id) + 1
  const nextMatch = matches[nextMatchIndex]

  return (
    <SidebarProvider defaultOpen>
      <AppSidebar variant="sidebar" collapsible="offcanvas" />
      <SidebarInset
        data-content-layout="centered"
        className={cn(
          'data-[content-layout=centered]:!mx-auto data-[content-layout=centered]:max-w-screen-2xl',
          'max-[113rem]:peer-data-[variant=inset]:!mr-2 min-[101rem]:peer-data-[variant=inset]:peer-data-[state=collapsed]:!mr-auto',
        )}
      >
        <header
          className={cn(
            'flex h-12 shrink-0 items-center gap-2 border-b transition-[width,height] ease-linear group-has-data-[collapsible=icon]/sidebar-wrapper:h-12',
            'data-[navbar-style=sticky]:bg-background/50 data-[navbar-style=sticky]:sticky data-[navbar-style=sticky]:top-0 data-[navbar-style=sticky]:z-50 data-[navbar-style=sticky]:overflow-hidden data-[navbar-style=sticky]:rounded-t-[inherit] data-[navbar-style=sticky]:backdrop-blur-md',
          )}
        >
          <div className="flex w-full items-center justify-between px-4 lg:px-6">
            <div className="flex items-center gap-2 lg:gap-4">
              <SidebarTrigger className="-ml-1" />
              <Separator
                orientation="vertical"
                className="mx-2 data-[orientation=vertical]:h-4"
              />
            </div>
            <div className="flex items-center gap-2">
              <ThemeSwitcher />
              <AccountSwitcher />
            </div>
          </div>
        </header>

        <div className="h-full p-4 md:p-4">
          <AnimatePresence mode="wait">
            <Outlet key={nextMatch.id} />
          </AnimatePresence>
        </div>
      </SidebarInset>
    </SidebarProvider>
  )
}

export default MainLayout
