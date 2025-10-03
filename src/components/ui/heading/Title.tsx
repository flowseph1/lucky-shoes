import classNames from "classnames";

const Title = ({ subtitle, className }: { subtitle: string; className?: string }) => {
	return <p className={classNames("font-semibold text-text-base text-title", className)}>{subtitle}</p>;
};

export default Title;
