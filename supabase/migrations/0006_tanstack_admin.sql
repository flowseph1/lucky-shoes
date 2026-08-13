CREATE TYPE "public"."profile_role" AS ENUM ('customer', 'admin');

CREATE TABLE "public"."profiles" (
	"id" uuid PRIMARY KEY REFERENCES "auth"."users"("id") ON DELETE CASCADE,
	"role" "public"."profile_role" NOT NULL DEFAULT 'customer',
	"created_at" timestamp NOT NULL DEFAULT now()
);

ALTER TABLE "public"."brands" ADD COLUMN "image_path" text;
ALTER TABLE "public"."sneakers" ADD COLUMN "image_path" text;
ALTER TABLE "public"."sneaker_images" ADD COLUMN "path" text;

ALTER TABLE "public"."profiles" ENABLE ROW LEVEL SECURITY;
CREATE POLICY "profiles_read_own" ON "public"."profiles" FOR SELECT USING (auth.uid() = id);

INSERT INTO storage.buckets (id, name, public) VALUES ('sneaker-images', 'sneaker-images', true)
ON CONFLICT (id) DO NOTHING;

CREATE OR REPLACE FUNCTION public.is_admin()
RETURNS boolean LANGUAGE sql STABLE SECURITY DEFINER SET search_path = public
AS $$ SELECT EXISTS (SELECT 1 FROM public.profiles WHERE id = auth.uid() AND role = 'admin') $$;

CREATE POLICY "admin_manage_sneaker_images" ON storage.objects FOR ALL
USING (bucket_id = 'sneaker-images' AND public.is_admin())
WITH CHECK (bucket_id = 'sneaker-images' AND public.is_admin());
