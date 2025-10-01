import { db } from "@/lib/db";
import { brands, sneakers } from "@/lib/db/schema";
import { eq, getTableColumns } from "drizzle-orm";

export type SneakerWithBrand = Awaited<ReturnType<typeof getSneakers>>[number];

export async function getSneakers() {
  try {
    const data = await db
      .select({
        ...getTableColumns(sneakers),
        brandName: brands.name,
      })
      .from(sneakers)
      .innerJoin(brands, eq(sneakers.brandId, brands.id));
    return data;
  } catch (error) {
    console.error(error);
    throw new Error("Failed to fetch sneakers with brand name");
  }
}
