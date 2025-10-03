import { db } from "../db";
import { brands } from "../db/schema";

export async function getBrands() {
	try {
		const brandsData = await db.select().from(brands);
		return brandsData;
	} catch (error) {
		console.error(error);
		throw new Error("Failed to fetch brands");
	}
}
