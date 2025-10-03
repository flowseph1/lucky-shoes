import { and, asc, eq, getTableColumns, ilike, or, sql } from "drizzle-orm";
import { db } from "@/lib/db";
import { brands, sneakerImages, sneakers } from "@/lib/db/schema";

interface GetSneakersParams {
	brand?: string;
	search?: string;
}

export async function getSneakers(filters: GetSneakersParams = {}) {
	try {
		const { brand, search } = filters;

		let whereConditions = [];

		// Brand filter
		if (brand && brand !== "all") {
			whereConditions.push(eq(brands.name, brand));
		}

		// Search filter (name, brand, color)
		if (search) {
			whereConditions.push(
				or(
					ilike(sneakers.name, `%${search}%`),
					ilike(sneakers.color, `%${search}%`),
					ilike(brands.name, `%${search}%`),
				),
			);
		}

		console.log("EXECUTING QUERY");

		const data = await db
			.select({
				...getTableColumns(sneakers),
				brand: brands,
			})
			.from(sneakers)
			.innerJoin(brands, eq(sneakers.brandId, brands.id))
			.where(whereConditions.length > 0 ? and(...whereConditions) : undefined)
			.orderBy(asc(sneakers.createdAt));

		return data;
	} catch (error) {
		console.error(error);
		throw new Error("Failed to fetch sneakers with brand name");
	}
}

export async function getSneakersWithLimitAndRandom(limit: number) {
	try {
		const data = await getSneakers();
		const random = Math.floor(Math.random() * data.length);
		return data.slice(random, random + limit);
	} catch (error) {
		console.error(error);
		throw new Error("Failed to fetch sneakers with limit");
	}
}

export async function getSneakerBySlug(slug: string) {
	try {
		const data = await db
			.select({
				...getTableColumns(sneakers),
				brand: brands,
				images: sql<
					{
						url: string;
						order: number;
						alt: string;
					}[]
				>`COALESCE(json_agg(json_build_object('url', ${sneakerImages.url}, 'order', ${sneakerImages.order}, 'alt', COALESCE(${sneakerImages.alt}, '')) ORDER BY ${sneakerImages.order}) FILTER (WHERE ${sneakerImages.id} IS NOT NULL), '[]')`,
			})
			.from(sneakers)
			.innerJoin(brands, eq(sneakers.brandId, brands.id))
			.leftJoin(sneakerImages, eq(sneakers.id, sneakerImages.sneakerId))
			.where(eq(sneakers.slug, slug))
			.groupBy(sneakers.id, brands.id, brands.name, brands.shortDescription, brands.image, brands.url, brands.verified)
			.limit(1);

		return data[0];
	} catch (error) {
		console.error(error);
		throw new Error("Failed to fetch sneaker by slug");
	}
}

export type SneakerWithBrand = Awaited<ReturnType<typeof getSneakers>>[number];
export type SneakerWithBrandAndImages = Awaited<ReturnType<typeof getSneakerBySlug>>;
