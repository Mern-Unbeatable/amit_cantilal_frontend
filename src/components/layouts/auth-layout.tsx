import { Outlet, useLocation } from '@tanstack/react-router'
import { AnimatePresence, motion} from 'framer-motion'
import { memo } from 'react'
import { Clock, TrendingUp, Users } from 'lucide-react'
import { PageTransition } from '@/components/layouts/page-transition.tsx'

const FEATURES = [
  {
    icon: Clock,
    title: 'Flexible scheduling',
    desc: 'Book sessions that fit your calendar',
  },
  {
    icon: Users,
    title: 'Personal attention',
    desc: 'Every session is built around you',
  },
  {
    icon: TrendingUp,
    title: 'Track your progress',
    desc: 'See how far you\'ve come after each session',
  },
]


// Memoize so PageProgress re-renders don't replay the animation
const AuthContent = memo(({ pathname }: { pathname: string }) => (
  <AnimatePresence mode="sync">
    <PageTransition key={pathname}>
      <Outlet />
    </PageTransition>
  </AnimatePresence>
))

const AuthLayout = () => {
  const { pathname } = useLocation()

  return (
    <div className="min-h-screen flex  dark:bg-zinc-950">

      {/* ── Left panel ─────────────────────────────────────────────────────── */}
      <div className="hidden lg:flex w-[420px] xl:w-[460px] flex-shrink-0 bg-[#0E2A46] flex-col justify-between p-12 relative overflow-hidden">

        {/* Decorative circles */}
        <div className="absolute -top-20 -right-20 w-72 h-72 rounded-full bg-orange-500/10" />
        <div className="absolute bottom-16 -left-16 w-52 h-52 rounded-full bg-orange-500/6" />
        <div className="absolute top-1/2 right-8 w-3 h-3 rounded-full bg-orange-400/40" />
        <div className="absolute top-1/3 left-12 w-2 h-2 rounded-full bg-orange-400/30" />

        {/* Logo */}
        <div className="relative z-10">
          <span className="font-black text-2xl tracking-tight text-white font-['Syne',sans-serif]">
            Learnify<span className="text-orange-500">Dev</span>
          </span>
        </div>

        {/* Hero text */}
        <motion.div
          className="relative z-10"
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1 }}
        >
          <span className="inline-block text-[10px] font-semibold tracking-[2px] uppercase text-orange-400 bg-orange-500/15 px-3 py-1.5 rounded-full mb-5">
            1-on-1 Mentorship
          </span>
          <h1 className="text-4xl xl:text-5xl font-extrabold text-white leading-[1.1] tracking-tight mb-5 font-['Syne',sans-serif]">
            Learn to code<br />
            with <span className="text-orange-400">expert</span><br />
            guidance
          </h1>
          <p className="text-white/50 text-sm leading-relaxed max-w-[280px]">
            Personalized web development sessions scheduled around your life.
            No cohorts, no waiting — just you and your mentor.
          </p>
        </motion.div>

        {/* Features */}
        <motion.div
          className="relative z-10 space-y-4"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.3 }}
        >
          {FEATURES.map(({ icon: Icon, title, desc }) => (
            <div key={title} className="flex items-start gap-3">
              <div className="w-9 h-9 rounded-xl bg-orange-500/15 flex items-center justify-center flex-shrink-0">
                <Icon size={15} className="text-orange-400" />
              </div>
              <div>
                <p className="text-white text-sm font-medium">{title}</p>
                <p className="text-white/40 text-xs mt-0.5 leading-relaxed">{desc}</p>
              </div>
            </div>
          ))}
        </motion.div>
      </div>

      {/* ── Right panel ─────────────────────────────────────────────────────── */}
      <div className="flex-1 flex items-center justify-center px-6 py-10 overflow-y-auto">
        <motion.div
          className="w-full max-w-xl"
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <AuthContent pathname={pathname}></AuthContent>
        </motion.div>
      </div>
    </div>
  )
}

export default AuthLayout