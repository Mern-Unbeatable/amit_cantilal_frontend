import type {LucideIcon} from 'lucide-react';

export interface FeatureCard {
  icon: LucideIcon
  title: string
  description: string
}

interface FeatureCardsProps {
  cards: Array<FeatureCard>
  className?: string
}

export default function FeatureCards({
  cards,
  className = '',
}: FeatureCardsProps) {
  return (
    <div className={`grid sm:grid-cols-2 lg:grid-cols-4 gap-6 ${className}`}>
      {cards.map(({ icon: Icon, title, description }) => (
        <div
          key={title}
          className="group bg-[#141414] border border-[#C9A84C]/12 hover:border-[#C9A84C]/35 transition-colors duration-200"
        >
          <div className="p-6 text-center">
            <div className="w-12 h-12 mx-auto mb-4 bg-[#C9A84C]/10 border border-[#C9A84C]/20 flex items-center justify-center">
              <Icon className="w-6 h-6 text-[#C9A84C]" strokeWidth={1.5} />
            </div>
            <h3 className="font-serif font-light text-[#F5F0E8] mb-2">
              {title}
            </h3>
            <p className="text-sm text-[#9A9182] leading-relaxed">
              {description}
            </p>
          </div>
        </div>
      ))}
    </div>
  )
}
