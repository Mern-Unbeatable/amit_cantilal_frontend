import { Star } from "lucide-react"
import { useTranslation } from "react-i18next"
import { googleReviews } from "@/data/reviews"

function StarRating({ rating }: { rating: number }) {
  return (
    <div className="flex items-center gap-0.5">
      {Array.from({ length: 5 }).map((_, i) => (
        <Star
          key={i}
          className={`w-3.5 h-3.5 ${i < rating ? "fill-[#C9A84C] text-[#C9A84C]" : "text-[#9A9182]"}`}
        />
      ))}
    </div>
  )
}

export function ReviewsSection() {
  const { t } = useTranslation()
  return (
    <section className="bg-[#0B0B0B] py-16 md:py-24">
      <div className="container mx-auto px-4 md:px-12 max-w-6xl">

        {/* Header */}
        <div className="mb-10 md:mb-14">
          <div className="tag-gold mb-3">{t('reviews.tag')}</div>
          <h2 className="font-serif text-2xl md:text-4xl font-light text-white">
            {t('reviews.title')}
          </h2>
          <div className="flex items-center gap-2 mt-3">
            <StarRating rating={5} />
            <span className="text-xs text-[#9A9182]">5.0 · {googleReviews.length} {t('reviews.reviewsSuffix')}</span>
          </div>
        </div>

        {/* Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {googleReviews.map((review) => (
            <div
              key={review.name}
              className="bg-[#141414] border border-[#C9A84C]/12 p-5 md:p-6 flex flex-col gap-4"
            >
              {/* Top row */}
              <div className="flex items-start justify-between gap-3">
                <div className="flex items-center gap-3">
                  {/* Avatar initial */}
                  <div className="w-9 h-9 rounded-full bg-[#C9A84C]/15 border border-[#C9A84C]/20 flex items-center justify-center flex-shrink-0">
                    <span className="text-xs font-medium text-[#C9A84C]">
                      {review.name.charAt(0)}
                    </span>
                  </div>
                  <div>
                    <p className="text-sm text-white/90 font-medium leading-tight">{review.name}</p>
                    <p className="text-[11px] text-[#9A9182] mt-0.5">
                      {review.isLocalGuide ? `${t('reviews.localGuide')} · ` : ""}
                      {review.reviewCount ? `${review.reviewCount} review${review.reviewCount > 1 ? "s" : ""}` : ""}
                    </p>
                  </div>
                </div>
                {/* Google G */}
                <svg className="w-4 h-4 flex-shrink-0 mt-0.5" viewBox="0 0 24 24">
                  <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
                  <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
                  <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l3.66-2.84z"/>
                  <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
                </svg>
              </div>

              {/* Stars + date */}
              <div className="flex items-center gap-2">
                <StarRating rating={review.rating} />
                <span className="text-[11px] text-[#9A9182]">{review.timeAgo}</span>
              </div>

              {/* Text */}
              <p className="text-sm text-white/60 font-light leading-relaxed flex-1">
                "{review.text}"
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}