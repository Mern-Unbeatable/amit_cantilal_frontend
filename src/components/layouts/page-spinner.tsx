import { useRouterState } from '@tanstack/react-router'
import { AnimatePresence, motion } from 'framer-motion'

export const PageSpinner = () => {
  const isLoading = useRouterState({ select: (s) => s.status === 'pending' })

  return (
    <AnimatePresence>
      {isLoading && (
        <motion.div
          key="spinner"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.15 }}
          className="absolute inset-0 z-50 flex items-center justify-center bg-background/60 backdrop-blur-sm"
        >
          <div className="flex flex-col items-center gap-3">
            <div className="h-10 w-10 rounded-full border-4 border-primary/20 border-t-primary animate-spin" />
            <span className="text-sm text-muted-foreground">Loading...</span>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}