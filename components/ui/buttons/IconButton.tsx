import { cva, VariantProps } from "class-variance-authority";
import React, { ButtonHTMLAttributes } from "react";

const button = cva("button cursor-pointer font-semibold flex items-center justify-center", {
    variants: {
        intent: {
            primary:
                "bg-primary-light text-primary-icon border-primary-border border-[0.1rem] hover:bg-primary-hover hover:text-primary hover:text-primary-icon transition-all",
            secondary: "bg-secondary-light text-secondary border-secondary border-[0.1rem]",
            tertiary: "bg-tertiary-light text-tertiary border-tertiary border-[0.1rem]",
        },
        size: {
            small: "h-5 px-4 py-2",
            medium: "h-14 w-14",
            large: "h-5 px-4 py-2",
        },
        rounded: {
            sm: "rounded-sm",
            md: "rounded-md",
            lg: "rounded-lg",
            xl: "rounded-xl",
            full: "rounded-full",
        },
    },

    defaultVariants: {
        intent: "primary",
        size: "medium",
        rounded: "xl",
    },
});

interface IIconButton extends ButtonHTMLAttributes<HTMLButtonElement>, VariantProps<typeof button> {
    icon: React.ReactNode;
}

const IconButton = ({ intent, size, icon, className }: IIconButton) => {
    return <div className={button({ intent, size, className })}>{icon}</div>;
};

export default IconButton;
