import { Client } from 'pg';
import { AccommodationModel } from './models/accommodation';

export class DatabaseManager {
  private static client: Client;

  static async initialize(): Promise<void> {
    if (!process.env.DATABASE_URL) {
      throw new Error('DATABASE_URL must be defined');
    }

    try {
      this.client = new Client({
        connectionString: process.env.DATABASE_URL
      });

      await this.client.connect();

      await this.setupSchema();

      this.initializeModels();

    } catch (error) {
      console.error('❌ Database initialization failed:', error);
      throw error;
    }
  }

  private static async setupSchema(): Promise<void> {
    const createAccommodationsTable = `
      CREATE TABLE IF NOT EXISTS accommodations (
        id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
        host_id VARCHAR(255) NOT NULL,
        max_guests INTEGER NOT NULL CHECK (max_guests >= 1 AND max_guests <= 20),
        location JSONB NOT NULL,
        accessibility BOOLEAN DEFAULT false,
        pets_allowed BOOLEAN DEFAULT false,
        is_available BOOLEAN DEFAULT true,
        created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
        updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
      );
    `;

    const createIndexes = `
      CREATE INDEX IF NOT EXISTS idx_accommodations_host_id ON accommodations(host_id);
      CREATE INDEX IF NOT EXISTS idx_accommodations_is_available ON accommodations(is_available);
      CREATE INDEX IF NOT EXISTS idx_accommodations_location_region ON accommodations((location->>'region'));
      CREATE INDEX IF NOT EXISTS idx_accommodations_location_city ON accommodations((location->>'city'));
      CREATE INDEX IF NOT EXISTS idx_accommodations_created_at ON accommodations(created_at DESC);
    `;

    await this.client.query(createAccommodationsTable);
    await this.client.query(createIndexes);
  }

  private static initializeModels(): void {
    AccommodationModel.setClient(this.client);
  }

  static getClient(): Client {
    if (!this.client) {
      throw new Error('Database not initialized. Call DatabaseManager.initialize() first');
    }
    return this.client;
  }

  static async disconnect(): Promise<void> {
    if (this.client) {
      await this.client.end();
      console.log('🔌 Disconnected from PostgreSQL');
    }
  }

  static async healthCheck(): Promise<boolean> {
    try {
      await this.client.query('SELECT 1');
      return true;
    } catch (error) {
      console.error('Database health check failed:', error);
      return false;
    }
  }
}