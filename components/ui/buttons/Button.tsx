import { cva, VariantProps } from "class-variance-authority";
import React, { ButtonHTMLAttributes } from "react";

const button = cva("button cursor-pointer font-semibold", {
    variants: {
        intent: {
            primary: "bg-primary-light text-primary border-primary border-[0.1rem]",
            secondary: "bg-secondary-light text-secondary border-secondary border-[0.1rem]",
            tertiary: "bg-tertiary-light text-tertiary border-tertiary border-[0.1rem]",
        },
        size: {
            small: "h-5 px-4 py-2",
            medium: "h-15 px-4 py-2",
            large: "h-5 px-4 py-2",
        },
        rounded: {
            sm: "rounded-sm",
            md: "rounded-md",
            lg: "rounded-lg",
            xl: "rounded-xl",
        },
    },

    defaultVariants: {
        intent: "primary",
        size: "medium",
        rounded: "lg",
    },
});

interface IButton extends ButtonHTMLAttributes<HTMLButtonElement>, VariantProps<typeof button> {
    title: string;
}

const Button = ({ intent, size, title, className }: IButton) => {
    return <div className={button({ intent, size, className })}>{title}</div>;
};

export default Button;
