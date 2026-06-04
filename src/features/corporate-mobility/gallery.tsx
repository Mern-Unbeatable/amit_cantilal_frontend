export function CorporateGallery() {
  return (
    <section className="py-24 bg-[#0B0B0B]">
      <div className="container mx-auto px-6 lg:px-12 max-w-6xl">
        <div className="grid md:grid-cols-2 gap-6 lg:gap-10">
          <div className="aspect-[4/5] overflow-hidden">
            <img
              src="/s-class.png"
              alt="Corporate Mobility — Elite Ride private chauffeur"
              className="w-full h-full object-cover hover:scale-105 transition-transform duration-[1400ms] ease-out"
              loading="lazy"
            />
          </div>
          <div className="aspect-[4/5] overflow-hidden">
            <img
              src="/v-class.png"
              alt="Corporate Mobility — Elite Ride private chauffeur fleet"
              className="w-full h-full object-cover hover:scale-105 transition-transform duration-[1400ms] ease-out"
              loading="lazy"
            />
          </div>
        </div>
      </div>
    </section>
  )
}
