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
      src="/118dab1d-996a-4565-bc16-7c458b7d64c5.png"
      layout="constrained"
      width={width}
      height={height}
      alt="Company Logo"
      className={cn('h-7 md:h-20 lg:h-24 object-contain',className)}
    />
  )
}

export default ApplicationLogo
