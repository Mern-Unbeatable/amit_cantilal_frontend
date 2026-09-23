import { TransferLandingVehicles } from '@/features/transfers/shared/transfer-landing-vehicles.tsx'

export const PORTO_VEHICLES = [
  {
    key: 'eClass',
    image: '/transfers/lisbon-porto/Mercedes%20E%20Class.PNG',
  },
  {
    key: 'sClass',
    image: '/transfers/lisbon-porto/Mercedes%20S%20Class.PNG',
  },
  {
    key: 'vClass',
    image: '/transfers/lisbon-porto/Mercedes%20V%20Class.PNG',
  },
] as const

export function LisbonPortoVehicles() {
  return <TransferLandingVehicles ns="lisbonPortoTransfer" vehicles={PORTO_VEHICLES} />
}
