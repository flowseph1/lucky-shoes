import classNames from "classnames";
import React from "react";

const Subtitle = ({ subtitle, className }: { subtitle: string; className?: string }) => {
    return <p className={classNames("text-subtitle font-semibold text-text-base", className)}>{subtitle}</p>;
};

export default Subtitle;
