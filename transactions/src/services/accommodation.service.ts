import { prisma } from '../lib/prisma-client';
import { 
  Accommodation,  
  CreateAccommodationData, 
  UpdateAccommodationData,
  AccommodationLocation 
} from '../types/accommodation';

export class AccommodationService {
  static async create(data: CreateAccommodationData): Promise<Accommodation> {
    return await prisma.accommodation.create({
      data: {
        hostId: data.hostId,
        maxGuests: data.maxGuests,
        location: data.location as any, // Prisma handles JSON
        accessibility: data.accessibility ?? false,
        petsAllowed: data.petsAllowed ?? false,
        isAvailable: data.isAvailable ?? true,
      },
    });
  }

  static async findById(id: string): Promise<Accommodation | null> {
    return await prisma.accommodation.findUnique({
      where: { id },
    });
  }

  static async findAll(limit: number = 50, offset: number = 0): Promise<Accommodation[]> {
    return await prisma.accommodation.findMany({
      where: { isAvailable: true },
      orderBy: { createdAt: 'desc' },
      take: limit,
      skip: offset,
    });
  }

  static async findByLocation(
    region?: string, 
    city?: string
  ): Promise<Accommodation[]> {
    const whereClause: any = { isAvailable: true };

    if (region || city) {
      whereClause.OR = [];
      
      if (region) {
        whereClause.OR.push({
          location: {
            path: ['region'],
            string_contains: region,
          },
        });
      }
      
      if (city) {
        whereClause.OR.push({
          location: {
            path: ['city'],
            string_contains: city,
          },
        });
      }
    }

    return await prisma.accommodation.findMany({
      where: whereClause,
      orderBy: { createdAt: 'desc' },
    });
  }

  static async findByAccessibility(needsAccessible: boolean): Promise<Accommodation[]> {
    return await prisma.accommodation.findMany({
      where: {
        isAvailable: true,
        accessibility: needsAccessible,
      },
      orderBy: { createdAt: 'desc' },
    });
  }

  static async findPetFriendly(): Promise<Accommodation[]> {
    return await prisma.accommodation.findMany({
      where: {
        isAvailable: true,
        petsAllowed: true,
      },
      orderBy: { createdAt: 'desc' },
    });
  }

  static async update(id: string, data: UpdateAccommodationData): Promise<Accommodation | null> {
    try {
      return await prisma.accommodation.update({
        where: { id },
        data: {
          ...data,
          location: data.location ? (data.location as any) : undefined,
        },
      });
    } catch (error) {
      return null; // Record not found
    }
  }

  static async delete(id: string): Promise<boolean> {
    try {
      await prisma.accommodation.delete({
        where: { id },
      });
      return true;
    } catch (error) {
      return false;
    }
  }

  static async markAsBooked(id: string): Promise<boolean> {
    try {
      await prisma.accommodation.update({
        where: { id },
        data: { isAvailable: false },
      });
      return true;
    } catch (error) {
      return false;
    }
  }

  static async markAsAvailable(id: string): Promise<boolean> {
    try {
      await prisma.accommodation.update({
        where: { id },
        data: { isAvailable: true },
      });
      return true;
    } catch (error) {
      return false;
    }
  }
}