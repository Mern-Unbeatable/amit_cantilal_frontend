import type { PublicBreadcrumbItem } from '@/components/shared/public-breadcrumbs.tsx'
import { PublicBreadcrumbs } from '@/components/shared/public-breadcrumbs.tsx'

interface PageHeroProps {
  image?: string
  title: string
  subtitle?: string
  breadcrumbs?: Array<PublicBreadcrumbItem>
}

export function PageHero({
  image = '/homepage.png',
  title,
  subtitle,
  breadcrumbs,
}: PageHeroProps) {
  return (
    <section className="relative min-h-[40vh] md:min-h-[50vh] flex items-end pb-12 md:pb-20">
      <img
        src={image}
        alt=""
        className="absolute inset-0 w-full h-full object-cover object-top md:object-center"
        loading="eager"
        fetchPriority="high"
        width={1920}
        height={1080}
      />
      <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-black/30 to-background" />
      <div className="container mx-auto px-6 md:px-12 relative z-10">
        <div className="max-w-5xl">
          {breadcrumbs && breadcrumbs.length > 0 && (
            <PublicBreadcrumbs items={breadcrumbs} variant="hero" />
          )}
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-display font-bold italic text-primary mb-4 md:mb-6 drop-shadow-lg">
            {title}
          </h1>
          {subtitle && (
            <p className="text-lg md:text-xl lg:text-2xl text-white leading-relaxed italic max-w-4xl drop-shadow-md">
              {subtitle}
            </p>
          )}
        </div>
      </div>
    </section>
  )
}
