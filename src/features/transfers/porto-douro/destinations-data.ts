/** Destination card images for Lisbon ↔ Douro Valley. */
export const DOURO_DESTINATIONS = [
  {
    key: 'regua',
    image: '/transfers/porto-douro/PESO DA RÉGUA DESTINATION CARD _ LISBON DOURO VALLEY.jpg',
  },
  {
    key: 'pinhao',
    image: '/transfers/porto-douro/PINHÃO DESTINATION CARD _ LISBON DOURO VALLEY.jpg',
  },
  {
    key: 'lamego',
    image: '/transfers/porto-douro/LAMEGO DESTINATION CARD _ LISBON DOURO VALLEY (1).jpg',
  },
  {
    key: 'wineEstates',
    image: '/transfers/porto-douro/DOURO WINE ESTATE DESTINATION CARD _ LISBON DOURO VALLEY (1).jpg',
  },
] as const

export type DouroDestinationKey = (typeof DOURO_DESTINATIONS)[number]['key']
