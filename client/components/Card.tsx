import { getClasses } from "@/lib/helpers";
import React from "react";

interface Props extends React.HTMLAttributes<HTMLDivElement> {
  variant?: "rounded" | "square";
}

const Card = ({
  variant = "rounded",
  className,
  children,
  ...props
}: Props) => {
  return (
    <div
      className={getClasses(
        "border border-gray-600/50 bg-neutral-950 shadow-lg hover:border-neutral-200/75",
        {
          "rounded-2xl": variant === "rounded",
        },
        className
      )}
      {...props}
    >
      {children}
    </div>
  );
};

export default Card;
