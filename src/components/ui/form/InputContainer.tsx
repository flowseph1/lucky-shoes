import classNames from "classnames";
import type React from "react";

const InputContainer = ({ children, className }: { children: React.ReactNode; className?: string }) => {
	return <div className={classNames("mb-6 w-full", className)}>{children}</div>;
};

export default InputContainer;
