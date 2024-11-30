'use server'

import { AddBrandSchema } from '@/components/admin/brand/add-validators'
import { db } from '@/lib/db'
import { BrandInsert, brands } from '@/lib/db/schema'
import { supabaseClient } from '@/lib/supabase/server'
import { ApiResponse } from '@/lib/utils'
import { eq } from 'drizzle-orm'

export async function insertBrand(prevState: any, formData: FormData) {
	try {
		const data = Object.fromEntries(formData)
		const parsed = AddBrandSchema.safeParse(data)

		if (!parsed.success) {
			return ApiResponse({
				success: false,
				code: 400,
				message: 'Invalid data',
				validations: parsed.error.flatten().fieldErrors,
				fields: data as any,
			})
		}

		/* Prepare the payload for the database */
		const payload: BrandInsert = {
			name: parsed.data.name,
			shortDescription: parsed.data.description,
			image: parsed.data.image,
		}

		/* Insert the brand into the database */
		const res = await db.insert(brands).values(payload)

		return ApiResponse({
			success: true,
			code: 200,
			data: res,
			message: 'Brand added successfully',
		})
	} catch (error) {
		if (error instanceof Error) {
			return ApiResponse({
				success: false,
				code: 500,
				message: error.message,
			})
		}
	}
}

export async function deleteBrand(id: number) {
	try {
		/* Get the brand to delete */
		const brand = await db.select().from(brands).where(eq(brands.id, id))

		/* Delete the brand */
		const res = await db.delete(brands).where(eq(brands.id, id))

		/* Remove image from storage */
		const storagePath = `brands/${brand[0].image}`
		const { error } = await supabaseClient.storage
			.from(storagePath)
			.remove([storagePath])

		if (error) {
			return ApiResponse({
				success: false,
				code: 500,
				message: error.message,
			})
		}

		return ApiResponse({
			success: true,
			code: 200,
			data: res,
			message: 'Brand deleted successfully',
		})
	} catch (error) {
		if (error instanceof Error) {
			return ApiResponse({
				success: false,
				code: 500,
				message: error.message,
			})
		}
	}
}
