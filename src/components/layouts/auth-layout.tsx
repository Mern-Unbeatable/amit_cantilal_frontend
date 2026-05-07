import { Outlet, useMatch, useMatches } from '@tanstack/react-router'
import { AnimatePresence } from 'framer-motion'

const AuthLayout = () => {
  const matches = useMatches()
  const match = useMatch({ strict: false })
  const nextMatchIndex = matches.findIndex((d) => d.id === match.id) + 1
  const nextMatch = matches[nextMatchIndex]

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#0B0B0B] p-4">
      <div className="w-full max-w-md">
        {/* Logo */}
        <AnimatePresence mode="wait">
          <Outlet key={nextMatch.id} />
        </AnimatePresence>
      </div>
    </div>
  )
}

export default AuthLayout
