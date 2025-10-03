import { SneakerItem } from "@/components/sneaker/sneaker-item";
import { getSneakersWithLimitAndRandom } from "@/lib/api/sneakers";

export async function OtherProducts() {
	const sneakers = await getSneakersWithLimitAndRandom(10);

	return (
		<div className="flex flex-col gap-10">
			<p className="font-semibold text-4xl">Explora otros productos</p>
			<div className="grid grid-cols-1 gap-10 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5">
				{sneakers.map((sneaker) => (
					<SneakerItem key={sneaker.id} sneaker={sneaker} />
				))}
			</div>
		</div>
	);
}
