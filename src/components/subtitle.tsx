import { cx } from "class-variance-authority";
import React from "react";

export const Subtitle = ({
	subtitle,
	className,
}: {
	subtitle: string;
	className?: string;
}) => {
	return (
		<h2 className={cx("text-subtitle font-semibold text-text-base", className)}>{subtitle}</h2>
	);
};
