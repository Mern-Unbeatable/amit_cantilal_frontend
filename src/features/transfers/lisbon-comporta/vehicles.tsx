import { TransferLandingVehicles } from '@/features/transfers/shared/transfer-landing-vehicles.tsx'

export const COMPORTA_VEHICLES = [
  {
    key: 'eClass',
    image: '/transfers/lisbon-comporta/Mercedes E Class.PNG',
  },
  {
    key: 'sClass',
    image: '/transfers/lisbon-comporta/Mercedes S Class.PNG',
  },
  {
    key: 'vClass',
    image: '/transfers/lisbon-comporta/Mercedes V Class.PNG',
  },
] as const

export function LisbonComportaVehicles() {
  return <TransferLandingVehicles ns="lisbonComportaTransfer" vehicles={COMPORTA_VEHICLES} />
}
