import { Accommodation } from '@prisma/client';

export interface AccommodationLocation {
  region: string;
  city: string;
}

export interface CreateAccommodationData {
  hostId: string;
  maxGuests: number;
  location: AccommodationLocation;
  accessibility?: boolean;
  petsAllowed?: boolean;
  isAvailable?: boolean;
}

export interface UpdateAccommodationData {
  maxGuests?: number;
  location?: AccommodationLocation;
  accessibility?: boolean;
  petsAllowed?: boolean;
  isAvailable?: boolean;
}

export type { Accommodation } from '@prisma/client';