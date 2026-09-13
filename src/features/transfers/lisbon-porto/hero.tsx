import { TransferLandingHero } from '@/features/transfers/shared/transfer-landing-hero.tsx'
import { TRANSFER_LANDING_SHARED_IMAGES } from '@/features/transfers/shared/images.ts'

export function LisbonPortoHero() {
  return (
    <TransferLandingHero
      ns="lisbonPortoTransfer"
      imageSrc={TRANSFER_LANDING_SHARED_IMAGES.hero}
    />
  )
}
