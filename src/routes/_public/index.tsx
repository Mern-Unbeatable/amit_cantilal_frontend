import { Link, createFileRoute  } from '@tanstack/react-router'
import React from 'react'
import { motion } from 'framer-motion'
import { Icon } from "@iconify/react";
import { ArrowRight } from 'lucide-react'
import { mainTransitionProps } from '@/lib/utils.ts'
import { fleet, services } from '@/data'
import {ReviewsSection} from "@/components/sections/review-section.tsx";


const stats = [
  { num: '12+', label: 'Years of Service' },
  { num: '500+', label: 'Happy Clients' },
  { num: '24/7', label: 'Availability' },
  { num: '3', label: 'Cities Covered' },
]

const App: React.FC = () => {
  return (
    <motion.div {...mainTransitionProps}>
      {/* <section className="relative min-h-[85svh] md:min-h-[100svh] flex items-center justify-center pt-0 bg-background overflow-hidden">*/}
      {/*  <div className="absolute inset-0">*/}
      {/*    <Image*/}
      {/*      src="/services-hero-airport-Bn7uK8eL.webp"*/}
      {/*      alt="Premium chauffeur service Portugal"*/}
      {/*      className="w-full h-full object-cover object-center scale-x-[-1]"*/}
      {/*      loading="eager"*/}
      {/*      fetchpriority="high"*/}
      {/*      layout="fullWidth"*/}
      {/*    />*/}
      {/*    <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/40 to-background"></div>*/}
      {/*  </div>*/}
      {/*  <div className="container mx-auto px-6 md:px-12 relative z-10 text-center">*/}
      {/*    <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold text-gradient-gold leading-tight mb-6 max-w-5xl mx-auto">*/}
      {/*      Premium Chauffeur Service &amp; Private Tours in Portugal*/}
      {/*    </h1>*/}
      {/*    <p className="text-lg md:text-2xl text-foreground/90 leading-relaxed mb-10 max-w-3xl mx-auto">*/}
      {/*      Luxury airport transfers &amp; exclusive tours in Lisbon, Porto and*/}
      {/*      Algarve*/}
      {/*    </p>*/}
      {/*    <a href="/booking">*/}
      {/*      <button className="inline-flex items-center justify-center whitespace-nowrap font-medium transition-smooth focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 [&amp;_svg]:pointer-events-none [&amp;_svg]:size-4 [&amp;_svg]:shrink-0 h-14 bg-primary hover:bg-primary/90 text-primary-foreground text-lg md:text-xl px-10 py-6 rounded-xl shadow-gold gap-3 animate-[glow-pulse_2.5s_ease-in-out_infinite]">*/}
      {/*        Book Now*/}
      {/*        <svg*/}
      {/*          xmlns="http://www.w3.org/2000/svg"*/}
      {/*          width="24"*/}
      {/*          height="24"*/}
      {/*          viewBox="0 0 24 24"*/}
      {/*          fill="none"*/}
      {/*          stroke="currentColor"*/}
      {/*          stroke-width="2"*/}
      {/*          stroke-linecap="round"*/}
      {/*          stroke-linejoin="round"*/}
      {/*          className="lucide lucide-arrow-right w-5 h-5"*/}
      {/*        >*/}
      {/*          <path d="M5 12h14"></path>*/}
      {/*          <path d="m12 5 7 7-7 7"></path>*/}
      {/*        </svg>*/}
      {/*      </button>*/}
      {/*    </a>*/}
      {/*  </div>*/}
      {/* </section>*/}


      <section className="relative min-h-[85svh] md:min-h-[100svh] flex flex-col items-center justify-center pt-0 bg-[#0B0B0B] overflow-hidden">

    {/* Background image */}
      <div className="absolute inset-0">
        <img
          src="/services-hero-airport-Bn7uK8eL.webp"
          alt="Premium chauffeur service Portugal"
          className="w-full h-full object-cover object-center scale-x-[-1]"
          loading="eager"
          fetchPriority="high"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-black/70 via-black/50 to-[#0B0B0B]" />
      </div>

      {/* Grid overlay */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          backgroundImage: 'repeating-linear-gradient(90deg, rgba(201,168,76,0.04) 0px, rgba(201,168,76,0.04) 1px, transparent 1px, transparent 72px)',
        }}
      />

      {/* Gold glow */}
      <div
        className="absolute top-1/3 left-1/2 -translate-x-1/2 w-[500px] h-[300px] rounded-full pointer-events-none"
        style={{ background: 'rgba(201,168,76,0.06)', filter: 'blur(70px)' }}
      />

      {/* Content */}
      <div className="container mx-auto px-6 md:px-12 relative z-10 text-center flex flex-col items-center">

        {/* Tag */}
        <div className="inline-block text-[10px] font-medium tracking-[.3em] uppercase text-[#C9A84C] border border-[#C9A84C]/30 px-4 py-1.5 mb-8">
          Luxury Chauffeur Service — Portugal
        </div>

        {/* Heading */}
        <h1 className="font-serif text-4xl md:text-6xl lg:text-7xl font-light text-[#F5F0E8] leading-[1.1] tracking-tight mb-6 max-w-4xl mx-auto">
          Travel in{' '}
          <em className="italic text-[#C9A84C]">absolute</em>
          <br />
          comfort &amp; style
        </h1>

        {/* Subtext */}
        <p className="text-[#9A9182] text-base md:text-lg leading-relaxed mb-10 max-w-xl mx-auto tracking-wide">
          Premium chauffeur service across Lisbon, Porto and the Algarve.
          Professional drivers, executive fleet, available 24/7.
        </p>

        {/* Buttons */}
        <div className="flex flex-wrap gap-3 justify-center">
          <Link
            to="/"
            className="inline-flex items-center gap-2 text-[11px] font-medium tracking-[.18em] uppercase bg-[#C9A84C] text-[#0B0B0B] px-8 py-3.5 hover:bg-[#E2C97E] transition-colors duration-200"
          >
            Reserve Your Ride
            <ArrowRight className="w-4 h-4" />
          </Link>
          <Link
            to="/"
            className="inline-flex items-center gap-2 text-[11px] font-medium tracking-[.18em] uppercase bg-transparent text-[#F5F0E8] border border-[#F5F0E8]/25 px-8 py-3.5 hover:border-[#F5F0E8]/50 transition-colors duration-200"
          >
            View Our Fleet
          </Link>
        </div>

        {/* Stats bar */}
        <div className="mt-14 w-full max-w-2xl border border-[#C9A84C]/15 grid grid-cols-4">
          {stats.map((stat, i) => (
            <div
              key={stat.label}
              className={`py-4 px-2 text-center ${i < stats.length - 1 ? 'border-r border-[#C9A84C]/15' : ''}`}
            >
              <span className="font-serif text-2xl font-light text-[#C9A84C] block">{stat.num}</span>
              <span className="text-[10px] tracking-[.18em] uppercase text-[#9A9182]">{stat.label}</span>
            </div>
          ))}
        </div>
      </div>

    </section>

      <section className="py-16 md:py-24 bg-background">
        <div className="container mx-auto px-6 md:px-12">
          <h2 className="text-3xl md:text-4xl font-bold text-primary text-center mb-12">
            Our Services
          </h2>
          <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
            {services.map((service) => {
              const Icon = service.icon

              return (
                <div
                  key={service.id}
                  className="rounded-lg border text-card-foreground shadow-sm bg-card border-border/50 hover:border-primary/30 transition-all duration-300"
                >
                  <div className="p-8 text-center">
                    <div className="w-14 h-14 mx-auto mb-5 rounded-full bg-primary/10 flex items-center justify-center">
                      <Icon className="w-7 h-7 text-primary" />
                    </div>

                    <h3 className="text-xl font-semibold text-foreground mb-3">
                      {service.title}
                    </h3>

                    <p className="text-muted-foreground leading-relaxed">
                      {service.description}
                    </p>
                  </div>
                </div>
              )
            })}
          </div>
        </div>
      </section>

      <section className="py-16 md:py-20 bg-muted/20">
        <div className="container mx-auto px-6 md:px-12 max-w-4xl">
          <h2 className="text-2xl md:text-3xl font-bold text-gradient-gold mb-6">
            Why Choose Off We Go Portugal
          </h2>
          <p className="text-lg text-muted-foreground leading-relaxed">
            Off We Go Portugal is a premium chauffeur service, offering luxury private transportation across Lisbon, Porto, and the Algarve. With a high-end Mercedes-Benz fleet, multilingual professional drivers, and 24/7 availability, we deliver an exceptional travel experience for discerning travellers, business executives, and families.
          </p>
        </div>
      </section>

      <section className="py-16 md:py-20 bg-background">
        <div className="container mx-auto px-6 md:px-12 max-w-4xl">
          <h2 className="text-2xl md:text-3xl font-bold text-gradient-gold mb-6">
            Airport Transfers Across Portugal
          </h2>
          <p className="text-lg text-muted-foreground leading-relaxed mb-6">
            We provide seamless airport transfers at Lisbon (LIS), Porto (OPO)
            and Faro (FAO) airports. Every transfer includes complimentary
            flight monitoring, 60 minutes of free waiting time, meet &amp; greet
            service and fixed prices with no hidden fees. Whether you need a
            private driver from the airport to your hotel or a long-distance
            transfer to the Algarve, our chauffeur service ensures a stress-free
            arrival.
          </p>
          <a
            className="text-primary hover:text-primary/80 font-semibold underline underline-offset-4 transition-colors"
            href="/transfers"
          >
            Airport Transfers Across Portugal →
          </a>
        </div>
      </section>

      <section className="py-16 md:py-20 bg-muted/20">
        <div className="container mx-auto px-6 md:px-12 max-w-4xl">
          <h2 className="text-2xl md:text-3xl font-bold text-gradient-gold mb-6">
            Private Tours &amp; Experiences
          </h2>
          <p className="text-lg text-muted-foreground leading-relaxed mb-6">
            Discover Portugal with a private chauffeur. Our curated tours
            include Sintra's fairy-tale palaces, the Douro Valley wine region,
            the sacred sanctuary of Fatima and the stunning Algarve coastline.
            Every tour is fully customisable — choose your itinerary, pace and
            stops. Perfect for couples, families and small groups seeking an
            authentic Portuguese experience.
          </p>
          <a
            className="text-primary hover:text-primary/80 font-semibold underline underline-offset-4 transition-colors"
            href="/tours"
          >
            Private Tours &amp; Experiences →
          </a>
        </div>
      </section>

      <section className="py-16 md:py-20 bg-background">
        <div className="container mx-auto px-6 md:px-12 max-w-4xl">
          <div className="flex items-center gap-3 mb-6">
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
              className="lucide lucide-leaf w-7 h-7 text-primary"
            >
              <path d="M11 20A7 7 0 0 1 9.8 6.1C15.5 5 17 4.48 19 2c1 2 2 4.18 2 8 0 5.5-4.78 10-10 10Z"></path>
              <path d="M2 21c0-3 1.85-5.36 5.08-6C9.5 14.52 12 13 13 12"></path>
            </svg>
            <h2 className="text-2xl md:text-3xl font-bold text-gradient-gold">
              Sustainable Electric Fleet
            </h2>
          </div>
          <p className="text-lg text-muted-foreground leading-relaxed mb-6">
            Our fleet features the latest Mercedes-Benz electric vehicles — EQS,
            EQE and EQV — alongside executive diesel options including S-Class,
            E-Class and V-Class. As a sustainable chauffeur service, we
            prioritise zero-emission transport without compromising on luxury,
            comfort or performance. Ideal for corporate clients with ESG
            requirements.
          </p>
          <a
            className="text-primary hover:text-primary/80 font-semibold underline underline-offset-4 transition-colors"
            href="/fleet"
          >
            Sustainable Electric Fleet →
          </a>
        </div>
      </section>

      <section className="py-16 md:py-20 bg-muted/20">
        <div className="container mx-auto px-6 md:px-12 max-w-4xl">
          <div className="flex items-center gap-3 mb-6">
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
              className="lucide lucide-map-pinned w-7 h-7 text-primary"
            >
              <path d="M18 8c0 3.613-3.869 7.429-5.393 8.795a1 1 0 0 1-1.214 0C9.87 15.429 6 11.613 6 8a6 6 0 0 1 12 0"></path>
              <circle cx="12" cy="8" r="2"></circle>
              <path d="M8.714 14h-3.71a1 1 0 0 0-.948.683l-2.004 6A1 1 0 0 0 3 22h18a1 1 0 0 0 .948-1.316l-2-6a1 1 0 0 0-.949-.684h-3.712"></path>
            </svg>
            <h2 className="text-2xl md:text-3xl font-bold text-gradient-gold">
              Areas We Serve
            </h2>
          </div>
          <p className="text-lg text-muted-foreground leading-relaxed">
            Our luxury chauffeur service covers all major destinations in
            Portugal: Lisbon and Greater Lisbon (Cascais, Sintra, Estoril),
            Porto and Northern Portugal (Douro Valley, Braga, Guimarães), the
            Algarve (Faro, Albufeira, Vilamoura, Lagos, Tavira), and Central
            Portugal (Coimbra, Évora, Óbidos, Nazaré). We also offer
            cross-border transfers to Spain.
          </p>
        </div>
      </section>

      {/*  Testimonial */}
      <section className="py-16 md:py-24 bg-card/50">
        <div className="container mx-auto px-6 md:px-12">
          <h2 className="text-2xl md:text-3xl font-bold text-center text-foreground mb-12">
            What our clients say
          </h2>

          <ReviewsSection/>
        </div>
      </section>

      <section className="py-16 md:py-24 bg-background">
        <div className="container mx-auto px-6 md:px-12">
          <h2 className="text-3xl md:text-4xl font-bold text-primary text-center mb-12">
            Our Premium Fleet
          </h2>

          <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
            {fleet.map((car) => (
              <div
                key={car.id}
                className="rounded-lg border text-card-foreground shadow-sm bg-card border-border/50 overflow-hidden group hover:border-primary/30 transition-all duration-300"
              >
                <div className="relative h-48 overflow-hidden">
                  <img
                    src={car.image}
                    alt={car.name}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    loading="lazy"
                  />

                  {/* TAGS */}
                  <div className="absolute top-3 right-3 flex flex-col gap-1.5">
                    {car.tags.map((tag, index) => (
                      <span
                        key={index}
                        className={`text-xs font-semibold px-3 py-1 rounded-full flex items-center gap-1
                    ${
                          tag.variant === "primary"
                            ? "bg-primary/90 text-primary-foreground"
                            : "bg-foreground/70 text-background"
                        }`}
                      >
                  <Icon icon={tag.icon} className="w-3 h-3" />
                        {tag.label}
                </span>
                    ))}
                  </div>
                </div>

                <div className="p-5 text-center">
                  <h3 className="text-lg font-semibold text-foreground">
                    {car.name}
                  </h3>
                </div>
              </div>
            ))}
          </div>

          <div className="text-center mt-10">
            <a href="/fleet">
              <button className="inline-flex items-center gap-2 border bg-background h-11 rounded-md px-8 border-primary text-primary hover:bg-primary hover:text-primary-foreground transition-all duration-300">
                View All Fleet
                <Icon icon="mdi:arrow-right" className="w-4 h-4" />
              </button>
            </a>
          </div>
        </div>
      </section>


    </motion.div>
  )
}

export const Route = createFileRoute('/_public/')({
  component: App,
})
