import { Link } from '@tanstack/react-router'
import { ChevronRight } from 'lucide-react'
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from '@/components/ui/breadcrumb.tsx'
import { cn } from '@/lib/utils.ts'

export interface PublicBreadcrumbItem {
  label: string
  /** Omit `to` for the current page crumb */
  to?: string
}

interface PublicBreadcrumbsProps {
  items: Array<PublicBreadcrumbItem>
  className?: string
  /** Dark-on-hero styling (gold trail over imagery) */
  variant?: 'hero' | 'page'
}

export function PublicBreadcrumbs({
  items,
  className,
  variant = 'page',
}: PublicBreadcrumbsProps) {
  if (items.length === 0) return null

  const isHero = variant === 'hero'

  return (
    <Breadcrumb className={cn(isHero ? 'mb-6 md:mb-8' : 'mb-8 md:mb-10', className)}>
      <BreadcrumbList
        className={cn(
          'gap-1.5 sm:gap-2 text-[10px] md:text-[11px] tracking-[0.18em] uppercase font-light',
          isHero ? 'text-[#F5F0E8]/55' : 'text-[#9A9182]',
        )}
      >
        {items.map((item, index) => {
          const isLast = index === items.length - 1

          return (
            <span key={`${item.label}-${index}`} className="contents">
              <BreadcrumbItem>
                {isLast || !item.to ? (
                  <BreadcrumbPage
                    className={cn(
                      'tracking-[0.18em] uppercase font-light max-w-[14rem] truncate md:max-w-none',
                      isHero ? 'text-[#F5F0E8]/90' : 'text-[#F5F0E8]/85',
                    )}
                  >
                    {item.label}
                  </BreadcrumbPage>
                ) : (
                  <BreadcrumbLink asChild>
                    <Link
                      to={item.to}
                      className={cn(
                        'transition-colors duration-500',
                        isHero
                          ? 'text-[#F5F0E8]/55 hover:text-[#C9A84C]'
                          : 'text-[#9A9182] hover:text-[#C9A84C]',
                      )}
                    >
                      {item.label}
                    </Link>
                  </BreadcrumbLink>
                )}
              </BreadcrumbItem>
              {!isLast && (
                <BreadcrumbSeparator className="[&>svg]:size-3 text-[#C9A84C]/45">
                  <ChevronRight strokeWidth={1.5} />
                </BreadcrumbSeparator>
              )}
            </span>
          )
        })}
      </BreadcrumbList>
    </Breadcrumb>
  )
}
