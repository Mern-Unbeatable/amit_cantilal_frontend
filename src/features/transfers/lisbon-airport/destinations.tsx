import { TransferLandingDestinations } from '@/features/transfers/shared/transfer-landing-destinations.tsx'
import { LISBON_AIRPORT_DESTINATIONS } from '@/features/transfers/lisbon-airport/destinations-data.ts'

export function LisbonAirportDestinations() {
  return (
    <TransferLandingDestinations
      ns="lisbonAirportTransfer"
      destinations={LISBON_AIRPORT_DESTINATIONS}
      gridClassName="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 md:gap-6"
    />
  )
}
