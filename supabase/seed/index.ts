import { db } from "@/lib/db";
import { brands, sneakerImages, sneakers } from "@/lib/db/schema";
import { brandsData } from "./brands";
import { sneakersData } from "./sneakers";

async function main() {
	// Clear all data
	console.log("Clearing all data...");
	await db.delete(sneakerImages);
	await db.delete(sneakers);
	await db.delete(brands);
	console.log("Data cleared successfully");
	// Seed brands first
	console.log("Seeding brands...");
	await db.insert(brands).values(brandsData);
	console.log("Brands seeded successfully");

	// Seed sneakers next
	console.log("Seeding sneakers...");
	await db.insert(sneakers).values(sneakersData);
	console.log("Sneakers seeded successfully");
}

main()
	.catch(console.error)
	.finally(() => process.exit());
