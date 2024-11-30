import { db } from '@/lib/db'
import { Brand, brands } from '@/lib/db/schema'

export const getBrands = async (): Promise<Brand[]> => {
	return await db.select().from(brands)
}
