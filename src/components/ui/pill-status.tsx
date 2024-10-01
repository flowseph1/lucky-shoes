import { cva, VariantProps } from "class-variance-authority";

const pillStatusVariant = cva("px-4 py-2 rounded-full", {
    variants: {
      variant: {
        active: "bg-green-950 border-green-50",
        inactive: "bg-red-950 border-red-50",
      },
    },
    defaultVariants: {
      variant: "active",
    },
  });
  
  const pillStatusTextVariant = cva("text-sm", {
    variants: {
      variant: {
        active: "text-green-500",
        inactive: "text-red-500",
      },
    },
    defaultVariants: {
      variant: "active",
    },
  });
  
  export interface StatusVariantProps extends VariantProps<typeof pillStatusVariant> {} 
  
  export function PillStatus({ variant }: StatusVariantProps) {
    return (
      <div
        className={pillStatusVariant({
          variant,
        })}
      >
        <p
          className={pillStatusTextVariant({
            variant,
          })}
        >
          {variant === "active" ? "Activo" : "Inactivo"}
        </p>
      </div>
    );
  }