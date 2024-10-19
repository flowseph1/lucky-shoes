"use client";

import { cva, VariantProps } from "class-variance-authority";
import Link from "next/link";
import React, { ButtonHTMLAttributes, memo } from "react";

const button = cva(
	"inline-flex items-center justify-center button cursor-pointer",
	{
		variants: {
			intent: {
				primary:
					"bg-primary-500 font-semibold text-text-base hover:shadow-filter-shadow border-[0.1rem] border-primary-300",
				secondary:
					"bg-primary-100 font-semibold text-primary-900 border-[0.1rem] border-primary-300 hover:bg-primary-200",
				tertiary:
					"border-[rgba(255,255,255,.05)] bg-[rgba(255,255,255,.02)] hover:bg-[rgba(255,255,255,.03)] border-[0.1rem] backdrop-blur",
				ghost:
					"bg-transparent hover:bg-neutral-500 text-white/70 hover:text-white/90 border-[0.1rem] border-transparent",
			},
			size: {
				small: "h-10 px-5 text-sm",
				medium: "h-14 px-6 py-3",
				large: "h-5 px-4 py-2",
			},

			rounded: {
				sm: "rounded-sm",
				md: "rounded-md",
				lg: "rounded-lg",
				xl: "rounded-xl",
				full: "rounded-full",
			},

			disabled: {
				true: "cursor-not-allowed opacity-50",
			},
		},

		defaultVariants: {
			intent: "primary",
			size: "medium",
			rounded: "lg",
		},
	},
);

interface BaseProps
	extends ButtonHTMLAttributes<HTMLButtonElement>,
		VariantProps<typeof button> {
	title: string;
	leftIcon?: React.ReactNode;
	disabled?: boolean;
}

interface LinkType extends BaseProps {
	href: string;
	onClick?: never;
}

interface DefaultType extends BaseProps {
	onClick: () => void;
	href?: never;
}

type ButtonProps = LinkType | DefaultType;

const Button = (props: ButtonProps) => {
	if ("onClick" in props) {
		return (
			<button
				disabled={props.disabled}
				type="button"
				className={button({
					intent: props.intent,
					size: props.size,
					className: props.className,
					disabled: props.disabled,
					rounded: props.rounded,
				})}
				onClick={props.onClick}
			>
				{props.leftIcon && <div className="mr-2">{props.leftIcon}</div>}
				<p>{props.title}</p>
			</button>
		);
	} else {
		return (
			<Link
				className={button({
					intent: props.intent,
					size: props.size,
					className: props.className,
					disabled: props.disabled,
					rounded: props.rounded,
				})}
				href={props.href}
			>
				{props.leftIcon && <div className="mr-2">{props.leftIcon}</div>}
				<p>{props.title}</p>
			</Link>
		);
	}
};

export default memo(Button);
