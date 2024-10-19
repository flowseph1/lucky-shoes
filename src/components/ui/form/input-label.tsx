import React from "react";

export function InputLabel({
	children,
}: {
	children: React.ReactNode;
}) {
	return (
		<p className="mb-2 text-xs font-[400] text-text-extra-light -mt-[2px]">
			{children}
		</p>
	);
}
