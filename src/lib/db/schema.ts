import { relations } from "drizzle-orm";
import { boolean, integer, pgEnum, pgTable, serial, text, timestamp, varchar } from "drizzle-orm/pg-core";

export const brands = pgTable("brands", {
	id: serial("id").primaryKey(),
	name: text("name").notNull(),
	shortDescription: text("short_description"),
	image: text("image").notNull(),
	url: text("url"),
	verified: boolean("verified").notNull().default(false),
});

export const sneakerStatus = pgEnum("sneaker_status", ["active", "inactive"]);
export const sneakerAvailability = pgEnum("sneaker_availability", ["Por encargo", "En stock", "No disponible"]);

export const sneakers = pgTable("sneakers", {
	id: serial("id").primaryKey(),
	brandId: integer("brand_id")
		.notNull()
		.references(() => brands.id),
	name: text("name").notNull(),
	slug: text("slug").notNull().unique(),
	color: varchar("color", { length: 256 }),
	price: integer("price"),
	image: text("image").notNull(),
	shortDescription: text("short_description"),
	longDescription: text("long_description"),
	availability: sneakerAvailability("availability").notNull().default("Por encargo"),
	isNew: boolean("is_new").notNull().default(false),
	status: sneakerStatus("status").default("active"),
	createdAt: timestamp("created_at").notNull().defaultNow(),
	updatedAt: timestamp("updated_at")
		.notNull()
		.$onUpdate(() => new Date()),
});

export const sneakerImages = pgTable("sneaker_images", {
	id: serial("id").primaryKey(),
	sneakerId: integer("sneaker_id")
		.references(() => sneakers.id)
		.notNull(),
	url: text("url").notNull(),
	alt: text("alt"),
	order: integer("order").default(0),
});

export const brandsRelations = relations(brands, ({ many }) => ({
	sneakers: many(sneakers),
}));

export const sneakersRelations = relations(sneakers, ({ one, many }) => ({
	brand: one(brands, {
		fields: [sneakers.brandId],
		references: [brands.id],
	}),
	images: many(sneakerImages),
}));

export const sneakerImagesRelations = relations(sneakerImages, ({ one }) => ({
	sneaker: one(sneakers, {
		fields: [sneakerImages.sneakerId],
		references: [sneakers.id],
	}),
}));

export type InsertSneaker = typeof sneakers.$inferInsert;
export type SelectSneaker = typeof sneakers.$inferSelect;
export type SelectBrand = typeof brands.$inferSelect;
export type BrandInsert = typeof brands.$inferInsert;
