
import { Client } from 'pg';

export interface AccommodationLocation {
  region: string;
  city: string;
}

export interface Accommodation {
  id: string;
  hostId: string;
  maxGuests: number;
  location: AccommodationLocation;
  accessibility: boolean;
  isAvailable: boolean;
  petsAllowed: boolean;
  createdAt: Date;
  updatedAt: Date;
}

export class AccommodationModel {
  private static client: Client;
  
  static setClient(pgClient: Client) {
    this.client = pgClient;
  }

  static async create(data: Omit<Accommodation, 'id' | 'createdAt' | 'updatedAt'>): Promise<Accommodation> {
    const query = `
      INSERT INTO accommodations (
        host_id, max_guests, location, accessibility, pets_allowed, is_available,
        created_at, updated_at
      ) VALUES (
        $1, $2, $3, $4, $5, $6, NOW(), NOW()
      ) RETURNING *
    `;
    
    const values = [
      data.hostId,
      data.maxGuests,
      JSON.stringify(data.location),
      data.accessibility,
      data.petsAllowed,
      data.isAvailable
    ];

    const result = await this.client.query(query, values);
    return this.mapRowToAccommodation(result.rows[0]);
  }

  static async findByLocation(
    region?: string, 
    city?: string
  ): Promise<Accommodation[]> {
    let query = `
      SELECT * FROM accommodations 
      WHERE is_available = true
    `;
    const values: any[] = [];
    let paramIndex = 1;
  
    if (region) {
      query += ` AND location->>'region' ILIKE $${paramIndex}`;
      values.push(`%${region}%`);
      paramIndex++;
    }
    
    if (city) {
      query += ` AND location->>'city' ILIKE $${paramIndex}`;
      values.push(`%${city}%`);
      paramIndex++;
    }
  
    query += ` ORDER BY created_at DESC`;
    
    const result = await this.client.query(query, values);
    return result.rows.map(this.mapRowToAccommodation);
  }

  static async findByAccessibility(needsAccessible: boolean): Promise<Accommodation[]> {
    const query = `
      SELECT * FROM accommodations 
      WHERE is_available = true
        AND accessibility = $1
      ORDER BY created_at DESC
    `;
    
    const result = await this.client.query(query, [needsAccessible]);
    return result.rows.map(this.mapRowToAccommodation);
  }

  static async findPetFriendly(): Promise<Accommodation[]> {
    const query = `
      SELECT * FROM accommodations 
      WHERE is_available = true
        AND pets_allowed = true
      ORDER BY created_at DESC
    `;
    
    const result = await this.client.query(query);
    return result.rows.map(this.mapRowToAccommodation);
  }

  static async findById(id: string): Promise<Accommodation | null> {
    const query = 'SELECT * FROM accommodations WHERE id = $1';
    const result = await this.client.query(query, [id]);
    
    if (result.rows.length === 0) {
      return null;
    }
    
    return this.mapRowToAccommodation(result.rows[0]);
  }

  static async findAll(limit: number = 50, offset: number = 0): Promise<Accommodation[]> {
    const query = `
      SELECT * FROM accommodations 
      WHERE is_available = true
      ORDER BY created_at DESC 
      LIMIT $1 OFFSET $2
    `;
    
    const result = await this.client.query(query, [limit, offset]);
    return result.rows.map(this.mapRowToAccommodation);
  }

  static async update(id: string, data: Partial<Accommodation>): Promise<Accommodation | null> {
    const updates: string[] = [];
    const values: any[] = [];
    let paramIndex = 1;

    Object.entries(data).forEach(([key, value]) => {
      if (key !== 'id' && key !== 'createdAt' && value !== undefined) {
        if (typeof value === 'object' && value !== null) {
          updates.push(`${this.camelToSnake(key)} = $${paramIndex}`);
          values.push(JSON.stringify(value));
        } else {
          updates.push(`${this.camelToSnake(key)} = $${paramIndex}`);
          values.push(value);
        }
        paramIndex++;
      }
    });

    if (updates.length === 0) {
      return this.findById(id);
    }

    updates.push(`updated_at = NOW()`);
    values.push(id);

    const query = `
      UPDATE accommodations 
      SET ${updates.join(', ')} 
      WHERE id = $${paramIndex} 
      RETURNING *
    `;

    const result = await this.client.query(query, values);
    
    if (result.rows.length === 0) {
      return null;
    }
    
    return this.mapRowToAccommodation(result.rows[0]);
  }

  static async delete(id: string): Promise<boolean> {
    const query = 'DELETE FROM accommodations WHERE id = $1';
    const result = await this.client.query(query, [id]);
    return result.rowCount! > 0;
  }

  static async markAsBooked(id: string): Promise<boolean> {
    const query = `
      UPDATE accommodations 
      SET is_available = false, updated_at = NOW() 
      WHERE id = $1
    `;
    const result = await this.client.query(query, [id]);
    return result.rowCount! > 0;
  }

  static async markAsAvailable(id: string): Promise<boolean> {
    const query = `
      UPDATE accommodations 
      SET is_available = true, updated_at = NOW() 
      WHERE id = $1
    `;
    const result = await this.client.query(query, [id]);
    return result.rowCount! > 0;
  }

  private static mapRowToAccommodation(row: any): Accommodation {
    return {
      id: row.id,
      hostId: row.host_id,
      maxGuests: row.max_guests,
      location: typeof row.location === 'string' ? JSON.parse(row.location) : row.location,
      accessibility: row.accessibility,
      petsAllowed: row.pets_allowed,
      isAvailable: row.is_available,
      createdAt: row.created_at,
      updatedAt: row.updated_at
    };
  }

  private static camelToSnake(str: string): string {
    return str.replace(/[A-Z]/g, (letter) => `_${letter.toLowerCase()}`);
  }
}