"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { Sizes } from "@/app/(app)/sneaker/[slug]/_components/sizes";
import { Button } from "@/components";
import { QUOTE_PHONE } from "@/constants/quote-phone";
import { SneakerWithBrandAndImages } from "@/lib/api/sneakers";
import { QuoteSchema, quoteSchema } from "@/lib/schemas/quote";

export function QuoteForm({ sneaker }: { sneaker: SneakerWithBrandAndImages }) {
	const {
		formState: { errors },
		setValue,
		watch,
		handleSubmit,
	} = useForm<QuoteSchema>({
		resolver: zodResolver(quoteSchema),
		defaultValues: {
			sneakerName: sneaker.name,
			sneakerId: sneaker.id.toString(),
		},
	});

	const onSubmit = (data: QuoteSchema) => {
		const message = `Hola, estoy interesado en cotizar el siguiente tenis:
- Modelo: ${data.sneakerName}
- Talla: ${data.size}
- Link: ${window.location.href}
`;
		window.open(`https://wa.me/${QUOTE_PHONE}?text=${encodeURIComponent(message)}`, "_blank");
	};

	return (
		<div className="flex flex-col gap-8">
			<Sizes value={watch("size")} setValue={setValue} error={errors.size?.message || ""} />
			<Button title="Cotizar" size="large" onClick={handleSubmit(onSubmit)} />
		</div>
	);
}
