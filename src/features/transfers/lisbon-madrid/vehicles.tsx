import { TransferLandingVehicles } from '@/features/transfers/shared/transfer-landing-vehicles.tsx'

export const MADRID_VEHICLES = [
  {
    key: 'eClass',
    image: '/transfers/lisbon-madrid/Mercedes%20E%20Class.PNG',
  },
  {
    key: 'sClass',
    image: '/transfers/lisbon-madrid/Mercedes%20S%20Class.PNG',
  },
  {
    key: 'vClass',
    image: '/transfers/lisbon-madrid/Mercedes%20V%20Class.PNG',
  },
] as const

export function LisbonMadridVehicles() {
  return <TransferLandingVehicles ns="lisbonMadridTransfer" vehicles={MADRID_VEHICLES} />
}
