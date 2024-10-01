DO $$ BEGIN
 CREATE TYPE "public"."sneaker_status" AS ENUM('active', 'inactive');
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "brands" (
	"id" serial PRIMARY KEY NOT NULL,
	"name" text NOT NULL,
	"short_description" text
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "sneaker_images" (
	"id" serial PRIMARY KEY NOT NULL,
	"sneaker_id" integer NOT NULL,
	"image_url" text NOT NULL
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "sneakers" (
	"id" serial PRIMARY KEY NOT NULL,
	"brand_id" integer NOT NULL,
	"name" text NOT NULL,
	"slug" text NOT NULL,
	"color" varchar(256),
	"price" integer,
	"image" text,
	"short_description" text,
	"long_description" text,
	"is_available" boolean DEFAULT true NOT NULL,
	"is_new" boolean DEFAULT false NOT NULL,
	"status" "sneaker_status",
	"created_at" timestamp DEFAULT now() NOT NULL,
	"updated_at" timestamp NOT NULL
);
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "sneaker_images" ADD CONSTRAINT "sneaker_images_sneaker_id_sneakers_id_fk" FOREIGN KEY ("sneaker_id") REFERENCES "public"."sneakers"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "sneakers" ADD CONSTRAINT "sneakers_brand_id_brands_id_fk" FOREIGN KEY ("brand_id") REFERENCES "public"."brands"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
