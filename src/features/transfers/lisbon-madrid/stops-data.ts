/** Optional stop card images for Lisbon ↔ Madrid. */
export const MADRID_STOPS = [
  {
    key: 'evora',
    image: '/transfers/lisbon-madrid/ÉVORA STOP IMAGE _ LISBON MADRID.jpg',
  },
  {
    key: 'elvas',
    image: '/transfers/lisbon-madrid/ELVAS STOP IMAGE _ LISBON MADRID.jpg',
  },
  {
    key: 'merida',
    image: '/transfers/lisbon-madrid/MÉRIDA STOP _ LISBON MADRID.jpg',
  },
  {
    key: 'caceres',
    image: '/transfers/lisbon-madrid/CÁCERES STOP _ LISBON MADRID.jpg',
  },
  {
    key: 'trujillo',
    image: '/transfers/lisbon-madrid/TRUJILLO STOP _ LISBON MADRID.jpg',
  },
] as const

export type MadridStopKey = (typeof MADRID_STOPS)[number]['key']
