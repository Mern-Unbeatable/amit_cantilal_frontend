/**
 * Destination card images for Lisbon ↔ Porto optional stops.
 * Replace each URL/path when the client provides final assets.
 */
export const STOP_DESTINATIONS = [
  {
    key: 'obidos',
    // TEMP — replace with client Obidos image
    image: 'https://imgcdn.bokun.tools/6d72b473-b3e4-44f6-93d4-eadd8845b7fd.jpg',
  },
  {
    key: 'nazareth',
    // TEMP — replace with client Nazaré image
    image: 'https://imgcdn.bokun.tools/03bbd112-0472-4d90-b842-19bbb97ad9ad.jpg',
  },
  {
    key: 'fatima',
    // TEMP — replace with client Fátima image
    image: 'https://imgcdn.bokun.tools/7c6dcad4-582c-4f6e-8931-7d1cf83ce93b.jpg',
  },
  {
    key: 'coimbra',
    image: '/transfers/lisbon-porto/coimbra.jpg',
  },
  {
    key: 'aveiro',
    image: '/transfers/lisbon-porto/aveiro.jpg',
  },
] as const

export type StopDestinationKey = (typeof STOP_DESTINATIONS)[number]['key']
