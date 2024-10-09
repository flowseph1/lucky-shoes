
import { config } from 'dotenv';
import { defineConfig } from 'drizzle-kit';

config({ path: '.env.local' }); 

export default defineConfig({
    schema: "./src/lib/db/schema.ts",
    out: "./supabase/migrations", 
    dialect: "postgresql",
    dbCredentials: {
        url: process.env.DATABASE_URL!,
    }
})