import classNames from "classnames";
import React, { memo } from "react";
import { FieldValues, UseFormRegister, UseFormRegisterReturn } from "react-hook-form/dist/types";
import InputLabel from "./InputLabel";

interface IInput {
    type?: "text" | "password";
    iconLeft?: React.ReactNode;
    iconRight?: React.ReactNode;
    placeholder?: string;
    label?: string;
    className?: string;
    register?: UseFormRegisterReturn;
    fullWidth?: boolean;
    disabled?: boolean;
}

const Input = ({
    type = "text",
    iconLeft,
    iconRight,
    placeholder = "Ingresar",
    className,
    register,
    fullWidth,
    label,
    disabled,
}: IInput) => {
    return (
        <div className={classNames("mb-6 inline-flex flex-col", className, fullWidth && "w-full")}>
            {label && <InputLabel label={label} />}
            <div
                className={classNames(
                    "flex h-14 w-full items-center rounded-lg border-[0.1rem] border-neutral-50 bg-neutral-500 px-4 text-sm transition-shadow focus-within:shadow-input-shadow",
                    disabled ? "" : "hover:shadow-input-shadow"
                )}
            >
                <label className={"flex w-full"}>
                    {iconLeft && <div className="mr-3">{iconLeft}</div>}
                    <input
                        type={type}
                        className={classNames(
                            "h-full w-full bg-transparent  outline-none placeholder:text-text-xx-light",
                            disabled ? "text-text-extra-light" : "text-text-base"
                        )}
                        placeholder={placeholder}
                        disabled={disabled}
                        {...register}
                    />
                    {iconRight && <div className="ml-2">{iconRight}</div>}
                </label>
            </div>
        </div>
    );
};

export default memo(Input);
