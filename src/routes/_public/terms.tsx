import { createFileRoute } from '@tanstack/react-router'
import { motion } from 'framer-motion'
import { useTranslation } from 'react-i18next'
import {
  AlertTriangle,
  Baby,
  Banknote,
  Building2,
  CalendarClock,
  Car,
  CloudLightning,
  FileText,
  Gavel,
  Luggage,
  Mail,
  MapPin,
  ShieldCheck,
  Ticket,
  Users,
  Wallet,
} from 'lucide-react'
import { mainTransitionProps } from '@/lib/utils.ts'
import { pageHead } from '@/lib/seo.ts'

export const Route = createFileRoute('/_public/terms')({
  head: () =>
    pageHead({
      title: 'Terms & Conditions',
      description:
        'Terms and conditions for booking chauffeur transfers, tours and hourly service with Off We Go Portugal.',
      path: '/terms',
    }),
  component: RouteComponent,
})

interface SectionCardProps {
  icon: React.ReactNode
  title: string
  children: React.ReactNode
  delay?: number
}

function SectionCard({ icon, title, children, delay = 0 }: SectionCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 12 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-80px' }}
      transition={{ duration: 0.5, delay }}
    >
      <div className="bg-card/60 border border-border rounded-xl md:rounded-2xl p-6 md:p-10">
        <div className="flex items-center gap-3 mb-6 md:mb-8">
          <div className="w-6 h-6 md:w-8 md:h-8 text-primary flex-shrink-0">
            {icon}
          </div>
          <h2 className="text-xl md:text-3xl font-bold text-foreground">
            {title}
          </h2>
        </div>
        <div className="space-y-4 text-sm md:text-base text-foreground/90 leading-relaxed">
          {children}
        </div>
      </div>
    </motion.div>
  )
}

function List({ items }: { items: Array<string> }) {
  return (
    <ul className="list-disc pl-6 space-y-1 text-foreground/80">
      {items.map((item) => (
        <li key={item}>{item}</li>
      ))}
    </ul>
  )
}

function RouteComponent() {
  const { t } = useTranslation()
  const insuranceItems = t('terms.insurance.items', {
    returnObjects: true,
  }) as Array<string>
  const servicesItems = t('terms.services.items', {
    returnObjects: true,
  }) as Array<string>
  const servicesIncludes = t('terms.services.includes', {
    returnObjects: true,
  }) as Array<string>
  const servicesExcludes = t('terms.services.excludes', {
    returnObjects: true,
  }) as Array<string>
  const conductItems = t('terms.conduct.items', {
    returnObjects: true,
  }) as Array<string>
  const forceMajeureItems = t('terms.forceMajeure.items', {
    returnObjects: true,
  }) as Array<string>
  const bookingMethods = t('terms.reservations.bookingMethods', {
    returnObjects: true,
  }) as Array<string>
  const confirmationItems = t('terms.reservations.confirmationItems', {
    returnObjects: true,
  }) as Array<string>
  const paymentMethods = t('terms.reservations.paymentMethods', {
    returnObjects: true,
  }) as Array<string>
  const standardServices = t('terms.cancellation.standardServices', {
    returnObjects: true,
  }) as Array<string>
  const standardRules = t('terms.cancellation.standardRules', {
    returnObjects: true,
  }) as Array<string>
  const vehicleDamageItems = t('terms.vehicleDamage.items', {
    returnObjects: true,
  }) as Array<string>
  const amendmentsItems = t('terms.amendments.items', {
    returnObjects: true,
  }) as Array<string>
  return (
    <motion.div {...mainTransitionProps}>
      <section className="py-16 md:py-24 bg-gradient-to-b from-muted/30 to-background">
        <div className="container mx-auto px-4 md:px-12 text-center">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
          >
            <div className="flex items-center justify-center gap-3 mb-6">
              <div className="w-12 h-12 md:w-16 md:h-16 bg-primary/10 rounded-xl flex items-center justify-center">
                <FileText className="w-6 h-6 md:w-8 md:h-8 text-primary" />
              </div>
            </div>
            <h1 className="text-3xl md:text-5xl lg:text-6xl font-bold text-gradient-gold mb-4">
              {t('terms.heroTitle')}
            </h1>
            <p className="text-sm md:text-lg text-foreground/70 max-w-2xl mx-auto">
              {t('terms.heroSubtitle')}
            </p>
          </motion.div>
        </div>
      </section>

      <section className="pb-16 md:pb-32">
        <div className="container mx-auto px-4 md:px-12">
          <div className="max-w-4xl mx-auto space-y-8 md:space-y-16">
            {/* 1. Company Information */}
            <SectionCard
              icon={<Building2 className="w-full h-full" />}
              title={t('terms.company.title')}
            >
              <p>
                {t('terms.company.p1Prefix')}{' '}
                <strong>{t('terms.company.p1Bold')}</strong>
                {t('terms.company.p1Suffix')}
              </p>
              <p className="font-semibold text-foreground pt-2">
                {t('terms.company.regNameLabel')}
              </p>
              <p>LEAPOFSTARS - MANAGEMENT, PRODUCTIONS &amp; TRAVEL LDA.</p>
              <p className="font-semibold text-foreground pt-2">
                {t('terms.company.vatLabel')}
              </p>
              <p>PT516863452</p>
              <p className="font-semibold text-foreground pt-2">
                {t('terms.company.officeLabel')}
              </p>
              <p>
                Rua Dom João V, Nº 24 – 1.03
                <br />
                1250-091 Lisbon, Portugal
              </p>
              <p>{t('terms.company.p2')}</p>
            </SectionCard>

            {/* 2. Insurance & Licensing */}
            <SectionCard
              icon={<ShieldCheck className="w-full h-full" />}
              title={t('terms.insurance.title')}
            >
              <p>{t('terms.insurance.p1')}</p>
              <p>{t('terms.insurance.p2')}</p>
              <List items={insuranceItems} />
            </SectionCard>

            {/* 3. Services */}
            <SectionCard
              icon={<Car className="w-full h-full" />}
              title={t('terms.services.title')}
            >
              <p>{t('terms.services.intro')}</p>
              <List items={servicesItems} />
              <p className="font-semibold text-foreground pt-2">
                {t('terms.services.includesLabel')}
              </p>
              <List items={servicesIncludes} />
              <p className="font-semibold text-foreground pt-2">
                {t('terms.services.excludesLabel')}
              </p>
              <List items={servicesExcludes} />
            </SectionCard>

            {/* 4. Personal Belongings */}
            <SectionCard
              icon={<Wallet className="w-full h-full" />}
              title={t('terms.belongings.title')}
            >
              <p>{t('terms.belongings.p1')}</p>
              <p>{t('terms.belongings.p2')}</p>
            </SectionCard>

            {/* 5. Luggage */}
            <SectionCard
              icon={<Luggage className="w-full h-full" />}
              title={t('terms.luggage.title')}
            >
              <p>{t('terms.luggage.p1')}</p>
              <p>{t('terms.luggage.p2')}</p>
              <p>{t('terms.luggage.p3')}</p>
              <p>{t('terms.luggage.p4')}</p>
            </SectionCard>

            {/* 6. Passenger Conduct */}
            <SectionCard
              icon={<Users className="w-full h-full" />}
              title={t('terms.conduct.title')}
            >
              <p>{t('terms.conduct.intro')}</p>
              <List items={conductItems} />
              <p>{t('terms.conduct.note')}</p>
            </SectionCard>

            {/* 7. Force Majeure */}
            <SectionCard
              icon={<CloudLightning className="w-full h-full" />}
              title={t('terms.forceMajeure.title')}
            >
              <p>{t('terms.forceMajeure.intro')}</p>
              <List items={forceMajeureItems} />
            </SectionCard>

            {/* 8. Pricing */}
            <SectionCard
              icon={<Banknote className="w-full h-full" />}
              title={t('terms.pricing.title')}
            >
              <p>{t('terms.pricing.p1')}</p>
              <p>{t('terms.pricing.p2')}</p>
            </SectionCard>

            {/* 9. Reservations & Payments */}
            <SectionCard
              icon={<CalendarClock className="w-full h-full" />}
              title={t('terms.reservations.title')}
            >
              <p className="font-semibold text-foreground">
                {t('terms.reservations.bookingMethodsLabel')}
              </p>
              <p>{t('terms.reservations.bookingMethodsIntro')}</p>
              <List items={bookingMethods} />
              <p className="font-semibold text-foreground pt-2">
                {t('terms.reservations.confirmationLabel')}
              </p>
              <p>{t('terms.reservations.confirmationIntro')}</p>
              <List items={confirmationItems} />
              <p className="font-semibold text-foreground pt-2">
                {t('terms.reservations.paymentMethodsLabel')}
              </p>
              <p>{t('terms.reservations.paymentMethodsIntro')}</p>
              <List items={paymentMethods} />
              <p>{t('terms.reservations.paymentNote')}</p>
              <p className="font-semibold text-foreground pt-2">
                {t('terms.reservations.chargebacksLabel')}
              </p>
              <p>{t('terms.reservations.chargebacksP1')}</p>
              <p>{t('terms.reservations.chargebacksP2')}</p>
            </SectionCard>

            {/* 10. Cancellation Policy */}
            <SectionCard
              icon={<Ticket className="w-full h-full" />}
              title={t('terms.cancellation.title')}
            >
              <p className="font-semibold text-foreground">
                {t('terms.cancellation.standardLabel')}
              </p>
              <p>{t('terms.cancellation.standardIntro')}</p>
              <List items={standardServices} />
              <List items={standardRules} />
              <p className="font-semibold text-foreground pt-2">
                {t('terms.cancellation.sprinterLabel')}
              </p>
              <p>{t('terms.cancellation.sprinterP1')}</p>
              <p>{t('terms.cancellation.sprinterP2')}</p>
              <p className="font-semibold text-foreground pt-2">
                {t('terms.cancellation.noShowLabel')}
              </p>
              <p>{t('terms.cancellation.noShowP1')}</p>
              <p>{t('terms.cancellation.noShowP2')}</p>
            </SectionCard>

            {/* 11. Waiting Time Policy */}
            <SectionCard
              icon={<MapPin className="w-full h-full" />}
              title={t('terms.waitingTime.title')}
            >
              <p className="font-semibold text-foreground">
                {t('terms.waitingTime.airportLabel')}
              </p>
              <p>{t('terms.waitingTime.complimentaryLabel')}</p>
              <List items={[t('terms.waitingTime.airportTime')]} />
              <p>{t('terms.waitingTime.airportNote')}</p>
              <p className="font-semibold text-foreground pt-2">
                {t('terms.waitingTime.hotelsLabel')}
              </p>
              <p>{t('terms.waitingTime.complimentaryLabel')}</p>
              <List items={[t('terms.waitingTime.hotelsTime')]} />
              <p className="font-semibold text-foreground pt-2">
                {t('terms.waitingTime.cruiseLabel')}
              </p>
              <p>{t('terms.waitingTime.complimentaryLabel')}</p>
              <List items={[t('terms.waitingTime.cruiseTime')]} />
              <p>{t('terms.waitingTime.extraNote')}</p>
            </SectionCard>

            {/* 12. Child Safety */}
            <SectionCard
              icon={<Baby className="w-full h-full" />}
              title={t('terms.childSafety.title')}
            >
              <p>{t('terms.childSafety.p1')}</p>
              <p>{t('terms.childSafety.p2')}</p>
              <p>{t('terms.childSafety.p3')}</p>
            </SectionCard>

            {/* 13. Vehicle Damage */}
            <SectionCard
              icon={<AlertTriangle className="w-full h-full" />}
              title={t('terms.vehicleDamage.title')}
            >
              <p>{t('terms.vehicleDamage.p1')}</p>
              <p>{t('terms.vehicleDamage.intro')}</p>
              <List items={vehicleDamageItems} />
              <p>{t('terms.vehicleDamage.note')}</p>
            </SectionCard>

            {/* 14. Tour Services */}
            <SectionCard
              icon={<MapPin className="w-full h-full" />}
              title={t('terms.tourServices.title')}
            >
              <p>{t('terms.tourServices.p1')}</p>
              <p>{t('terms.tourServices.p2')}</p>
            </SectionCard>

            {/* 15. Subcontracted Services */}
            <SectionCard
              icon={<Users className="w-full h-full" />}
              title={t('terms.subcontracted.title')}
            >
              <p>{t('terms.subcontracted.p1')}</p>
              <p>{t('terms.subcontracted.p2')}</p>
            </SectionCard>

            {/* 16. Booking Amendments */}
            <SectionCard
              icon={<CalendarClock className="w-full h-full" />}
              title={t('terms.amendments.title')}
            >
              <p>{t('terms.amendments.intro')}</p>
              <List items={amendmentsItems} />
              <p>{t('terms.amendments.note')}</p>
            </SectionCard>

            {/* 17. Governing Law */}
            <SectionCard
              icon={<Gavel className="w-full h-full" />}
              title={t('terms.governingLaw.title')}
            >
              <p>{t('terms.governingLaw.p1')}</p>
              <p>{t('terms.governingLaw.p2')}</p>
            </SectionCard>

            {/* Contact Information */}
            <SectionCard
              icon={<Mail className="w-full h-full" />}
              title={t('terms.contact.title')}
            >
              <p className="font-semibold text-foreground">
                Off We Go Portugal
                <br />
                <span className="font-normal text-foreground/80">
                  {t('terms.contact.brandLine')}
                </span>
              </p>
              <p>
                Rua Dom João V, Nº 24 – 1.03
                <br />
                1250-091 Lisbon, Portugal
              </p>
              <p>{t('terms.contact.vatLabel')} PT516863452</p>
              <p>
                {t('terms.contact.emailLabel')}{' '}
                <a
                  href="mailto:info@offwego.pt"
                  className="text-primary hover:underline"
                >
                  info@offwego.pt
                </a>
                <br />
                {t('terms.contact.websiteLabel')}{' '}
                <a
                  href="https://www.offwego.pt"
                  className="text-primary hover:underline"
                >
                  www.offwego.pt
                </a>
              </p>
            </SectionCard>

            {/* Closing note */}
            <motion.div
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
            >
              <div className="p-4 md:p-6 bg-primary/5 border border-primary/20 rounded-lg md:rounded-xl">
                <div className="flex items-start gap-3">
                  <FileText className="w-5 h-5 md:w-6 md:h-6 text-primary mt-0.5 flex-shrink-0" />
                  <p className="text-xs md:text-sm text-foreground/80">
                    {t('terms.closingNote')}
                  </p>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>
    </motion.div>
  )
}
