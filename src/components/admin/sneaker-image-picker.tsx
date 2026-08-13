import { useServerFn } from "@tanstack/react-start";
import { useRef, useState } from "react";
import { LuImagePlus, LuLoaderCircle, LuStar, LuTrash2 } from "react-icons/lu";
import { uploadImage } from "@/lib/server/admin";
import { FormError } from "./form-error";

const maxFileSize = 5 * 1024 * 1024;
const imageTypes = ["image/jpeg", "image/png", "image/webp", "image/gif"] as const;
type ImageType = (typeof imageTypes)[number];

export interface SneakerFormImage {
	url: string;
	path: string | null;
}

function isImageType(type: string): type is ImageType {
	return imageTypes.some((imageType) => imageType === type);
}

interface Props {
	images: SneakerFormImage[];
	onChange: (images: SneakerFormImage[]) => void;
}

export function SneakerImagePicker({ images, onChange }: Props) {
	const inputRef = useRef<HTMLInputElement>(null);
	const upload = useServerFn(uploadImage);
	const [url, setUrl] = useState("");
	const [uploading, setUploading] = useState(false);
	const [error, setError] = useState("");

	const addImage = (image: SneakerFormImage) => {
		if (images.some((existing) => existing.url === image.url)) {
			setError("Esta imagen ya está en la galería.");
			return;
		}
		setError("");
		onChange([...images, image]);
	};

	const addUrl = () => {
		const nextUrl = url.trim();
		if (!nextUrl) return;
		try {
			new URL(nextUrl);
			addImage({ url: nextUrl, path: null });
			setUrl("");
		} catch {
			setError("Ingresa una URL de imagen válida.");
		}
	};

	const handleFile = async (event: React.ChangeEvent<HTMLInputElement>) => {
		const file = event.target.files?.[0];
		event.target.value = "";
		if (!file) return;
		if (!isImageType(file.type)) return setError("Selecciona una imagen PNG, JPG, WEBP o GIF.");
		if (file.size > maxFileSize) return setError("La imagen no puede superar 5 MB.");

		setError("");
		setUploading(true);
		try {
			const content = await new Promise<string>((resolve, reject) => {
				const reader = new FileReader();
				reader.onload = () => resolve(String(reader.result).split(",")[1] ?? "");
				reader.onerror = () => reject(new Error("No se pudo leer la imagen."));
				reader.readAsDataURL(file);
			});
			addImage(await upload({ data: { content, contentType: file.type, filename: file.name } }));
		} catch (cause) {
			setError(cause instanceof Error ? cause.message : "No se pudo subir la imagen.");
		} finally {
			setUploading(false);
		}
	};

	return (
		<div className="flex flex-col gap-4">
			<div>
				<p className="font-medium text-sm text-text-base">Imágenes</p>
				<p className="mt-1 text-text-extra-light text-xs">La imagen principal siempre se muestra primero.</p>
			</div>
			<div className="flex flex-wrap gap-3">
				<input
					value={url}
					onChange={(event) => setUrl(event.target.value)}
					onKeyDown={(event) => event.key === "Enter" && (event.preventDefault(), addUrl())}
					placeholder="https://..."
					className="h-11 min-w-56 flex-1 rounded-lg border border-white/[0.08] bg-neutral-500 px-4 text-sm text-text-base outline-none placeholder:text-text-xx-light focus:border-white/[0.24]"
				/>
				<button
					type="button"
					onClick={addUrl}
					className="h-11 rounded-lg border border-white/[0.12] px-4 text-sm text-text-light hover:border-white/[0.24] hover:text-text-base"
				>
					Agregar URL
				</button>
				<input
					ref={inputRef}
					type="file"
					accept="image/png,image/jpeg,image/webp,image/gif"
					className="sr-only"
					onChange={handleFile}
				/>
				<button
					type="button"
					onClick={() => inputRef.current?.click()}
					disabled={uploading}
					className="inline-flex h-11 items-center gap-2 rounded-lg border border-white/[0.12] px-4 text-sm text-text-light hover:border-white/[0.24] hover:text-text-base disabled:cursor-not-allowed disabled:opacity-60"
				>
					{uploading ? <LuLoaderCircle className="animate-spin" size={16} /> : <LuImagePlus size={16} />}
					{uploading ? "Subiendo…" : "Subir imagen"}
				</button>
			</div>
			{images.length > 0 && (
				<div className="grid grid-cols-2 gap-4 sm:grid-cols-3">
					{images.map((image, index) => (
						<div key={image.url} className="overflow-hidden rounded-lg border border-white/[0.08] bg-neutral-500">
							<img
								src={image.url}
								alt={index === 0 ? "Imagen principal" : `Imagen ${index + 1}`}
								className="aspect-square w-full object-cover"
							/>
							<div className="flex items-center justify-between gap-2 p-2">
								<button
									type="button"
									disabled={index === 0}
									onClick={() => onChange([image, ...images.filter((_, position) => position !== index)])}
									className="inline-flex items-center gap-1 text-text-light text-xs disabled:font-medium disabled:text-primary-900 disabled:opacity-100"
								>
									<LuStar size={14} fill={index === 0 ? "currentColor" : "none"} />
									{index === 0 ? "Principal" : "Hacer principal"}
								</button>
								<button
									type="button"
									aria-label="Quitar imagen"
									onClick={() => onChange(images.filter((_, position) => position !== index))}
									className="text-text-extra-light hover:text-secondary"
								>
									<LuTrash2 size={15} />
								</button>
							</div>
						</div>
					))}
				</div>
			)}
			<p className="text-text-extra-light text-xs">PNG, JPG, WEBP o GIF · máximo 5 MB</p>
			{error && <FormError message={error} />}
		</div>
	);
}
