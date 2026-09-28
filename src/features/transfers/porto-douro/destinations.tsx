import { TransferLandingDestinations } from '@/features/transfers/shared/transfer-landing-destinations.tsx'
import { DOURO_DESTINATIONS } from '@/features/transfers/porto-douro/destinations-data.ts'

export function PortoDouroDestinations() {
  return (
    <TransferLandingDestinations
      ns="portoDouroTransfer"
      destinations={DOURO_DESTINATIONS}
      sectionKey="destinations"
      gridClassName="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 md:gap-6"
    />
  )
}
