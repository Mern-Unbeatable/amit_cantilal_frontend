import React from 'react'
import { Icon } from '@iconify/react'

const Footer: React.FC = () => {
  const socialIcons = [
    {
      name: 'Instagram',
      href: 'https://instagram.com/vip_on_wheels',
      icon: 'mdi:instagram',
    },
    {
      name: 'Facebook',
      href: '#',
      icon: 'mdi:facebook',
    },
    {
      name: 'LinkedIn',
      href: '#',
      icon: 'mdi:linkedin',
    },
  ]
  return (
    <footer className="bg-background border-t border-border py-12">
      <div className="container mx-auto px-4">
        <div className="max-w-6xl mx-auto">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 md:gap-8 mb-8">
            <div>
              <img
                src="/dec694ac-4884-4c39-b971-6ec08ef86146-1920w.webp"
                alt="VIP On Wheels"
                className="h-20 mb-4"
                width="180"
                height="80"
                loading="lazy"
              />
              <p className="text-sm text-foreground/80">
                Secure your Transfer &amp; Tour and have an incredible
                experience on your trip.
              </p>
            </div>
            <div>
              <h4 className="font-semibold text-gradient-gold mb-3 flex items-center gap-2">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  stroke-width="2"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  className="lucide lucide-map-pin w-5 h-5"
                >
                  <path d="M20 10c0 4.993-5.539 10.193-7.399 11.799a1 1 0 0 1-1.202 0C9.539 20.193 4 14.993 4 10a8 8 0 0 1 16 0"></path>
                  <circle cx="12" cy="10" r="3"></circle>
                </svg>
                Locations
              </h4>
              <p className="text-sm text-foreground/80">
                Rua Dom João V, N°24 - 1.03 1250-091 Lisboa - Portugal
              </p>
            </div>
            <div>
              <h4 className="font-semibold text-gradient-gold mb-3 flex items-center gap-2">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  stroke-width="2"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  className="lucide lucide-phone w-5 h-5"
                >
                  <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"></path>
                </svg>
                Contact
              </h4>
              <a
                href="tel:+351913911013"
                className="text-sm text-foreground/80 hover:text-primary transition-smooth block mb-1"
              >
                +351 913 911 013
              </a>
              <p className="text-xs text-foreground/60 mb-4">
                Call to national mobile
              </p>
              <a href="/faq">
                <button className="inline-flex items-center justify-center gap-2 whitespace-nowrap text-sm font-medium transition-smooth focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 [&amp;_svg]:pointer-events-none [&amp;_svg]:size-4 [&amp;_svg]:shrink-0 border bg-background h-9 rounded-md px-3 border-primary text-primary hover:bg-primary hover:text-primary-foreground">
                  FAQ
                </button>
              </a>
            </div>
            <div className="space-y-4">
              <div>
                <h4 className="font-semibold text-gradient-gold mb-3">
                  footer.followUs
                </h4>
                <div className="flex items-center gap-3">
                  {socialIcons.map((social) => (
                    <a
                      key={social.name}
                      href={social.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      aria-label={social.name}
                      className="text-foreground/80 hover:text-primary transition-all duration-300"
                    >
                      <Icon
                        icon={social.icon}
                        className="w-5 h-5 hover:scale-110 transition-transform"
                      />
                    </a>
                  ))}
                </div>
              </div>
              <div>
                <h4 className="font-semibold text-gradient-gold mb-3 flex items-center gap-2">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    stroke-width="2"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    className="lucide lucide-mail w-5 h-5"
                  >
                    <rect width="20" height="16" x="2" y="4" rx="2"></rect>
                    <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7"></path>
                  </svg>
                  Email
                </h4>
                <a
                  href="mailto:booking@viponwheels.com"
                  className="text-sm text-foreground/80 hover:text-primary transition-smooth"
                >
                  booking@viponwheels.com
                </a>
              </div>
            </div>
          </div>
          <div className="border-t border-border pt-6">
            <div className="mb-6 flex flex-wrap gap-4 text-xs text-foreground/60">
              <a href="#" className="hover:text-primary transition-smooth">
                Privacy Policy
              </a>
              <span>|</span>
              <a href="#" className="hover:text-primary transition-smooth">
                Arbitration Center
              </a>
              <span>|</span>
              <a
                href="https://www.livroreclamacoes.pt"
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-primary transition-smooth"
              >
                Complaints Book
              </a>
              <span>|</span>
              <a
                className="hover:text-primary transition-smooth flex items-center gap-1"
                href="/admin"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  stroke-width="2"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  className="lucide lucide-shield w-3 h-3"
                >
                  <path d="M20 13c0 5-3.5 7.5-7.66 8.95a1 1 0 0 1-.67-.01C7.5 20.5 4 18 4 13V6a1 1 0 0 1 1-1c2 0 4.5-1.2 6.24-2.72a1.17 1.17 0 0 1 1.52 0C14.51 3.81 17 5 19 5a1 1 0 0 1 1 1z"></path>
                </svg>
                Admin
              </a>
            </div>
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
              <div className="flex flex-wrap gap-x-6 gap-y-2 text-xs text-foreground/60">
                <span>Registration RNAAT: 941/2022</span>
                <span>Registration RNAVT: 11050</span>
                <span>TVDE License: 100617/2022</span>
              </div>
              <div className="flex items-center gap-2">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  stroke-width="2"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  className="lucide lucide-globe w-4 h-4 text-foreground/60 flex-shrink-0"
                >
                  <circle cx="12" cy="12" r="10"></circle>
                  <path d="M12 2a14.5 14.5 0 0 0 0 20 14.5 14.5 0 0 0 0-20"></path>
                  <path d="M2 12h20"></path>
                </svg>
                <button className="inline-flex items-center justify-center gap-2 whitespace-nowrap text-sm font-medium transition-smooth focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 [&amp;_svg]:pointer-events-none [&amp;_svg]:size-4 [&amp;_svg]:shrink-0 bg-primary text-primary-foreground hover:bg-primary/90 h-9 rounded-md px-3 min-w-[60px]">
                  EN
                </button>
                <button className="inline-flex items-center justify-center gap-2 whitespace-nowrap text-sm font-medium transition-smooth focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 [&amp;_svg]:pointer-events-none [&amp;_svg]:size-4 [&amp;_svg]:shrink-0 border border-input bg-background hover:bg-accent hover:text-accent-foreground h-9 rounded-md px-3 min-w-[60px]">
                  PT
                </button>
                <button className="inline-flex items-center justify-center gap-2 whitespace-nowrap text-sm font-medium transition-smooth focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 [&amp;_svg]:pointer-events-none [&amp;_svg]:size-4 [&amp;_svg]:shrink-0 border border-input bg-background hover:bg-accent hover:text-accent-foreground h-9 rounded-md px-3 min-w-[60px]">
                  ES
                </button>
                <button className="inline-flex items-center justify-center gap-2 whitespace-nowrap text-sm font-medium transition-smooth focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 [&amp;_svg]:pointer-events-none [&amp;_svg]:size-4 [&amp;_svg]:shrink-0 border border-input bg-background hover:bg-accent hover:text-accent-foreground h-9 rounded-md px-3 min-w-[60px]">
                  中文
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
      <a
        href="https://wa.me/351914578214"
        target="_blank"
        rel="noopener noreferrer"
        className="fixed bottom-6 right-6 z-50 flex items-center gap-3 group"
        aria-label="WhatsApp"
      >
        <span className="hidden sm:block bg-background/90 backdrop-blur-sm border border-border text-foreground text-sm font-medium px-4 py-2 rounded-full shadow-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300 whitespace-nowrap">
          Questions? Contact us
        </span>
        <div className="w-16 h-16 rounded-full bg-[#25D366] hover:bg-[#1DA851] shadow-xl flex items-center justify-center transition-all duration-300 hover:scale-110 p-3">
          <img
            src="/whatsapp-icon--Q7vUWyy.webp"
            alt="WhatsApp"
            className="w-10 h-10 object-contain"
          />
        </div>
      </a>
    </footer>
  )
}

export default Footer
