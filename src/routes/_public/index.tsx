import { Link, createFileRoute } from '@tanstack/react-router'
import React from 'react'
import { motion } from 'framer-motion'
import { Icon } from '@iconify/react'
import {
  ArrowRight,
  Briefcase,
  Clock,
  Fuel,
  MapPin,
  Plane,
  Users,
  Zap,
} from 'lucide-react'
import { useTranslation } from 'react-i18next'
import { pageHead } from '@/lib/seo.ts'
import { mainTransitionProps } from '@/lib/utils.ts'
import { useFleet } from '@/features/fleet/fleet.hooks.ts'
import { ReviewsSection } from '@/components/sections/review-section.tsx'

// Electric order: EQE → EQV → EQS
// Diesel order:   E-Class → V-Class → S-Class → Sprinter
const ELECTRIC_ORDER = ['eqe', 'eqv', 'eqs']
const DIESEL_ORDER = [
  'e-class',
  'e class',
  'v-class',
  'v class',
  's-class',
  's class',
  'sprinter',
]

function vehicleSortIndex(name: string, order: Array<string>) {
  const lower = name.toLowerCase()
  const idx = order.findIndex((k) => lower.includes(k))
  return idx === -1 ? 99 : idx
}

const App: React.FC = () => {
  const { t } = useTranslation()
  const { data: fleetData = [], isFetching: fleetLoading } = useFleet()

  const stats = [
    { num: '12+', label: t('home.stats.years') },
    { num: '500+', label: t('home.stats.clients') },
    { num: '24/7', label: t('home.stats.availability') },
    { num: '3', label: t('home.stats.cities') },
  ]

  const services = [
    {
      id: 1,
      ...(t('home.services.airportTransfers', { returnObjects: true }) as {
        title: string
        description: string
      }),
      icon: Plane,
    },
    {
      id: 2,
      ...(t('home.services.privateTours', { returnObjects: true }) as {
        title: string
        description: string
      }),
      icon: MapPin,
    },
    {
      id: 3,
      ...(t('home.services.chauffeurService', { returnObjects: true }) as {
        title: string
        description: string
      }),
      icon: Clock,
    },
  ]

  const isElectric = (name: string) =>
    ['eqe', 'eqv', 'eqs', 'electric'].some((k) =>
      name.toLowerCase().includes(k),
    )

  const electricFleet = fleetData
    .filter(
      (v) =>
        isElectric(v.name) ||
        v.fuel_type === 'electric' ||
        Boolean(v.is_electric),
    )
    .sort(
      (a, b) =>
        vehicleSortIndex(a.name, ELECTRIC_ORDER) -
        vehicleSortIndex(b.name, ELECTRIC_ORDER),
    )

  const dieselFleet = fleetData
    .filter(
      (v) =>
        !isElectric(v.name) && v.fuel_type !== 'electric' && !v.is_electric,
    )
    .sort(
      (a, b) =>
        vehicleSortIndex(a.name, DIESEL_ORDER) -
        vehicleSortIndex(b.name, DIESEL_ORDER),
    )

  const displayFleet = [...electricFleet, ...dieselFleet].slice(0, 6)

  return (
    <motion.div {...mainTransitionProps}>
      <section className="relative min-h-[85svh] md:min-h-svh flex flex-col items-center justify-center pt-0 bg-black overflow-hidden">
        {/* Background image */}
        <div className="absolute inset-0">
          <img
            src="/homepage.png"
            alt="Premium chauffeur service Portugal"
            className="w-full h-full object-cover object-right md:object-center"
            loading="eager"
            fetchPriority="high"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-black/70 via-black/50 to-[#0B0B0B]" />
        </div>

        {/* Grid overlay */}
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            backgroundImage:
              'repeating-linear-gradient(90deg, rgba(201,168,76,0.04) 0px, rgba(201,168,76,0.04) 1px, transparent 1px, transparent 72px)',
          }}
        />

        {/* Gold glow */}
        <div
          className="absolute top-1/3 left-1/2 -translate-x-1/2 w-[500px] h-[300px] rounded-full pointer-events-none"
          style={{ background: 'rgba(201,168,76,0.06)', filter: 'blur(70px)' }}
        />

        {/* Content */}
        <div className="container mx-auto px-6 md:px-12 relative z-10 text-center flex flex-col items-center">
          {/* Tag */}
          <div className="inline-block text-[10px] font-medium tracking-[.3em] uppercase text-[#C9A84C] border border-[#C9A84C]/30 px-4 py-1.5 mb-8">
            {t('home.tag')}
          </div>

          {/* Heading */}
          <h1 className="font-serif text-4xl md:text-6xl lg:text-7xl font-light text-[#F5F0E8] leading-[1.1] tracking-tight mb-6 max-w-4xl mx-auto">
            {t('home.headingLine1')}{' '}
            <em className="italic text-[#C9A84C]">
              {t('home.headingEmphasis')}
            </em>
            <br />
            {t('home.headingLine2')}
          </h1>

          {/* Subtext */}
          <p className="text-[#9A9182] text-base md:text-lg leading-relaxed mb-10 max-w-xl mx-auto tracking-wide">
            {t('home.subtext')}
          </p>

          {/* Buttons */}
          <div className="flex flex-wrap gap-3 justify-center">
            <Link
              to="/booking"
              className="inline-flex items-center gap-2 text-[11px] font-medium tracking-[.18em] uppercase bg-[#C9A84C] text-[#0B0B0B] px-8 py-3.5 hover:bg-[#E2C97E] transition-colors duration-200"
            >
              {t('home.reserveRide')}
              <ArrowRight className="w-4 h-4" />
            </Link>
            <Link
              to="/fleet"
              className="inline-flex items-center gap-2 text-[11px] font-medium tracking-[.18em] uppercase bg-transparent text-[#F5F0E8] border border-[#F5F0E8]/25 px-8 py-3.5 hover:border-[#F5F0E8]/50 transition-colors duration-200"
            >
              {t('home.viewFleet')}
            </Link>
          </div>

          {/* Stats bar */}
          <div className="mt-14 w-full max-w-2xl border border-[#C9A84C]/15 grid grid-cols-4">
            {stats.map((stat, i) => (
              <div
                key={stat.label}
                className={`py-4 px-2 text-center ${i < stats.length - 1 ? 'border-r border-[#C9A84C]/15' : ''}`}
              >
                <span className="font-serif text-2xl font-light text-[#C9A84C] block">
                  {stat.num}
                </span>
                <span className="text-[10px] tracking-[.18em] uppercase text-[#9A9182]">
                  {stat.label}
                </span>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-16 md:py-24 bg-background">
        <div className="container mx-auto px-6 md:px-12">
          <h2 className="text-3xl md:text-4xl font-bold text-primary text-center mb-12">
            {t('home.ourServices')}
          </h2>
          <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
            {services.map((service) => {
              const Icon = service.icon

              return (
                <div
                  key={service.id}
                  className="rounded-lg border text-card-foreground shadow-sm bg-card border-border/50 hover:border-primary/30 transition-all duration-300"
                >
                  <div className="p-8 text-center">
                    <div className="w-14 h-14 mx-auto mb-5 rounded-full bg-primary/10 flex items-center justify-center">
                      <Icon className="w-7 h-7 text-primary" />
                    </div>

                    <h3 className="text-xl font-semibold text-foreground mb-3">
                      {service.title}
                    </h3>

                    <p className="text-muted-foreground leading-relaxed">
                      {service.description}
                    </p>
                  </div>
                </div>
              )
            })}
          </div>
        </div>
      </section>

      <section className="py-16 md:py-20 bg-muted/20">
        <div className="container mx-auto px-6 md:px-12 max-w-4xl">
          <h2 className="text-2xl md:text-3xl font-bold text-gradient-gold mb-6">
            {t('home.whyChooseTitle')}
          </h2>
          <p className="text-lg text-muted-foreground leading-relaxed">
            {t('home.whyChooseBody')}
          </p>
        </div>
      </section>

      <section className="py-16 md:py-20 bg-background">
        <div className="container mx-auto px-6 md:px-12 max-w-4xl">
          <h2 className="text-2xl md:text-3xl font-bold text-gradient-gold mb-6">
            {t('home.airportTransfersTitle')}
          </h2>
          <p className="text-lg text-muted-foreground leading-relaxed mb-6">
            {t('home.airportTransfersBody')}
          </p>
          <a
            className="text-primary hover:text-primary/80 font-semibold underline underline-offset-4 transition-colors"
            href="/transfers"
          >
            {t('home.airportTransfersLink')}
          </a>
        </div>
      </section>

      <section className="py-16 md:py-20 bg-muted/20">
        <div className="container mx-auto px-6 md:px-12 max-w-4xl">
          <h2 className="text-2xl md:text-3xl font-bold text-gradient-gold mb-6">
            {t('home.privateToursTitle')}
          </h2>
          <p className="text-lg text-muted-foreground leading-relaxed mb-6">
            {t('home.privateToursBody')}
          </p>
          <a
            className="text-primary hover:text-primary/80 font-semibold underline underline-offset-4 transition-colors"
            href="/tours"
          >
            {t('home.privateToursLink')}
          </a>
        </div>
      </section>

      <section className="py-16 md:py-20 bg-background">
        <div className="container mx-auto px-6 md:px-12 max-w-4xl">
          <div className="flex items-center gap-3 mb-6">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              stroke-width="2"
              stroke-linecap="round"
              stroke-linejoin="round"
              className="lucide lucide-leaf w-7 h-7 text-primary"
            >
              <path d="M11 20A7 7 0 0 1 9.8 6.1C15.5 5 17 4.48 19 2c1 2 2 4.18 2 8 0 5.5-4.78 10-10 10Z"></path>
              <path d="M2 21c0-3 1.85-5.36 5.08-6C9.5 14.52 12 13 13 12"></path>
            </svg>
            <h2 className="text-2xl md:text-3xl font-bold text-gradient-gold">
              {t('home.sustainableFleetTitle')}
            </h2>
          </div>
          <p className="text-lg text-muted-foreground leading-relaxed mb-6">
            {t('home.sustainableFleetBody')}
          </p>
          <Link
            className="text-primary hover:text-primary/80 font-semibold underline underline-offset-4 transition-colors"
            to="/fleet"
          >
            {t('home.sustainableFleetLink')}
          </Link>
        </div>
      </section>

      <section className="py-16 md:py-20 bg-muted/20">
        <div className="container mx-auto px-6 md:px-12 max-w-4xl">
          <div className="flex items-center gap-3 mb-6">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              stroke-width="2"
              stroke-linecap="round"
              stroke-linejoin="round"
              className="lucide lucide-map-pinned w-7 h-7 text-primary"
            >
              <path d="M18 8c0 3.613-3.869 7.429-5.393 8.795a1 1 0 0 1-1.214 0C9.87 15.429 6 11.613 6 8a6 6 0 0 1 12 0"></path>
              <circle cx="12" cy="8" r="2"></circle>
              <path d="M8.714 14h-3.71a1 1 0 0 0-.948.683l-2.004 6A1 1 0 0 0 3 22h18a1 1 0 0 0 .948-1.316l-2-6a1 1 0 0 0-.949-.684h-3.712"></path>
            </svg>
            <h2 className="text-2xl md:text-3xl font-bold text-gradient-gold">
              {t('home.areasWeServeTitle')}
            </h2>
          </div>
          <p className="text-lg text-muted-foreground leading-relaxed">
            {t('home.areasWeServeBody')}
          </p>
        </div>
      </section>

      {/*  Testimonial */}
      <section className="py-16 md:py-24 bg-card/50">
        <div className="container mx-auto px-6 md:px-12">
          <h2 className="text-2xl md:text-3xl font-bold text-center text-foreground mb-12">
            {t('home.testimonialsTitle')}
          </h2>

          <ReviewsSection />
        </div>
      </section>

      <section className="py-16 md:py-24 bg-background">
        <div className="container mx-auto px-6 md:px-12">
          <h2 className="text-3xl md:text-4xl font-bold text-primary text-center mb-12">
            {t('home.premiumFleetTitle')}
          </h2>

          {fleetLoading ? (
            <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
              {Array.from({ length: 6 }).map((_, i) => (
                <div
                  key={i}
                  className="rounded-lg border border-border/50 overflow-hidden animate-pulse bg-card h-64"
                />
              ))}
            </div>
          ) : (
            <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
              {displayFleet.map((car) => {
                const electric =
                  car.fuel_type === 'electric' ||
                  Boolean(car.is_electric) ||
                  isElectric(car.name)
                return (
                  <div
                    key={car.id}
                    className="rounded-lg border text-card-foreground shadow-sm bg-card border-border/50 overflow-hidden group hover:border-primary/30 transition-all duration-300"
                  >
                    <div className="relative h-48 overflow-hidden">
                      <img
                        src={car.image ?? ''}
                        alt={car.name}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                        loading="lazy"
                      />
                      <div className="absolute top-3 right-3 flex flex-col gap-1.5">
                        <span
                          className={`text-xs font-semibold px-3 py-1 rounded-full flex items-center gap-1 ${electric ? 'bg-primary/90 text-primary-foreground' : 'bg-foreground/70 text-background'}`}
                        >
                          {electric ? (
                            <Zap className="w-3 h-3" />
                          ) : (
                            <Fuel className="w-3 h-3" />
                          )}
                          {electric ? t('home.electric') : t('home.diesel')}
                        </span>
                      </div>
                    </div>

                    <div className="p-5">
                      <h3 className="text-lg font-semibold text-foreground text-center mb-3">
                        {car.name}
                      </h3>
                      <div className="flex items-center justify-center gap-4 text-sm text-muted-foreground">
                        <span className="flex items-center gap-1">
                          <Users className="w-3.5 h-3.5" />
                          {car.passengers}
                        </span>
                        <span className="flex items-center gap-1">
                          <Briefcase className="w-3.5 h-3.5" />
                          {car.suitcases}
                        </span>
                      </div>
                    </div>
                  </div>
                )
              })}
            </div>
          )}

          <div className="text-center mt-10">
            <Link
              to="/fleet"
              className="inline-flex items-center gap-2 border bg-background h-11 rounded-md px-8 border-primary text-primary hover:bg-primary hover:text-primary-foreground transition-all duration-300"
            >
              {t('home.viewAllFleet')}
              <Icon icon="mdi:arrow-right" className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </section>
    </motion.div>
  )
}

export const Route = createFileRoute('/_public/')({
  head: () =>
    pageHead({
      title: 'Luxury Chauffeur Service Portugal',
      description:
        'Premium chauffeur service & airport transfers in Lisbon, Porto & Algarve. Private tours, Mercedes-Benz electric fleet, 24/7.',
      path: '/',
    }),
  component: App,
})
