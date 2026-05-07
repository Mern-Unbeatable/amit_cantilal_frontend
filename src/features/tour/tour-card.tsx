import { Link } from '@tanstack/react-router'
import { ArrowRight, Clock, MessageCircle } from 'lucide-react'
import Autoplay from 'embla-carousel-autoplay'
import { useRef } from 'react'
import type { Tour } from '@/features/tour/tour.types.ts'
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from '@/components/ui/carousel'

export function TourCard({ tour }: { tour: Tour }) {
  const autoplayPlugin = useRef(
    Autoplay({ delay: 4000, stopOnInteraction: false }),
  )

  const images = tour.images ?? []

  return (
    <div className="group bg-[#141414] border border-[#C9A84C]/12 hover:border-[#C9A84C]/35 transition-colors duration-200 flex flex-col h-full">
      {/* Image carousel */}
      <div className="relative h-36 md:h-56 flex-shrink-0 overflow-hidden">
        {images.length > 1 ? (
          <Carousel
            className="w-full h-full"
            plugins={[autoplayPlugin.current]}
            opts={{ loop: true }}
          >
            <CarouselContent className="h-full ml-0">
              {images.map((img, i) => (
                <CarouselItem key={i} className="h-full pl-0">
                  <img
                    src={img.url}
                    alt={img.alt ?? tour.title}
                    loading="lazy"
                    className="w-full h-full object-cover"
                  />
                </CarouselItem>
              ))}
            </CarouselContent>
            <CarouselPrevious className="left-2 h-7 w-7 border-0 bg-black/40 hover:bg-black/60 text-white opacity-0 group-hover:opacity-100 transition-opacity" />
            <CarouselNext className="right-2 h-7 w-7 border-0 bg-black/40 hover:bg-black/60 text-white opacity-0 group-hover:opacity-100 transition-opacity" />
          </Carousel>
        ) : images.length === 1 ? (
          <img
            src={images[0].url}
            alt={images[0].alt ?? tour.title}
            loading="lazy"
            className="w-full h-full object-cover"
          />
        ) : (
          <div className="w-full h-full bg-[#1C1C1C]" />
        )}

        {/* Gradient + title overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-[#0B0B0B] via-[#0B0B0B]/75 to-transparent pointer-events-none" />
        <div className="absolute bottom-2 md:bottom-4 left-3 md:left-4 right-3 md:right-4 pointer-events-none">
          <h3 className="font-serif font-semibold text-base md:text-2xl text-gradient-gold mb-1 md:mb-2 line-clamp-2">
            {tour.title}
          </h3>
          {tour.duration && (
            <p className="flex items-center gap-1.5 text-xs md:text-sm text-white/70">
              <Clock
                className="w-3 h-3 md:w-4 md:h-4 flex-shrink-0"
                strokeWidth={1.5}
              />
              {tour.duration}
            </p>
          )}
        </div>
      </div>

      {/* Content */}
      <div className="p-3 md:p-6 flex flex-col flex-1">
        <p className="text-xs md:text-sm text-[#9A9182] leading-relaxed line-clamp-2 md:line-clamp-3 flex-1 mb-4">
          {tour.excerpt ?? tour.description}
        </p>

        <div className="mt-auto space-y-2 md:space-y-3">
          {/* Price */}
          {tour.price && (
            <p className="font-serif text-sm md:text-xl text-gradient-gold font-light">
              From €{(tour.price / 100).toLocaleString()}
            </p>
          )}

          {/* CTA */}
          {tour.category === 'on_demand' ? (
            <a
              href="https://wa.me/351914578214"
              target="_blank"
              rel="noopener noreferrer"
              className="w-full flex items-center justify-center gap-2 border border-[#C9A84C]/30 hover:border-[#C9A84C] hover:bg-[#C9A84C]/10 text-[#C9A84C] transition-colors duration-200 py-2 md:py-2.5 text-xs md:text-sm"
            >
              <MessageCircle className="w-3.5 h-3.5" strokeWidth={1.5} />
              Chat on WhatsApp
            </a>
          ) : (
            <Link
              to="/tours/$slug"
              params={{ slug: tour.slug ?? '' }}
              className="w-full flex items-center justify-center gap-2 bg-[#C9A84C] hover:bg-[#C9A84C]/90 text-[#0B0B0B] transition-colors duration-200 py-2 md:py-2.5 text-xs md:text-sm font-medium"
            >
              Book Now
              <ArrowRight className="w-3.5 h-3.5" strokeWidth={2} />
            </Link>
          )}
        </div>
      </div>
    </div>
  )
}
