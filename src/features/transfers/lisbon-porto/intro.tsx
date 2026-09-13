import { TransferLandingIntro } from '@/features/transfers/shared/transfer-landing-intro.tsx'
import { TRANSFER_LANDING_SHARED_IMAGES } from '@/features/transfers/shared/images.ts'

export function LisbonPortoIntro() {
  return (
    <TransferLandingIntro
      ns="lisbonPortoTransfer"
      imageSrc={TRANSFER_LANDING_SHARED_IMAGES.intro}
    />
  )
}
