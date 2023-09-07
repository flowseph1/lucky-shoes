"use client";

import { cva, cx, VariantProps } from "class-variance-authority";
import React, { ButtonHTMLAttributes } from "react";

const button = cva(
  "button cursor-pointer font-semibold flex items-center justify-center",
  {
    variants: {
      intent: {
        primary:
          "bg-primary-500 font-semibold text-text-base hover:shadow-filter-shadow border-[0.1rem] border-primary-300",
        secondary:
          "bg-primary-100 font-semibold text-primary-900 border-[0.1rem] border-primary-300 hover:bg-primary-200",

        tertiary:
          "hover:border-neutral-300 hover:bg-neutral-500 hover:bg-neutral-400 hover:border-[0.1rem]",
      },
      size: {
        small: "h-10 w-10 text-sm",
        medium: "h-14 px-7 py-3",
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
      rounded: "lg",
    },
  }
);

interface IIconButton
  extends ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof button> {
  icon: React.ReactNode;
  disabled?: boolean;
  onClick: () => void;
}

const IconButton = ({
  intent,
  size,
  icon,
  rounded,
  disabled,
  onClick,
  className,
}: IIconButton) => {
  return (
    <div
      onClick={onClick}
      className={cx(
        button({ intent, size, className, rounded }),
        disabled ? "text-text-xx-light" : ""
      )}
    >
      {icon}
    </div>
  );
};

export default IconButton;
