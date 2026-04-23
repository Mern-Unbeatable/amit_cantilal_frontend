import React from 'react'

interface SectionLabelProps {
  children: React.ReactNode
}

const SectionLabel = ({ children }: SectionLabelProps) => {
  return (
    <div className="flex items-center gap-3 mb-4 mt-2">
      <span className="text-[10px] font-semibold tracking-[1.8px] uppercase text-gray-400 dark:text-gray-500 whitespace-nowrap">
        {children}
      </span>
      <div className="flex-1 h-px bg-gray-100 dark:bg-zinc-800" />
    </div>
  )
}

export default SectionLabel
