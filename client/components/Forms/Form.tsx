import React, { useState } from "react";
import Button from "../Button";

interface FormProps extends React.HTMLAttributes<HTMLFormElement> {
  children: React.ReactNode;
}

interface InputProps {
  handleChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  type?: React.HTMLInputTypeAttribute;
  value?: string;
  name: string;
  id: string;
  disabled?: boolean | undefined;
}

export const Input = ({
  handleChange,
  type = "text",
  name,
  id,
  value,
  disabled,
}: InputProps) => {
  const capName = name.charAt(0).toUpperCase() + name.slice(1);

  const [isDisabled, setIsDisabled] = useState<boolean>(disabled);

  return (
    <div className="flex flex-row items-center">
      <div className="flex flex-1 flex-col">
        <label htmlFor={id}>{capName}</label>
        <input
          type={type}
          name={name}
          id={id}
          onChange={handleChange}
          className="border p-2 focus:outline-none"
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

export const ImageInput = ({ handleChange, name, id }: InputProps) => {
  const capName = name.charAt(0).toUpperCase() + name.slice(1);
  return (
    <div className="flex flex-col">
      <label htmlFor={id}>{capName}</label>
      <input
        type="file"
        accept="image/png,image/jpeg,image/webp"
        multiple={false}
        name={name}
        id={id}
        onChange={handleChange}
      />
    </div>
  );
};

const Form = ({ children, className, ...props }: FormProps) => {
  return (
    <form
      {...props}
      className={
        "flex flex-col gap-4 rounded-2xl border border-black p-4 shadow-custom" +
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
