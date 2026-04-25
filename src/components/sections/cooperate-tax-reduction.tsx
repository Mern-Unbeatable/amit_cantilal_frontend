import { Award, TrendingDown, TreePine } from 'lucide-react'

const benefits = [
  {
    icon: Award,
    title: 'Quarterly Green Certificates',
    description:
      'Get detailed certificates every quarter showing trees saved and emissions avoided — perfect for ESG reporting and tax benefits.',
  },
  {
    icon: TrendingDown,
    title: 'Direct Tax Benefits',
    description:
      'Use our environmental certificates to qualify for corporate tax deductions and ESG incentives.',
  },
  {
    icon: TreePine,
    title: 'ESG Reporting Ready',
    description:
      'Detailed quarterly reports with metrics ready for your sustainability and ESG disclosures.',
  },
]

export default function CorporateTaxReduction() {
  return (
    <section className="py-10 md:py-16 bg-[#141414]">
      <div className="container mx-auto px-4 md:px-12">
        <div className="max-w-6xl mx-auto">

          {/* Header */}
          <div className="mb-6 md:mb-10">
            <div className="tag-gold mb-4">Sustainability</div>
            <h3 className="font-serif text-xl md:text-3xl lg:text-4xl font-light text-gradient-gold mb-2 md:mb-4">
              Corporate Tax Reduction
            </h3>
            <p className="text-sm md:text-lg text-[#9A9182] max-w-3xl">
              Turn your commitment to sustainability into tangible tax benefits. Our quarterly
              green certificates provide documented proof of emissions reduction.
            </p>
          </div>

          {/* 3-col grid */}
          <div className="grid grid-cols-3 gap-3 md:gap-6">
            {benefits.map(({ icon: Icon, title, description }) => (
              <div
                key={title}
                className="group p-3 md:p-6 bg-[#0B0B0B] border border-[#C9A84C]/12 hover:border-[#C9A84C]/35 transition-colors duration-200"
              >
                <Icon
                  className="w-5 h-5 md:w-8 md:h-8 text-[#C9A84C] mb-2 md:mb-4"
                  strokeWidth={1.5}
                />
                <h4 className="font-serif text-xs md:text-lg font-light text-gradient-gold mb-1 md:mb-2">
                  {title}
                </h4>
                <p className="text-[10px] md:text-sm text-[#9A9182] leading-relaxed">
                  {description}
                </p>
              </div>
            ))}
          </div>

        </div>
      </div>
    </section>
  )
}