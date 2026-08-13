import classNames from "classnames";
import type React from "react";
import { memo } from "react";
import InputLabel from "./InputLabel";

type NativeTextareaProps = Omit<React.TextareaHTMLAttributes<HTMLTextAreaElement>, "className" | "placeholder">;

interface ITextarea extends NativeTextareaProps {
	placeholder?: string;
	label?: string;
	className?: string;
	fullWidth?: boolean;
}

const Textarea = ({ placeholder = "Ingresar", className, fullWidth, label, disabled, ...rest }: ITextarea) => {
	return (
		<div className={classNames("inline-flex flex-col", className, fullWidth && "w-full")}>
			{label && <InputLabel label={label} />}
			<div
				className={classNames(
					"flex min-h-32 w-full items-start rounded-lg border-[0.1rem] border-white/[0.08] bg-neutral-500 px-5 py-4 text-sm transition-colors focus-within:border-white/[0.24]",
					disabled ? "opacity-60" : "hover:border-white/[0.16]",
				)}
			>
				<textarea
					className={classNames(
						"h-full w-full resize-none bg-transparent outline-none placeholder:text-text-xx-light",
						disabled ? "text-text-extra-light" : "text-text-base",
					)}
					placeholder={placeholder}
					disabled={disabled}
					{...rest}
				/>
			</div>
		</div>
	);
};

export default memo(Textarea);
