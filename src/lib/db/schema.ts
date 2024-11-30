import { relations } from 'drizzle-orm'
import {
	boolean,
	integer,
	pgEnum,
	pgTable,
	serial,
	text,
	timestamp,
	varchar,
} from 'drizzle-orm/pg-core'

export const brands = pgTable('brands', {
	id: serial('id').primaryKey(),
	name: text('name').notNull(),
	shortDescription: text('short_description'),
	image: text('image'),
})

export const sneakerStatus = pgEnum('sneaker_status', ['active', 'inactive'])

export const sneakers = pgTable('sneakers', {
	id: serial('id').primaryKey(),
	brandId: integer('brand_id')
		.notNull()
		.references(() => brands.id),
	name: text('name').notNull(),
	slug: text('slug').notNull(),
	color: varchar('color', { length: 256 }),
	price: integer('price'),
	image: text('image'),
	shortDescription: text('short_description'),
	longDescription: text('long_description'),
	isAvailable: boolean('is_available').notNull().default(true),
	isNew: boolean('is_new').notNull().default(false),
	status: sneakerStatus('status'),
	createdAt: timestamp('created_at').notNull().defaultNow(),
	updatedAt: timestamp('updated_at')
		.notNull()
		.$onUpdate(() => new Date()),
})

export const sneakerImages = pgTable('sneaker_images', {
	id: serial('id').primaryKey(),
	sneakerId: integer('sneaker_id')
		.notNull()
		.references(() => sneakers.id),
	imageUrl: text('image_url').notNull(),
})

export const brandsRelations = relations(brands, ({ many }) => ({
	sneakers: many(sneakers),
}))

export const sneakersRelations = relations(sneakers, ({ one, many }) => ({
	brand: one(brands, {
		fields: [sneakers.brandId],
		references: [brands.id],
	}),
	images: many(sneakerImages),
}))

export const sneakerImagesRelations = relations(sneakerImages, ({ one }) => ({
	sneaker: one(sneakers, {
		fields: [sneakerImages.sneakerId],
		references: [sneakers.id],
	}),
}))

export type Brand = typeof brands.$inferSelect
export type SneakerInsert = typeof sneakers.$inferInsert
export type BrandInsert = typeof brands.$inferInsert
