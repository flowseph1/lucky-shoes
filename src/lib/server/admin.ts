import { createServerFn } from "@tanstack/react-start";
import { asc, eq, getTableColumns } from "drizzle-orm";
import { z } from "zod";
import { getAccessToken, requireAdmin } from "./auth";

const imageUploadInput = z.object({
	content: z.string().min(1).max(7_000_000),
	contentType: z.enum(["image/jpeg", "image/png", "image/webp", "image/gif"]),
	filename: z.string().min(1).max(255),
});

const imageExtension = {
	"image/jpeg": "jpg",
	"image/png": "png",
	"image/webp": "webp",
	"image/gif": "gif",
} as const;

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

export const uploadImage = createServerFn({ method: "POST" })
	.validator(imageUploadInput)
	.handler(async ({ data }) => {
		await requireAdmin();
		const token = await getAccessToken();
		const url = process.env.SUPABASE_URL;
		const key = process.env.SUPABASE_ANON_KEY;
		if (!url || !key || !token) throw new Error("La carga de imágenes no está configurada.");
		const { createClient } = await import("@supabase/supabase-js");
		const supabase = createClient(url, key, { global: { headers: { Authorization: `Bearer ${token}` } } });
		const extension = imageExtension[data.contentType];
		const path = `admin/${crypto.randomUUID()}.${extension}`;
		const bytes = Buffer.from(data.content, "base64");
		if (bytes.length > 5 * 1024 * 1024) throw new Error("La imagen no puede superar 5 MB.");
		const { error } = await supabase.storage
			.from("sneaker-images")
			.upload(path, bytes, { contentType: data.contentType });
		if (error) throw new Error(`No se pudo subir la imagen: ${error.message}`);
		const { data: publicUrl } = supabase.storage.from("sneaker-images").getPublicUrl(path);
		return { url: publicUrl.publicUrl, path };
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
