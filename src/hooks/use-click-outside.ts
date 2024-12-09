import { RefObject, useEffect } from 'react'

export function useClickOutside(
	ref: RefObject<any> | RefObject<any>[],
	callback: any,
) {
	const handleClick = (event: any) => {
		if (Array.isArray(ref)) {
			if (ref.some((r) => r.current && !r.current.contains(event.target))) {
				callback()
			}
			return
		}

		if (ref.current && !ref.current.contains(event.target)) {
			callback()
		}
	}

	useEffect(() => {
		document.addEventListener('click', handleClick)

		return () => {
			document.removeEventListener('click', handleClick)
		}
	})
}
