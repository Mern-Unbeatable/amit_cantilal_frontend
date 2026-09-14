/** Optional stop card images for Lisbon ↔ Seville. */
export const SEVILLE_STOPS = [
  {
    key: 'evora',
    image: '/transfers/lisbon-seville/evora.jpg',
  },
  {
    key: 'monsaraz',
    image: '/transfers/lisbon-seville/monsaraz.jpg',
  },
  {
    key: 'cincoJotas',
    image: '/transfers/lisbon-seville/cinco-jotas.jpg',
  },
  {
    key: 'merida',
    image: '/transfers/lisbon-seville/merida.jpg',
  },
  {
    key: 'cordoba',
    image: '/transfers/lisbon-seville/cordoba.jpg',
  },
] as const

export type SevilleStopKey = (typeof SEVILLE_STOPS)[number]['key']
