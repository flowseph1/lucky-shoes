"use client";

import { Link } from "@tanstack/react-router";
import { cva, type VariantProps } from "class-variance-authority";
import type React from "react";
import { type ButtonHTMLAttributes, memo } from "react";
import { cn } from "@/lib/utils";

const button = cva(
	"button inline-flex cursor-pointer items-center justify-center whitespace-nowrap font-medium transition-colors disabled:pointer-events-none disabled:opacity-50",
	{
		variants: {
			intent: {
				primary:
					"border-[0.1rem] border-primary-300 bg-primary-500 font-semibold text-white/90 hover:bg-primary-700 hover:shadow-filter-shadow",
				secondary:
					"border-[0.1rem] border-primary-border bg-primary-light font-semibold text-primary-900 hover:bg-primary-hover",

				tertiary:
					"border-[0.1rem] border-white/[0.08] bg-white/[0.03] text-text-base backdrop-blur hover:border-white/[0.16] hover:bg-white/[0.06]",
				ghost: "border-transparent bg-transparent text-text-light hover:bg-hover hover:text-text-base",
				"ghost-danger": "border-transparent bg-transparent text-secondary hover:bg-secondary-light",
			},
			size: {
				xs: "h-10 px-4 text-xs",
				small: "h-12 px-6 text-sm",
				medium: "h-16 px-10 text-sm",
				large: "h-20 px-12 text-md",
			},

			rounded: {
				sm: "rounded-sm",
				md: "rounded-md",
				lg: "rounded-lg",
				xl: "rounded-xl",
				full: "rounded-full",
			},
		},

		defaultVariants: {
			intent: "primary",
			size: "medium",
			rounded: "lg",
		},
	},
);

interface BaseProps extends ButtonHTMLAttributes<HTMLButtonElement>, VariantProps<typeof button> {
	title: string;
	leftIcon?: React.ReactNode;
}

interface LinkType extends BaseProps {
	href: string;
	onClick?: never;
}

interface DefaultType extends BaseProps {
	onClick?: () => void;
	href?: never;
}

type ButtonProps = LinkType | DefaultType;

const Button = (props: ButtonProps) => {
	if (!props.href) {
		const { intent, size, className, rounded, leftIcon, title, onClick, href, ...rest } = props;
		return (
			<button type="button" {...rest} className={cn(button({ intent, size, rounded }), className)} onClick={onClick}>
				{leftIcon && <div className="mr-3">{leftIcon}</div>}
				<p>{title}</p>
			</button>
		);
	}
	return (
		<Link
			className={cn(
				button({
					intent: props.intent,
					size: props.size,
					rounded: props.rounded,
				}),
				props.className,
			)}
			to={props.href}
		>
			{props.leftIcon && <div className="mr-3">{props.leftIcon}</div>}
			<p>{props.title}</p>
		</Link>
	);
};

export default memo(Button);
