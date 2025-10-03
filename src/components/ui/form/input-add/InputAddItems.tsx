import { cx } from "class-variance-authority";
import { memo } from "react";
import InputAddItem from "./InputAddItem";

interface InputAddItemProps {
	value: string[];
	handleDelete: (item: string) => void;
}

function InputAddItems({ value, handleDelete }: InputAddItemProps) {
	return (
		<div className={cx("relative inline-flex h-full w-full flex-wrap rounded-lg bg-neutral-700 text-sm")}>
			{value.map((item: string) => {
				return <InputAddItem item={item} key={item} handleDelete={handleDelete} />;
			})}
		</div>
	);
}

export default memo(InputAddItems);
