import { TransferLandingVehicles } from '@/features/transfers/shared/transfer-landing-vehicles.tsx'

export const EVORA_VEHICLES = [
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

export function LisbonEvoraVehicles() {
  return <TransferLandingVehicles ns="lisbonEvoraTransfer" vehicles={EVORA_VEHICLES} />
}
