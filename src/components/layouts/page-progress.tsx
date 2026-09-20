import { useRouterState } from '@tanstack/react-router'
import { AnimatePresence, motion } from 'framer-motion'

export const PageProgress = () => {
  const isLoading = useRouterState({ select: (s) => s.status === 'pending' })

  return (
    <AnimatePresence>
      {isLoading && (
        <>
          {/* Progress bar */}
          <motion.div
            key="progress"
            className="fixed top-0 left-0 right-0 z-[999] h-[3px] bg-primary-foreground origin-left"
            initial={{ scaleX: 0, opacity: 1 }}
            animate={{ scaleX: 0.9 }}
            exit={{ scaleX: 1, opacity: 0 }}
            transition={{ duration: 0.8, ease: 'easeInOut' }}
          />

          {/* Spinner at the tip of the progress bar */}
          <motion.div
            key="progress-spinner"
            className="fixed top-1 right-1 z-[999]"
            initial={{ opacity: 0, right: '1%' }}
            animate={{ opacity: 1, right: '1%' }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.8, ease: 'easeInOut' }}
          >
            <div className="h-4 w-4 rounded-full border-2 border-accent/30 border-t-primary animate-spin shadow-md shadow-primary/20" />
          </motion.div>
        </>
      )}
    </AnimatePresence>
  )
}
