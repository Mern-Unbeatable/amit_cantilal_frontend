import { motion } from 'framer-motion'
import { mainTransitionProps } from '@/lib/utils.ts'

interface AppWrapperProps {
  children: React.ReactNode
}

const AppWrapper = ({ children }: AppWrapperProps) => {
  return (
    <motion.div
      className="@container/main flex flex-col gap-6"
      {...mainTransitionProps}
    >
      {children}
    </motion.div>
  )
}

export default AppWrapper
