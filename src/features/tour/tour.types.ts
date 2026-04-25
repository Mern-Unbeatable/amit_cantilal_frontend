export interface Tour {
  id: string;
  slug: string;
  title: string;
  images: Array<{ src: string; alt: string }>;
  duration: string;
  departureFrom?: string;
  description: string;
  price?: number;
  isOnDemand?: boolean;
  inclusions?: Array<string>;
  exclusions?: Array<string>;
}