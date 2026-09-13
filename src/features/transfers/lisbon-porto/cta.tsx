import { TransferLandingCta } from '@/features/transfers/shared/transfer-landing-cta.tsx'
import { TRANSFER_LANDING_SHARED_IMAGES } from '@/features/transfers/shared/images.ts'

export function LisbonPortoCta() {
  return (
    <TransferLandingCta
      ns="lisbonPortoTransfer"
      imageSrc={TRANSFER_LANDING_SHARED_IMAGES.hero}
    />
  )
}
