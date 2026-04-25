export type ServiceType = 'transfer' | 'hourly'

export type VehicleCategory = 'electric' | 'combustion'

export interface Vehicle {
  id: string
  name: string
  description: string
  image: string
  passengers: number
  suitcases: number
  price: number
  category: VehicleCategory
  isElectric: boolean
}

export interface Stop {
  id: string
  value: string
}

export interface TripDetails {
  serviceType: ServiceType
  pickup: string
  dropoff: string
  stops: Array<Stop>
  date: Date | undefined
  time: string
  hours?: number // hourly service only
}

export interface ContactDetails {
  fullName: string
  email: string
  phone: string
  countryCode: string
  flightNumber: string
}

export interface BookingState {
  trip: TripDetails
  vehicle: Vehicle | null
  notes: string
  contact: ContactDetails
}

export const COUNTRY_CODES = [
  { code: '+351', flag: '🇵🇹', label: 'PT' },
  { code: '+44', flag: '🇬🇧', label: 'UK' },
  { code: '+34', flag: '🇪🇸', label: 'ES' },
  { code: '+33', flag: '🇫🇷', label: 'FR' },
  { code: '+49', flag: '🇩🇪', label: 'DE' },
  { code: '+1', flag: '🇺🇸', label: 'US' },
]

// Static fleet data — replace with useQuery when backend is ready
export const FLEET: Array<Vehicle> = [
  {
    id: 'tesla-s',
    name: 'Tesla Model S',
    description: 'Electric Sedan',
    image: '/assets/tesla-model-s.webp',
    passengers: 2,
    suitcases: 2,
    price: 150,
    category: 'electric',
    isElectric: true,
  },
  {
    id: 'eqe',
    name: 'Mercedes-Benz EQE',
    description: 'Electric Sedan',
    image: '/assets/mercedes-eqe.webp',
    passengers: 2,
    suitcases: 2,
    price: 170,
    category: 'electric',
    isElectric: true,
  },
  {
    id: 'eqs',
    name: 'Mercedes-Benz EQS',
    description: 'Electric Sedan',
    image: '/assets/mercedes-eqs.webp',
    passengers: 2,
    suitcases: 2,
    price: 200,
    category: 'electric',
    isElectric: true,
  },
  {
    id: 'eqv',
    name: 'Mercedes-Benz EQV',
    description: 'Electric Van',
    image: '/assets/mercedes-eqv.webp',
    passengers: 6,
    suitcases: 6,
    price: 280,
    category: 'electric',
    isElectric: true,
  },
  {
    id: 'e-class',
    name: 'Mercedes-Benz E-Class',
    description: 'Sedan',
    image: '/assets/mercedes-e-class.webp',
    passengers: 2,
    suitcases: 2,
    price: 120,
    category: 'combustion',
    isElectric: false,
  },
  {
    id: 's-class',
    name: 'Mercedes-Benz S-Class',
    description: 'Luxury Sedan',
    image: '/assets/mercedes-s-class.webp',
    passengers: 2,
    suitcases: 2,
    price: 180,
    category: 'combustion',
    isElectric: false,
  },
  {
    id: 'v-class',
    name: 'Mercedes-Benz V-Class',
    description: 'Van',
    image: '/assets/mercedes-v-class.webp',
    passengers: 6,
    suitcases: 6,
    price: 250,
    category: 'combustion',
    isElectric: false,
  },
  {
    id: 'sprinter',
    name: 'Mercedes-Benz Sprinter',
    description: 'Minibus',
    image: '/assets/mercedes-sprinter.webp',
    passengers: 9,
    suitcases: 9,
    price: 350,
    category: 'combustion',
    isElectric: false,
  },
]
