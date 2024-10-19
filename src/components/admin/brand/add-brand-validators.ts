import { z } from "zod";

export const AddBrandSchema = z.object({
	name: z.string().min(3).max(50),
	image: z
		.instanceof(FileList)
		.refine((file) => file?.length == 1, "File is required."),
	description: z.string().min(3).max(50),
});

export type AddBrandSchemaType = z.infer<typeof AddBrandSchema>;
