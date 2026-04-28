import { BadgePercent, Building2, Car, Clock,
  Fuel,
  MapPin,
  Plane,
  Shield, Users, Zap} from "lucide-react";

type ServiceItem = {
  id: number;
  title: string;
  description: string;
  icon: React.ElementType;
};

type FleetItem = {
  id: number;
  name: string;
  image: string;
  tags: Array<{
    label: string;
    icon: string; // iconify name
    variant?: "primary" | "dark";
  }>;
};

export const services: Array<ServiceItem> = [
  {
    id: 1,
    title: "Airport Transfers",
    description:
      "Punctual and luxurious airport pickups and drop-offs across Portugal.",
    icon: Plane,
  },
  {
    id: 2,
    title: "Private Tours",
    description:
      "Exclusive guided tours to Portugal's most iconic destinations.",
    icon: MapPin,
  },
  {
    id: 3,
    title: "Chauffeur Service",
    description:
      "Hourly service with a professional driver at your disposal.",
    icon: Clock,
  },
];


export const fleet: Array<FleetItem> = [
  {
    id: 1,
    name: "Mercedes-Benz E-Class & EQE",
    image: "/e-class.png",
    tags: [
      { label: "Electric", icon: "mdi:flash", variant: "primary" },
      { label: "Diesel", icon: "mdi:fuel", variant: "dark" },
    ],
  },
  {
    id: 2,
    name: "Mercedes-Benz S-Class & EQS",
    image: "/s-class.png",
    tags: [
      { label: "Electric", icon: "mdi:flash", variant: "primary" },
      { label: "Diesel", icon: "mdi:fuel", variant: "dark" },
    ],
  },
  {
    id: 3,
    name: "Mercedes-Benz V-Class & EQV",
    image: "/v-class.png",
    tags: [
      { label: "Electric", icon: "mdi:flash", variant: "primary" },
      { label: "Diesel", icon: "mdi:fuel", variant: "dark" },
    ],
  },
];

export const features = [
  {
    icon: Car,
    title: 'Luxury Fleet',
    description:
      'Premium Mercedes-Benz vehicles that meet the highest standards for your most discerning clients.',
  },
  {
    icon: Users,
    title: 'Group Transport',
    description:
      'Capacity for groups from 6 to 48 people with the right vehicle for every occasion.',
  },
  {
    icon: Clock,
    title: '24/7 Availability & Support',
    description:
      'Dedicated support and service available around the clock so you can rely on us every time.',
  },
  {
    icon: Shield,
    title: 'Exclusive Services',
    description:
      'Personalised VIP service tailored to your clients\' specific needs and preferences.',
  },
  {
    icon: Fuel,
    title: 'Long Distance Options',
    description:
      'For long-distance transfers we have Mercedes E-Class, S-Class and Sprinter vehicles available.',
  },
  {
    icon: BadgePercent,
    title: 'Competitive Commission',
    description:
      'Earn up to 15% commission on every booking with transparent monthly reporting and fast payouts.',
  },
  ]

export const PartnershipServices = [
  {
    icon: Zap,
    title: '100% Electric Fleet',
    description:
      'Our sustainable fleet represents the future of premium transportation. Give your clients luxury with minimal environmental impact.',
  },
  {
    icon: Users,
    title: 'Dedicated Account Manager',
    description:
      '24/7 support with real-time tracking and dedicated account management tailored to your business.',
  },
  {
    icon: Shield,
    title: 'White Label Service',
    description:
      'Smooth integration with your brand identity and booking systems for a seamless client experience.',
  },
  {
    icon: Building2,
    title: 'Flexible Contracts',
    description:
      'Custom agreements and volume pricing tailored to your business size, frequency and needs.',
  },
]

export const areas = [
  {
    title: 'Continental Portugal',
    description:
      'Lisbon, Porto, Algarve, Alentejo, Central and North regions — complete national coverage.',
    cities: ['Lisbon', 'Porto', 'Faro', 'Évora', 'Coimbra', 'Braga'],
  },
  {
    title: 'Spain',
    description:
      'Available upon request — Madrid, Seville, Barcelona and other major cities.',
    cities: ['Madrid', 'Seville', 'Barcelona', 'Valencia', 'Málaga'],
  },
]