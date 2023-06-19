import React from "react";
import { getClasses } from "@/lib/helpers";

interface Props extends React.InputHTMLAttributes<HTMLInputElement> {
  variant?: "row" | "col";
  name: string;
  label: string;
}

const Input: React.ForwardRefRenderFunction<HTMLInputElement, Props> = ({
  className,
  name,
  label,
  variant = "col",
  ...props
}) => {
  return (
    <label
      htmlFor={name}
      className={getClasses("flex", {
        "flex-col": variant === "col",
        "flex-row gap-2 items-center": variant === "row",
      })}
    >
      {label}
      <input
        {...props}
        name={name}
        className={getClasses(
          "rounded border border-gray-400/40 bg-zinc-900 p-2 placeholder:capitalize",
          className
        )}
      />
    </label>
  );
};

const FormInput = React.forwardRef(Input);

export default FormInput;
