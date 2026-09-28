import {
  TransferLandingCta,
  type TransferLandingCtaLink,
} from '@/features/transfers/shared/transfer-landing-cta.tsx'

const LISBON_AIRPORT_LINKS: ReadonlyArray<TransferLandingCtaLink> = [
  { key: 'fleet', to: '/fleet' },
  { key: 'lisbonPorto', to: '/transfers/lisbon-porto-private-transfer' },
  { key: 'lisbonAlgarve', to: '/transfers/lisbon-algarve-private-transfer' },
  { key: 'tours', to: '/tours' },
  { key: 'booking', to: '/booking' },
]

export function LisbonAirportCta() {
  return (
    <TransferLandingCta
      ns="lisbonAirportTransfer"
      imageSrc="/transfers/lisbon-airport/FINAL IMAGE _ LISBON  PRIVATE AIRPORT TRANSFERS.png"
      links={LISBON_AIRPORT_LINKS}
    />
  )
}
