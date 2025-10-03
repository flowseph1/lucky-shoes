UPDATE "sneakers" SET "availability" = 'Por encargo' WHERE "availability" IS NULL;--> statement-breakpoint
ALTER TABLE "sneakers" ALTER COLUMN "availability" SET DEFAULT 'Por encargo';--> statement-breakpoint
ALTER TABLE "sneakers" ALTER COLUMN "availability" SET NOT NULL;