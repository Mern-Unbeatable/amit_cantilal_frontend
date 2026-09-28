import { TransferLandingVehicles } from '@/features/transfers/shared/transfer-landing-vehicles.tsx'

export const LISBON_AIRPORT_VEHICLES = [
  {
    key: 'eClass',
    image: '/transfers/lisbon-porto/Mercedes E Class.PNG',
  },
  {
    key: 'sClass',
    image: '/transfers/lisbon-porto/Mercedes S Class.PNG',
  },
  {
    key: 'vClass',
    image: '/transfers/lisbon-porto/Mercedes V Class.PNG',
  },
] as const

export function LisbonAirportVehicles() {
  return (
    <TransferLandingVehicles
      ns="lisbonAirportTransfer"
      vehicles={LISBON_AIRPORT_VEHICLES}
    />
  )
}
