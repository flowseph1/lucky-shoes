import classNames from "classnames";
import type React from "react";
import { memo } from "react";
import { LuCheck } from "react-icons/lu";

type NativeCheckboxProps = Omit<React.InputHTMLAttributes<HTMLInputElement>, "className" | "type">;

interface ICheckbox extends NativeCheckboxProps {
	label: string;
	description?: string;
	className?: string;
}

const Checkbox = ({ label, description, className, disabled, ...rest }: ICheckbox) => {
	return (
		<label
			className={classNames(
				"group flex w-fit cursor-pointer items-center gap-3 rounded-md py-1 text-sm outline-none focus-within:ring-2 focus-within:ring-primary-500/60 focus-within:ring-offset-2 focus-within:ring-offset-neutral-600",
				disabled ? "cursor-not-allowed opacity-60" : "hover:text-text-base",
				className,
			)}
		>
			<span className="relative flex size-5 shrink-0 items-center justify-center">
				<input
					type="checkbox"
					disabled={disabled}
					className="peer size-5 cursor-pointer appearance-none rounded border border-white/[0.28] bg-neutral-500 transition-colors checked:border-primary-500 checked:bg-primary-500 hover:border-primary-500 disabled:cursor-not-allowed"
					{...rest}
				/>
				<LuCheck
					size={14}
					strokeWidth={3}
					aria-hidden="true"
					className="pointer-events-none absolute text-white opacity-0 transition-opacity peer-checked:opacity-100"
				/>
			</span>
			<span className="min-w-0 leading-tight">
				<span className="block font-medium text-text-base">{label}</span>
				{description && <span className="mt-1 block text-text-extra-light text-xs">{description}</span>}
			</span>
		</label>
	);
};

export default memo(Checkbox);
