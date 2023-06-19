import React, { forwardRef } from "react";
import { getClasses } from "@/lib/helpers";
import { Path, UseFormRegister, RegisterOptions } from "react-hook-form";

type Props<TFormValues> = {
  variant?: "row" | "col";
  label: string;
  register: UseFormRegister<TFormValues>;
  rules?: RegisterOptions;
  name: Path<TFormValues>;
} & Omit<React.InputHTMLAttributes<HTMLInputElement>, "name">;

const Input = <TFormValues extends Record<string, unknown>>({
  className,
  name,
  label,
  variant = "col",
  register,
  rules,
  ...props
}: Props<TFormValues>) => {
  return (
    <label
      htmlFor={name}
      className={getClasses("flex", {
        "flex-col": variant === "col",
        "flex-row items-center gap-2": variant === "row",
      })}
    >
      {label}
      <input
        {...props}
        {...register(name, rules)}
        className={getClasses(
          "rounded border border-gray-400/40 bg-zinc-900 p-2 placeholder:capitalize",
          className
        )}
      />
    </label>
  );
};

export default Input;
