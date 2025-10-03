import { BsArrowLeft, BsSearch } from "react-icons/bs";
import Button from "@/components/ui/buttons/Button";
import { ScreenLayout } from "@/components/ui/screen-layout";

export default function SneakerNotFound() {
	return (
		<ScreenLayout className="flex items-center justify-center text-center">
			<div className="flex max-w-md flex-col items-center gap-8">
				{/* Not Found Icon */}
				<div className="flex h-24 w-24 items-center justify-center rounded-full border border-yellow-500/20 bg-yellow-500/10">
					<BsSearch className="h-12 w-12 text-yellow-500" />
				</div>

				{/* Not Found Content */}
				<div className="flex flex-col gap-4">
					<h1 className="font-bold text-4xl text-text-base">Tenis no encontrado</h1>
					<p className="text-lg text-text-light">
						Lo sentimos, no pudimos encontrar el tenis que estás buscando. Puede que el enlace esté roto o que el
						producto ya no esté disponible.
					</p>
				</div>

				{/* Action Buttons */}
				<div className="flex w-full flex-col gap-4 sm:flex-row">
					<Button
						title="Volver al inicio"
						href="/"
						intent="tertiary"
						size="large"
						leftIcon={<BsArrowLeft />}
						className="flex-1"
					/>
				</div>
			</div>
		</ScreenLayout>
	);
}
