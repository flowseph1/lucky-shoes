import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useCallback, useEffect, useRef, useState } from "react";

type UseQueryStateOptions = {
	defaultValue?: string;
	debounce?: number;
};

export function useQueryState(key: string, options?: UseQueryStateOptions) {
	const timeoutRef = useRef<NodeJS.Timeout | null>(null);
	const [state, setState] = useState(options?.defaultValue || "");
	const pathname = usePathname();
	const searchParams = useSearchParams();
	const router = useRouter();

	const generateSearchParams = useCallback(
		(params: Record<string, string>) => {
			const newParams = new URLSearchParams(searchParams);
			for (const [key, value] of Object.entries(params)) {
				if (value) {
					newParams.set(key, value);
				} else {
					newParams.delete(key);
				}
			}
			return newParams.toString();
		},
		[searchParams],
	);

	const setSearchParams = useCallback(
		(params: Record<string, string>) => {
			const newSearchParams = generateSearchParams(params);
			if (newSearchParams === searchParams.toString()) return;
			return router.replace(`${pathname}?${newSearchParams}`, {
				scroll: false,
			});
		},
		[generateSearchParams, pathname, router, searchParams],
	);

	useEffect(() => {
		if (options?.debounce) {
			if (timeoutRef.current) {
				clearTimeout(timeoutRef.current);
			}
			timeoutRef.current = setTimeout(() => {
				setSearchParams({
					[key]: state,
				});
			}, options.debounce);
		} else {
			setSearchParams({
				[key]: state,
			});
		}
		return () => {
			if (timeoutRef.current) {
				clearTimeout(timeoutRef.current);
			}
		};
	}, [state, key, setSearchParams, options?.debounce]);

	return [state, setState] as const;
}
