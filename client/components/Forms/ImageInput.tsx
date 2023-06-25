import { getClasses } from "@/lib/helpers";
import {
  Path,
  UseFormRegister,
  RegisterOptions,
  FieldError,
} from "react-hook-form";
import { UploadCloud } from "react-feather";

type Props<TFormValues> = {
  register: UseFormRegister<TFormValues>;
  rules?: RegisterOptions;
  name: Path<TFormValues>;
  error?: FieldError;
  isSelected: boolean;
} & Omit<React.InputHTMLAttributes<HTMLInputElement>, "name">;

const Input = <TFormValues extends Record<string, unknown>>({
  className,
  name,
  register,
  rules,
  error,
  isSelected,
  ...props
}: Props<TFormValues>) => {
  return (
    <div className="flex flex-col">
      <label
        htmlFor={name}
        className={getClasses(
          "flex w-fit cursor-pointer flex-row gap-2 rounded-lg border border-blue-600 p-2 font-bold text-blue-600 shadow-lg",
          {
            "border-green-600 text-green-600": isSelected,
          }
        )}
      >
        <UploadCloud />
        <span>{isSelected ? "Selected" : "Upload Image"}</span>
      </label>
      <input
        {...props}
        type="file"
        id={name}
        accept="image/png,image/jpeg,image/webp"
        multiple={false}
        className="hidden"
        {...register(name, rules)}
      />
      {error && (
        <p className="text-xs capitalize text-red-600">Image is required.</p>
      )}
    </div>
  );
};

export default Input;
