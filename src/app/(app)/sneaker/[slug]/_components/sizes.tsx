import { UseFormSetValue } from "react-hook-form";
import { QuoteSchema } from "@/lib/schemas/quote";
import { cn } from "@/lib/utils";

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

export function Sizes({
	error,
	value,
	setValue,
}: {
	error: string;
	value: string;
	setValue: UseFormSetValue<QuoteSchema>;
}) {
	return (
		<div className="flex flex-col gap-5">
			<p>Selecciona tu talla</p>
			<div className="grid grid-cols-2 gap-2 sm:grid-cols-3 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5">
				{SIZES.map((size) => (
					<Size key={size} size={size} onClick={() => setValue("size", size)} isSelected={value === size} />
				))}
			</div>
			{error && <p className="text-red-500">{error}</p>}
		</div>
	);
}

function Size({ size, onClick, isSelected }: { size: string; onClick: () => void; isSelected: boolean }) {
	return (
		<div
			onClick={onClick}
			className={cn(
				"flex h-16 flex-1 cursor-pointer items-center justify-center rounded-lg border border-border-color/50 bg-neutral-900 px-4 hover:bg-neutral-700",
				{
					"border-primary-300 bg-primary-500 hover:bg-primary-500": isSelected,
				},
			)}
		>
			<p
				className={cn("font-semibold", {
					"text-text-base": isSelected,
				})}
			>
				{size}
			</p>
		</div>
	);
}
