import { FilePreview } from "@/components/ui/form/input-file/input-file";
import Image from "next/image";
import { FaTimes } from "react-icons/fa";

export function InputFilePreviews({
  filePreviews,
  handleDelete,
}: {
  filePreviews: FilePreview[];
  handleDelete: (fileName: string) => void;
}) {
  return (
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
            className="absolute -right-2 -top-2 w-7 h-7 rounded-full bg-primary-900 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300 hover:cursor-pointer"
          >
            <FaTimes size={8} />
          </div>
        </div>
      ))}
    </div>
  );
}
