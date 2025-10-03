import { EmptyList } from "@/components/sneaker/empty-list";
import { SneakerItem } from "@/components/sneaker/sneaker-item";
import { getSneakers } from "@/lib/api/sneakers";

interface SneakerListProps {
	brand: string | undefined;
	search: string | undefined;
}

export async function SneakerList({ brand, search }: SneakerListProps) {
	const sneakersData = await getSneakers({
		brand,
		search,
	});

	if (sneakersData.length === 0) {
		return <EmptyList />;
	}

	return (
		<div className="grid grid-cols-1 gap-10 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5">
			{sneakersData.map((sneaker) => (
				<SneakerItem sneaker={sneaker} key={sneaker.id} />
			))}
		</div>
	);
}
