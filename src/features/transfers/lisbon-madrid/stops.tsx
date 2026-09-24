import { TransferLandingDestinations } from '@/features/transfers/shared/transfer-landing-destinations.tsx'
import { MADRID_STOPS } from '@/features/transfers/lisbon-madrid/stops-data.ts'

export function LisbonMadridStops() {
  return (
    <TransferLandingDestinations
      ns="lisbonMadridTransfer"
      destinations={MADRID_STOPS}
      sectionKey="stops"
    />
  )
}
