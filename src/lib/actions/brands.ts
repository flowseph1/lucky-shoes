'use server'

import { AddBrandSchema } from '@/components/admin/brand/add-validators'
import { SUPABASE_BUCKET_NAME } from '@/lib/constants'
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

export async function deleteBrand(prevState: any, formData: FormData) {
	try {
		/* Delete the brand from db */
		const id = Number(formData.get('id'))
		const res = await db.delete(brands).where(eq(brands.id, id))

		/* Delete brand image from storage */
		const brand = await db.select().from(brands).where(eq(brands.id, id))
		const imageName = brand[0].image?.split('/').pop()
		const { error } = await supabaseClient.storage
			.from(SUPABASE_BUCKET_NAME)
			.remove([`brands/${imageName}`])

		if (error) {
			return ApiResponse({
				success: false,
				code: 500,
				message: `Brand deleted, but image not removed from storage: ${error.message}`,
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
