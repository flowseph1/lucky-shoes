import { notFound } from "@tanstack/react-router";
import { createServerFn } from "@tanstack/react-start";
import { and, asc, eq, getTableColumns, ilike, ne, or, sql } from "drizzle-orm";
import { z } from "zod";

const catalogFilters = z.object({ brand: z.string().optional(), search: z.string().optional() });

export const getCatalog = createServerFn({ method: "GET" })
	.validator(catalogFilters)
	.handler(async ({ data }) => {
		const { db } = await import("@/lib/db");
		const { brands, sneakers } = await import("@/lib/db/schema");
		const conditions = [eq(sneakers.status, "active")];
		if (data.brand) conditions.push(eq(brands.name, data.brand));
		if (data.search) {
			conditions.push(
				or(
					ilike(sneakers.name, `%${data.search}%`),
					ilike(sneakers.color, `%${data.search}%`),
					ilike(brands.name, `%${data.search}%`),
				)!,
			);
		}
		return db
			.select({ ...getTableColumns(sneakers), brand: brands })
			.from(sneakers)
			.innerJoin(brands, eq(sneakers.brandId, brands.id))
			.where(and(...conditions))
			.orderBy(asc(sneakers.createdAt));
	});

export const getCatalogBrands = createServerFn({ method: "GET" }).handler(async () => {
	const { db } = await import("@/lib/db");
	const { brands } = await import("@/lib/db/schema");
	return db.select().from(brands);
});

export const getPublicSneaker = createServerFn({ method: "GET" })
	.validator(z.object({ slug: z.string().min(1) }))
	.handler(async ({ data }) => {
		const { db } = await import("@/lib/db");
		const { brands, sneakerImages, sneakers } = await import("@/lib/db/schema");
		const result = await db
			.select({
				...getTableColumns(sneakers),
				brand: brands,
				images: sql<
					{ url: string; order: number; alt: string }[]
				>`COALESCE(json_agg(json_build_object('url', ${sneakerImages.url}, 'order', ${sneakerImages.order}, 'alt', COALESCE(${sneakerImages.alt}, '')) ORDER BY ${sneakerImages.order}) FILTER (WHERE ${sneakerImages.id} IS NOT NULL), '[]')`,
			})
			.from(sneakers)
			.innerJoin(brands, eq(sneakers.brandId, brands.id))
			.leftJoin(sneakerImages, eq(sneakers.id, sneakerImages.sneakerId))
			.where(and(eq(sneakers.slug, data.slug), eq(sneakers.status, "active")))
			.groupBy(sneakers.id, brands.id)
			.limit(1);
		if (!result[0]) throw notFound();
		return result[0];
	});

export const getRelatedSneakers = createServerFn({ method: "GET" })
	.validator(z.object({ brandId: z.number(), excludeSlug: z.string() }))
	.handler(async ({ data }) => {
		const { db } = await import("@/lib/db");
		const { brands, sneakers } = await import("@/lib/db/schema");
		return db
			.select({ ...getTableColumns(sneakers), brand: brands })
			.from(sneakers)
			.innerJoin(brands, eq(sneakers.brandId, brands.id))
			.where(
				and(eq(sneakers.status, "active"), eq(sneakers.brandId, data.brandId), ne(sneakers.slug, data.excludeSlug)),
			)
			.orderBy(asc(sneakers.createdAt))
			.limit(6);
	});
