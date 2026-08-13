import classNames from "classnames";
import type React from "react";
import { memo } from "react";
import InputLabel from "./InputLabel";

type NativeSelectProps = Omit<React.SelectHTMLAttributes<HTMLSelectElement>, "className">;

interface ISelect extends NativeSelectProps {
	label?: string;
	className?: string;
	fullWidth?: boolean;
}

const Select = ({ label, className, fullWidth, disabled, children, ...rest }: ISelect) => {
	return (
		<div className={classNames("inline-flex flex-col", className, fullWidth && "w-full")}>
			{label && <InputLabel label={label} />}
			<div
				className={classNames(
					"flex h-16 w-full items-center rounded-lg border-[0.1rem] border-white/[0.08] bg-neutral-500 px-5 text-sm transition-colors focus-within:border-white/[0.24]",
					disabled ? "opacity-60" : "hover:border-white/[0.16]",
				)}
			>
				<select
					className={classNames(
						"h-full w-full cursor-pointer bg-transparent outline-none [color-scheme:dark] [&>option]:bg-neutral-500",
						disabled ? "text-text-extra-light" : "text-text-base",
					)}
					disabled={disabled}
					{...rest}
				>
					{children}
				</select>
			</div>
		</div>
	);
};

export default memo(Select);
