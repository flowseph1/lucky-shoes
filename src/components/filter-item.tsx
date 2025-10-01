import classNames from "classnames";
import React from "react";

interface Props {
	filter: { title: string };
	isActive: string;
	handleClick: (title: string) => void;
}

const FilterItem = ({ filter, isActive, handleClick }: Props) => {
	return (
		<li
			className={classNames(
				"cursor-pointer rounded-md border-[0.1rem] border-border-color px-6 py-2 active:bg-primary shrink-0",
				isActive === filter.title && "bg-primary font-semibold text-text-base shadow-filter-shadow",
				isActive !== filter.title && "hover:bg-hover hover:text-text-base"
			)}
			onClick={() => handleClick(filter.title)}
		>
			{filter.title}
		</li>
	);
};

export default FilterItem;
