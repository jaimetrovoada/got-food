import { getClasses } from "@/lib/helpers";
import {
  Path,
  UseFormRegister,
  RegisterOptions,
  FieldError,
} from "react-hook-form";

type Props<TFormValues> = {
  variant?: "row" | "col";
  label: string;
  register: UseFormRegister<TFormValues>;
  rules?: RegisterOptions;
  name: Path<TFormValues>;
  error?: FieldError;
} & Omit<React.InputHTMLAttributes<HTMLInputElement>, "name">;

const Input = <TFormValues extends Record<string, unknown>>({
  className,
  name,
  label,
  variant = "col",
  register,
  rules,
  error,
  ...props
}: Props<TFormValues>) => {
  return (
    <div
      className={getClasses("flex", {
        "flex-col": variant === "col",
        "flex-row items-center gap-2": variant === "row",
      })}
    >
      <label htmlFor={name}>{label}</label>
      <input
        {...props}
        {...register(name, rules)}
        id={name}
        className={getClasses(
          "rounded border border-gray-400/40 bg-zinc-900 p-2 placeholder:capitalize",
          className
        )}
      />
      {error && <p className="text-xs text-red-600">{label} is required</p>}
    </div>
  );
};

export default Input;
