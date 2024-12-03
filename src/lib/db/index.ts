// lib/db.ts
import { config } from 'dotenv'
import { drizzle } from 'drizzle-orm/postgres-js'
import postgres from 'postgres'

config({ path: '.env.local' }) // Load environment variables

const client = postgres(process.env.DATABASE_URL!, { prepare: false }) // Adjust max connections if needed

export const db = drizzle(client)
