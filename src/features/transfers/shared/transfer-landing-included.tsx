import {
  Briefcase,
  Car,
  Check,
  Clock,
  Droplets,
  Lock,
  MapPin,
  MessageSquare,
  Receipt,
  UserRound,
  Wifi,
} from 'lucide-react'
import { motion } from 'framer-motion'
import { useTranslation } from 'react-i18next'
import type { LucideIcon } from 'lucide-react'
import {
  fadeUp,
  landingEase,
  landingViewport,
} from '@/features/transfers/shared/motion.ts'

const INCLUDED_ICONS: Array<LucideIcon> = [
  UserRound,
  MapPin,
  Car,
  Briefcase,
  Droplets,
  Wifi,
  Receipt,
  MessageSquare,
]

const WHY_ICONS: Array<LucideIcon> = [MapPin, Clock, Lock, Car]

interface TransferLandingIncludedProps {
  ns: string
}

export function TransferLandingIncluded({ ns }: TransferLandingIncludedProps) {
  const { t } = useTranslation(ns)
  const included = t('included.items', { returnObjects: true }) as Array<{
    title: string
    description: string
  }>
  const whyChoose = t('whyChoose.items', { returnObjects: true }) as Array<{
    title: string
    description: string
  }>

  return (
    <>
      <section className="bg-[#0B0B0B] py-20 md:py-32 border-t border-[#C9A84C]/10">
        <div className="container mx-auto px-6 md:px-12 max-w-7xl">
          <motion.div
            className="max-w-3xl mx-auto text-center mb-14 md:mb-20"
            {...fadeUp}
          >
            <h2 className="font-serif text-3xl md:text-5xl font-light text-[#F5F0E8] leading-[1.15] mb-8">
              {t('included.title')}
            </h2>
            <div className="w-12 h-px bg-[#C9A84C]/40 mx-auto" />
          </motion.div>

          <ul className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5 md:gap-6">
            {included.map((item, index) => {
              const Icon = INCLUDED_ICONS[index] ?? Check
              return (
                <motion.li
                  key={item.title}
                  className="bg-[#141414] border border-[#C9A84C]/12 p-6 md:p-7"
                  initial={{ opacity: 0, y: 18 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={landingViewport}
                  transition={{
                    duration: 0.5,
                    ease: landingEase,
                    delay: index * 0.05,
                  }}
                >
                  <div className="mb-5 inline-flex h-10 w-10 items-center justify-center border border-[#C9A84C]/30 text-[#C9A84C]">
                    <Icon className="h-4 w-4" strokeWidth={1.5} />
                  </div>
                  <h3 className="font-serif text-lg md:text-xl font-light text-[#F5F0E8] mb-3 leading-snug">
                    {item.title}
                  </h3>
                  <p className="text-sm text-[#F5F0E8]/60 font-light leading-relaxed">
                    {item.description}
                  </p>
                </motion.li>
              )
            })}
          </ul>
        </div>
      </section>

      <section className="bg-[#0F0F0F] py-20 md:py-28 border-t border-[#C9A84C]/10">
        <div className="container mx-auto px-6 md:px-12 max-w-7xl">
          <motion.div
            className="max-w-3xl mx-auto text-center mb-14 md:mb-16"
            {...fadeUp}
          >
            <h2 className="font-serif text-3xl md:text-5xl font-light text-[#F5F0E8] leading-[1.15] mb-8">
              {t('whyChoose.title')}
            </h2>
            <div className="w-12 h-px bg-[#C9A84C]/40 mx-auto" />
          </motion.div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-8 md:gap-10">
            {whyChoose.map((item, index) => {
              const Icon = WHY_ICONS[index] ?? Check
              return (
                <motion.div
                  key={item.title}
                  className="text-center sm:text-left"
                  initial={{ opacity: 0, y: 18 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={landingViewport}
                  transition={{
                    duration: 0.5,
                    ease: landingEase,
                    delay: index * 0.08,
                  }}
                >
                  <div className="mb-5 inline-flex h-11 w-11 items-center justify-center border border-[#C9A84C]/35 text-[#C9A84C]">
                    <Icon className="h-5 w-5" strokeWidth={1.25} />
                  </div>
                  <p className="text-[10px] tracking-[0.3em] uppercase text-[#C9A84C] mb-4 font-light">
                    {String(index + 1).padStart(2, '0')}
                  </p>
                  <h3 className="font-serif text-xl md:text-2xl font-light text-[#F5F0E8] mb-4 leading-snug">
                    {item.title}
                  </h3>
                  <p className="text-sm md:text-base text-[#F5F0E8]/60 font-light leading-relaxed">
                    {item.description}
                  </p>
                </motion.div>
              )
            })}
          </div>
        </div>
      </section>
    </>
  )
}
