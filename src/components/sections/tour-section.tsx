import type {Tour} from "@/features/tour/tour.types.ts";
import {TourCard} from "@/features/tour/tour-card.tsx";

interface ToursSectionProps {
  tours: Array<Tour>;
}

export function ToursSection({ tours }: ToursSectionProps) {
  return (
    <section className="py-10 md:py-24 bg-[#0B0B0B]">
      <div className="container mx-auto px-4 md:px-12">

        {/* Header */}
        <div className="text-center mb-8 md:mb-16">
          <div className="tag-gold mb-4">Experiences</div>
          <h2 className="font-serif text-2xl md:text-5xl lg:text-6xl font-light text-gradient-gold mb-3 md:mb-6">
            Available <em className="italic">Tours</em>
          </h2>
          <p className="text-sm md:text-xl text-[#9A9182] max-w-2xl mx-auto">
            Choose from our curated selection of exclusive private tours across Portugal.
          </p>
        </div>

        {/* Grid */}
        {tours.length > 0 ? (
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 md:gap-6 max-w-7xl mx-auto">
            {tours.map((tour) => (
              <TourCard key={tour.id} tour={tour} />
            ))}
          </div>
        ) : (
          <div className="max-w-3xl mx-auto border border-[#C9A84C]/20 bg-[#141414] px-6 py-8 text-center">
            <p className="text-sm md:text-base text-[#9A9182]">
              Tours are temporarily unavailable. Please try again in a moment.
            </p>
          </div>
        )}

      </div>
    </section>
  );
}