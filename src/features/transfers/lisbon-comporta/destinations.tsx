import { TransferLandingDestinations } from '@/features/transfers/shared/transfer-landing-destinations.tsx'
import { COMPORTA_DESTINATIONS } from '@/features/transfers/lisbon-comporta/destinations-data.ts'

export function LisbonComportaDestinations() {
  return (
    <TransferLandingDestinations
      ns="lisbonComportaTransfer"
      destinations={COMPORTA_DESTINATIONS}
      sectionKey="destinations"
    />
  )
}
