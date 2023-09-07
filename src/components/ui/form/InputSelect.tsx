"use client";

import classNames from "classnames";
import React, { memo, useEffect, useId, useRef, useState } from "react";
import { useController } from "react-hook-form";
import { Control, FieldValues } from "react-hook-form/dist/types";
import { BiChevronDown } from "react-icons/bi";
import InputLabel from "./InputLabel";
import { ISelect } from "@/src/interfaces/form";

interface IInputSelect<T extends FieldValues> {
  iconLeft?: React.ReactNode;
  placeholder?: string;
  className?: string;
  control: Control<T>;
  fullWidth?: boolean;
  valueExtractor?: string;
  labelExtractor?: string;
  disabled?: boolean;
  name: string;
  label: string;
  data?: ISelect[] | [];
}

const InputSelect = ({
  iconLeft,
  placeholder = "Ingresar",
  className,
  name,
  control,
  valueExtractor,
  labelExtractor,
  label,
  fullWidth,
  disabled,
  data,
}: IInputSelect<any>) => {
  const [isOpen, setIsOpen] = useState(false);

  const selectContainerRef = useRef<HTMLDivElement>(null);

  const id = useId();

  const {
    field: { value, onChange },
  } = useController({ name, control });

  const onSelect = (value: string) => {
    onChange(value);
    setIsOpen(false);
  };

  useEffect(() => {
    document.addEventListener("mousedown", closeOpenMenus);

    return () => document.removeEventListener("mousedown", closeOpenMenus);
  }, [isOpen]);

  const closeOpenMenus = (e: MouseEvent) => {
    if (
      selectContainerRef.current &&
      isOpen &&
      !selectContainerRef.current.contains(e.target as HTMLDivElement)
    ) {
      setIsOpen(false);
    }
  };

  return (
    <div className={classNames("mb-6", fullWidth && "w-full", className)}>
      {label && <InputLabel label={label} />}
      <div
        key={id}
        className={classNames(
          "relative rounded-lg",
          disabled ? "" : "hover:shadow-input-shadow",
          isOpen ? "shadow-input-shadow" : ""
        )}
        ref={selectContainerRef}
      >
        <div
          onClick={() => setIsOpen((prev) => !prev)}
          className={
            "inline-flex h-14 w-full cursor-pointer items-center rounded-lg border-[0.1rem] border-neutral-50 bg-neutral-500 px-4 text-sm"
          }
        >
          {iconLeft && <div className="mr-3">{iconLeft}</div>}

          <p
            className={classNames(
              "flex h-full w-full items-center bg-transparent outline-none placeholder:text-text-light",
              disabled ? "text-text-extra-light" : "text-text-base",
              value ? "text-text-base" : "text-text-xx-light"
            )}
          >
            {value ? value : placeholder}
          </p>
          <BiChevronDown size={25} />
        </div>

        {/* Options */}
        {isOpen && (
          <div className="absolute top-[120%] z-20 w-full select-none rounded-lg bg-neutral-700 p-2 shadow-lg">
            {data &&
              data.map((item) => (
                <div
                  key={item[valueExtractor ?? "value"]}
                  onClick={() => onSelect(item[valueExtractor ?? "value"])}
                  className={classNames(
                    "mb-2 cursor-pointer rounded-lg p-4 text-right text-xs text-text-extra-light hover:bg-neutral-500 hover:text-text-base",
                    value === item[labelExtractor ?? "label"]
                      ? "bg-neutral-300 !text-text-base"
                      : ""
                  )}
                >
                  {item[labelExtractor ?? "label"]}
                </div>
              ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default memo(InputSelect);
