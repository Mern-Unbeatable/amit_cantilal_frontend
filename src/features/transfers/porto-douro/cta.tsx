import {
  TransferLandingCta,
  type TransferLandingCtaLink,
} from '@/features/transfers/shared/transfer-landing-cta.tsx'

const LISBON_DOURO_LINKS: ReadonlyArray<TransferLandingCtaLink> = [
  { key: 'fleet', to: '/fleet' },
  { key: 'lisbonAirport', to: '/transfers/lisbon-airport-private-transfer' },
  { key: 'lisbonPorto', to: '/transfers/lisbon-porto-private-transfer' },
  { key: 'tours', to: '/tours' },
  { key: 'booking', to: '/booking' },
]

export function PortoDouroCta() {
  return (
    <TransferLandingCta
      ns="portoDouroTransfer"
      imageSrc="/transfers/porto-douro/FINAL IMAGE _ LISBON ÉVORA.png"
      links={LISBON_DOURO_LINKS}
    />
  )
}
