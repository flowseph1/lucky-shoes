"use client";

import { SelectBrand } from "@/lib/db/schema";
import { cn } from "@/lib/utils";
import classNames from "classnames";
import React, { useState } from "react";
import { CiSearch } from "react-icons/ci";

export function Filters({
	className,
	brands,
}: { className?: string; brands: SelectBrand[] }) {
	const [isActive, setIsActive] = useState("Todos");

	const handleClick = (title: string) => {
		if (title === isActive) {
			setIsActive("Todos");
		} else {
			setIsActive(title);
		}
	};

	return (
		<div className="flex flex-col gap-8 border border-neutral-100 rounded-4xl p-10">
			<div className="w-full p-5 rounded-2xl border border-border-color bg-[rgba(255,255,255,.02)] flex flex-row gap-4 items-center">
				<CiSearch size={20} />
				<input
					type="text"
					placeholder="Busca por nombre, marca o color"
					className="w-full h-full outline-none"
				/>
			</div>
			<ul className={classNames("flex gap-5 flex-wrap", className)}>
				{brands.map((filter) => (
					<FilterItem
						key={filter.name}
						filter={{ title: filter.name }}
						isActive={isActive}
						handleClick={handleClick}
					/>
				))}
			</ul>
		</div>
	);
}

interface Props {
	filter: { title: string };
	isActive: string;
	handleClick: (title: string) => void;
}

const FilterItem = ({ filter, isActive, handleClick }: Props) => {
	return (
		<li
			className={cn(
				"cursor-pointer rounded-md border-[0.1rem] border-border-color px-6 py-2 active:bg-primary shrink-0",
				{
					"bg-primary text-text-base shadow-filter-shadow":
						isActive === filter.title,
					"hover:bg-hover hover:text-text-base": isActive !== filter.title,
				},
			)}
			onClick={() => handleClick(filter.title)}
		>
			{filter.title}
		</li>
	);
};

export default FilterItem;
