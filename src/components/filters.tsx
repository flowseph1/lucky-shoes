"use client";

import { CiSearch } from "react-icons/ci";
import { SelectBrand } from "@/lib/db/schema";
import { useQueryState } from "@/lib/hooks/use-query-state";
import { cn } from "@/lib/utils";

export function Filters({ className, brands }: { className?: string; brands: SelectBrand[] }) {
	const [search, setSearch] = useQueryState("search", {
		defaultValue: "",
		debounce: 300,
	});
	const [brand, setBrand] = useQueryState("brand", {
		defaultValue: "",
	});

	return (
		<div className="flex flex-col gap-6 rounded-3xl border border-border-color bg-container-extra-light p-5 sm:gap-8 sm:rounded-4xl sm:p-10">
			<div className="flex w-full flex-row items-center gap-3 rounded-2xl border border-border-color bg-[rgba(255,255,255,.02)] p-4 transition-colors focus-within:border-white/20 focus-within:shadow-input-shadow sm:gap-4 sm:p-5">
				<CiSearch size={20} className="shrink-0 text-text-extra-light" />
				<input
					type="text"
					placeholder="Busca por nombre, marca o color"
					className="h-full w-full bg-transparent text-text-base outline-none placeholder:text-text-extra-light"
					value={search}
					onChange={(e) => setSearch(e.target.value)}
				/>
			</div>
			<ul className={cn("flex flex-wrap gap-3 sm:gap-5", className)}>
				{brands.map((filter) => (
					<FilterItem
						key={filter.name}
						filter={{ title: filter.name }}
						selected={brand === filter.name}
						handleClick={(filterName) => setBrand(filterName)}
					/>
				))}
			</ul>
		</div>
	);
}

interface Props {
	filter: { title: string };
	selected: boolean;
	handleClick: (title: string) => void;
}

const FilterItem = ({ filter, selected, handleClick }: Props) => {
	return (
		<li
			className={cn(
				"shrink-0 cursor-pointer select-none rounded-full border-[0.1rem] border-border-color px-4 py-2 text-sm transition-colors active:bg-primary sm:px-6",
				{
					"border-primary-300 bg-primary text-text-base shadow-filter-shadow": selected,
					"hover:border-white/20 hover:bg-hover hover:text-text-base": !selected,
				},
			)}
			onClick={() => handleClick(selected ? "" : filter.title)}
		>
			{filter.title}
		</li>
	);
};

export default FilterItem;
