"use client";

import { cva, VariantProps } from "class-variance-authority";
import React, { ButtonHTMLAttributes, memo } from "react";

const button = cva(
  "inline-flex items-center justify-center button cursor-pointer",
  {
    variants: {
      intent: {
        primary:
          "bg-primary-500 font-semibold text-text-base hover:shadow-filter-shadow border-[0.1rem] border-primary-300",
        secondary:
          "bg-primary-100 font-semibold text-primary-900 border-[0.1rem] border-primary-300 hover:bg-primary-200",

        tertiary:
          "border-[rgba(255,255,255,.05)] bg-[rgba(255,255,255,.02)] hover:bg-[rgba(255,255,255,.03)] border-[0.1rem] backdrop-blur",
      },
      size: {
        small: "h-10 px-5 text-sm",
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

interface IButton
  extends ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof button> {
  title: string;
  leftIcon?: React.ReactNode;
  onClick?: () => void;
}

const Button = ({
  intent,
  size,
  title,
  className,
  rounded,
  leftIcon,
  onClick,
}: IButton) => {
  return (
    <div
      className={button({ intent, size, className, rounded })}
      onClick={() => onClick && onClick()}
    >
      {leftIcon && <div className="mr-2">{leftIcon}</div>}
      <p>{title}</p>
    </div>
  );
};

export default memo(Button);
