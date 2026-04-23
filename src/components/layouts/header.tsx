import React, { useState } from 'react'
import {Link} from "@tanstack/react-router";
import { Button } from '@/components/ui/button.tsx'
import LogoIcon from '@/components/logo-icon.tsx'

interface NavLinkProps {
  to: string
  children: React.ReactNode
  isActive?: boolean
}

interface navItem {
  id: number,
  name: string,
  to: string
}

interface MobileMenuProps {
  isOpen: boolean
  navItems: Array<navItem>
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
    className={`px-3 py-2 rounded-md text-sm font-medium transition-colors duration-300 ${
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
  const navItems: Array<navItem> = [
    {
      id: 1,
      name: 'Home',
      to: '/',
    },
    {
      id: 2,
      name: 'About',
      to: '/about',
    },
    {
      id: 3,
      name: 'Contact',
      to: '/contact',
    },
    {
      id: 4,
      name: 'Pricing',
      to: '/pricing',
    }
  ]

  return (
    <header className="relative z-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          <div className="flex-shrink-0 flex items-center gap-2">
            <LogoIcon />
            <span className="text-xl font-bold text-gray-900 dark:text-white">
              LearnifyDev
            </span>
          </div>
          <nav className="hidden md:flex items-center space-x-1 bg-gray-100/50 dark:bg-gray-800/50 p-1 rounded-full">
            {navItems.map(({to, name, id}) => (
              <NavLink
                key={id}
                to={to}
                isActive={activeLink === name}
              >
                {name}
              </NavLink>
            ))}
          </nav>
          <div className="hidden md:block">
            <Button variant="outline" asChild className="border-primary rounded-3xl px-6 h-11 hover:bg-primary hover:text-white">
              <Link to="/apply">
                Get Started
              </Link>
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
