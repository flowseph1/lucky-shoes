import { type ClassValue, clsx } from "clsx";
import { useCallback } from "react";
import { twMerge } from "tailwind-merge";

export const cn = (...inputs: ClassValue[]) => {
	return twMerge(clsx(inputs));
};
