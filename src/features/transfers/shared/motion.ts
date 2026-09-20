export const landingViewport = {
  once: true,
  amount: 0.18,
  margin: '0px 0px -40px 0px',
} as const

export const landingEase = [0.22, 1, 0.36, 1] as const

export const fadeUp = {
  initial: { opacity: 0, y: 28 },
  whileInView: { opacity: 1, y: 0 },
  viewport: landingViewport,
  transition: { duration: 0.75, ease: landingEase },
} as const

export const fadeIn = {
  initial: { opacity: 0 },
  whileInView: { opacity: 1 },
  viewport: landingViewport,
  transition: { duration: 0.8, ease: landingEase },
} as const

export const heroCopy = {
  initial: { opacity: 0, y: 32 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.9, ease: landingEase, delay: 0.15 },
} as const

export const staggerContainer = {
  initial: {},
  whileInView: {
    transition: { staggerChildren: 0.08, delayChildren: 0.05 },
  },
  viewport: landingViewport,
} as const

export const staggerItem = {
  initial: { opacity: 0, y: 20 },
  whileInView: { opacity: 1, y: 0 },
  transition: { duration: 0.55, ease: landingEase },
} as const
