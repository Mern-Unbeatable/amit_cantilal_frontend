import React from 'react'
import { Link, useLocation } from '@tanstack/react-router'
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from '@/components/ui/breadcrumb.tsx'

interface PageHeaderProps {
  pageTitle: string
  pageSubtitle?: string
}

const PageHeader = ({ pageTitle, pageSubtitle }: PageHeaderProps) => {
  // 1. Get the current path string (e.g., "/dashboard/settings")
  const pathname = useLocation({
    select: (location) => location.pathname,
  })

  // 2. Split path into an array and filter out empty strings (caused by leading '/')
  const allSegments = pathname.split('/').filter(Boolean)
  // Segments actually shown as crumbs — "admin"/"student" are part of every
  // URL here but shouldn't get their own crumb. Kept separate from
  // allSegments so link paths below can still include them.
  const pathSegments = allSegments.filter((segment) => segment !== 'admin' && segment !== 'student')

  return (
    <div className="flex justify-between items-center">
      <div className="flex flex-col gap-1">
        <h3 className="page__title font-medium text-sm sm:text-xl text-primary dark:text-foreground">
          {pageTitle}
        </h3>
        {pageSubtitle && <p className="text-muted-foreground text-xs">{pageSubtitle}</p>}
      </div>

      <Breadcrumb className="hidden sm:block">
        <BreadcrumbList className="sm:gap-1">
          {/* Always render Home first */}
          <BreadcrumbItem>
            <BreadcrumbLink
              className="font-medium uppercase text-xs text-muted-foreground dark:text-muted-foreground"
              asChild
            >
              <Link to="/admin/dashboard">Home</Link>
            </BreadcrumbLink>
          </BreadcrumbItem>

          {/* Only render separator if we have deep routes */}
          {pathSegments.length > 0 && <BreadcrumbSeparator />}

          {allSegments.map((segment, index) => {
            // Skip rendering a crumb for the role segment, but keep it in the
            // reconstructed path below — dropping it from allSegments itself
            // (as the old code did) silently broke every breadcrumb link by
            // stripping "/admin" out of the URL it points to.
            if (segment === 'admin' || segment === 'student') return null

            // Reconstruct the full path for this segment (e.g., /admin/dashboard/settings)
            const segmentPath = `/${allSegments.slice(0, index + 1).join('/')}`
            const isLast = index === allSegments.length - 1

            // Capitalize first letter
            const title = segment.charAt(0).toUpperCase() + segment.slice(1)

            return (
              <React.Fragment key={segmentPath}>
                <BreadcrumbItem>
                  {isLast ? (
                    <BreadcrumbPage className="font-medium uppercase text-xs text-primary dark:text-foreground">
                      {title}
                    </BreadcrumbPage>
                  ) : (
                    <BreadcrumbLink
                      asChild
                      className="font-medium uppercase text-sm text-primary"
                    >
                      {/* 'as any' is needed because TS expects exact string literals for routes */}
                      <Link to={segmentPath as any}>{title}</Link>
                    </BreadcrumbLink>
                  )}
                </BreadcrumbItem>
                {!isLast && <BreadcrumbSeparator />}
              </React.Fragment>
            )
          })}
        </BreadcrumbList>
      </Breadcrumb>
    </div>
  )
}

export default PageHeader
