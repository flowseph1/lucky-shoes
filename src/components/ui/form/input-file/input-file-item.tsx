import { InputError } from "@/components/ui/form/input-error";
import {
  FilePreview,
  InputFileProps,
} from "@/components/ui/form/input-file/input-file";
import { InputFilePlaceholder } from "@/components/ui/form/input-file/input-file-placeholder";
import { InputFilePreviews } from "@/components/ui/form/input-file/input-file-previews";
import { InputLabel } from "@/components/ui/form/input-label";
import { cn } from "@/lib/utils";
import { useEffect, useMemo, useRef } from "react";
import { FieldValues, Path, PathValue } from "react-hook-form";

export function InputFileItem<T extends FieldValues>({
  value,
  label,
  subtitle,
  multiple,
  className,
  error,
  name,
  onChange,
  ...props
}: {
  value: PathValue<T, Path<T>>;
  onChange: (...event: any) => void;
} & Omit<InputFileProps<T>, "control">) {
  const inputRef = useRef<HTMLInputElement | null>(null);
  const fileValue = value as FileList;

  const filePreviews = useMemo((): FilePreview[] | null => {
    if (!fileValue || fileValue.length === 0) return null;
    return Array.from(fileValue).map((file) => {
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
  }, [fileValue]);

  const handleReset = () => {
    onChange(null);
  };
  const handleFormResetEffect = () => {
    const input = inputRef.current;
    if (!input) return;
    const form = input.closest("form");
    if (!form) return;
    form.addEventListener("reset", handleReset);
    return () => {
      form.removeEventListener("reset", handleReset);
    };
  };
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      onChange(e.target.files);
    }
  };
  const handleDelete = (fileName: string) => {
    const dataTransfer = new DataTransfer();
    if (inputRef.current) {
      inputRef.current.files = dataTransfer.files;
    }
    onChange(dataTransfer.files);
  };

  useEffect(handleFormResetEffect, []);

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
          <InputFilePreviews
            filePreviews={filePreviews}
            handleDelete={handleDelete}
          />
        ) : (
          <InputFilePlaceholder
            multiple={multiple ?? false}
            subtitle={subtitle ?? ""}
          />
        )}

        <input
          ref={inputRef}
          type="file"
          className="hidden"
          name={name}
          onChange={handleChange}
          {...props}
        />
      </div>
      {error && <InputError error={error} />}
    </div>
  );
}
