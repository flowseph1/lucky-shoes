import React, { memo } from "react";
import { Control, FieldValues } from "react-hook-form";
import Switch from "./Switch";
import { InputLabel } from "@/components/ui/form/input-label";

interface InputSwitchProps<T extends FieldValues> {
	label?: string;
	subtitle?: string;
	className?: string;
	control: Control<T>;
	name: string;
	placeholder?: string;
}

function InputSwitch({
	label,
	subtitle,
	className,
	control,
	name,
	placeholder,
}: InputSwitchProps<any>) {
	return (
		<div className={className}>
			{/* Label */}
			{label && <InputLabel>{label}</InputLabel>}
			{subtitle && (
				<p className="text mb-5 max-w-sm text-xs font-normal text-text-xx-light">
					{subtitle}
				</p>
			)}

			{/* Switch */}
			<Switch />
		</div>
	);
}

export default memo(InputSwitch);
