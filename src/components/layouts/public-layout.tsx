import { Outlet, useMatch, useMatches } from '@tanstack/react-router'
import { AnimatePresence } from 'framer-motion'
import Header from '@/components/layouts/header.tsx'
import Footer from '@/components/layouts/footer.tsx'

const PublicLayout = () => {
  const matches = useMatches()
  const match = useMatch({ strict: false })
  const nextMatchIndex = matches.findIndex((d) => d.id === match.id) + 1
  const nextMatch = matches[nextMatchIndex]

  return (
    <>
      <Header />
      <AnimatePresence mode="wait">
          <Outlet key={nextMatch.id} />
      </AnimatePresence>
      <Footer />
    </>
  )
}

export default PublicLayout
