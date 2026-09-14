import { TransferLandingDestinations } from '@/features/transfers/shared/transfer-landing-destinations.tsx'
import { SEVILLE_STOPS } from '@/features/transfers/lisbon-seville/stops-data.ts'

export function LisbonSevilleStops() {
  return (
    <TransferLandingDestinations
      ns="lisbonSevilleTransfer"
      destinations={SEVILLE_STOPS}
      sectionKey="stops"
    />
  )
}
