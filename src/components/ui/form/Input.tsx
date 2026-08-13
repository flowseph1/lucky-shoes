import classNames from "classnames";
import type React from "react";
import { memo } from "react";
import type { UseFormRegisterReturn } from "react-hook-form";
import InputLabel from "./InputLabel";

type NativeInputProps = Omit<React.InputHTMLAttributes<HTMLInputElement>, "className" | "placeholder">;

interface IInput extends NativeInputProps {
	iconLeft?: React.ReactNode;
	iconRight?: React.ReactNode;
	placeholder?: string;
	label?: string;
	className?: string;
	register?: UseFormRegisterReturn;
	fullWidth?: boolean;
}

const Input = ({
	type = "text",
	iconLeft,
	iconRight,
	placeholder = "Ingresar",
	className,
	register,
	fullWidth,
	label,
	disabled,
	...rest
}: IInput) => {
	return (
		<div className={classNames("inline-flex flex-col", className, fullWidth && "w-full")}>
			{label && <InputLabel label={label} />}
			<div
				className={classNames(
					"flex h-16 w-full items-center rounded-lg border-[0.1rem] border-white/[0.08] bg-neutral-500 px-5 text-sm transition-colors focus-within:border-white/[0.24]",
					disabled ? "opacity-60" : "hover:border-white/[0.16]",
				)}
			>
				<label className={"flex w-full"}>
					{iconLeft && <div className="mr-3">{iconLeft}</div>}
					<input
						type={type}
						className={classNames(
							"h-full w-full bg-transparent outline-none placeholder:text-text-xx-light",
							disabled ? "text-text-extra-light" : "text-text-base",
						)}
						placeholder={placeholder}
						disabled={disabled}
						{...rest}
						{...register}
					/>
					{iconRight && <div className="ml-2">{iconRight}</div>}
				</label>
			</div>
		</div>
	);
};

export default memo(Input);
