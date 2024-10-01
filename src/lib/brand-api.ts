import { db } from "@/lib/db";
import { BrandInsert, brands } from "@/lib/db/schema";

export async function insertBrand(data: BrandInsert){
    const res = await db.insert(brands).values(data);
    console.log(res);
}