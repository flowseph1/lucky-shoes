import React from "react";

const Container = ({ children }: { children: React.ReactNode }) => {
    return <div className="mx-auto h-full max-w-[130rem] px-5">{children}</div>;
};

export default Container;
``;
