import { cx } from "class-variance-authority";

export const Subtitle = ({ subtitle, className }: { subtitle: string; className?: string }) => {
	return <h2 className={cx("font-semibold text-subtitle text-text-base", className)}>{subtitle}</h2>;
};
