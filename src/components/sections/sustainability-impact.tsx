import { useState } from 'react'
import { Calculator, Car, ChartColumn, FileCheck, Leaf, TreePine, TrendingDown } from 'lucide-react'
import { useTranslation } from 'react-i18next'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'

// ─── Constants ────────────────────────────────────────────────────────────────

const CO2_PER_KM = 0.16 // kg CO₂ per km (traditional luxury vehicle)
const TREE_ABSORPTION_PER_YEAR = 21 // kg CO₂ absorbed by one tree per year

const DISTANCE_VALUES = [20, 50, 100, 300]
const HIGHLIGHT_ICONS = [ChartColumn, FileCheck, TreePine]

// ─── Calculator ───────────────────────────────────────────────────────────────

function Co2Calculator() {
  const { t } = useTranslation()
  const [trips, setTrips] = useState(10)
  const [distanceKm, setDistanceKm] = useState(50)

  const distanceOptions = (t('sustainabilityImpact.calculator.distanceOptions', { returnObjects: true }) as Array<{ label: string }>)
    .map((opt, idx) => ({ ...opt, value: DISTANCE_VALUES[idx] }))

  const monthlySaving = +(trips * distanceKm * CO2_PER_KM).toFixed(1)
  const yearlySaving  = +(monthlySaving * 12).toFixed(1)
  const treesEquiv    = Math.round(yearlySaving / TREE_ABSORPTION_PER_YEAR)

  const results = [
    { icon: Car,         label: t('sustainabilityImpact.calculator.monthlyLabel'), value: `${monthlySaving} kg`,  unit: 'CO₂'       },
    { icon: TrendingDown, label: t('sustainabilityImpact.calculator.yearlyLabel'), value: `${yearlySaving} kg`,   unit: 'CO₂'       },
    { icon: Leaf,        label: t('sustainabilityImpact.calculator.treesLabel'),   value: treesEquiv,             unit: t('sustainabilityImpact.calculator.treesUnit') },
  ]

  return (
    <div className="max-w-4xl mx-auto">
      <div className="text-center mb-6 md:mb-12">
        <h3 className="font-serif text-xl md:text-4xl font-light text-gradient-gold mb-2 md:mb-4">
          {t('sustainabilityImpact.calculator.title')}
        </h3>
        <p className="text-sm md:text-lg text-[#9A9182]">
          {t('sustainabilityImpact.calculator.subtitle')}
        </p>
      </div>

      {/* Calculator card */}
      <div className="bg-[#0B0B0B] border-2 border-green-500/25 p-6 md:p-8">

        {/* Title */}
        <div className="flex items-center gap-3 mb-6">
          <Calculator className="w-6 h-6 md:w-8 md:h-8 text-[#C9A84C]" strokeWidth={1.5} />
          <h3 className="font-serif text-xl md:text-3xl font-light text-gradient-gold">
            {t('sustainabilityImpact.calculator.cardTitle')}
          </h3>
        </div>

        {/* Inputs */}
        <div className="grid md:grid-cols-2 gap-4 md:gap-6 mb-6 md:mb-8">

          {/* Monthly trips */}
          <div className="flex flex-col gap-2">
            <Label htmlFor="trips" className="text-xs md:text-sm font-medium tracking-[.12em] uppercase text-[#9A9182]">
              {t('sustainabilityImpact.calculator.monthlyTrips')}
            </Label>
            <Input
              id="trips"
              type="number"
              min={1}
              max={1000}
              value={trips}
              onChange={(e) => setTrips(Math.max(1, Number(e.target.value)))}
              className="h-12 text-base md:text-lg"
            />
          </div>

          {/* Distance select */}
          <div className="flex flex-col gap-2">
            <Label className="text-xs md:text-sm font-medium tracking-[.12em] uppercase text-[#9A9182]">
              {t('sustainabilityImpact.calculator.avgDistance')}
            </Label>
            <Select
              value={String(distanceKm)}
              onValueChange={(val) => setDistanceKm(Number(val))}
            >
              <SelectTrigger className="h-12 text-base md:text-lg">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                {distanceOptions.map((opt) => (
                  <SelectItem key={opt.value} value={String(opt.value)}>
                    {opt.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </div>

        {/* Results */}
        <div className="grid md:grid-cols-3 gap-4 md:gap-6">
          {results.map(({ icon: Icon, label, value, unit }) => (
            <div
              key={label}
              className="bg-[#141414] p-4 md:p-6 border border-green-500/20 text-center"
            >
              <Icon className="w-8 h-8 md:w-10 md:h-10 text-green-500 mb-3 mx-auto" strokeWidth={1.5} />
              <p className="text-xs md:text-sm text-[#9A9182] mb-2">{label}</p>
              <p className="font-serif text-2xl md:text-3xl font-light text-gradient-gold">{value}</p>
              <p className="text-[10px] md:text-xs text-[#9A9182] mt-1">{unit}</p>
            </div>
          ))}
        </div>

        {/* Disclaimer */}
        <div className="mt-4 md:mt-6 p-3 md:p-4 bg-green-500/08 border border-green-500/20">
          <p className="text-[10px] md:text-sm text-center text-[#9A9182]">
            {t('sustainabilityImpact.calculator.disclaimer')}
          </p>
        </div>
      </div>
    </div>
  )
}

// ─── Section ───────────────────────────────────────────────────────────────────

export default function SustainabilityImpact() {
  const { t } = useTranslation()
  const highlights = (t('sustainabilityImpact.highlights', { returnObjects: true }) as Array<{ title: string; description: string }>)
    .map((h, idx) => ({ ...h, icon: HIGHLIGHT_ICONS[idx] }))
  return (
    <section className="py-10 md:py-24 bg-[#0B0B0B] border-y border-green-500/15">
      <div className="container mx-auto px-4 md:px-12">
        <div className="max-w-7xl mx-auto">

          {/* Header */}
          <div className="text-center mb-6 md:mb-16">
            <div className="inline-flex items-center gap-2 md:gap-3 bg-green-500/10 border border-green-500/25 px-4 py-2 md:px-8 md:py-4 mb-4 md:mb-8">
              <Leaf className="w-4 h-4 md:w-5 md:h-5 text-green-500" strokeWidth={1.5} />
              <span className="text-xs md:text-sm font-medium tracking-[.2em] uppercase text-green-500">
                {t('sustainabilityImpact.tag')}
              </span>
            </div>
            <h2 className="font-serif text-2xl md:text-5xl lg:text-6xl font-light text-gradient-gold mb-3 md:mb-6">
              {t('sustainabilityImpact.titlePrefix')} <em className="italic">{t('sustainabilityImpact.titleEmphasis')}</em>
            </h2>
            <p className="text-sm md:text-xl text-[#9A9182] max-w-3xl mx-auto leading-relaxed">
              {t('sustainabilityImpact.subtitle')}
            </p>
          </div>

          {/* Highlight cards */}
          <div className="grid grid-cols-3 gap-3 md:gap-10 max-w-5xl mx-auto mb-8 md:mb-20">
            {highlights.map(({ icon: Icon, title, description }) => (
              <div
                key={title}
                className="text-center p-3 md:p-8 bg-[#141414] border border-green-500/15 hover:border-green-500/35 transition-colors duration-200"
              >
                <div className="inline-flex items-center justify-center w-10 h-10 md:w-20 md:h-20 bg-[#C9A84C] mb-2 md:mb-4">
                  <Icon className="w-5 h-5 md:w-9 md:h-9 text-[#0B0B0B]" strokeWidth={1.5} />
                </div>
                <h3 className="font-serif text-xs md:text-2xl font-light text-gradient-gold mb-0 md:mb-3">
                  {title}
                </h3>
                <p className="hidden md:block text-base md:text-lg text-[#9A9182] leading-relaxed">
                  {description}
                </p>
              </div>
            ))}
          </div>

          {/* Calculator */}
          <Co2Calculator />

        </div>
      </div>
    </section>
  )
}