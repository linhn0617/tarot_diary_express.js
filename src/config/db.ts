// config/db.ts
import { drizzle } from 'drizzle-orm/node-postgres';
import { Client } from 'pg';
import * as schema from '../database/schema';
import * as dotenv from 'dotenv';

dotenv.config();

const client = new Client({
  connectionString: process.env.DATABASE_URL!,
});

(async () => {
  await client.connect();
})();

export const db = drizzle(client, { schema });
