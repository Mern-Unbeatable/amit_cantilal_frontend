export function EventsGallery() {
  return (
    <section className="py-24 bg-[#0B0B0B]">
      <div className="container mx-auto px-6 lg:px-12 max-w-6xl">
        <div className="grid md:grid-cols-2 gap-6 lg:gap-10">
          <div className="overflow-hidden">
            <img
              src="/e-class.png"
              alt="Special Events — Elite Ride private chauffeur"
              className="w-full h-full object-cover hover:scale-105 transition-transform duration-[1400ms] ease-out"
              loading="lazy"
            />
          </div>
          <div className="overflow-hidden">
            <img
              src="/sprinter.jpg"
              alt="Special Events — Elite Ride private chauffeur fleet"
              className="w-full h-full object-cover hover:scale-105 transition-transform duration-[1400ms] ease-out"
              loading="lazy"
            />
          </div>
        </div>
      </div>
    </section>
  )
}
