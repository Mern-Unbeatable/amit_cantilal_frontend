import React, { useState } from 'react'
import { Link } from '@tanstack/react-router'
import { Button } from '@/components/ui/button.tsx'
import ApplicationLogo from '@/components/application-logo.tsx'

interface NavLinkProps {
  to: string
  children: React.ReactNode
  isActive?: boolean
}

interface NavItem {
  id: number
  name: string
  to: string
}

interface MobileMenuProps {
  isOpen: boolean
  navItems: Array<NavItem>
}

const MenuIcon: React.FC = () => (
  <svg
    className="w-6 h-6"
    fill="none"
    stroke="currentColor"
    viewBox="0 0 24 24"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={2}
      d="M4 6h16M4 12h16m-7 6h7"
    />
  </svg>
)

const CloseIcon: React.FC = () => (
  <svg
    className="w-6 h-6"
    fill="none"
    stroke="currentColor"
    viewBox="0 0 24 24"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={2}
      d="M6 18L18 6M6 6l12 12"
    />
  </svg>
)

const NavLink: React.FC<NavLinkProps> = ({
  to,
  children,
  isActive = false,
}) => (
  <Link
    to={to}
    className={`text-lg xl:text-xl font-semibold text-primary hover:text-primary-light transition-smooth animate-fade-in relative after:content-[''] after:absolute after:w-full after:scale-x-0 after:h-0.5 after:bottom-0 after:left-0 after:bg-gradient-gold after:origin-bottom-right after:transition-transform after:duration-300 hover:after:scale-x-100 hover:after:origin-bottom-left whitespace-nowrap ${
      isActive
        ? 'text-primary'
        : 'text-gray-600 dark:text-gray-300 hover:text-primary'
    }`}
  >
    {children}
  </Link>
)

const MobileMenu: React.FC<MobileMenuProps> = ({ isOpen, navItems }) => (
  <div
    className={`
      md:hidden absolute top-full left-0 w-full bg-white/95 dark:bg-black/95 backdrop-blur-sm border-t border-gray-200 dark:border-gray-700 shadow-lg
      transition-all duration-300 ease-in-out
      ${isOpen ? 'opacity-100 translate-y-0' : 'opacity-0 -translate-y-4 pointer-events-none'}
  `}
  >
    <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
      {navItems.map((item) => (
        <Link
          key={item.id}
          to={item.to}
          className="text-gray-700 dark:text-gray-300 hover:text-orange-500 hover:bg-gray-50 dark:hover:bg-gray-800 block px-3 py-2 rounded-md text-base font-medium"
        >
          {item.name}
        </Link>
      ))}
    </div>
    <div className="pt-4 pb-4 border-t border-gray-200 dark:border-gray-700">
      <div className="px-5">
        <Button variant="outline" className="w-full">
          Buy Template
        </Button>
      </div>
    </div>
  </div>
)

const Header: React.FC = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [activeLink] = useState('Home')
  const navItems: Array<NavItem> = [
    { id: 1, name: 'Home', to: '/' },
    { id: 2, name: 'Book Now', to: '/book-now' },
    { id: 3, name: 'Transfers', to: '/transfers' },
    { id: 4, name: 'Hourly Service', to: '/hourly-service' },
    { id: 5, name: 'Tours', to: '/tours' },
    { id: 6, name: 'B2B', to: '/b2b' },
    { id: 7, name: 'Partnerships', to: '/partnerships' },
    { id: 8, name: 'FAQ', to: '/faq' },
    { id: 9, name: 'Blog', to: '/blog' },
  ]
  return (
    <header className="relative z-20 bg-black">
      <div className="container mx-auto px-4 py-1 md:py-4">
        <div className="flex items-center justify-between h-20">
          <div className="flex-shrink-0 flex items-center gap-2">
           <Link to="/">
             <ApplicationLogo/>
           </Link>
          </div>
          <nav className="hidden lg:flex items-center gap-8 xl:gap-12 bg-black/50 px-6 py-3 rounded-lg border border-primary/20">
            {navItems.map(({ to, name, id }) => (
              <NavLink key={id} to={to} isActive={activeLink === name}>
                {name}
              </NavLink>
            ))}
          </nav>
          <div className="hidden md:block">
            <Button
              variant="outline"
              asChild
              className="border-primary rounded-3xl px-6 h-11 hover:bg-primary hover:text-white"
            >
              <Link to="/">Get Started</Link>
            </Button>
          </div>
          <div className="md:hidden">
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="inline-flex items-center justify-center p-2 rounded-md text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white hover:bg-gray-100 dark:hover:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-orange-500"
              aria-expanded={isMenuOpen}
              aria-controls="mobile-menu"
            >
              <span className="sr-only">Open main menu</span>
              {isMenuOpen ? <CloseIcon /> : <MenuIcon />}
            </button>
          </div>
        </div>
      </div>
      <MobileMenu isOpen={isMenuOpen} navItems={navItems} />
    </header>
  )
}

export default Header
