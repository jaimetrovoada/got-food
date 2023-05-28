import React, { useState } from "react";
import Button from "../Button";
import { Edit3, UploadCloud } from "react-feather";

interface FormProps extends React.HTMLAttributes<HTMLFormElement> {
  children: React.ReactNode;
}

interface InputProps
  extends React.DetailedHTMLProps<
    React.InputHTMLAttributes<HTMLInputElement>,
    HTMLInputElement
  > {
  labelText: string;
  variant?: "column" | "row";
}

export const Input = ({
  onChange,
  type = "text",
  name,
  id,
  value,
  disabled,
  variant = "column",
  labelText,
  className,
  ...props
}: InputProps) => {
  const [isDisabled, setIsDisabled] = useState<boolean>(disabled);

  return (
    <div className="flex flex-row items-center">
      <div
        className={`flex ${
          variant === "column"
            ? "flex-1 flex-col"
            : "flex-row items-center gap-2"
        }`}
      >
        <label htmlFor={id}>{labelText}</label>
        <input
          type={type}
          name={name}
          id={id}
          onChange={onChange}
          className={`rounded-xl border p-2 focus:outline-none ${
            variant === "row" ? "w-16" : "w-auto"
          } ${className}`}
          value={value}
          disabled={isDisabled}
          {...props}
        />
      </div>
      {disabled !== undefined && (
        <Button
          type="button"
          onClick={() => setIsDisabled(!isDisabled)}
          className="w-fit"
          variant="custom"
        >
          <Edit3 />
        </Button>
      )}
    </div>
  );
};

export const ImageInput = ({
  onChange,
  name,
  id,
  labelText,
  className,
  value,
  ...props
}: InputProps) => {
  console.log({ imgUpldValue: value });
  return (
    <div className="flex flex-col">
      <label
        htmlFor={id}
        className={`flex w-fit cursor-pointer flex-row gap-2 rounded-lg border ${
          value
            ? "border-green-600 text-green-600"
            : "border-blue-600 text-blue-600"
        } p-2 font-bold shadow-lg`}
      >
        <UploadCloud />
        <span>{value ? "Selected" : labelText}</span>
      </label>
      <input
        type="file"
        accept="image/png,image/jpeg,image/webp"
        multiple={false}
        name={name}
        id={id}
        onChange={onChange}
        className={className + " hidden"}
        {...props}
      />
    </div>
  );
};

const Form = ({ children, className, ...props }: FormProps) => {
  return (
    <form
      {...props}
      className={
        "flex flex-col gap-4 rounded-2xl border-2 border-black/50 bg-white p-4 shadow-custom" +
        " " +
        className
      }
    >
      {children}
      <div className="flex gap-4">
        <Button type="submit">Submit</Button>
        <Button type="reset" variant="secondary">
          Reset
        </Button>
      </div>
    </form>
  );
};

Form.Input = Input;
Form.ImageInput = ImageInput;

export default Form;
