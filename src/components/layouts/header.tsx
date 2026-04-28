import React, { useEffect, useRef, useState } from 'react'
import { Link, useRouterState } from '@tanstack/react-router'
import { ChevronDown, Globe } from 'lucide-react'
import ApplicationLogo from '@/components/application-logo.tsx'

interface NavItem {
  id: number
  name: string
  to: string
}

interface NavGroup {
  id: number
  label: string
  items: Array<NavItem>
}

interface Language {
  code: string
  label: string
  flag: string
}

const standaloneLinks: Array<NavItem> = [
  { id: 1, name: 'Home', to: '/' },
  { id: 2, name: 'Book Now', to: '/booking' },
]

const navGroups: Array<NavGroup> = [
  {
    id: 1,
    label: 'Services',
    items: [
      // { id: 3, name: 'Transfers', to: '/transfers' },
      { id: 4, name: 'Hourly Service', to: '/hourly-service' },
      { id: 5, name: 'Tours', to: '/tours' },
    ],
  },
  {
    id: 2,
    label: 'Business',
    items: [
      { id: 6, name: 'B2B', to: '/b2b' },
      { id: 7, name: 'Partnerships', to: '/partnerships' },
    ],
  },
  {
    id: 3,
    label: 'Resources',
    items: [
      { id: 8, name: 'FAQ', to: '/faq' },
      { id: 9, name: 'Blog', to: '/blog' },
    ],
  },
]

const languages: Array<Language> = [
  { code: 'EN', label: 'English', flag: '🇬🇧' },
  { code: 'PT', label: 'Português', flag: '🇵🇹' },
  { code: 'ES', label: 'Español', flag: '🇪🇸' },
  { code: 'ZH', label: '中文', flag: '🇨🇳' },
]

// ─── Dropdown ─────────────────────────────────────────────────────────────────

interface DropdownProps {
  label: string
  children: React.ReactNode
  isActive?: boolean
}

const Dropdown: React.FC<DropdownProps> = ({ label, children, isActive }) => {
  const [open, setOpen] = useState(false)
  const ref = useRef<HTMLDivElement>(null)
  const { location } = useRouterState()

  useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) setOpen(false)
    }
    document.addEventListener('mousedown', handler)
    return () => document.removeEventListener('mousedown', handler)
  }, [])

  useEffect(() => {
    setOpen(false)
  }, [location.pathname])

  return (
    <div ref={ref} className="relative">
      <button
        onClick={() => setOpen(!open)}
        className={`flex items-center gap-1 text-sm xl:text-base font-bold font-[Montserrat] uppercase tracking-wide transition-colors duration-200 whitespace-nowrap ${
          isActive || open ? 'text-[#C9A84C]' : 'text-[#9A9182] hover:text-[#C9A84C]'
        }`}
      >
        {label}
        <ChevronDown
          className={`w-4 h-4 transition-transform duration-200 ${open ? 'rotate-180' : ''}`}
        />
      </button>

      {/* Dropdown panel */}
      <div
        className={`absolute top-full left-1/2 -translate-x-1/2 mt-3 min-w-[180px] bg-[#141414] border border-[#C9A84C]/15 shadow-[0_8px_32px_rgba(0,0,0,0.5)] transition-all duration-200 origin-top z-50 ${
          open ? 'opacity-100 scale-y-100 pointer-events-auto' : 'opacity-0 scale-y-95 pointer-events-none'
        }`}
      >
        {/* Gold top accent */}
        <div className="h-px bg-[#C9A84C] w-full" />

        <div className="py-1">
          {children}
        </div>
      </div>
    </div>
  )
}

// ─── Language Switcher ────────────────────────────────────────────────────────

const LanguageSwitcher: React.FC = () => {
  const [open, setOpen] = useState(false)
  const [active, setActive] = useState(languages[0])
  const ref = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) setOpen(false)
    }
    document.addEventListener('mousedown', handler)
    return () => document.removeEventListener('mousedown', handler)
  }, [])

  return (
    <div ref={ref} className="relative">
      <button
        onClick={() => setOpen(!open)}
        className="flex items-center gap-2 border border-[#C9A84C]/30 px-4 h-11 rounded-3xl text-[#C9A84C] hover:bg-[#C9A84C]/10 transition-colors duration-200 text-sm font-bold font-[Montserrat] uppercase tracking-wide"
      >
        <Globe className="w-4 h-4" />
        <span>{active.flag} {active.code}</span>
        <ChevronDown className={`w-3.5 h-3.5 transition-transform duration-200 ${open ? 'rotate-180' : ''}`} />
      </button>

      <div
        className={`absolute top-full right-0 mt-3 w-44 bg-[#141414] border border-[#C9A84C]/15 shadow-[0_8px_32px_rgba(0,0,0,0.5)] transition-all duration-200 origin-top z-50 ${
          open ? 'opacity-100 scale-y-100 pointer-events-auto' : 'opacity-0 scale-y-95 pointer-events-none'
        }`}
      >
        <div className="h-px bg-[#C9A84C] w-full" />
        <div className="py-1">
          {languages.map((lang) => (
            <button
              key={lang.code}
              onClick={() => { setActive(lang); setOpen(false) }}
              className={`w-full flex items-center gap-3 px-4 py-2.5 text-sm transition-colors duration-150 font-bold font-[Montserrat] uppercase tracking-wide ${
                active.code === lang.code
                  ? 'text-[#C9A84C] bg-[#C9A84C]/08'
                  : 'text-[#9A9182] hover:text-[#F5F0E8] hover:bg-[#1C1C1C]'
              }`}
            >
              <span className="text-base normal-case">{lang.flag}</span>
              <span className="font-medium">{lang.code}</span>
              <span className="text-xs opacity-60 ml-auto normal-case">{lang.label}</span>
            </button>
          ))}
        </div>
      </div>
    </div>
  )
}

// ─── Mobile Menu ──────────────────────────────────────────────────────────────

interface MobileMenuProps {
  isOpen: boolean
  activePath: string
}

const MobileMenu: React.FC<MobileMenuProps> = ({ isOpen, activePath }) => {
  const [openGroup, setOpenGroup] = useState<number | null>(null)

  return (
    <div
      className={`md:hidden absolute top-full left-0 w-full bg-[#0B0B0B]/98 backdrop-blur-sm border-t border-[#C9A84C]/12 shadow-lg transition-all duration-300 ease-in-out ${
        isOpen ? 'opacity-100 translate-y-0 pointer-events-auto' : 'opacity-0 -translate-y-2 pointer-events-none'
      }`}
    >
      <div className="px-4 py-3 space-y-1">

        {/* Standalone links */}
        {standaloneLinks.map((item) => (
          <Link
            key={item.id}
            to={item.to}
            className={`block px-3 py-2.5 text-sm font-bold font-[Montserrat] uppercase tracking-wide transition-colors ${
              activePath === item.to ? 'text-[#C9A84C]' : 'text-[#9A9182] hover:text-[#F5F0E8]'
            }`}
          >
            {item.name}
          </Link>
        ))}

        {/* Grouped links */}
        {navGroups.map((group) => (
          <div key={group.id}>
            <button
              onClick={() => setOpenGroup(openGroup === group.id ? null : group.id)}
              className="w-full flex items-center justify-between px-3 py-2.5 text-sm font-bold font-[Montserrat] uppercase tracking-wide text-[#9A9182] hover:text-[#F5F0E8] transition-colors"
            >
              {group.label}
              <ChevronDown className={`w-4 h-4 transition-transform duration-200 ${openGroup === group.id ? 'rotate-180' : ''}`} />
            </button>
            <div className={`overflow-hidden transition-all duration-200 ${openGroup === group.id ? 'max-h-48' : 'max-h-0'}`}>
              {group.items.map((item) => (
                <Link
                  key={item.id}
                  to={item.to}
                  className={`block pl-6 pr-3 py-2 text-sm font-bold font-[Montserrat] uppercase tracking-wide transition-colors border-l border-[#C9A84C]/20 ml-3 ${
                    activePath === item.to ? 'text-[#C9A84C]' : 'text-[#9A9182] hover:text-[#F5F0E8]'
                  }`}
                >
                  {item.name}
                </Link>
              ))}
            </div>
          </div>
        ))}
      </div>

      {/* Language switcher in mobile */}
      <div className="px-4 pb-4 pt-2 border-t border-[#C9A84C]/10">
        <p className="text-[10px] tracking-[.2em] uppercase text-[#5C564F] mb-2 px-3">Language</p>
        <div className="flex gap-2 px-3 flex-wrap">
          {languages.map((lang) => (
            <button
              key={lang.code}
              className="flex items-center gap-1.5 text-xs font-bold font-[Montserrat] uppercase tracking-wide text-[#9A9182] hover:text-[#C9A84C] border border-[#C9A84C]/15 px-3 py-1.5 transition-colors"
            >
              {lang.flag} {lang.code}
            </button>
          ))}
        </div>
      </div>
    </div>
  )
}

// ─── Header ───────────────────────────────────────────────────────────────────

const Header: React.FC = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const { location } = useRouterState()
  const activePath = location.pathname

  // Close mobile menu on route change
  useEffect(() => {
    setIsMenuOpen(false)
  }, [activePath])

  const isGroupActive = (group: NavGroup) =>
    group.items.some((item) => item.to === activePath)

  return (
    <header className="fixed top-0 right-0 left-0 z-20 bg-[#0B0B0B] border-b border-[#C9A84C]/10">
      <div className="container mx-auto px-4 py-1 md:py-4">
        <div className="flex items-center justify-between h-20">

          {/* Logo */}
          <div className="flex-shrink-0">
            <Link to="/">
              <ApplicationLogo />
            </Link>
          </div>

          {/* Desktop nav */}
          <nav className="hidden lg:flex items-center gap-6 xl:gap-8 bg-[#0B0B0B]/50 px-6 py-3 rounded-lg border border-[#C9A84C]/15">

            {/* Standalone: Home */}
            <Link
              to="/"
              className={`text-sm xl:text-base font-bold font-[Montserrat] uppercase tracking-wide whitespace-nowrap transition-colors duration-200 ${
                activePath === '/' ? 'text-[#C9A84C]' : 'text-[#9A9182] hover:text-[#C9A84C]'
              }`}
            >
              Home
            </Link>

            {/* Standalone: Book Now */}
            <Link
              to="/booking"
              className={`text-sm xl:text-base font-bold font-[Montserrat] uppercase tracking-wide whitespace-nowrap transition-colors duration-200 ${
                activePath === '/booking' ? 'text-[#C9A84C]' : 'text-[#9A9182] hover:text-[#C9A84C]'
              }`}
            >
              Book Now
            </Link>

            {/* Dropdown groups */}
            {navGroups.map((group) => (
              <Dropdown key={group.id} label={group.label} isActive={isGroupActive(group)}>
                {group.items.map((item) => (
                  <Link
                    key={item.id}
                    to={item.to}
                    className={`block px-4 py-2.5 text-sm font-bold font-[Montserrat] uppercase tracking-wide transition-colors duration-150 ${
                      activePath === item.to
                        ? 'text-[#C9A84C] bg-[#C9A84C]/08'
                        : 'text-[#9A9182] hover:text-[#F5F0E8] hover:bg-[#1C1C1C]'
                    }`}
                  >
                    {item.name}
                  </Link>
                ))}
              </Dropdown>
            ))}
          </nav>

          {/* Language switcher */}
          <div className="hidden md:block">
            <LanguageSwitcher />
          </div>

          {/* Mobile burger */}
          <button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="lg:hidden inline-flex items-center justify-center p-2 text-[#9A9182] hover:text-[#F5F0E8] transition-colors"
            aria-expanded={isMenuOpen}
          >
            <span className="sr-only">Toggle menu</span>
            {isMenuOpen ? (
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            ) : (
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16m-7 6h7" />
              </svg>
            )}
          </button>
        </div>
      </div>

      <MobileMenu isOpen={isMenuOpen} activePath={activePath} />
    </header>
  )
}

export default Header