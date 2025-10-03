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
		<div className="flex flex-col gap-8 rounded-4xl border border-border-color p-10">
			<div className="flex w-full flex-row items-center gap-4 rounded-2xl border border-border-color bg-[rgba(255,255,255,.02)] p-5">
				<CiSearch size={20} />
				<input
					type="text"
					placeholder="Busca por nombre, marca o color"
					className="h-full w-full outline-none"
					value={search}
					onChange={(e) => setSearch(e.target.value)}
				/>
			</div>
			<ul className={cn("flex flex-wrap gap-5", className)}>
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
				"shrink-0 cursor-pointer rounded-md border-[0.1rem] border-border-color px-6 py-2 active:bg-primary",
				{
					"bg-primary text-text-base shadow-filter-shadow": selected,
					"hover:bg-hover hover:text-text-base": !selected,
				},
			)}
			onClick={() => handleClick(selected ? "" : filter.title)}
		>
			{filter.title}
		</li>
	);
};

export default FilterItem;
