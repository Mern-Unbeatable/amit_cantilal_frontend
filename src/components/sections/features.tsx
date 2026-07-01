import {
  Car,
  Check,
  DollarSign,
  Leaf,
  Mail,
  MessageCircle,
  Phone,
  Users,
} from 'lucide-react'
import { useTranslation } from 'react-i18next'

// ─── Reusable sub-components ──────────────────────────────────────────────────

function Tag({
  icon: Icon,
  label,
  green,
}: {
  icon: React.ElementType
  label: string
  green?: boolean
}) {
  return (
    <div
      className={`inline-flex items-center gap-2 px-3 py-1.5 md:px-4 md:py-2 border ${
        green
          ? 'bg-green-500/10 border-green-500/25 text-green-500'
          : 'bg-[#C9A84C]/10 border-[#C9A84C]/20 text-[#C9A84C]'
      }`}
    >
      <Icon className="w-3.5 h-3.5 md:w-4 md:h-4" strokeWidth={1.5} />
      <span className="text-xs md:text-sm font-medium">{label}</span>
    </div>
  )
}

function CheckList({ items, green }: { items: Array<string>; green?: boolean }) {
  return (
    <ul className="space-y-2">
      {items.map((item) => (
        <li key={item} className="flex items-center gap-2 text-xs md:text-base">
          <Check
            className={`w-4 h-4 flex-shrink-0 ${green ? 'text-green-500' : 'text-[#C9A84C]'}`}
            strokeWidth={2}
          />
          <span className="text-[#9A9182]">{item}</span>
        </li>
      ))}
    </ul>
  )
}

function StatCard({
  icon: Icon,
  value,
  label,
}: {
  icon: React.ElementType
  value: string
  label: string
}) {
  return (
    <div className="bg-[#141414] border border-[#C9A84C]/12 p-3 md:p-6 text-center">
      <Icon
        className="w-6 h-6 md:w-10 md:h-10 text-[#C9A84C] mx-auto mb-2"
        strokeWidth={1.5}
      />
      <h4 className="font-serif text-lg md:text-2xl font-light text-gradient-gold">
        {value}
      </h4>
      <p className="text-[10px] md:text-sm text-[#9A9182]">{label}</p>
    </div>
  )
}

function ContactCard({
  icon: Icon,
  title,
  subtitle,
}: {
  icon: React.ElementType
  title: string
  subtitle: string
}) {
  return (
    <div className="bg-[#141414] border border-[#C9A84C]/12 p-3 md:p-6 flex items-start gap-3 md:gap-4">
      <Icon
        className="w-5 h-5 md:w-8 md:h-8 text-[#C9A84C] flex-shrink-0 mt-0.5"
        strokeWidth={1.5}
      />
      <div>
        <h4 className="text-sm md:text-base font-medium text-[#F5F0E8] mb-0.5">
          {title}
        </h4>
        <p className="text-[10px] md:text-sm text-[#9A9182]">{subtitle}</p>
      </div>
    </div>
  )
}

// ─── Section ──────────────────────────────────────────────────────────────────

export default function B2BFeatures() {
  const { t } = useTranslation()
  const fleetItems = t('b2bFeatures.fleet.items', { returnObjects: true }) as string[]
  const commissionItems = t('b2bFeatures.commissions.items', { returnObjects: true }) as string[]
  const sustainabilityItems = t('b2bFeatures.sustainability.items', { returnObjects: true }) as string[]
  return (
    <section className="py-10 md:py-20 bg-[#0B0B0B]">
      <div className="container mx-auto px-4 md:px-12">
        <div className="max-w-6xl mx-auto space-y-12 md:space-y-20">
          {/* Block 1 — Fleet */}
          <div className="grid lg:grid-cols-2 gap-6 md:gap-12 items-center">
            {/* Text */}
            <div className="space-y-3 md:space-y-6">
              <Tag icon={Car} label={t('b2bFeatures.fleet.tag')} />
              <h2 className="font-serif text-xl md:text-4xl font-light text-gradient-gold">
                {t('b2bFeatures.fleet.title')}
              </h2>
              <p className="text-xs md:text-lg text-[#9A9182] leading-relaxed">
                {t('b2bFeatures.fleet.body')}
              </p>
              <CheckList items={fleetItems} />
            </div>

            {/* Stats */}
            <div className="grid grid-cols-2 gap-3 md:gap-4">
              <StatCard icon={Car} value="7+" label={t('b2bFeatures.fleet.statModels')} />
              <StatCard icon={Users} value="48" label={t('b2bFeatures.fleet.statPeople')} />
            </div>
          </div>

          {/* Block 2 — Commissions (reversed) */}
          <div className="grid lg:grid-cols-2 gap-6 md:gap-12 items-center">
            {/* Commission card */}
            <div className="order-2 lg:order-1 bg-[#141414] border border-[#C9A84C]/25 p-5 md:p-8 relative">
              <DollarSign
                className="w-10 h-10 md:w-16 md:h-16 text-[#C9A84C] mb-3 md:mb-6"
                strokeWidth={1.5}
              />
              <h3 className="font-serif text-2xl md:text-4xl font-light text-gradient-gold mb-2 md:mb-4">
                {t('b2bFeatures.commissions.value')}
              </h3>
              <p className="text-sm md:text-xl text-[#9A9182]">
                {t('b2bFeatures.commissions.label')}
              </p>
              <div className="mt-4 md:mt-6 pt-4 md:pt-6 border-t border-[#C9A84C]/12">
                <p className="text-xs md:text-sm text-[#9A9182]">
                  {t('b2bFeatures.commissions.note')}
                </p>
              </div>
            </div>

            {/* Text */}
            <div className="order-1 lg:order-2 space-y-3 md:space-y-6">
              <Tag icon={DollarSign} label={t('b2bFeatures.commissions.tag')} />
              <h2 className="font-serif text-xl md:text-4xl font-light text-gradient-gold">
                {t('b2bFeatures.commissions.title')}
              </h2>
              <p className="text-xs md:text-lg text-[#9A9182] leading-relaxed">
                {t('b2bFeatures.commissions.body')}
              </p>
              <CheckList items={commissionItems} />
            </div>
          </div>

          {/* Block 3 — Sustainability */}
          <div className="grid lg:grid-cols-2 gap-6 md:gap-12 items-center">
            {/* Text */}
            <div className="space-y-3 md:space-y-6">
              <Tag icon={Leaf} label={t('b2bFeatures.sustainability.tag')} green />
              <h2 className="font-serif text-xl md:text-4xl font-light text-gradient-gold">
                {t('b2bFeatures.sustainability.title')}
              </h2>
              <p className="text-xs md:text-lg text-[#9A9182] leading-relaxed">
                {t('b2bFeatures.sustainability.body')}
              </p>
              <CheckList green items={sustainabilityItems} />
            </div>

            {/* Contact cards */}
            <div className="space-y-3 md:space-y-4">
              <ContactCard
                icon={Phone}
                title={t('b2bFeatures.sustainability.hotlineTitle')}
                subtitle={t('b2bFeatures.sustainability.hotlineSubtitle')}
              />
              <ContactCard
                icon={MessageCircle}
                title={t('b2bFeatures.sustainability.whatsappTitle')}
                subtitle={t('b2bFeatures.sustainability.whatsappSubtitle')}
              />
              <ContactCard
                icon={Mail}
                title={t('b2bFeatures.sustainability.managerTitle')}
                subtitle={t('b2bFeatures.sustainability.managerSubtitle')}
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
