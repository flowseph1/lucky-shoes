import { InputLabel } from "@/components/ui/form/input-label";
import { TextAreaProps } from "@/types/form";
import classNames from "classnames";

export function TextArea({
	iconLeft,
	iconRight,
	placeholder = "Ingresar",
	className,
	register,
	fullWidth,
	label,
	disabled,
	...props
}: TextAreaProps) {
	return (
		<div
			className={classNames(
				"inline-flex flex-col",
				className,
				fullWidth && "w-full",
			)}
		>
			{label && <InputLabel>{label}</InputLabel>}
			<div className="flex w-full">
				{iconLeft && <div className="mr-3">{iconLeft}</div>}
				<textarea
					className={classNames(
						"flex min-h-[9rem] w-full items-center placeholder:text-text-xx-light rounded-lg border-[0.1rem] border-neutral-50 bg-neutral-500 p-4 text-sm transition-shadow focus-within:shadow-input-shadow outline-none",
						disabled
							? "text-text-extra-light"
							: "text-text-base hover:shadow-input-shadow",
					)}
					placeholder={placeholder}
					disabled={disabled}
					{...register}
					{...props}
				/>
				{iconRight && <div className="ml-2">{iconRight}</div>}
			</div>
		</div>
	);
}
