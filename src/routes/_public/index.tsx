import { createFileRoute } from '@tanstack/react-router'
import React from 'react'
import {motion} from 'framer-motion'

import { mainTransitionProps } from '@/lib/utils.ts'

const App: React.FC = () => {
  return (
    <motion.div {...mainTransitionProps}>

    </motion.div>
  )
}

export const Route = createFileRoute('/_public/')({
  component: App,
})
