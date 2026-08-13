import { useState } from "react";
import { QUOTE_PHONE } from "@/constants/quote-phone";

const SIZES = [
	"US 6.5",
	"US 7",
	"US 7.5",
	"US 8",
	"US 8.5",
	"US 9",
	"US 9.5",
	"US 10",
	"US 10.5",
	"US 11",
	"US 11.5",
	"US 12",
	"US 12.5",
	"US 13",
];

export function QuoteForm({ sneakerName }: { sneakerName: string }) {
	const [size, setSize] = useState("");
	const [showSizeError, setShowSizeError] = useState(false);
	return (
		<form
			className="flex flex-col gap-3"
			onSubmit={(event) => {
				event.preventDefault();
				if (!size) {
					setShowSizeError(true);
					return;
				}
				const message = `Hola, estoy interesado en cotizar el siguiente tenis:\n- Modelo: ${sneakerName}\n- Talla: ${size}\n- Link: ${window.location.href}`;
				window.open(`https://wa.me/${QUOTE_PHONE}?text=${encodeURIComponent(message)}`, "_blank");
			}}
		>
			<fieldset className="flex flex-col gap-3" aria-describedby={showSizeError ? "quote-size-error" : undefined}>
				<div className="flex items-baseline justify-between">
					<legend className="font-semibold text-text-light text-xs uppercase tracking-wider">Talla</legend>
					<span className="text-text-base text-xs tabular-nums">{size || "Sin seleccionar"}</span>
				</div>
				<div className="grid grid-cols-5 gap-2.5 sm:grid-cols-6">
					{SIZES.map((availableSize) => {
						const isSelected = size === availableSize;
						return (
							<button
								key={availableSize}
								type="button"
								aria-pressed={isSelected}
								onClick={() => {
									setSize(availableSize);
									setShowSizeError(false);
								}}
								className={`h-12 cursor-pointer rounded-xl border font-semibold text-sm transition-all duration-150 ${
									isSelected
										? "border-primary-300 bg-primary-500 text-text-base shadow-[0_0_20px_-4px_var(--color-primary-500)]"
										: "hover:-translate-y-0.5 border-border-color bg-container-extra-light text-text-light hover:border-primary-300/50 hover:bg-container-light hover:text-text-base"
								}`}
							>
								{availableSize.replace("US ", "")}
							</button>
						);
					})}
				</div>
				{showSizeError && (
					<p id="quote-size-error" role="alert" className="text-secondary text-sm">
						Selecciona una talla para continuar.
					</p>
				)}
			</fieldset>
			<button
				type="submit"
				className="rounded-lg border border-primary-300 bg-primary-500 p-3.5 font-semibold text-text-base transition-shadow hover:shadow-filter-shadow"
			>
				Cotizar por WhatsApp
			</button>
		</form>
	);
}
