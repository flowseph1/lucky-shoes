import classNames from "classnames";
import React from "react";

const Title = ({ subtitle, className }: { subtitle: string; className?: string }) => {
	return (
		<p className={classNames("text-title font-semibold text-text-base", className)}>{subtitle}</p>
	);
};

export default Title;
