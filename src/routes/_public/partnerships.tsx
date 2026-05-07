import { createFileRoute } from '@tanstack/react-router'
import { motion } from 'framer-motion'
import { Image } from '@unpic/react'
import { mainTransitionProps } from '@/lib/utils.ts'
import { Button } from '@/components/ui/button.tsx'
import { PartnershipServices, features } from '@/data'
import FleetSection from '@/components/sections/fleet-sections.tsx'
import CorporateTaxReduction from '@/components/sections/cooperate-tax-reduction.tsx'
import SustainabilityImpact from '@/components/sections/sustainability-impact.tsx'
import PartnerForm from '@/components/sections/partnership-form.tsx'
import CoverageArea from '@/components/sections/coverage-area.tsx'
import { useFleet } from '@/features/fleet/fleet.hooks.ts'

export const Route = createFileRoute('/_public/partnerships')({
  component: RouteComponent,
})

function RouteComponent() {

  const { data: fleet } = useFleet()

  return (
    <motion.div {...mainTransitionProps}>
      <section className="relative min-h-[60vh] md:min-h-[70vh] flex items-end pb-12 md:pb-20">
        <Image
          src="/b2b-hero-lisbon-mercedes-BHNBdxWS.webp"
          alt=""
          className="absolute inset-0 w-full h-full object-cover object-center"
          loading="eager"
          fetchpriority="high"
          width={1920}
          height={1080}
        />
        <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-black/30 to-background"></div>
        <div className="container mx-auto px-6 md:px-12 relative z-10">
          <div className="max-w-5xl">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-display font-bold italic text-primary mb-4 md:mb-6 drop-shadow-lg">
              Partnerships
            </h1>
            <p className="text-lg md:text-xl lg:text-2xl text-white leading-relaxed italic max-w-4xl drop-shadow-md">
              Off We Go Portugal understands the unique demands of corporate travel.
              Our B2B services are tailored to meet the expectations of business
              executives, event planners and travel managers.
            </p>
            <div className="mt-6 md:mt-8">
              <div className="flex flex-col sm:flex-row gap-3 md:gap-4 justify-start flex-wrap">
                <Button asChild className="inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md font-medium transition-smooth focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 [&amp;_svg]:pointer-events-none [&amp;_svg]:size-4 [&amp;_svg]:shrink-0 bg-primary text-primary-foreground hover:bg-primary/90 h-10 btn-luxury text-sm md:text-lg px-5 py-4 md:px-8 md:py-6">
                  <a
                    href="https://wa.me/351914578214"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-3 group"
                    aria-label="WhatsApp"
                  >
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
                    className="lucide lucide-message-circle w-4 h-4 md:w-5 md:h-5 mr-2"
                  >
                    <path d="M7.9 20A9 9 0 1 0 4 16.1L2 22Z"></path>
                  </svg>
                  Chat on WhatsApp
                  </a>
                </Button>
                <Button className="inline-flex text-white items-center justify-center gap-2 whitespace-nowrap rounded-md font-medium transition-smooth focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 [&amp;_svg]:pointer-events-none [&amp;_svg]:size-4 [&amp;_svg]:shrink-0 border bg-background hover:text-accent-foreground h-10 text-sm md:text-lg px-5 py-4 md:px-8 md:py-6 border-primary/30 hover:bg-primary/10">
                  Request Partnership
                </Button>
                <Button className="inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md font-medium transition-smooth focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 [&amp;_svg]:pointer-events-none [&amp;_svg]:size-4 [&amp;_svg]:shrink-0 hover:text-accent-foreground h-10 text-sm md:text-lg px-5 py-4 md:px-8 md:py-6 hover:bg-primary/10">
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
                    className="lucide lucide-log-in w-4 h-4 md:w-5 md:h-5 mr-2"
                  >
                    <path d="M15 3h4a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2h-4"></path>
                    <polyline points="10 17 15 12 10 7"></polyline>
                    <line x1="15" x2="3" y1="12" y2="12"></line>
                  </svg>
                  Partner Login
                </Button>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="py-10 md:py-24 bg-[#141414] border-y border-[#C9A84C]/12">
        <div className="container mx-auto px-4 md:px-12">
          <div className="max-w-6xl mx-auto">

            {/* Header */}
            <div className="text-center mb-8 md:mb-16">
              <div className="tag-gold mb-4">Why Partner With Us</div>
              <h2 className="font-serif text-2xl md:text-5xl lg:text-6xl font-light text-gradient-gold mb-3 md:mb-6">
                Why Choose <em className="italic">Off We Go Portugal</em>
              </h2>
              <p className="text-sm md:text-xl text-[#9A9182] max-w-3xl mx-auto">
                Discover the advantages of partnering with us for your clients'
                transportation needs across Portugal.
              </p>
            </div>

            {/* 2-col layout */}
            <div className="grid lg:grid-cols-2 gap-6 md:gap-12 items-stretch">

              {/* Feature cards */}
              <div className="space-y-3 md:space-y-4">
                {features.map(({ icon: Icon, title, description }) => (
                  <div
                    key={title}
                    className="group flex items-start gap-3 md:gap-4 p-3 md:p-6 bg-[#0B0B0B] border border-[#C9A84C]/12 hover:border-[#C9A84C]/35 transition-colors duration-200"
                  >
                    {/* Icon */}
                    <div className="flex-shrink-0 w-8 h-8 md:w-12 md:h-12 bg-[#C9A84C] flex items-center justify-center">
                      <Icon className="w-4 h-4 md:w-5 md:h-5 text-[#0B0B0B]" strokeWidth={1.5} />
                    </div>

                    {/* Text */}
                    <div>
                      <h4 className="font-serif text-sm md:text-xl font-light text-gradient-gold mb-1 md:mb-2">
                        {title}
                      </h4>
                      <p className="text-xs md:text-base text-[#9A9182] leading-relaxed">
                        {description}
                      </p>
                    </div>
                  </div>
                ))}
              </div>

              {/* Image */}
              <div className="relative h-full min-h-[400px]">
                <img
                  src="/mercedes-e-class-vertical.webp"
                  alt="OffWeGo Luxury Fleet"
                  className="w-full h-full object-cover"
                  loading="lazy"
                  width={800}
                  height={1000}
                />
                {/* Overlay badge */}
                <div className="absolute bottom-6 left-6 right-6 bg-[#0B0B0B]/90 border border-[#C9A84C]/20 p-4 backdrop-blur-sm">
                  <p className="font-serif text-lg font-light text-[#C9A84C] mb-1">
                    Ready to partner with us?
                  </p>
                  <p className="text-xs text-[#9A9182] mb-3">
                    Join 50+ travel agencies, hotels and DMCs already working with Off We Go Portugal.
                  </p>
                  <a
                    href="#apply"
                    className="btn-gold text-[10px] py-2 px-5"
                  >
                    Apply Now →
                  </a>
                </div>
              </div>

            </div>
          </div>
        </div>
      </section>

      <section className="py-10 md:py-32 bg-[#0B0B0B]">
        <div className="container mx-auto px-4 md:px-12">
          <div className="max-w-6xl mx-auto">

            {/* Header */}
            <div className="text-center mb-8 md:mb-20">
              <div className="tag-gold mb-4">Built for Business</div>
              <h2 className="font-serif text-2xl md:text-5xl lg:text-6xl font-light text-gradient-gold mb-3 md:mb-6">
                Corporate transportation<br className="hidden md:block" />
                <em className="italic"> for every occasion</em>
              </h2>
              <p className="text-sm md:text-xl text-[#9A9182] max-w-3xl mx-auto">
                Premium services designed for corporate excellence
              </p>
            </div>

            {/* 2x2 Grid */}
            <div className="grid grid-cols-2 gap-3 md:gap-8">
              {PartnershipServices.map(({ icon: Icon, title, description }) => (
                <div
                  key={title}
                  className="group bg-[#141414] p-4 md:p-10 border border-[#C9A84C]/12 hover:border-[#C9A84C]/35 transition-colors duration-200 h-full"
                >
                  <div className="flex flex-col md:flex-row items-start gap-3 md:gap-6 h-full">

                    {/* Icon */}
                    <div className="flex-shrink-0 w-10 h-10 md:w-16 md:h-16 bg-[#C9A84C] flex items-center justify-center">
                      <Icon className="w-5 h-5 md:w-7 md:h-7 text-[#0B0B0B]" strokeWidth={1.5} />
                    </div>

                    {/* Text */}
                    <div className="flex flex-col flex-grow">
                      <h3 className="font-serif text-sm md:text-2xl font-light text-gradient-gold mb-1 md:mb-3">
                        {title}
                      </h3>
                      <p className="text-xs md:text-lg text-[#9A9182] leading-relaxed flex-grow">
                        {description}
                      </p>
                    </div>

                  </div>
                </div>
              ))}
            </div>

          </div>
        </div>
      </section>

      <CoverageArea/>

      <FleetSection fleet={fleet}/>

      <CorporateTaxReduction/>

      <SustainabilityImpact/>

      <PartnerForm/>
    </motion.div>
  )
}
