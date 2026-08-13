import { createServerFn } from "@tanstack/react-start";
import { asc, eq, getTableColumns } from "drizzle-orm";
import { z } from "zod";
import { requireAdmin } from "./auth";

const brandInput = z.object({
	id: z.number().int().optional(),
	name: z.string().min(1),
	shortDescription: z.string().nullable(),
	image: z.string().url(),
	imagePath: z.string().nullable(),
	url: z.string().url().nullable(),
	verified: z.boolean(),
});
const sneakerInput = z.object({
	id: z.number().int().optional(),
	brandId: z.number().int(),
	name: z.string().min(1),
	slug: z.string().min(1),
	color: z.string().nullable(),
	price: z.number().int().nullable(),
	image: z.string().url(),
	imagePath: z.string().nullable(),
	shortDescription: z.string().nullable(),
	longDescription: z.string().nullable(),
	availability: z.enum(["Por encargo", "En stock", "No disponible"]),
	isNew: z.boolean(),
	status: z.enum(["active", "inactive"]),
	images: z.array(
		z.object({
			url: z.string().url(),
			path: z.string().nullable(),
			alt: z.string().nullable(),
			order: z.number().int(),
		}),
	),
});

export const getAdminBrands = createServerFn({ method: "GET" }).handler(async () => {
	await requireAdmin();
	const { db } = await import("@/lib/db");
	const { brands } = await import("@/lib/db/schema");
	return db.select().from(brands).orderBy(asc(brands.name));
});
export const getAdminSneakers = createServerFn({ method: "GET" }).handler(async () => {
	await requireAdmin();
	const { db } = await import("@/lib/db");
	const { brands, sneakers } = await import("@/lib/db/schema");
	return db
		.select({ ...getTableColumns(sneakers), brand: brands })
		.from(sneakers)
		.innerJoin(brands, eq(sneakers.brandId, brands.id))
		.orderBy(asc(sneakers.name));
});

export const saveBrand = createServerFn({ method: "POST" })
	.validator(brandInput)
	.handler(async ({ data }) => {
		await requireAdmin();
		const { db } = await import("@/lib/db");
		const { brands } = await import("@/lib/db/schema");
		const values = {
			name: data.name,
			shortDescription: data.shortDescription,
			image: data.image,
			imagePath: data.imagePath,
			url: data.url,
			verified: data.verified,
		};
		if (data.id) return (await db.update(brands).set(values).where(eq(brands.id, data.id)).returning())[0];
		return (await db.insert(brands).values(values).returning())[0];
	});
export const deleteBrand = createServerFn({ method: "POST" })
	.validator(z.object({ id: z.number().int() }))
	.handler(async ({ data }) => {
		await requireAdmin();
		const { db } = await import("@/lib/db");
		const { brands, sneakers } = await import("@/lib/db/schema");
		const attached = await db.select({ id: sneakers.id }).from(sneakers).where(eq(sneakers.brandId, data.id)).limit(1);
		if (attached.length) throw new Error("Move or delete this brand's sneakers first");
		await db.delete(brands).where(eq(brands.id, data.id));
		return { ok: true };
	});
export const saveSneaker = createServerFn({ method: "POST" })
	.validator(sneakerInput)
	.handler(async ({ data }) => {
		await requireAdmin();
		const { db } = await import("@/lib/db");
		const { sneakerImages, sneakers } = await import("@/lib/db/schema");
		const { images, id, ...values } = data;
		const sneaker = id
			? (await db.update(sneakers).set(values).where(eq(sneakers.id, id)).returning())[0]
			: (await db.insert(sneakers).values(values).returning())[0];
		await db.delete(sneakerImages).where(eq(sneakerImages.sneakerId, sneaker.id));
		if (images.length)
			await db.insert(sneakerImages).values(images.map((image) => ({ ...image, sneakerId: sneaker.id })));
		return sneaker;
	});
export const deleteSneaker = createServerFn({ method: "POST" })
	.validator(z.object({ id: z.number().int() }))
	.handler(async ({ data }) => {
		await requireAdmin();
		const { db } = await import("@/lib/db");
		const { sneakerImages, sneakers } = await import("@/lib/db/schema");
		await db.delete(sneakerImages).where(eq(sneakerImages.sneakerId, data.id));
		await db.delete(sneakers).where(eq(sneakers.id, data.id));
		return { ok: true };
	});
