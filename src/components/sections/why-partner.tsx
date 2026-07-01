import { Car, Clock, DollarSign, Leaf, Shield, Users } from 'lucide-react'
import { useTranslation } from 'react-i18next'

const STAT_ICONS = [Car, Users, DollarSign, Clock, Shield, Leaf]

export default function WhyPartnerWithUs() {
  const { t } = useTranslation()
  const stats = (t('whyPartner.stats', { returnObjects: true }) as Array<{ value: string; label: string }>)
    .map((s, idx) => ({ ...s, icon: STAT_ICONS[idx] }))
  return (
    <section className="py-10 md:py-20 bg-[#141414]">
      <div className="container mx-auto px-4 md:px-12">
        <div className="max-w-6xl mx-auto">
          <h2 className="font-serif text-2xl md:text-4xl font-light text-gradient-gold mb-6 md:mb-12 text-center">
            {t('whyPartner.title')}
          </h2>

          <div className="grid grid-cols-2 md:grid-cols-3 gap-3 md:gap-6">
            {stats.map(({ icon: Icon, value, label }) => (
              <div
                key={label}
                className="group bg-[#0B0B0B] border border-[#C9A84C]/12 hover:border-[#C9A84C]/35 p-3 md:p-6 text-center transition-colors duration-200"
              >
                <div className="w-8 h-8 md:w-12 md:h-12 bg-[#C9A84C] flex items-center justify-center mx-auto mb-2 md:mb-4">
                  <Icon
                    className="w-4 h-4 md:w-6 md:h-6 text-[#0B0B0B]"
                    strokeWidth={1.5}
                  />
                </div>
                <h4 className="font-serif text-sm md:text-xl font-light text-gradient-gold mb-1">
                  {value}
                </h4>
                <p className="text-[10px] md:text-sm text-[#9A9182]">{label}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
