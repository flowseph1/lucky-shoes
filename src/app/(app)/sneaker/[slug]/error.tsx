"use client";

import { useEffect } from "react";
import { BsArrowLeft, BsExclamationTriangle } from "react-icons/bs";
import Button from "@/components/ui/buttons/Button";
import { ScreenLayout } from "@/components/ui/screen-layout";

interface ErrorProps {
	error: Error & { digest?: string };
	reset: () => void;
}

export default function SneakerError({ error, reset }: ErrorProps) {
	useEffect(() => {
		// Log the error to an error reporting service
		console.error("Sneaker page error:", error);
	}, [error]);

	return (
		<ScreenLayout className="flex items-center justify-center text-center">
			<div className="flex max-w-md flex-col items-center gap-8">
				{/* Error Icon */}
				<div className="flex h-24 w-24 items-center justify-center rounded-full border border-red-500/20 bg-red-500/10">
					<BsExclamationTriangle className="h-12 w-12 text-red-500" />
				</div>

				{/* Error Content */}
				<div className="flex flex-col gap-4">
					<h1 className="font-bold text-4xl text-text-base">¡Ups! Algo salió mal</h1>
					<p className="text-lg text-text-light">
						No pudimos cargar la información del tenis. Esto puede deberse a un problema temporal o que el producto no
						existe.
					</p>
				</div>

				{/* Error Details (only in development) */}
				{/* {process.env.NODE_ENV === "development" && (
					<div className="w-full rounded-lg border border-neutral-700 bg-neutral-900 p-4">
						<p className="mb-2 text-sm text-text-extra-light">Error details (development only):</p>
						<code className="break-all text-red-400 text-xs">{error.message}</code>
					</div>
				)} */}

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
