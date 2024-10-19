"use client";

import { InputLabel } from "@/components/ui/form/input-label";
import { cn } from "@/lib/utils";
import Image from "next/image";
import { useMemo, useRef, useState } from "react";
import {
	Control,
	Controller,
	FieldValues,
	Path,
	PathValue,
} from "react-hook-form";
import { FaArrowUp, FaRegFile, FaTimes } from "react-icons/fa";

interface InputFileProps<T extends FieldValues>
	extends React.InputHTMLAttributes<HTMLInputElement> {
	label?: string;
	subtitle?: string;
	className?: string;
	control: Control<T>;
	name: Path<T>;
	placeholder?: string;
	disabled?: boolean;
}

type FilePreview =
	| {
			url: string;
			name: string;
	  }
	| {
			icon: string;
			name: string;
	  };

export function InputFile<T extends FieldValues>({
	control,
	name,
	...props
}: InputFileProps<T>) {
	return (
		<Controller
			control={control}
			name={name}
			render={({ field: { onChange, value } }) => (
				<InputFileItem onChange={onChange} value={value} {...props} />
			)}
		/>
	);
}

export function InputFileItem<T extends FieldValues>({
	value,
	label,
	subtitle,
	multiple,
	className,
	onChange,
	...props
}: {
	value: PathValue<T, Path<T>>;
	onChange: (...event: any) => void;
} & Omit<InputFileProps<T>, "control" | "name">) {
	const [files, setFiles] = useState<File[]>([]);
	const inputRef = useRef<HTMLInputElement | null>(null);

	const filePreviews = useMemo((): FilePreview[] | null => {
		if (!files || files.length === 0) return null;
		return Array.from(files).map((file) => {
			if (file.type.includes("image")) {
				return {
					name: file.name,
					url: URL.createObjectURL(file),
				};
			} else {
				return {
					name: file.name,
					icon: "file",
				};
			}
		});
	}, [files]);

	const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		if (e.target.files) {
			if (multiple) {
				setFiles([...files, ...Array.from(e.target.files)]);
				return;
			}
			setFiles([...Array.from(e.target.files)]);
			onChange(e.target.files);
		}
	};
	const handleDelete = (fileName: string) => {
		const dataTransfer = new DataTransfer();
		const filterFiles = files.filter((file) => file.name !== fileName);
		filterFiles.forEach((file) => dataTransfer.items.add(file));

		if (inputRef.current) {
			inputRef.current.files = dataTransfer.files;
		}

		setFiles(filterFiles);
		onChange(dataTransfer.files);
	};

	return (
		<div className={cn("inline-flex flex-col", className)}>
			{label && <InputLabel>{label}</InputLabel>}
			<div
				className={cn(
					"flex justify-center cursor-pointer items-center min-h-[14rem] p-4 rounded-lg border-dashed border-[0.1rem] border-neutral-50 bg-neutral-700 hover:bg-neutral-500 transition-colors text-sm",
					{
						"justify-start items-start cursor-default hover:bg-neutral-700":
							!!filePreviews,
					},
				)}
				onClick={() => inputRef.current?.click()}
			>
				{filePreviews ? (
					<div className="flex flex-wrap gap-4">
						{filePreviews.map((file) => (
							<div
								key={file.name}
								onClick={(e) => e.stopPropagation()}
								className="relative w-28 h-28 rounded-xl bg-neutral-100 group cursor-default"
							>
								{"url" in file && (
									<Image
										alt={file.name}
										src={file.url}
										fill
										className="object-contain"
									/>
								)}

								<div
									onClick={() => handleDelete(file.name)}
									className="absolute -right-2 -bottom-2 w-7 h-7 rounded-full bg-primary-900 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300 hover:cursor-pointer"
								>
									<FaTimes size={8} />
								</div>
							</div>
						))}
					</div>
				) : (
					<>
						<div className="flex flex-col items-center justify-center gap-2">
							<div className="relative w-14 h-14 rounded-full bg-neutral-300 flex items-center justify-center">
								<FaRegFile className="text-text-light" />
								<div className="absolute -right-2 bottom-0 w-7 h-7 rounded-full bg-primary-500 flex items-center justify-center">
									<FaArrowUp size={8} />
								</div>
							</div>
							<p className="text-text-light">
								{multiple ? "Seleccionar archivos" : "Seleccionar un archivo"}
							</p>
							{subtitle && <p className="text-white/20 text-xs">{subtitle}</p>}
						</div>
					</>
				)}

				<input
					ref={inputRef}
					type="file"
					className="hidden"
					// value={value}
					onChange={handleChange}
					{...props}
				/>
			</div>
		</div>
	);
}
