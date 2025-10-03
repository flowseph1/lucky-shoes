ALTER TABLE "sneaker_images" ADD COLUMN "url" text NOT NULL;--> statement-breakpoint
ALTER TABLE "sneaker_images" ADD COLUMN "alt" text;--> statement-breakpoint
ALTER TABLE "sneaker_images" ADD COLUMN "order" integer DEFAULT 0;--> statement-breakpoint
ALTER TABLE "sneaker_images" DROP COLUMN "image_url";