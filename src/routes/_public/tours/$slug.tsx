import { Link, createFileRoute, notFound } from '@tanstack/react-router'
import {useState} from "react";
import {motion} from "framer-motion";
import { ArrowLeft, Check, Clock, Minus, Plus } from 'lucide-react'
import {mainTransitionProps} from "@/lib/utils.ts";
import {Button} from "@/components/ui/button.tsx";
import {Input} from "@/components/ui/input.tsx";
import {Textarea} from "@/components/ui/textarea.tsx";
import { Calendar } from "@/components/ui/calendar";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from '@/components/ui/carousel.tsx'
import {getTourBySlug} from "@/data/tour.ts";

export const Route = createFileRoute('/_public/tours/$slug')({
  loader: ({ params }) => {
    const tour = getTourBySlug(params.slug)
    if (!tour) throw notFound()
    return tour
  },
  component: RouteComponent,
})

const STEPS = ["Date & Guests", "Your Details", "Payment"];

function RouteComponent() {

  const TOUR = Route.useLoaderData()

  // Parse price from "EUR 1440.00" → 1440
  const price = parseFloat(TOUR.data.defaultPrice.replace(/[^0-9.]/g, ''))

  const [step, setStep] = useState(0);
  const [date, setDate] = useState<Date | undefined>();
  const [adults, setAdults] = useState(1);
  const [form, setForm] = useState({
    name: "",
    email: "",
    phone: "",
    notes: "",
  });

  // eslint-disable-next-line @typescript-eslint/no-unnecessary-condition
  const total = (price ?? 0) * adults;

  const canProceedStep0 = !!date && adults >= 1;
  const canProceedStep1 =
    form.name.trim() !== "" &&
    form.email.trim() !== "" &&
    form.phone.trim() !== "";

  const images = TOUR.data.otherPhotos

  return (
    <motion.div {...mainTransitionProps}>
      <div className="min-h-screen bg-[#0B0B0B] pt-20 md:pt-24 pb-16 md:pb-24">
        <div className="container mx-auto px-4 md:px-12 max-w-5xl">

          {/* Back */}
          <Link
            to="/tours"
            className="inline-flex items-center gap-2 text-xs text-[#9A9182] hover:text-[#C9A84C] transition-colors mb-8 md:mb-12"
          >
            <ArrowLeft className="w-3.5 h-3.5" strokeWidth={1.5} />
            Back to Tours
          </Link>

          {/* Page title */}
          <div className="mb-8 md:mb-12">
            <div className="tag-gold mb-3">Book Your Experience</div>
            <h1 className="font-serif text-2xl md:text-4xl font-light text-white leading-snug">
              {TOUR.data.title}
            </h1>
            <div className="flex items-center gap-4 mt-2">
              <span className="flex items-center gap-1.5 text-xs text-[#9A9182]">
                <Clock className="w-3.5 h-3.5" strokeWidth={1.5} />
                {TOUR.data.durationText}
              </span>
            </div>
          </div>

          {/* Step indicator */}
          <div className="flex items-center gap-0 mb-10 md:mb-14">
            {STEPS.map((label, i) => (
              <div key={label} className="flex items-center flex-1 last:flex-none">
                <div className="flex items-center gap-2 md:gap-3">
                  <div
                    className={`w-7 h-7 md:w-8 md:h-8 flex items-center justify-center text-xs font-medium transition-colors duration-200 flex-shrink-0 ${
                      i < step
                        ? "bg-[#C9A84C] text-[#0B0B0B]"
                        : i === step
                          ? "border border-[#C9A84C] text-[#C9A84C]"
                          : "border border-[#C9A84C]/20 text-[#9A9182]"
                    }`}
                  >
                    {i < step ? <Check className="w-3.5 h-3.5" strokeWidth={2.5} /> : i + 1}
                  </div>
                  <span
                    className={`text-xs md:text-sm hidden sm:block transition-colors duration-200 ${
                      i === step ? "text-white" : "text-[#9A9182]"
                    }`}
                  >
                    {label}
                  </span>
                </div>
                {i < STEPS.length - 1 && (
                  <div className={`flex-1 h-px mx-3 md:mx-4 transition-colors duration-200 ${i < step ? "bg-[#C9A84C]" : "bg-[#C9A84C]/15"}`} />
                )}
              </div>
            ))}
          </div>

          {/* Main layout */}
          <div className="grid md:grid-cols-3 gap-6 md:gap-10 items-start">

            {/* Step content */}
            <div className="md:col-span-2">

              {/* ── Step 0: Date & Guests ── */}
              {step === 0 && (
                <div className="bg-[#141414] border border-[#C9A84C]/12 p-5 md:p-8 space-y-8">
                  <div>
                    <p className="font-serif text-sm md:text-base text-[#C9A84C] mb-4">
                      Select a Date
                    </p>
                    <Calendar
                      mode="single"
                      selected={date}
                      onSelect={setDate}
                      disabled={{ before: new Date() }}
                      className="bg-transparent text-white w-full [&_.rdp-day_button:hover]:bg-[#C9A84C]/20 [&_.rdp-day_button.rdp-day_selected]:bg-[#C9A84C] [&_.rdp-day_button.rdp-day_selected]:text-[#0B0B0B]"
                    />
                  </div>

                  <div className="border-t border-[#C9A84C]/10 pt-6">
                    <p className="font-serif text-sm md:text-base text-[#C9A84C] mb-4">
                      Guests
                    </p>
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-sm text-white/80">Adults</p>
                        <p className="text-xs text-[#9A9182]">Age 18+</p>
                      </div>
                      <div className="flex items-center gap-4">
                        <button
                          onClick={() => setAdults((a) => Math.max(1, a - 1))}
                          className="w-8 h-8 border border-[#C9A84C]/30 hover:border-[#C9A84C] text-[#C9A84C] flex items-center justify-center transition-colors"
                        >
                          <Minus className="w-3.5 h-3.5" strokeWidth={2} />
                        </button>
                        <span className="text-white font-medium w-4 text-center tabular-nums">
                          {adults}
                        </span>
                        <button
                          onClick={() => setAdults((a) => a + 1)}
                          className="w-8 h-8 border border-[#C9A84C]/30 hover:border-[#C9A84C] text-[#C9A84C] flex items-center justify-center transition-colors"
                        >
                          <Plus className="w-3.5 h-3.5" strokeWidth={2} />
                        </button>
                      </div>
                    </div>
                  </div>

                  <Button
                    onClick={() => setStep(1)}
                    disabled={!canProceedStep0}
                    className="w-full bg-[#C9A84C] hover:bg-[#C9A84C]/90 text-[#0B0B0B] font-medium rounded-none h-11"
                  >
                    Continue
                  </Button>
                </div>
              )}

              {/* ── Step 1: Your Details ── */}
              {step === 1 && (
                <div className="bg-[#141414] border border-[#C9A84C]/12 p-5 md:p-8 space-y-5">
                  <p className="font-serif text-sm md:text-base text-[#C9A84C] mb-2">
                    Your Details
                  </p>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-1.5">
                      <label className="text-xs text-[#9A9182]">Full Name *</label>
                      <Input
                        value={form.name}
                        onChange={(e) => setForm({ ...form, name: e.target.value })}
                        placeholder="John Smith"
                        className="bg-[#0B0B0B] border-[#C9A84C]/20 focus:border-[#C9A84C] rounded-none text-white placeholder:text-[#9A9182]/50 h-11"
                      />
                    </div>
                    <div className="space-y-1.5">
                      <label className="text-xs text-[#9A9182]">Email Address *</label>
                      <Input
                        type="email"
                        value={form.email}
                        onChange={(e) => setForm({ ...form, email: e.target.value })}
                        placeholder="john@example.com"
                        className="bg-[#0B0B0B] border-[#C9A84C]/20 focus:border-[#C9A84C] rounded-none text-white placeholder:text-[#9A9182]/50 h-11"
                      />
                    </div>
                  </div>

                  <div className="space-y-1.5">
                    <label className="text-xs text-[#9A9182]">Phone Number *</label>
                    <Input
                      type="tel"
                      value={form.phone}
                      onChange={(e) => setForm({ ...form, phone: e.target.value })}
                      placeholder="+351 900 000 000"
                      className="bg-[#0B0B0B] border-[#C9A84C]/20 focus:border-[#C9A84C] rounded-none text-white placeholder:text-[#9A9182]/50 h-11"
                    />
                  </div>

                  <div className="space-y-1.5">
                    <label className="text-xs text-[#9A9182]">Special Requests</label>
                    <Textarea
                      value={form.notes}
                      onChange={(e) => setForm({ ...form, notes: e.target.value })}
                      placeholder="Any special requirements or requests..."
                      className="bg-[#0B0B0B] border-[#C9A84C]/20 focus:border-[#C9A84C] rounded-none text-white placeholder:text-[#9A9182]/50 min-h-[100px] resize-none"
                    />
                  </div>

                  <div className="flex gap-3 pt-2">
                    <Button
                      onClick={() => setStep(0)}
                      variant="outline"
                      className="flex-1 border-[#C9A84C]/20 bg-transparent text-[#9A9182] hover:text-white hover:border-[#C9A84C]/50 rounded-none h-11"
                    >
                      Back
                    </Button>
                    <Button
                      onClick={() => setStep(2)}
                      disabled={!canProceedStep1}
                      className="flex-1 bg-[#C9A84C] hover:bg-[#C9A84C]/90 text-[#0B0B0B] font-medium rounded-none h-11"
                    >
                      Continue
                    </Button>
                  </div>
                </div>
              )}

              {/* ── Step 2: Payment ── */}
              {step === 2 && (
                <div className="bg-[#141414] border border-[#C9A84C]/12 p-5 md:p-8 space-y-6">
                  <p className="font-serif text-sm md:text-base text-[#C9A84C]">
                    Payment
                  </p>

                  <div className="space-y-4">
                    <div className="space-y-1.5">
                      <label className="text-xs text-[#9A9182]">Card Details</label>
                      <div
                        id="stripe-card-element"
                        className="bg-[#0B0B0B] border border-[#C9A84C]/20 p-3.5 h-11 flex items-center"
                      >
                        <span className="text-xs text-[#9A9182]/50">
                          Stripe card element mounts here
                        </span>
                      </div>
                    </div>
                  </div>

                  <p className="text-[10px] text-[#9A9182]/60 flex items-center gap-1.5">
                    <svg className="w-3 h-3" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M5 9V7a5 5 0 0110 0v2a2 2 0 012 2v5a2 2 0 01-2 2H5a2 2 0 01-2-2v-5a2 2 0 012-2zm8-2v2H7V7a3 3 0 016 0z" clipRule="evenodd" />
                    </svg>
                    Payments are secured and encrypted by Stripe
                  </p>

                  <div className="flex gap-3">
                    <Button
                      onClick={() => setStep(1)}
                      variant="outline"
                      className="flex-1 border-[#C9A84C]/20 bg-transparent text-[#9A9182] hover:text-white hover:border-[#C9A84C]/50 rounded-none h-11"
                    >
                      Back
                    </Button>
                    <Button
                      className="flex-1 bg-[#C9A84C] hover:bg-[#C9A84C]/90 text-[#0B0B0B] font-medium rounded-none h-11"
                    >
                      Pay €{total.toLocaleString()}
                    </Button>
                  </div>
                </div>
              )}
            </div>

            {/* Booking summary sidebar */}
            <div className="bg-[#141414] border border-[#C9A84C]/12 p-5 md:p-6 space-y-4 sticky top-28">
              <div className="w-8 h-0.5 bg-[#C9A84C] mb-4" />
              <p className="font-serif text-sm text-[#C9A84C]">Booking Summary</p>

              <div className="relative flex-shrink-0 overflow-hidden">
                {images.length > 1 ? (
                  <Carousel className="w-full h-full">
                    <CarouselContent className="h-full ml-0">
                      {images.map((img, i) => (
                        <CarouselItem key={i} className="h-full pl-0">
                          <img
                            src={img.originalUrl}

                            alt=""
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
                    alt=""
                    loading="lazy"
                    className="w-full h-full object-cover"
                  />
                )}
              </div>

              <div className="space-y-2 pt-1">
                <p className="text-sm text-white/80 font-light leading-snug">{TOUR.data.title}</p>

                {date && (
                  <div className="flex justify-between text-xs">
                    <span className="text-[#9A9182]">Date</span>
                    <span className="text-white/70">
                      {date.toLocaleDateString("en-GB", {
                        day: "numeric",
                        month: "short",
                        year: "numeric",
                      })}
                    </span>
                  </div>
                )}

                <div className="flex justify-between text-xs">
                  <span className="text-[#9A9182]">Adults</span>
                  <span className="text-white/70">{adults}</span>
                </div>

                {price && (
                  <div className="flex justify-between text-xs">
                    <span className="text-[#9A9182]">Price per person</span>
                    <span className="text-white/70">€{price.toLocaleString()}</span>
                  </div>
                )}
              </div>

              <div className="border-t border-[#C9A84C]/10 pt-3 flex justify-between items-center">
                <span className="text-xs text-[#9A9182]">Total</span>
                <span className="font-serif text-lg text-gradient-gold">
                  €{total.toLocaleString()}
                </span>
              </div>
            </div>

          </div>
        </div>
      </div>
    </motion.div>
  )
}