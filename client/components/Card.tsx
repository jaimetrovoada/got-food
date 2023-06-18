import { getClasses } from "@/lib/helpers";
import React from "react";

interface Props extends React.HTMLAttributes<HTMLDivElement> {
  variant?: "rounded" | "square";
} ;

const baseStyle = "bg-white border border-gray-600";
const styles = {
  rounded: `${baseStyle} rounded-2xl`,
  square: `${baseStyle}`,
};

const Card = ({
  variant = "rounded",
  className,
  children,
  ...props
}: Props) => {

  return (
    <div className={getClasses(baseStyle, { [styles.rounded]: variant === "rounded", [styles.square]: variant === "square" }, className)} {...props}>
      {children}
    </div>
  );
};

export default Card;
