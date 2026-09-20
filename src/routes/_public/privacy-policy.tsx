import { createFileRoute } from '@tanstack/react-router'
import { motion } from 'framer-motion'
import { Trans, useTranslation } from 'react-i18next'
import {
  AlertCircle,
  CircleUser,
  Clock,
  Cookie,
  Lock,
  Mail,
  Phone,
  Scale,
  Share2,
  Shield,
  ShieldCheck,
  Target,
  Trash2,
  Users,
} from 'lucide-react'
import { mainTransitionProps } from '@/lib/utils.ts'
import { pageHead } from '@/lib/seo.ts'

export const Route = createFileRoute('/_public/privacy-policy')({
  head: () =>
    pageHead({
      title: 'Privacy Policy',
      description:
        'How Off We Go Portugal collects, uses and protects your personal data.',
      path: '/privacy-policy',
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
  const dataWeCollectPersonal = t('privacyPolicy.dataWeCollect.personalInfo', {
    returnObjects: true,
  }) as Array<string>
  const dataWeCollectUsage = t('privacyPolicy.dataWeCollect.usage', {
    returnObjects: true,
  }) as Array<string>
  const howWeCollectItems = t('privacyPolicy.howWeCollect.items', {
    returnObjects: true,
  }) as Array<string>
  const purposeItems = t('privacyPolicy.purpose.items', {
    returnObjects: true,
  }) as Array<string>
  const legalBasisItems = t('privacyPolicy.legalBasis.items', {
    returnObjects: true,
  }) as Array<string>
  const securityItems = t('privacyPolicy.security.items', {
    returnObjects: true,
  }) as Array<string>
  const thirdPartyItems = t('privacyPolicy.thirdParty.items', {
    returnObjects: true,
  }) as Array<string>
  const rightsItems = t('privacyPolicy.rights.items', {
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
                <Shield className="w-6 h-6 md:w-8 md:h-8 text-primary" />
              </div>
            </div>
            <h1 className="text-3xl md:text-5xl lg:text-6xl font-bold text-gradient-gold mb-4">
              {t('privacyPolicy.heroTitle')}
            </h1>
            <p className="text-sm md:text-lg text-foreground/70 max-w-2xl mx-auto">
              {t('privacyPolicy.heroSubtitle')}
            </p>
          </motion.div>
        </div>
      </section>

      <section className="pb-16 md:pb-32">
        <div className="container mx-auto px-4 md:px-12">
          <div className="max-w-4xl mx-auto space-y-8 md:space-y-16">
            {/* Introduction */}
            <motion.div
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
            >
              <div className="bg-card/60 border border-border rounded-xl md:rounded-2xl p-6 md:p-10">
                <p className="text-sm md:text-base text-foreground/90 leading-relaxed mb-3">
                  <Trans
                    i18nKey="privacyPolicy.introP1"
                    components={{ strong: <strong /> }}
                  />
                </p>
                <p className="text-sm md:text-base text-foreground/90 leading-relaxed mb-3">
                  {t('privacyPolicy.introP2')}
                </p>
                <p className="text-sm md:text-base text-foreground/90 leading-relaxed">
                  {t('privacyPolicy.introP3')}
                </p>
              </div>
            </motion.div>

            {/* 1. Data We Collect */}
            <SectionCard
              icon={<Lock className="w-full h-full" />}
              title={t('privacyPolicy.dataWeCollect.title')}
            >
              <p className="font-semibold text-foreground">
                {t('privacyPolicy.dataWeCollect.personalInfoLabel')}
              </p>
              <List items={dataWeCollectPersonal} />
              <p className="font-semibold text-foreground pt-2">
                {t('privacyPolicy.dataWeCollect.usageLabel')}
              </p>
              <p>{t('privacyPolicy.dataWeCollect.usageIntro')}</p>
              <List items={dataWeCollectUsage} />
            </SectionCard>

            {/* 2. How We Collect Your Data */}
            <SectionCard
              icon={<CircleUser className="w-full h-full" />}
              title={t('privacyPolicy.howWeCollect.title')}
            >
              <p>{t('privacyPolicy.howWeCollect.intro')}</p>
              <List items={howWeCollectItems} />
            </SectionCard>

            {/* 3. Purpose of Processing */}
            <SectionCard
              icon={<Target className="w-full h-full" />}
              title={t('privacyPolicy.purpose.title')}
            >
              <p>{t('privacyPolicy.purpose.intro')}</p>
              <List items={purposeItems} />
            </SectionCard>

            {/* 4. Legal Basis for Processing */}
            <SectionCard
              icon={<Scale className="w-full h-full" />}
              title={t('privacyPolicy.legalBasis.title')}
            >
              <p>{t('privacyPolicy.legalBasis.intro')}</p>
              <List items={legalBasisItems} />
              <p>{t('privacyPolicy.legalBasis.note')}</p>
            </SectionCard>

            {/* 5. Marketing Communications */}
            <SectionCard
              icon={<Mail className="w-full h-full" />}
              title={t('privacyPolicy.marketing.title')}
            >
              <p>{t('privacyPolicy.marketing.p1')}</p>
              <p>{t('privacyPolicy.marketing.p2')}</p>
              <ul className="list-disc pl-6 space-y-1 text-foreground/80">
                <li>{t('privacyPolicy.marketing.item1')}</li>
                <li>
                  {t('privacyPolicy.marketing.item2Prefix')}{' '}
                  <a
                    href="mailto:info@offwego.pt"
                    className="text-primary hover:underline"
                  >
                    info@offwego.pt
                  </a>
                </li>
              </ul>
              <p>{t('privacyPolicy.marketing.p3')}</p>
            </SectionCard>

            {/* 6. Data Retention */}
            <SectionCard
              icon={<Clock className="w-full h-full" />}
              title={t('privacyPolicy.retention.title')}
            >
              <p>{t('privacyPolicy.retention.p1')}</p>
              <p>
                {t('privacyPolicy.retention.p2Prefix')}{' '}
                <strong>{t('privacyPolicy.retention.p2Bold')}</strong>{' '}
                {t('privacyPolicy.retention.p2Suffix')}
              </p>
            </SectionCard>

            {/* 7. Data Security */}
            <SectionCard
              icon={<ShieldCheck className="w-full h-full" />}
              title={t('privacyPolicy.security.title')}
            >
              <p>{t('privacyPolicy.security.p1')}</p>
              <List items={securityItems} />
              <p>{t('privacyPolicy.security.p2')}</p>
            </SectionCard>

            {/* 8. Third-Party Service Providers */}
            <SectionCard
              icon={<Users className="w-full h-full" />}
              title={t('privacyPolicy.thirdParty.title')}
            >
              <p>{t('privacyPolicy.thirdParty.p1')}</p>
              <List items={thirdPartyItems} />
              <p>{t('privacyPolicy.thirdParty.p2')}</p>
            </SectionCard>

            {/* 9. Social Media */}
            <SectionCard
              icon={<Share2 className="w-full h-full" />}
              title={t('privacyPolicy.socialMedia.title')}
            >
              <p>{t('privacyPolicy.socialMedia.p1')}</p>
              <p>{t('privacyPolicy.socialMedia.p2')}</p>
              <p>{t('privacyPolicy.socialMedia.p3')}</p>
            </SectionCard>

            {/* 10. Your Rights Under GDPR */}
            <SectionCard
              icon={<Trash2 className="w-full h-full" />}
              title={t('privacyPolicy.rights.title')}
            >
              <p>{t('privacyPolicy.rights.intro')}</p>
              <List items={rightsItems} />
              <p>{t('privacyPolicy.rights.note')}</p>
            </SectionCard>

            {/* 11. Complaints */}
            <SectionCard
              icon={<AlertCircle className="w-full h-full" />}
              title={t('privacyPolicy.complaints.title')}
            >
              <p>{t('privacyPolicy.complaints.p1')}</p>
              <p>
                {t('privacyPolicy.complaints.p2Prefix')}{' '}
                <strong>{t('privacyPolicy.complaints.p2Bold')}</strong>.
              </p>
            </SectionCard>

            {/* 12. Cookies */}
            <SectionCard
              icon={<Cookie className="w-full h-full" />}
              title={t('privacyPolicy.cookies.title')}
            >
              <div className="space-y-3">
                <p className="font-semibold text-foreground">
                  {t('privacyPolicy.cookies.whatTitle')}
                </p>
                <p>{t('privacyPolicy.cookies.whatBody')}</p>
              </div>
              <div className="space-y-3">
                <p className="font-semibold text-foreground">
                  {t('privacyPolicy.cookies.typesTitle')}
                </p>
                <p>
                  <strong>{t('privacyPolicy.cookies.essential')}</strong> —{' '}
                  {t('privacyPolicy.cookies.essentialBody')}
                </p>
                <p>
                  <strong>{t('privacyPolicy.cookies.analytics')}</strong> —{' '}
                  {t('privacyPolicy.cookies.analyticsBody')}
                </p>
                <p>
                  <strong>{t('privacyPolicy.cookies.functional')}</strong> —{' '}
                  {t('privacyPolicy.cookies.functionalBody')}
                </p>
              </div>
              <div className="space-y-3">
                <p className="font-semibold text-foreground">
                  {t('privacyPolicy.cookies.managingTitle')}
                </p>
                <p>{t('privacyPolicy.cookies.managingBody')}</p>
              </div>
            </SectionCard>

            {/* 13. Contact Information */}
            <SectionCard
              icon={<Phone className="w-full h-full" />}
              title={t('privacyPolicy.contact.title')}
            >
              <p>{t('privacyPolicy.contact.intro')}</p>
              <p className="font-semibold text-foreground">
                Off We Go Portugal
                <br />
                <span className="font-normal text-foreground/80">
                  {t('privacyPolicy.contact.brandLine')}
                </span>
              </p>
              <p>
                Rua Dom João V, Nº 24 – 1.03
                <br />
                1250-091 Lisbon, Portugal
              </p>
              <p>{t('privacyPolicy.contact.vatLabel')} PT516863452</p>
              <p>
                {t('privacyPolicy.contact.emailLabel')}{' '}
                <a
                  href="mailto:info@offwego.pt"
                  className="text-primary hover:underline"
                >
                  info@offwego.pt
                </a>
                <br />
                {t('privacyPolicy.contact.websiteLabel')}{' '}
                <a
                  href="https://www.offwego.pt"
                  className="text-primary hover:underline"
                >
                  www.offwego.pt
                </a>
              </p>
            </SectionCard>

            {/* Closing note — matches the footer-note style from the original layout */}
            <motion.div
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
            >
              <div className="p-4 md:p-6 bg-primary/5 border border-primary/20 rounded-lg md:rounded-xl">
                <div className="flex items-start gap-3">
                  <Shield className="w-5 h-5 md:w-6 md:h-6 text-primary mt-0.5 flex-shrink-0" />
                  <p className="text-xs md:text-sm text-foreground/80">
                    {t('privacyPolicy.closingNote')}
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
