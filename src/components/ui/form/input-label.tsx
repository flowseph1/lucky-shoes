import React from 'react'

export function InputLabel({
	children,
	htmlFor,
}: {
	children: React.ReactNode
	htmlFor: string
}) {
	return (
		<label
			className="mb-2 text-xs font-[400] text-text-extra-light -mt-[2px]"
			htmlFor={htmlFor}
		>
			{children}
		</label>
	)
}
