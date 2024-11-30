// lib/db.ts
import { config } from 'dotenv'
import { drizzle } from 'drizzle-orm/postgres-js'
import postgres from 'postgres'

config({ path: '.env.local' }) // Load environment variables

// Global variable to hold the client
let client: ReturnType<typeof postgres>

if (!global.dbClient) {
	client = postgres(process.env.DATABASE_URL!, { max: 10 }) // Adjust max connections if needed
	global.dbClient = drizzle(client) // Assign to a global variable
}

export const db = global.dbClient
