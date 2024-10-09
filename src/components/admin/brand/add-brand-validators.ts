import { z } from "zod";

export const AddBrandSchema = z.object({
	name: z.string().min(3).max(50),
	image: z.string().min(3).max(50),
	description: z.string().min(3).max(50),
});

export type AddBrandSchemaType = z.infer<typeof AddBrandSchema>;
