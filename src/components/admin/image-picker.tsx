import { useServerFn } from "@tanstack/react-start";
import { useRef, useState } from "react";
import { LuImagePlus, LuLoaderCircle } from "react-icons/lu";
import { Input } from "@/components/ui/form";
import { uploadImage } from "@/lib/server/admin";
import { FormError } from "./form-error";

const maxFileSize = 5 * 1024 * 1024;
const imageTypes = ["image/jpeg", "image/png", "image/webp", "image/gif"] as const;
type ImageType = (typeof imageTypes)[number];

function isImageType(type: string): type is ImageType {
	return imageTypes.some((imageType) => imageType === type);
}

interface ImagePickerProps {
	defaultUrl?: string;
	label: string;
	name: string;
	onChange: (image: { url: string; path: string | null }) => void;
}

export function ImagePicker({ defaultUrl = "", label, name, onChange }: ImagePickerProps) {
	const inputRef = useRef<HTMLInputElement>(null);
	const upload = useServerFn(uploadImage);
	const [url, setUrl] = useState(defaultUrl);
	const [uploading, setUploading] = useState(false);
	const [error, setError] = useState("");

	const changeUrl = (nextUrl: string) => {
		setUrl(nextUrl);
		onChange({ url: nextUrl, path: null });
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
			const image = await upload({ data: { content, contentType: file.type, filename: file.name } });
			setUrl(image.url);
			onChange(image);
		} catch (cause) {
			setError(cause instanceof Error ? cause.message : "No se pudo subir la imagen.");
		} finally {
			setUploading(false);
		}
	};

	return (
		<div className="flex flex-col gap-3">
			<Input
				name={name}
				label={label}
				type="url"
				required
				placeholder="https://..."
				value={url}
				onChange={(event) => changeUrl(event.target.value)}
				fullWidth
			/>
			<div className="flex items-center gap-4">
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
					className="inline-flex h-11 items-center gap-2 rounded-lg border border-white/[0.12] px-4 text-sm text-text-light transition-colors hover:border-white/[0.24] hover:text-text-base disabled:cursor-not-allowed disabled:opacity-60"
				>
					{uploading ? <LuLoaderCircle className="animate-spin" size={16} /> : <LuImagePlus size={16} />}
					{uploading ? "Subiendo…" : "Subir imagen"}
				</button>
				{url && (
					<img src={url} alt="Vista previa" className="size-11 rounded-md border border-white/[0.08] object-cover" />
				)}
			</div>
			<p className="text-text-extra-light text-xs">PNG, JPG, WEBP o GIF · máximo 5 MB</p>
			{error && <FormError message={error} />}
		</div>
	);
}
