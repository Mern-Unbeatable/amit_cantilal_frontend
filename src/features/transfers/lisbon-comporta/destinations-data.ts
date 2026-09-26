export const COMPORTA_DESTINATIONS = [
  {
    key: 'comporta',
    image: '/transfers/lisbon-comporta/DESTINATION SECTION _  COMPORTA _  LISBON COMPORTA.jpg',
  },
  {
    key: 'carvalhal',
    image: '/transfers/lisbon-comporta/DESTINATION SECTION _  CARVALHAL _  LISBON COMPORTA.jpg',
  },
  {
    key: 'melides',
    image: '/transfers/lisbon-comporta/DESTINATION SECTION _ MELIDES _  LISBON COMPORTA.jpg',
  },
  {
    key: 'troia',
    image: '/transfers/lisbon-comporta/DESTINATION SECTION _ TRÓIA _  LISBON COMPORTA.jpg',
  },
] as const

export type ComportaDestinationKey = (typeof COMPORTA_DESTINATIONS)[number]['key']
