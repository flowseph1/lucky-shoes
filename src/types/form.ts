import {
	DetailedHTMLProps,
	HTMLAttributes,
	InputHTMLAttributes,
	TextareaHTMLAttributes,
} from "react";
import { UseFormRegisterReturn } from "react-hook-form";

export type ISelect = {
	[label: string]: any;
};

export interface InputBaseProps {
	iconLeft?: React.ReactNode;
	iconRight?: React.ReactNode;
	placeholder?: string;
	label?: string;
	className?: string;
	fullWidth?: boolean;
	disabled?: boolean;
}

export interface InputTextProps
	extends InputBaseProps,
		DetailedHTMLProps<InputHTMLAttributes<HTMLInputElement>, HTMLInputElement> {
	type?: "text" | "password";
	register?: UseFormRegisterReturn;
}

export interface TextAreaProps
	extends InputBaseProps,
		DetailedHTMLProps<
			TextareaHTMLAttributes<HTMLTextAreaElement>,
			HTMLTextAreaElement
		> {
	register?: UseFormRegisterReturn;
}
