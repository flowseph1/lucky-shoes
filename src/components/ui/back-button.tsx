"use client";

import { useRouter } from "next/navigation";
import { BsArrowLeft } from "react-icons/bs";

export function BackButton() {
	const router = useRouter();
	return (
		<button
			onClick={() => router.back()}
			className="flex h-16 w-16 cursor-pointer items-center justify-center gap-2 rounded-full border border-border-color hover:bg-neutral-900"
		>
			<BsArrowLeft size={16} />
		</button>
	);
}
