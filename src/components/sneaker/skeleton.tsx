"use client";

import { Skeleton } from "@/components/skeleton";

export function SneakerSkeleton() {
	return (
		<div className="relative grid grid-cols-1 gap-10 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5">
			{Array.from({ length: 10 }).map((_, index) => (
				<Skeleton className="min-h-108 w-full flex-1 rounded-2xl" key={index} delay={index * 300} />
			))}

			<div className="absolute inset-0 bg-gradient-to-b from-transparent to-background" />
		</div>
	);
}
