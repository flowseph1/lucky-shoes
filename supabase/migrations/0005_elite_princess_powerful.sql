ALTER TABLE "brands" ALTER COLUMN "image" SET NOT NULL;--> statement-breakpoint
ALTER TABLE "sneakers" ALTER COLUMN "image" SET NOT NULL;--> statement-breakpoint
ALTER TABLE "brands" ADD COLUMN "url" text;--> statement-breakpoint
ALTER TABLE "brands" ADD COLUMN "verified" boolean DEFAULT false NOT NULL;--> statement-breakpoint
ALTER TABLE "sneakers" ADD CONSTRAINT "sneakers_slug_unique" UNIQUE("slug");