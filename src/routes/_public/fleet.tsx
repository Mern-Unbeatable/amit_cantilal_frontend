import { Link, createFileRoute } from '@tanstack/react-router'
import { motion } from 'framer-motion'
import { ArrowRight, Briefcase, Car, Fuel, Users, Zap } from 'lucide-react'
import { useTranslation } from 'react-i18next'
import type { FleetVehicle } from '@/features/fleet/fleet.types.ts'
import { mainTransitionProps } from '@/lib/utils.ts'
import { useFleet } from '@/features/fleet/fleet.hooks.ts'
import { pageHead } from '@/lib/seo.ts'

// ─── Route ────────────────────────────────────────────────────────────────────

export const Route = createFileRoute('/_public/fleet')({
  head: () =>
    pageHead({
      title: 'Our Fleet',
      description:
        'Explore our premium Mercedes-Benz electric fleet — the vehicles behind every chauffeur transfer and private tour with Off We Go Portugal.',
      path: '/fleet',
    }),
  component: RouteComponent,
})

// ─── Helpers ──────────────────────────────────────────────────────────────────

function isElectric(v: FleetVehicle) {
  return (
    v.fuel_type === 'electric' ||
    v.category === 'electric' ||
    (v.category == null && Boolean(v.is_electric))
  )
}

// ─── Vehicle card ─────────────────────────────────────────────────────────────

function VehicleCard({
  vehicle,
  electric,
}: {
  vehicle: FleetVehicle
  electric: boolean
}) {
  const { t } = useTranslation()
  return (
    <div className="group h-full flex flex-col bg-black-2 border border-gold/12 hover:border-gold/50 overflow-hidden transition-colors duration-700 cursor-pointer">
      {/* Image */}
      <div className="relative h-44 md:h-64 overflow-hidden bg-black">
        {vehicle.image ? (
          <img
            src={vehicle.image}
            alt={vehicle.name}
            loading="lazy"
            className="w-full h-full object-cover transition-transform duration-1400 ease-out group-hover:scale-105"
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center text-gold/20">
            <Car className="w-16 h-16" strokeWidth={0.8} />
          </div>
        )}

        {/* Fuel badge */}
        <div className="absolute top-3 left-3">
          <span
            className={`inline-flex items-center gap-1.5 px-2.5 py-1 text-[9px] tracking-[0.25em] uppercase border ${
              electric
                ? 'border-gold/60 text-gold'
                : 'border-white/25 text-white/70'
            }`}
          >
            {electric ? (
              <Zap className="w-2.5 h-2.5" strokeWidth={2} />
            ) : (
              <Fuel className="w-2.5 h-2.5" strokeWidth={2} />
            )}
            {electric ? t('fleetPage.electric') : t('fleetPage.diesel')}
          </span>
        </div>
      </div>

      {/* Info */}
      <div className="p-5 md:p-7 flex flex-col grow">
        <h3 className="font-serif text-xl md:text-2xl font-light text-white-cream leading-tight mb-4">
          {vehicle.name}
        </h3>

        {vehicle.description && (
          <div className="relative pl-5 mb-5 grow hidden md:block">
            <span className="absolute left-0 top-1 bottom-1 w-px bg-gold/50" />
            <p className="font-serif italic text-sm text-white-cream/60 font-light leading-relaxed">
              {vehicle.description}
            </p>
          </div>
        )}

        {/* Pax / luggage */}
        <div className="flex items-center gap-4 text-[11px] tracking-[0.25em] uppercase text-white-dim mb-5">
          <span className="flex items-center gap-1.5">
            <Users className="w-3.5 h-3.5 text-gold" strokeWidth={1.8} />
            {vehicle.passengers}
          </span>
          <span className="text-gold/30">·</span>
          <span className="flex items-center gap-1.5">
            <Briefcase className="w-3.5 h-3.5 text-gold" strokeWidth={1.8} />
            {vehicle.suitcases}
          </span>
        </div>

        {/* CTA */}
        <div className="mt-auto pt-5 border-t border-gold/12">
          <Link
            to="/booking"
            className="w-full inline-flex items-center justify-center gap-2 text-[10px] tracking-[0.3em] uppercase text-gold hover:text-white-cream transition-colors duration-500 py-1"
          >
            {t('fleetPage.bookVehicle')}
            <ArrowRight className="w-3 h-3" strokeWidth={1.5} />
          </Link>
        </div>
      </div>
    </div>
  )
}

// ─── Fleet group ───

function FleetGroup({
  label,
  icon,
  vehicles,
  electric,
}: {
  label: string
  icon: React.ReactNode
  vehicles: Array<FleetVehicle>
  electric: boolean
}) {
  if (vehicles.length === 0) return null

  return (
    <div className="mb-20 md:mb-32">
      {/* Section header */}
      <div className="text-center mb-10 md:mb-16 max-w-3xl mx-auto">
        <span className="inline-flex items-center gap-2 text-[10px] tracking-[0.4em] uppercase text-gold mb-6">
          {icon}
          {label}
        </span>
        <div className="w-16 h-px bg-gold/40 mx-auto" />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5 md:gap-6">
        {vehicles.map((v) => (
          <VehicleCard key={v.id} vehicle={v} electric={electric} />
        ))}
      </div>
    </div>
  )
}

// ─── Skeleton ─────────────────────────────────────────────────────────────────

function FleetSkeleton() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5 md:gap-6">
      {Array.from({ length: 6 }).map((_, i) => (
        <div
          key={i}
          className="h-80 bg-black-2 border border-gold/8 animate-pulse"
        />
      ))}
    </div>
  )
}

// ─── Main component ───────────────────────────────────────────────────────────

function RouteComponent() {
  const { t } = useTranslation()
  const { data: fleet, isFetching } = useFleet()

  const VEHICLE_ORDER = [
    'eqe',
    'eqv',
    'eqs',
    'e-class',
    'e class',
    'v-class',
    'v class',
    's-class',
    's class',
    'sprinter',
  ]
  const vehicleSortIndex = (name: string) => {
    const lower = name.toLowerCase()
    const idx = VEHICLE_ORDER.findIndex((k) => lower.includes(k))
    return idx === -1 ? 99 : idx
  }
  const sortVehicles = (list: typeof fleet) =>
    [...(list ?? [])].sort(
      (a, b) => vehicleSortIndex(a.name) - vehicleSortIndex(b.name),
    )

  const electric = sortVehicles((fleet ?? []).filter(isElectric))
  const diesel = sortVehicles((fleet ?? []).filter((v) => !isElectric(v)))

  return (
    <motion.div {...mainTransitionProps}>
      <div className="min-h-screen bg-black text-white-cream">
        {/* ── Hero ───────────────────────────────────────────────────────── */}
        <section className="relative h-[65vh] md:h-[80vh] overflow-hidden bg-black">
          <img
            src="/transfer-banner.PNG"
            alt="Our Fleet"
            className="absolute inset-0 w-full h-full object-cover opacity-60"
            loading="eager"
          />
          <div className="absolute inset-0 bg-linear-to-b from-black/60 via-black/20 to-black" />

          <div className="relative z-10 h-full flex flex-col items-center justify-center text-center px-6 md:px-12 max-w-4xl mx-auto">
            <span className="text-[10px] tracking-[0.4em] uppercase text-gold mb-6 md:mb-8">
              {t('fleetPage.tag')}
            </span>
            <h1 className="font-serif text-4xl md:text-6xl lg:text-7xl font-light text-white-cream leading-[1.05] mb-6">
              {t('fleetPage.title')}
            </h1>
            <div className="w-16 h-px bg-gold/60 mb-6 md:mb-8" />
            <p className="text-base md:text-lg text-white-cream/60 font-light leading-relaxed max-w-xl">
              {t('fleetPage.subtitle')}
            </p>
          </div>
        </section>

        {/* ── Fleet grid ─────────────────────────────────────────────────── */}
        <section className="py-20 md:py-32">
          <div className="container mx-auto px-4 md:px-12">
            {isFetching && <FleetSkeleton />}

            {!isFetching && fleet && (
              <>
                <FleetGroup
                  label={t('fleetPage.electricFleet')}
                  icon={
                    <Zap
                      className="w-3 h-3 md:w-3.5 md:h-3.5"
                      strokeWidth={2}
                    />
                  }
                  vehicles={electric}
                  electric={true}
                />

                <FleetGroup
                  label={t('fleetPage.dieselFleet')}
                  icon={
                    <Fuel
                      className="w-3 h-3 md:w-3.5 md:h-3.5"
                      strokeWidth={2}
                    />
                  }
                  vehicles={diesel}
                  electric={false}
                />
              </>
            )}
          </div>
        </section>

        {/* ── CTA banner ─────────────────────────────────────────────────── */}
        <section className="py-24 md:py-32 bg-[#0F0F0F] border-t border-gold/15">
          <div className="container mx-auto px-6 md:px-12 max-w-3xl text-center">
            <p className="font-serif text-2xl md:text-4xl text-white-cream font-light italic leading-relaxed mb-10">
              {t('fleetPage.ctaQuote')}
            </p>
            <Link
              to="/booking"
              className="inline-flex items-center gap-3 bg-gold text-black px-10 py-4 text-[10px] tracking-[0.3em] uppercase font-medium hover:bg-gold-light transition-all duration-500"
            >
              {t('fleetPage.reserveRide')}
              <ArrowRight className="w-3.5 h-3.5" strokeWidth={1.5} />
            </Link>
          </div>
        </section>
      </div>
    </motion.div>
  )
}
