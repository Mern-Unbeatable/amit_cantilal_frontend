/** Optional experience card images for Lisbon ↔ Évora. */
export const EVORA_EXPERIENCES = [
  {
    key: 'winery',
    image: '/transfers/lisbon-evora/ALENTEJO WINE EXPERIENCE (1).jpg',
  },
  {
    key: 'arraiolos',
    image: '/transfers/lisbon-evora/ARRAIOLOS EXPERIENCE CARD (1).jpg',
  },
  {
    key: 'corkCountryside',
    image: '/transfers/lisbon-evora/EXPERIENCE CORK _ ALENTEJO COUNTRY SIDE CARD.jpg',
  },
  {
    key: 'montemor',
    image: '/transfers/lisbon-evora/MONTEMOR-O-NOVO EXPERIENCE CARD (1).jpg',
  },
] as const

export type EvoraExperienceKey = (typeof EVORA_EXPERIENCES)[number]['key']
