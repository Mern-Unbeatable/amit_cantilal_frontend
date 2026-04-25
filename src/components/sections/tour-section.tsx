import type {Tour} from "@/features/tour/tour.types.ts";
import {TourCard} from "@/features/tour/tour-card.tsx";

const MOCK_TOURS: Array<Tour> = [
  {
    id: "1",
    slug: "on-demand",
    title: "On Demand Tour",
    images: [{ src: "/sintra-tour-tS9PJJsU.webp", alt: "On Demand Tour" }],
    duration: "Flexible",
    description:
      "Create your perfect journey with our fully customizable private tour service. Tell us your dreams, and we will make them happen.",
    isOnDemand: true,
  },
  {
    id: "2",
    slug: "lisbon-porto",
    title: "Tour Lisbon to/from Porto",
    images: [
      { src: "/sintra-tour-tS9PJJsU.webp", alt: "Lisbon" },
      { src: "/sintra-tour-tS9PJJsU.webp", alt: "Porto" },
    ],
    duration: "Full Day",
    departureFrom: "From Lisbon or Porto",
    description:
      "Travel in luxury from Lisbon to Porto with stops at historic towns. Choose 2 stops: Óbidos, Nazaré, Fátima, Coimbra, or Aveiro.",
    price: 650,
  },
  {
    id: "3",
    slug: "lisbon-algarve",
    title: "Tour Lisbon to/from Algarve",
    images: [
      { src: "/sintra-tour-tS9PJJsU.webp", alt: "Lisbon" },
      { src: "/sintra-tour-tS9PJJsU.webp", alt: "Algarve" },
    ],
    duration: "Full Day",
    departureFrom: "Lisbon or Algarve",
    description:
      "Discover the stunning Algarve coast with its golden beaches, dramatic cliffs, and charming fishing villages.",
    price: 500,
  },
  {
    id: "4",
    slug: "lisbon-evora",
    title: "Tour Lisbon to/from Évora",
    images: [{ src: "/sintra-tour-tS9PJJsU.webp", alt: "Évora" }],
    duration: "8 Hours",
    departureFrom: "Lisbon or Évora",
    description:
      "Explore the UNESCO World Heritage city of Évora and the beautiful Alentejo region with wine tasting options.",
    price: 400,
  },
  {
    id: "5",
    slug: "sintra-magic",
    title: "Sintra Magic",
    images: [
      { src: "/sintra-tour-tS9PJJsU.webp", alt: "Sintra Palace" },
      { src: "/sintra-tour-tS9PJJsU.webp", alt: "Sintra Coast" },
      { src: "/sintra-tour-tS9PJJsU.webp", alt: "Sintra Tour" },
    ],
    duration: "8 Hours",
    departureFrom: "From Lisbon",
    description:
      "Visit the fairytale palaces and mystical gardens of Sintra, a UNESCO World Heritage Site.",
    price: 350,
  },
  {
    id: "6",
    slug: "sintra-golden-coast",
    title: "Sintra & Golden Coast",
    images: [
      { src: "/sintra-tour-tS9PJJsU.webp", alt: "Cascais" },
      { src: "/sintra-tour-tS9PJJsU.webp", alt: "Estoril" },
      { src: "/sintra-tour-tS9PJJsU.webp", alt: "Sintra" },
    ],
    duration: "8 Hours",
    departureFrom: "From Lisbon",
    description:
      "Combine the magic of Sintra with the beautiful Cascais and Estoril coastal towns.",
    price: 350,
  },
  {
    id: "7",
    slug: "fatima-sanctuary",
    title: "Fátima Sanctuary",
    images: [
      { src: "/sintra-tour-tS9PJJsU.webp", alt: "Fátima" },
      { src: "/sintra-tour-tS9PJJsU.webp", alt: "Fátima Shrine" },
    ],
    duration: "6 Hours",
    departureFrom: "From Lisbon",
    description:
      "Visit the world-famous Sanctuary of Fátima, one of the most important pilgrimage sites.",
    price: 320,
  },
  {
    id: "8",
    slug: "nazare-obidos",
    title: "Nazaré & Óbidos",
    images: [
      { src: "/sintra-tour-tS9PJJsU.webp", alt: "Nazaré" },
      { src: "/sintra-tour-tS9PJJsU.webp", alt: "Óbidos" },
    ],
    duration: "8 Hours",
    departureFrom: "From Lisbon",
    description:
      "Visit the famous surf town of Nazaré and the medieval walled town of Óbidos.",
    price: 350,
  },
  {
    id: "9",
    slug: "porto-city-tour",
    title: "Porto City Tour",
    images: [
      { src: "/sintra-tour-tS9PJJsU.webp", alt: "Porto" },
      { src: "/sintra-tour-tS9PJJsU.webp", alt: "Porto Ribeira" },
    ],
    duration: "Full Day",
    departureFrom: "From Porto",
    description:
      "Discover the charming city of Porto with its historic center, wine cellars, and riverside views.",
    price: 330,
  },
  {
    id: "10",
    slug: "douro-valley",
    title: "Douro Valley Wine Tour",
    images: [
      { src: "/sintra-tour-tS9PJJsU.webp", alt: "Douro Valley" },
      { src: "/sintra-tour-tS9PJJsU.webp", alt: "Douro Tour" },
    ],
    duration: "Full Day",
    departureFrom: "From Lisbon or Porto",
    description:
      "Experience the stunning Douro Valley with wine tastings at prestigious quintas.",
    price: 400,
  },
];

interface ToursSectionProps {
  tours?: Array<Tour>;
}

export function ToursSection({ tours = MOCK_TOURS }: ToursSectionProps) {
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
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 md:gap-6 max-w-7xl mx-auto">
          {tours.map((tour) => (
            <TourCard key={tour.id} tour={tour} />
          ))}
        </div>

      </div>
    </section>
  );
}