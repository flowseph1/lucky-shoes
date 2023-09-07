"use client";

import classNames from "classnames";
import { memo, useCallback, useEffect, useState } from "react";
import { useController } from "react-hook-form";
import { Control, FieldValues } from "react-hook-form/dist/types";
import InputLabel from "../InputLabel";
import InputAddInputBox from "./InputAddInputBox";
import InputAddItems from "./InputAddItems";

interface InputAddProps<T extends FieldValues> {
  placeholder?: string;
  label?: string;
  className?: string;
  control?: Control<T>;
  name: string;
  fullWidth?: boolean;
  disabled?: boolean;
}

export type IItem = string;

const InputAdd = ({
  placeholder = "Ingresar",
  className,
  control,
  name,
  fullWidth,
  label,
  disabled,
}: InputAddProps<any>) => {
  const {
    field: { value, onChange },
  } = useController({ name, control });

  const [notification, setNotification] = useState<string | null>(null);

  const handleAddTag = (tagValue: string) => {
    if (value.includes(tagValue.trim())) {
      setNotification("Ya existe");
      return;
    }
    onChange([...value, tagValue]);
  };

  const handleDelete = (tagValue: string) => {
    console.log("InputAdd.tsx -> 45", tagValue);
    onChange(value.filter((item: string) => item !== tagValue));
  };

  useEffect(() => {
    const unsubscribe = setTimeout(() => {
      setNotification(null);
    }, 4000);

    return () => clearTimeout(unsubscribe);
  }, [notification]);

  return (
    <div className={classNames(className, fullWidth && "w-full")}>
      <div className="flex items-center ">
        {label && <InputLabel label={label} />}
      </div>
      <div
        className={classNames(
          "min-h-[10rem] w-full flex-wrap rounded-lg border-[0.1rem] border-neutral-300 bg-neutral-700 p-5 text-sm"
        )}
      >
        <InputAddInputBox
          placeholder={placeholder}
          handleAddTag={handleAddTag}
          notification={notification}
        />
        <InputAddItems handleDelete={handleDelete} value={value} />
      </div>
    </div>
  );
};

export default memo(InputAdd);
