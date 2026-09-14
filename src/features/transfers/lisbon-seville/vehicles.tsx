import { TransferLandingVehicles } from '@/features/transfers/shared/transfer-landing-vehicles.tsx'

/** Seville fleet cards: EQE, E-Class, EQV */
export const SEVILLE_VEHICLES = [
  { key: 'eqe', image: '/eqe.PNG' },
  { key: 'eClass', image: '/e-class.png' },
  { key: 'eqv', image: '/eqv.PNG' },
] as const

export function LisbonSevilleVehicles() {
  return (
    <TransferLandingVehicles
      ns="lisbonSevilleTransfer"
      vehicles={SEVILLE_VEHICLES}
    />
  )
}
