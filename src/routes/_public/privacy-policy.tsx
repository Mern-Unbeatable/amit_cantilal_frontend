import { createFileRoute } from '@tanstack/react-router'
import { motion } from 'framer-motion'
import {
  AlertCircle,
  CircleUser,
  Clock,
  Cookie,
  Lock,
  Mail,
  Phone,
  Scale,
  Share2,
  Shield,
  ShieldCheck,
  Target,
  Trash2,
  Users,
} from 'lucide-react'
import { mainTransitionProps } from '@/lib/utils.ts'
import { PageHero } from '@/components/shared/page-hero.tsx'

export const Route = createFileRoute('/_public/privacy-policy')({
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
      viewport={{ once: true, margin: "-80px" }}
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
  );
}

function RouteComponent() {
  return (
    <motion.div {...mainTransitionProps}>
      <PageHero title="Privacy Policy" subtitle="check out privacy policy" />

      <section className="py-16 md:py-24 bg-gradient-to-b from-muted/30 to-background">
        <div className="container mx-auto px-4 md:px-12 text-center">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
          >
            <div className="flex items-center justify-center gap-3 mb-6">
              <div className="w-12 h-12 md:w-16 md:h-16 bg-primary/10 rounded-xl flex items-center justify-center">
                <Shield className="w-6 h-6 md:w-8 md:h-8 text-primary" />
              </div>
            </div>
            <h1 className="text-3xl md:text-5xl lg:text-6xl font-bold text-gradient-gold mb-4">
              Privacy Policy
            </h1>
            <p className="text-sm md:text-lg text-foreground/70 max-w-2xl mx-auto">
              Off We Go Portugal is committed to protecting the privacy and
              personal data of all visitors, clients, partners, and users of our
              website.
            </p>
          </motion.div>
        </div>
      </section>

      <section className="pb-16 md:pb-32">
        <div className="container mx-auto px-4 md:px-12">
          <div className="max-w-4xl mx-auto space-y-8 md:space-y-16">
            {/* Introduction */}
            <motion.div
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
            >
              <div className="bg-card/60 border border-border rounded-xl md:rounded-2xl p-6 md:p-10">
                <p className="text-sm md:text-base text-foreground/90 leading-relaxed mb-3">
                  <strong>Off We Go Portugal</strong> is the trading name and
                  commercial brand of LEAPOFSTARS - MANAGEMENT, PRODUCTIONS &
                  TRAVEL LDA., VAT Number PT516863452, with registered office at
                  Rua Dom João V, Nº 24 – 1.03, 1250-091 Lisbon, Portugal.
                </p>
                <p className="text-sm md:text-base text-foreground/90 leading-relaxed mb-3">
                  We process personal data in accordance with the General Data
                  Protection Regulation (EU) 2016/679 ("GDPR") and all
                  applicable Portuguese data protection laws.
                </p>
                <p className="text-sm md:text-base text-foreground/90 leading-relaxed">
                  By using our website or booking our services, you acknowledge
                  and accept the practices described in this Privacy Policy.
                </p>
              </div>
            </motion.div>

            {/* 1. Data We Collect */}
            <SectionCard
              icon={<Lock className="w-full h-full" />}
              title="1. Data We Collect"
            >
              <p className="font-semibold text-foreground">
                Personal Information
              </p>
              <ul className="list-disc pl-6 space-y-1 text-foreground/80">
                <li>Full name</li>
                <li>Email address</li>
                <li>Telephone number</li>
                <li>Country of residence</li>
                <li>Billing information</li>
                <li>Flight information</li>
                <li>Pick-up and drop-off addresses</li>
                <li>Passenger details</li>
                <li>Special requests provided during booking</li>
              </ul>
              <p className="font-semibold text-foreground pt-2">
                Website Usage Information
              </p>
              <p>When you visit our website, we may automatically collect:</p>
              <ul className="list-disc pl-6 space-y-1 text-foreground/80">
                <li>IP address</li>
                <li>Browser type</li>
                <li>Device information</li>
                <li>Operating system</li>
                <li>Website usage statistics</li>
                <li>Pages visited</li>
                <li>Referral sources</li>
              </ul>
            </SectionCard>

            {/* 2. How We Collect Your Data */}
            <SectionCard
              icon={<CircleUser className="w-full h-full" />}
              title="2. How We Collect Your Data"
            >
              <p>We collect personal information when you:</p>
              <ul className="list-disc pl-6 space-y-1 text-foreground/80">
                <li>Submit a contact form</li>
                <li>Request a quotation</li>
                <li>Make a reservation through our booking engine</li>
                <li>Contact us by email, telephone, or WhatsApp</li>
                <li>Subscribe to our newsletter</li>
                <li>Interact with us through social media platforms</li>
                <li>Participate in surveys or promotions</li>
              </ul>
            </SectionCard>

            {/* 3. Purpose of Processing */}
            <SectionCard
              icon={<Target className="w-full h-full" />}
              title="3. Purpose of Processing"
            >
              <p>We process personal data for the following purposes:</p>
              <ul className="list-disc pl-6 space-y-1 text-foreground/80">
                <li>Managing reservations and transportation services</li>
                <li>Processing payments</li>
                <li>Providing customer support</li>
                <li>Communicating booking updates</li>
                <li>Responding to enquiries</li>
                <li>Improving our services and website performance</li>
                <li>
                  Sending marketing communications (where consent has been
                  provided)
                </li>
                <li>Complying with legal and regulatory obligations</li>
                <li>Preventing fraud and ensuring security</li>
              </ul>
            </SectionCard>

            {/* 4. Legal Basis for Processing */}
            <SectionCard
              icon={<Scale className="w-full h-full" />}
              title="4. Legal Basis for Processing"
            >
              <p>
                We process personal data based on one or more of the following
                legal grounds:
              </p>
              <ul className="list-disc pl-6 space-y-1 text-foreground/80">
                <li>Performance of a contract</li>
                <li>Compliance with legal obligations</li>
                <li>Legitimate business interests</li>
                <li>Consent provided by the data subject</li>
              </ul>
              <p>
                Where consent is required, it may be withdrawn at any time
                without affecting the lawfulness of processing carried out
                before withdrawal.
              </p>
            </SectionCard>

            {/* 5. Marketing Communications */}
            <SectionCard
              icon={<Mail className="w-full h-full" />}
              title="5. Marketing Communications"
            >
              <p>
                With your consent, Off We Go Portugal may send promotional
                communications regarding our services, offers, and updates.
              </p>
              <p>
                You may unsubscribe from marketing communications at any time
                by:
              </p>
              <ul className="list-disc pl-6 space-y-1 text-foreground/80">
                <li>Clicking the unsubscribe link included in our emails</li>
                <li>
                  Contacting us directly at{' '}
                  <a
                    href="mailto:info@offwego.pt"
                    className="text-primary hover:underline"
                  >
                    info@offwego.pt
                  </a>
                </li>
              </ul>
              <p>
                Opting out of marketing communications will not affect
                service-related communications regarding existing bookings.
              </p>
            </SectionCard>

            {/* 6. Data Retention */}
            <SectionCard
              icon={<Clock className="w-full h-full" />}
              title="6. Data Retention"
            >
              <p>
                Personal data will be retained only for as long as necessary to
                fulfil the purposes for which it was collected, including legal,
                accounting, and regulatory requirements.
              </p>
              <p>
                In general, booking and contractual records may be retained for
                up to <strong>five (5) years</strong> following the conclusion
                of the business relationship, unless a longer retention period
                is required by law.
              </p>
            </SectionCard>

            {/* 7. Data Security */}
            <SectionCard
              icon={<ShieldCheck className="w-full h-full" />}
              title="7. Data Security"
            >
              <p>
                Off We Go Portugal implements appropriate technical and
                organisational measures designed to protect personal data
                against:
              </p>
              <ul className="list-disc pl-6 space-y-1 text-foreground/80">
                <li>Unauthorised access</li>
                <li>Disclosure</li>
                <li>Alteration</li>
                <li>Loss</li>
                <li>Misuse</li>
                <li>Destruction</li>
              </ul>
              <p>
                While we strive to protect your personal information, no
                internet transmission or electronic storage system can be
                guaranteed as completely secure.
              </p>
            </SectionCard>

            {/* 8. Third-Party Service Providers */}
            <SectionCard
              icon={<Users className="w-full h-full" />}
              title="8. Third-Party Service Providers"
            >
              <p>
                To operate our business efficiently, we may share personal data
                with trusted third-party providers, including:
              </p>
              <ul className="list-disc pl-6 space-y-1 text-foreground/80">
                <li>Payment processors (such as Stripe)</li>
                <li>Website hosting providers</li>
                <li>Reservation and booking software providers</li>
                <li>Accounting and legal service providers</li>
                <li>
                  Licensed transportation partners operating services on our
                  behalf
                </li>
              </ul>
              <p>
                All third parties are required to process personal data securely
                and in compliance with applicable data protection laws.
              </p>
            </SectionCard>

            {/* 9. Social Media */}
            <SectionCard
              icon={<Share2 className="w-full h-full" />}
              title="9. Social Media"
            >
              <p>
                Our website may contain links to social media platforms
                including Facebook, Instagram, LinkedIn, and other services.
              </p>
              <p>
                These platforms may collect information about your interaction
                with their services. We encourage users to review the privacy
                policies of the respective social media providers.
              </p>
              <p>
                Off We Go Portugal does not control how these third parties
                collect or process your personal information.
              </p>
            </SectionCard>

            {/* 10. Your Rights Under GDPR */}
            <SectionCard
              icon={<Trash2 className="w-full h-full" />}
              title="10. Your Rights Under GDPR"
            >
              <p>Under the GDPR, you have the right to:</p>
              <ul className="list-disc pl-6 space-y-1 text-foreground/80">
                <li>Access your personal data</li>
                <li>Correct inaccurate personal data</li>
                <li>Request deletion of your personal data</li>
                <li>Restrict processing of your personal data</li>
                <li>Object to processing</li>
                <li>Request data portability</li>
                <li>Withdraw consent where processing is based on consent</li>
              </ul>
              <p>
                To exercise any of these rights, please contact us using the
                details below.
              </p>
            </SectionCard>

            {/* 11. Complaints */}
            <SectionCard
              icon={<AlertCircle className="w-full h-full" />}
              title="11. Complaints"
            >
              <p>
                If you believe your personal data has been processed unlawfully,
                you have the right to lodge a complaint with the relevant
                supervisory authority.
              </p>
              <p>
                In Portugal, the supervisory authority is the{' '}
                <strong>Comissão Nacional de Proteção de Dados (CNPD)</strong>.
              </p>
            </SectionCard>

            {/* 12. Cookies */}
            <SectionCard
              icon={<Cookie className="w-full h-full" />}
              title="12. Cookies"
            >
              <div className="space-y-3">
                <p className="font-semibold text-foreground">
                  What Are Cookies?
                </p>
                <p>
                  Cookies are small text files stored on your device when you
                  visit a website. They help improve website functionality,
                  performance, security, and user experience.
                </p>
              </div>
              <div className="space-y-3">
                <p className="font-semibold text-foreground">
                  Types of Cookies We Use
                </p>
                <p>
                  <strong>Essential Cookies</strong> — Required for the proper
                  operation of the website.
                </p>
                <p>
                  <strong>Analytics Cookies</strong> — Used to understand how
                  visitors interact with the website and improve performance.
                </p>
                <p>
                  <strong>Functional Cookies</strong> — Remember user
                  preferences and settings.
                </p>
              </div>
              <div className="space-y-3">
                <p className="font-semibold text-foreground">
                  Managing Cookies
                </p>
                <p>
                  Most web browsers allow users to control, block, or delete
                  cookies through browser settings. Please note that disabling
                  cookies may affect certain website functions and user
                  experience.
                </p>
              </div>
            </SectionCard>

            {/* 13. Contact Information */}
            <SectionCard
              icon={<Phone className="w-full h-full" />}
              title="13. Contact Information"
            >
              <p>
                For any questions regarding this Privacy Policy or your personal
                data, please contact:
              </p>
              <p className="font-semibold text-foreground">
                Off We Go Portugal
                <br />
                <span className="font-normal text-foreground/80">
                  A brand of LEAPOFSTARS - MANAGEMENT, PRODUCTIONS & TRAVEL LDA.
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

            {/* Closing note — matches the footer-note style from the original layout */}
            <motion.div
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
            >
              <div className="p-4 md:p-6 bg-primary/5 border border-primary/20 rounded-lg md:rounded-xl">
                <div className="flex items-start gap-3">
                  <Shield className="w-5 h-5 md:w-6 md:h-6 text-primary mt-0.5 flex-shrink-0" />
                  <p className="text-xs md:text-sm text-foreground/80">
                    Off We Go Portugal reserves the right to update or amend
                    this Privacy Policy at any time. Any updates will be
                    published on this page and become effective immediately upon
                    publication. We encourage users to review this Privacy
                    Policy periodically.
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
