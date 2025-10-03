CREATE TYPE "public"."sneaker_availability" AS ENUM('Por encargo', 'En stock', 'No disponible');--> statement-breakpoint
ALTER TABLE "sneakers" ALTER COLUMN "status" SET DEFAULT 'active';--> statement-breakpoint
ALTER TABLE "sneakers" ADD COLUMN "availability" "sneaker_availability";--> statement-breakpoint
ALTER TABLE "sneakers" DROP COLUMN "is_available";