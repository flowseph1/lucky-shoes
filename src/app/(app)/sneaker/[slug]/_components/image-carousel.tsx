"use client";

import Image from "next/image";
import { useState } from "react";
import { IoArrowBackOutline, IoArrowForwardOutline, IoHeartOutline, IoHeartSharp } from "react-icons/io5";
import { SneakerWithBrand, SneakerWithBrandAndImages } from "@/lib/api/sneakers";
import { useFavorites } from "@/lib/hooks/use-favorites";
import { cn } from "@/lib/utils";

export function ImageCarousel({
	mainImage,
	images,
	sneaker,
}: {
	mainImage: string;
	images: SneakerWithBrandAndImages["images"];
	sneaker: SneakerWithBrandAndImages;
}) {
	const mainImageObj = {
		url: mainImage,
		alt: "Tenis Principal",
	};
	const imagesArr = [mainImageObj, ...images];
	const [currentImage, setCurrentImage] = useState(mainImageObj);
	const { favorites, toggleFavorite } = useFavorites();

	const handleNextImage = () => {
		const currentIndex = imagesArr.findIndex((image) => image.url === currentImage.url);
		const nextIndex = (currentIndex + 1) % imagesArr.length;
		setCurrentImage(imagesArr[nextIndex]);
	};

	const handlePreviousImage = () => {
		const currentIndex = imagesArr.findIndex((image) => image.url === currentImage.url);
		const previousIndex = (currentIndex - 1 + imagesArr.length) % imagesArr.length;
		setCurrentImage(imagesArr[previousIndex]);
	};

	const handleFavoriteImage = () => {
		toggleFavorite(sneaker as unknown as SneakerWithBrand);
	};

	return (
		<div className="flex min-w-0 flex-col-reverse gap-4 rounded-2xl xl:flex-row">
			<div className="no-scrollbar flex w-full min-w-0 flex-row gap-3 overflow-auto xl:h-image-carousel xl:w-52 xl:flex-col">
				{imagesArr.map((image) => (
					<button
						className={cn(
							"relative h-52 w-52 flex-shrink-0 cursor-pointer rounded-3xl border border-transparent bg-neutral-900",
							{
								"border-border-color": currentImage.url === image.url,
							},
						)}
						key={image.url}
						onClick={() => setCurrentImage({ url: image.url, alt: image.alt })}
					>
						<Image
							src={image.url}
							alt={image.alt}
							className="rounded-3xl object-cover"
							sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
							fill
							priority
						/>
					</button>
				))}
			</div>
			<div className="relative h-[300px] w-full flex-none rounded-4xl bg-neutral-900 sm:h-[450px] md:h-image-carousel xl:flex-1">
				<Image
					src={currentImage.url}
					alt={currentImage.alt || "Sneaker Image"}
					className="rounded-4xl object-cover"
					sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
					fill
					priority
				/>

				{/* Controls */}
				<Controls
					isFavorite={favorites.some((favorite) => favorite.id === sneaker.id)}
					handleNextImage={handleNextImage}
					handlePreviousImage={handlePreviousImage}
					handleFavoriteImage={handleFavoriteImage}
				/>
			</div>
		</div>
	);
}

function Controls({
	isFavorite,
	handleNextImage,
	handlePreviousImage,
	handleFavoriteImage,
}: {
	isFavorite: boolean;
	handleNextImage: () => void;
	handlePreviousImage: () => void;
	handleFavoriteImage: () => void;
}) {
	return (
		<>
			<div className="absolute top-10 left-10">
				<div className="flex flex-row gap-4">
					<ControlItem icon={<IoArrowBackOutline size={24} />} onClick={handlePreviousImage} />
					<ControlItem icon={<IoArrowForwardOutline size={24} />} onClick={handleNextImage} />
				</div>
			</div>
			<div className="absolute top-10 right-10">
				<ControlItem
					icon={isFavorite ? <IoHeartSharp className="text-red-500" size={24} /> : <IoHeartOutline size={24} />}
					onClick={handleFavoriteImage}
				/>
			</div>
		</>
	);
}

function ControlItem({ icon, onClick }: { icon: React.ReactNode; onClick: () => void }) {
	return (
		<div
			onClick={onClick}
			className="flex h-16 w-16 cursor-pointer items-center justify-center rounded-full bg-neutral-500 text-text-light transition-transform active:scale-95"
		>
			{icon}
		</div>
	);
}
