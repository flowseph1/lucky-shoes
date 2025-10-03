"use client";

import { BreadCrumb } from "@/app/(app)/sneaker/[slug]/_components/bread-crumb";
import { BackButton } from "@/components/ui/back-button";

export function Header({ sneakerName }: { sneakerName: string }) {
	return (
		<div className="flex flex-row items-center gap-4">
			<BackButton />
			<BreadCrumb sneakerName={sneakerName} />
		</div>
	);
}
