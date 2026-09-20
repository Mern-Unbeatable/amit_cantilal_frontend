import { Image } from '@unpic/react'
import { cn } from '@/lib/utils.ts'

interface ApplicationLogoProps {
  width?: number
  height?: number
  className?: string
}

const ApplicationLogo = ({
  width = 151,
  height = 90,
  className,
}: ApplicationLogoProps) => {
  return (
    <Image
      src="/dec694ac-4884-4c39-b971-6ec08ef86146-1920w.webp"
      layout="constrained"
      width={width}
      height={height}
      alt="Company Logo"
      className={cn('h-16 md:h-20 lg:h-24 object-contain', className)}
    />
  )
}

export default ApplicationLogo
