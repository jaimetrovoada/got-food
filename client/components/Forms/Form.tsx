import React, { useState } from "react";
import Button from "../Button";

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
          }`}
          value={value}
          disabled={isDisabled}
        />
      </div>
      {disabled !== undefined && (
        <Button
          type="button"
          onClick={() => setIsDisabled(!isDisabled)}
          className="w-fit"
          variant="tertiary"
        >
          ✏️
        </Button>
      )}
    </div>
  );
};

export const ImageInput = ({ onChange, name, id, labelText }: InputProps) => {
  return (
    <div className="flex flex-col">
      <label htmlFor={id}>{labelText}</label>
      <input
        type="file"
        accept="image/png,image/jpeg,image/webp"
        multiple={false}
        name={name}
        id={id}
        onChange={onChange}
      />
    </div>
  );
};

const Form = ({ children, className, ...props }: FormProps) => {
  return (
    <form
      {...props}
      className={
        "flex flex-col gap-4 rounded-2xl border-2 border-black p-4 shadow-custom" +
        " " +
        className
      }
    >
      {children}
      <div className="flex gap-4">
        <Button type="submit" className="bg-blue-500 p-2">
          Submit
        </Button>
        <Button type="reset" className="bg-red-500 p-2">
          Reset
        </Button>
      </div>
    </form>
  );
};

Form.Input = Input;
Form.ImageInput = ImageInput;

export default Form;
