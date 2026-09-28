import { TransferLandingDestinations } from '@/features/transfers/shared/transfer-landing-destinations.tsx'
import { EVORA_EXPERIENCES } from '@/features/transfers/lisbon-evora/experiences-data.ts'

export function LisbonEvoraExperiences() {
  return (
    <TransferLandingDestinations
      ns="lisbonEvoraTransfer"
      destinations={EVORA_EXPERIENCES}
      sectionKey="experiences"
      gridClassName="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 md:gap-6"
    />
  )
}
