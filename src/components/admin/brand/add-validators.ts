import { z } from 'zod'

export const AddBrandSchema = z.object({
	name: z.string().min(2, 'Nombre es requerido.').max(50),
	description: z
		.string({
			required_error: 'Descripción es requerida.',
		})
		.min(2, 'Descripción es requerida.'),
	image: z
		.string({
			required_error: 'Imagen es requerida.',
		})
		.min(2, 'Imagen es requerida.')
		.nullable(),
})

export type AddBrandSchemaProps = z.infer<typeof AddBrandSchema>
