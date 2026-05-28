import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from '@/components/ui/carousel.tsx'
import { formatCurrency } from '@/lib/utils.ts'

type BookingSummaryImage = {
  originalUrl: string
  description?: string | null
}

type BookingSummaryProps = {
  title?: string
  date?: Date
  adults: number
  price: number
  total: number
  images: Array<BookingSummaryImage>
}

export function BookingSummary({
  title,
  date,
  adults,
  price,
  total,
  images,
}: BookingSummaryProps) {

  return (
    <div className="bg-black-2 border border-gold/12 p-5 md:p-6 space-y-4 sticky top-28">
      <div className="w-8 h-0.5 bg-gold mb-4" />

      <p className="font-serif text-sm text-gold">Booking Summary</p>

      <div className="relative shrink-0 overflow-hidden">
        {images.length > 1 ? (
          <Carousel className="w-full h-full">
            <CarouselContent className="h-full ml-0">
              {images.map((img, i) => (
                <CarouselItem key={i} className="h-full pl-0">
                  <img
                    src={img.originalUrl}
                    alt={img.description ?? title}
                    loading="lazy"
                    className="w-full h-full object-cover"
                  />
                </CarouselItem>
              ))}
            </CarouselContent>

            <CarouselPrevious className="left-2 h-7 w-7 border-0 bg-black/40 hover:bg-black/60 text-white opacity-0 group-hover:opacity-100 transition-opacity" />

            <CarouselNext className="right-2 h-7 w-7 border-0 bg-black/40 hover:bg-black/60 text-white opacity-0 group-hover:opacity-100 transition-opacity" />
          </Carousel>
        ) : (
          <img
            src={images[0].originalUrl}
            alt={images[0].description ?? title}
            loading="lazy"
            className="w-full h-full object-cover"
          />
        )}
      </div>

      <div className="space-y-2 pt-1">
        <p className="text-sm text-white/80 font-light leading-snug">{title}</p>

        {date && (
          <div className="flex justify-between text-xs">
            <span className="text-white-dim">Date</span>

            <span className="text-white/70">
              {date.toLocaleDateString('en-GB', {
                day: 'numeric',
                month: 'short',
                year: 'numeric',
              })}
            </span>
          </div>
        )}

        <div className="flex justify-between text-xs">
          <span className="text-white-dim">Adults</span>

          <span className="text-white/70">{adults}</span>
        </div>

        <div className="flex justify-between text-xs">
          <span className="text-white-dim">Price per person</span>

          <span className="text-white/70">{formatCurrency(price)}</span>
        </div>
      </div>

      <div className="border-t border-gold/10 pt-3 flex justify-between items-center">
        <span className="text-xs text-white-dim">Total</span>

        <span className="font-serif text-lg text-gradient-gold">
          {formatCurrency(total)}
        </span>
      </div>
    </div>
  )
}
