"use client";

import { InputFileItem } from "@/components/ui/form/input-file/input-file-item";
import { Control, Controller, FieldValues, Path } from "react-hook-form";

export interface InputFileProps<T extends FieldValues>
  extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  subtitle?: string;
  className?: string;
  control: Control<T>;
  name: Path<T>;
  placeholder?: string;
  error?: string;
  disabled?: boolean;
}

export type FilePreview =
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
        <InputFileItem
          onChange={onChange}
          value={value}
          name={name as string}
          {...props}
        />
      )}
    />
  );
}
