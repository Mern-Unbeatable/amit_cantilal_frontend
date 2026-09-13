import { TransferLandingIntro } from '@/features/transfers/shared/transfer-landing-intro.tsx'
import { TRANSFER_LANDING_SHARED_IMAGES } from '@/features/transfers/shared/images.ts'

export function LisbonAlgarveIntro() {
  return (
    <TransferLandingIntro
      ns="lisbonAlgarveTransfer"
      imageSrc={TRANSFER_LANDING_SHARED_IMAGES.intro}
    />
  )
}
