import { z } from "zod";

export const quoteSchema = z.object({
	sneakerId: z.string(),
	sneakerName: z.string(),
	size: z.string("Selecciona una talla"),
});

export type QuoteSchema = z.infer<typeof quoteSchema>;
