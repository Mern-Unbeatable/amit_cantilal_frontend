import { Clock, MapPin, Plane } from "lucide-react";

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
    name: "Mercedes-Benz EQE & E-Class",
    image: "/mercedes-eqe-hotel-clean-Bu__kXyP.webp",
    tags: [
      { label: "Electric", icon: "mdi:flash", variant: "primary" },
      { label: "Diesel", icon: "mdi:fuel", variant: "dark" },
    ],
  },
  {
    id: 2,
    name: "Mercedes-Benz EQS & S-Class",
    image: "/mercedes-eqs-premium-CZqyaYaU.webp",
    tags: [
      { label: "Electric", icon: "mdi:flash", variant: "primary" },
      { label: "Diesel", icon: "mdi:fuel", variant: "dark" },
    ],
  },
  {
    id: 3,
    name: "Mercedes-Benz EQV & V-Class",
    image: "/mercedes-eqv-luxury-clean-lg8pM9c8.webp",
    tags: [
      { label: "Electric", icon: "mdi:flash", variant: "primary" },
      { label: "Diesel", icon: "mdi:fuel", variant: "dark" },
    ],
  },
];