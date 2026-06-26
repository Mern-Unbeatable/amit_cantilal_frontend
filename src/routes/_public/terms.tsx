import { createFileRoute } from '@tanstack/react-router'
import { motion } from 'framer-motion'
import {
  AlertTriangle,
  Baby,
  Banknote,
  Building2,
  CalendarClock,
  Car,
  CloudLightning,
  FileText,
  Gavel,
  Luggage,
  MapPin,
  Mail,
  ShieldCheck,
  Ticket,
  Users,
  Wallet,
} from 'lucide-react'
import { mainTransitionProps } from '@/lib/utils.ts'

export const Route = createFileRoute('/_public/terms')({
  component: RouteComponent,
})

interface SectionCardProps {
  icon: React.ReactNode;
  title: string;
  children: React.ReactNode;
  delay?: number;
}

function SectionCard({ icon, title, children, delay = 0 }: SectionCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 12 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-80px' }}
      transition={{ duration: 0.5, delay }}
    >
      <div className="bg-card/60 border border-border rounded-xl md:rounded-2xl p-6 md:p-10">
        <div className="flex items-center gap-3 mb-6 md:mb-8">
          <div className="w-6 h-6 md:w-8 md:h-8 text-primary flex-shrink-0">
            {icon}
          </div>
          <h2 className="text-xl md:text-3xl font-bold text-foreground">
            {title}
          </h2>
        </div>
        <div className="space-y-4 text-sm md:text-base text-foreground/90 leading-relaxed">
          {children}
        </div>
      </div>
    </motion.div>
  )
}

function RouteComponent() {
  return (
    <motion.div {...mainTransitionProps}>
      <section className="py-16 md:py-24 bg-gradient-to-b from-muted/30 to-background">
        <div className="container mx-auto px-4 md:px-12 text-center">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
          >
            <div className="flex items-center justify-center gap-3 mb-6">
              <div className="w-12 h-12 md:w-16 md:h-16 bg-primary/10 rounded-xl flex items-center justify-center">
                <FileText className="w-6 h-6 md:w-8 md:h-8 text-primary" />
              </div>
            </div>
            <h1 className="text-3xl md:text-5xl lg:text-6xl font-bold text-gradient-gold mb-4">
              Terms &amp; Conditions
            </h1>
            <p className="text-sm md:text-lg text-foreground/70 max-w-2xl mx-auto">
              Please read these Terms &amp; Conditions carefully before booking
              or using any service provided by Off We Go Portugal.
            </p>
          </motion.div>
        </div>
      </section>

      <section className="pb-16 md:pb-32">
        <div className="container mx-auto px-4 md:px-12">
          <div className="max-w-4xl mx-auto space-y-8 md:space-y-16">
            {/* 1. Company Information */}
            <SectionCard
              icon={<Building2 className="w-full h-full" />}
              title="1. Company Information"
            >
              <p>
                Off We Go Portugal is the trading name and commercial brand of{' '}
                <strong>
                  LEAPOFSTARS - MANAGEMENT, PRODUCTIONS &amp; TRAVEL LDA.
                </strong>
                , a company duly incorporated and registered in Portugal.
              </p>
              <p className="font-semibold text-foreground pt-2">
                Registered Company Name
              </p>
              <p>LEAPOFSTARS - MANAGEMENT, PRODUCTIONS &amp; TRAVEL LDA.</p>
              <p className="font-semibold text-foreground pt-2">
                VAT Number
              </p>
              <p>PT516863452</p>
              <p className="font-semibold text-foreground pt-2">
                Registered Office
              </p>
              <p>
                Rua Dom João V, Nº 24 – 1.03
                <br />
                1250-091 Lisbon, Portugal
              </p>
              <p>
                Throughout these Terms &amp; Conditions, references to
                "Off We Go Portugal", "we", "our", or "us" shall refer to
                LEAPOFSTARS - MANAGEMENT, PRODUCTIONS &amp; TRAVEL LDA.
              </p>
            </SectionCard>

            {/* 2. Insurance & Licensing */}
            <SectionCard
              icon={<ShieldCheck className="w-full h-full" />}
              title="2. Insurance & Licensing"
            >
              <p>
                All services are operated in accordance with Portuguese
                legislation and applicable licensing requirements.
              </p>
              <p>
                All vehicles and passengers are covered by the legally
                required insurance policies, including:
              </p>
              <ul className="list-disc pl-6 space-y-1 text-foreground/80">
                <li>Public Liability Insurance</li>
                <li>Personal Accident Insurance</li>
                <li>Vehicle Insurance</li>
              </ul>
            </SectionCard>

            {/* 3. Services */}
            <SectionCard
              icon={<Car className="w-full h-full" />}
              title="3. Services"
            >
              <p>Off We Go Portugal provides:</p>
              <ul className="list-disc pl-6 space-y-1 text-foreground/80">
                <li>Airport Transfers</li>
                <li>Point-to-Point Transfers</li>
                <li>Private Tours</li>
                <li>Hourly Chauffeur Services</li>
                <li>Corporate Transportation</li>
                <li>Event Transportation</li>
                <li>Luxury Travel Experiences</li>
              </ul>
              <p className="font-semibold text-foreground pt-2">
                Unless otherwise stated in writing, quoted prices include:
              </p>
              <ul className="list-disc pl-6 space-y-1 text-foreground/80">
                <li>Professional chauffeur</li>
                <li>Fuel</li>
                <li>Highway tolls</li>
                <li>Applicable taxes</li>
              </ul>
              <p className="font-semibold text-foreground pt-2">
                Unless specifically stated, prices do not include:
              </p>
              <ul className="list-disc pl-6 space-y-1 text-foreground/80">
                <li>Entrance fees to attractions and monuments</li>
                <li>Meals and beverages</li>
                <li>Official tour guides</li>
                <li>Personal expenses</li>
                <li>Parking fees during hourly chauffeur services</li>
              </ul>
            </SectionCard>

            {/* 4. Personal Belongings */}
            <SectionCard
              icon={<Wallet className="w-full h-full" />}
              title="4. Personal Belongings"
            >
              <p>
                Passengers are responsible for their personal belongings at
                all times.
              </p>
              <p>
                Off We Go Portugal shall not be held liable for any items
                that are lost, stolen, damaged, misplaced, or forgotten
                inside the vehicle.
              </p>
            </SectionCard>

            {/* 5. Luggage */}
            <SectionCard
              icon={<Luggage className="w-full h-full" />}
              title="5. Luggage"
            >
              <p>
                Vehicle allocation is based on the luggage information
                provided at the time of booking.
              </p>
              <p>
                Clients are responsible for accurately declaring the number
                and size of all luggage items.
              </p>
              <p>
                Off We Go Portugal reserves the right to provide a larger
                vehicle or additional vehicle at the client's expense if the
                declared luggage capacity is exceeded.
              </p>
              <p>
                We shall not be responsible for any disruption caused by
                undeclared excess luggage.
              </p>
            </SectionCard>

            {/* 6. Passenger Conduct */}
            <SectionCard
              icon={<Users className="w-full h-full" />}
              title="6. Passenger Conduct"
            >
              <p>The following are strictly prohibited in all vehicles:</p>
              <ul className="list-disc pl-6 space-y-1 text-foreground/80">
                <li>Smoking or vaping</li>
                <li>Illegal substances</li>
                <li>Excessive alcohol consumption</li>
                <li>
                  Any conduct that may endanger the driver, vehicle, or other
                  passengers
                </li>
              </ul>
              <p>
                Off We Go Portugal reserves the right to refuse or terminate
                a service without refund if a passenger behaves in a manner
                that is abusive, unsafe, threatening, or inappropriate.
              </p>
            </SectionCard>

            {/* 7. Force Majeure */}
            <SectionCard
              icon={<CloudLightning className="w-full h-full" />}
              title="7. Force Majeure"
            >
              <p>
                Off We Go Portugal shall not be liable for delays,
                interruptions, itinerary changes, or inability to provide
                services due to circumstances beyond our reasonable control,
                including but not limited to:
              </p>
              <ul className="list-disc pl-6 space-y-1 text-foreground/80">
                <li>Severe weather conditions</li>
                <li>Traffic accidents or congestion</li>
                <li>Road closures</li>
                <li>Airport disruptions or closures</li>
                <li>Flight cancellations</li>
                <li>Government restrictions</li>
                <li>Border restrictions</li>
                <li>Strikes</li>
                <li>Civil disturbances</li>
                <li>Natural disasters</li>
              </ul>
            </SectionCard>

            {/* 8. Pricing */}
            <SectionCard
              icon={<Banknote className="w-full h-full" />}
              title="8. Pricing"
            >
              <p>
                All prices are subject to change without prior notice until a
                reservation has been confirmed and payment has been received.
              </p>
              <p>
                Once confirmed, the agreed service price shall remain fixed
                unless the booking is modified by the client.
              </p>
            </SectionCard>

            {/* 9. Reservations & Payments */}
            <SectionCard
              icon={<CalendarClock className="w-full h-full" />}
              title="9. Reservations & Payments"
            >
              <p className="font-semibold text-foreground">
                9.1 Booking Methods
              </p>
              <p>Reservations may be made through:</p>
              <ul className="list-disc pl-6 space-y-1 text-foreground/80">
                <li>Website booking engine</li>
                <li>Email</li>
                <li>Telephone</li>
                <li>WhatsApp</li>
              </ul>
              <p className="font-semibold text-foreground pt-2">
                9.2 Booking Confirmation
              </p>
              <p>A booking is only considered confirmed when:</p>
              <ul className="list-disc pl-6 space-y-1 text-foreground/80">
                <li>Availability has been verified;</li>
                <li>The booking has been accepted by Off We Go Portugal; and</li>
                <li>
                  Payment has been received, unless otherwise agreed in
                  writing.
                </li>
              </ul>
              <p className="font-semibold text-foreground pt-2">
                9.3 Payment Methods
              </p>
              <p>Payments may be made via:</p>
              <ul className="list-disc pl-6 space-y-1 text-foreground/80">
                <li>Credit Card</li>
                <li>Debit Card</li>
                <li>Stripe Payment Links</li>
                <li>Bank Transfer</li>
              </ul>
              <p>
                Off We Go Portugal reserves the right to verify payment
                transactions and request additional documentation when
                necessary to prevent fraud.
              </p>
              <p className="font-semibold text-foreground pt-2">
                9.4 Chargebacks
              </p>
              <p>
                Clients are encouraged to contact Off We Go Portugal directly
                regarding any payment concerns before initiating a chargeback
                procedure.
              </p>
              <p>
                Fraudulent or unjustified chargebacks may result in
                additional administrative, collection, and legal costs where
                permitted by law.
              </p>
            </SectionCard>

            {/* 10. Cancellation Policy */}
            <SectionCard
              icon={<Ticket className="w-full h-full" />}
              title="10. Cancellation Policy"
            >
              <p className="font-semibold text-foreground">
                10.1 Standard Services
              </p>
              <p>The following cancellation policy applies to:</p>
              <ul className="list-disc pl-6 space-y-1 text-foreground/80">
                <li>Airport Transfers</li>
                <li>Point-to-Point Transfers</li>
                <li>Private Tours</li>
                <li>Hourly Chauffeur Services</li>
              </ul>
              <ul className="list-disc pl-6 space-y-1 text-foreground/80">
                <li>
                  More than 48 hours before service commencement: Full
                  refund.
                </li>
                <li>
                  Less than 48 hours before service commencement: 100%
                  cancellation fee.
                </li>
                <li>No-show: 100% cancellation fee.</li>
              </ul>
              <p className="font-semibold text-foreground pt-2">
                10.2 Mercedes Sprinter Services
              </p>
              <p>
                Due to the operational requirements of group transportation,
                all Mercedes Sprinter bookings are non-refundable once
                confirmed.
              </p>
              <p>
                No refunds shall be issued under any circumstances following
                confirmation of a Mercedes Sprinter reservation.
              </p>
              <p className="font-semibold text-foreground pt-2">
                10.3 No-Show Policy
              </p>
              <p>
                A no-show occurs when a client fails to appear at the agreed
                pick-up location within the applicable waiting time and
                without prior communication.
              </p>
              <p>No-shows are charged at 100% of the service value.</p>
            </SectionCard>

            {/* 11. Waiting Time Policy */}
            <SectionCard
              icon={<MapPin className="w-full h-full" />}
              title="11. Waiting Time Policy"
            >
              <p className="font-semibold text-foreground">
                Airport Arrivals
              </p>
              <p>Complimentary waiting time:</p>
              <ul className="list-disc pl-6 space-y-1 text-foreground/80">
                <li>60 minutes from actual flight landing time.</li>
              </ul>
              <p>
                Flight arrivals are monitored in real time provided a valid
                flight number has been supplied during the booking process.
              </p>
              <p className="font-semibold text-foreground pt-2">
                Hotels, Residences &amp; Offices
              </p>
              <p>Complimentary waiting time:</p>
              <ul className="list-disc pl-6 space-y-1 text-foreground/80">
                <li>15 minutes.</li>
              </ul>
              <p className="font-semibold text-foreground pt-2">
                Cruise Terminals
              </p>
              <p>Complimentary waiting time:</p>
              <ul className="list-disc pl-6 space-y-1 text-foreground/80">
                <li>30 minutes.</li>
              </ul>
              <p>
                Additional waiting time may be charged at the applicable
                hourly rate.
              </p>
            </SectionCard>

            {/* 12. Child Safety */}
            <SectionCard
              icon={<Baby className="w-full h-full" />}
              title="12. Child Safety"
            >
              <p>
                Children and infants must travel using the appropriate safety
                equipment as required by law.
              </p>
              <p>
                Child seats and booster seats are available upon request and
                must be requested at the time of booking.
              </p>
              <p>
                Failure to request the necessary child safety equipment may
                prevent the service from being operated.
              </p>
            </SectionCard>

            {/* 13. Vehicle Damage */}
            <SectionCard
              icon={<AlertTriangle className="w-full h-full" />}
              title="13. Vehicle Damage"
            >
              <p>
                The client shall be financially responsible for any damage
                caused to the vehicle by themselves or members of their
                party.
              </p>
              <p>This includes but is not limited to:</p>
              <ul className="list-disc pl-6 space-y-1 text-foreground/80">
                <li>Interior damage</li>
                <li>Excessive cleaning requirements</li>
                <li>Spilled liquids</li>
                <li>Torn upholstery</li>
                <li>Vomit-related cleaning</li>
                <li>Damage to vehicle equipment</li>
              </ul>
              <p>
                Repair, cleaning, replacement, and administrative costs may
                be charged accordingly.
              </p>
            </SectionCard>

            {/* 14. Tour Services */}
            <SectionCard
              icon={<MapPin className="w-full h-full" />}
              title="14. Tour Services"
            >
              <p>
                Tour itineraries may be modified due to weather conditions,
                traffic, road closures, monument restrictions, operational
                requirements, or circumstances beyond our control.
              </p>
              <p>
                Off We Go Portugal will make every reasonable effort to
                preserve the overall experience whenever possible.
              </p>
            </SectionCard>

            {/* 15. Subcontracted Services */}
            <SectionCard
              icon={<Users className="w-full h-full" />}
              title="15. Subcontracted Services"
            >
              <p>
                Off We Go Portugal reserves the right to subcontract services
                to carefully selected, fully licensed, and insured
                transportation partners.
              </p>
              <p>
                Where subcontractors are used, the same operational and
                service standards shall apply.
              </p>
            </SectionCard>

            {/* 16. Booking Amendments */}
            <SectionCard
              icon={<CalendarClock className="w-full h-full" />}
              title="16. Booking Amendments"
            >
              <p>Requests to modify an existing reservation are subject to:</p>
              <ul className="list-disc pl-6 space-y-1 text-foreground/80">
                <li>Availability</li>
                <li>Operational feasibility</li>
                <li>Possible price adjustments</li>
              </ul>
              <p>
                No modification shall be considered confirmed until accepted
                in writing by Off We Go Portugal.
              </p>
            </SectionCard>

            {/* 17. Governing Law */}
            <SectionCard
              icon={<Gavel className="w-full h-full" />}
              title="17. Governing Law"
            >
              <p>
                These Terms &amp; Conditions shall be governed by and
                interpreted in accordance with the laws of Portugal.
              </p>
              <p>
                Any dispute arising from these Terms &amp; Conditions shall
                be subject to the exclusive jurisdiction of the courts of
                Lisbon, Portugal.
              </p>
            </SectionCard>

            {/* Contact Information */}
            <SectionCard
              icon={<Mail className="w-full h-full" />}
              title="Contact Information"
            >
              <p className="font-semibold text-foreground">
                Off We Go Portugal
                <br />
                <span className="font-normal text-foreground/80">
                  A brand of LEAPOFSTARS - MANAGEMENT, PRODUCTIONS &amp; TRAVEL
                  LDA.
                </span>
              </p>
              <p>
                Rua Dom João V, Nº 24 – 1.03
                <br />
                1250-091 Lisbon, Portugal
              </p>
              <p>VAT Number: PT516863452</p>
              <p>
                Email:{' '}
                <a
                  href="mailto:info@offwego.pt"
                  className="text-primary hover:underline"
                >
                  info@offwego.pt
                </a>
                <br />
                Website:{' '}
                <a
                  href="https://www.offwego.pt"
                  className="text-primary hover:underline"
                >
                  www.offwego.pt
                </a>
              </p>
            </SectionCard>

            {/* Closing note */}
            <motion.div
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
            >
              <div className="p-4 md:p-6 bg-primary/5 border border-primary/20 rounded-lg md:rounded-xl">
                <div className="flex items-start gap-3">
                  <FileText className="w-5 h-5 md:w-6 md:h-6 text-primary mt-0.5 flex-shrink-0" />
                  <p className="text-xs md:text-sm text-foreground/80">
                    Off We Go Portugal reserves the right to amend these Terms
                    &amp; Conditions at any time without prior notice. The
                    latest version will always be available on the company's
                    website.
                  </p>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>
    </motion.div>
  )
}
