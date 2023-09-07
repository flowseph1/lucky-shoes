"use client";

import classNames from "classnames";
import { useController } from "react-hook-form";
import { Control, FieldValues } from "react-hook-form/dist/types";
import InputLabel from "../InputLabel";
import InputAreaItem from "./InputSelectorItem";
import { memo } from "react";

interface InputSelectorProps<T extends FieldValues> {
  placeholder?: string;
  label?: string;
  className?: string;
  data: string[];
  control?: Control<T>;
  name: string;
  fullWidth?: boolean;
  disabled?: boolean;
}

export type IItem = string;

const InpuSelector = ({
  placeholder = "Ingresar",
  className,
  control,
  name,
  data,
  fullWidth,
  label,
  disabled,
}: InputSelectorProps<any>) => {
  const {
    field: { value, onChange },
  } = useController({ name, control });

  const onSelect = (item: string) => {
    if (value.includes(item)) onChange(value.filter((i: string) => i !== item));
    else onChange([...value, item]);
  };

  return (
    <div className={classNames(className, fullWidth && "w-full")}>
      <div className="flex items-center ">
        {label && <InputLabel label={label} />}
        <p className="mb-2 ml-2 text-xs text-text-extra-light">
          <span className="font-bold">{value.length}</span> / {data.length}
        </p>
      </div>
      <div
        className={classNames(
          "relative inline-flex h-full min-h-[10rem] w-full flex-wrap rounded-lg border-[0.1rem] border-neutral-300 bg-neutral-700 p-5 text-sm"
        )}
      >
        {data.map((item: string) => {
          const isSelected = value.includes(item);

          return (
            <InputAreaItem
              item={item}
              key={item}
              isSelected={isSelected}
              onSelect={onSelect}
            />
          );
        })}
      </div>
    </div>
  );
};

export default memo(InpuSelector);
