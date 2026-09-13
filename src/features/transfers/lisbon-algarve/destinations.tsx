import { TransferLandingDestinations } from '@/features/transfers/shared/transfer-landing-destinations.tsx'
import { ALGARVE_DESTINATIONS } from '@/features/transfers/lisbon-algarve/destinations-data.ts'

export function LisbonAlgarveDestinations() {
  return (
    <TransferLandingDestinations
      ns="lisbonAlgarveTransfer"
      destinations={ALGARVE_DESTINATIONS}
    />
  )
}
