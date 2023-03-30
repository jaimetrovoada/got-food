import React from "react";

interface FormProps {
  handleSubmit: (e: React.FormEvent<HTMLFormElement>) => void;
  children: React.ReactNode;
}

interface FormInputProps {
  handleChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  type?: React.HTMLInputTypeAttribute;
  name: string;
  id: string;
}

export const FormInput = ({
  handleChange,
  type = "text",
  name,
  id,
}: FormInputProps) => {
  const capName = name.charAt(0).toUpperCase() + name.slice(1);
  return (
    <div className="flex flex-col">
      <label htmlFor={id}>{capName}</label>
      <input
        type={type}
        name={name}
        id={id}
        onChange={handleChange}
        className="border p-2 focus:outline-none"
      />
    </div>
  );
};

export const FormImageInput = ({
  handleChange,
  name,
  id,
}: FormInputProps) => {
  const capName = name.charAt(0).toUpperCase() + name.slice(1);
  return (
    <div className="flex flex-col">
      <label htmlFor={id}>{capName}</label>
      <input
        type="file"
        accept="image/*"
        multiple={false}
        name={name}
        id={id}
        onChange={handleChange}
      />
    </div>
  );
};

const Form = ({ handleSubmit, children }: FormProps) => {
  return (
    <form
      onSubmit={handleSubmit}
      className="flex flex-col gap-4 rounded-2xl border p-4 shadow-md"
    >
      {children}
      <div>
        <button type="submit" className="rounded-xl border bg-blue-500 p-2">
          Submit
        </button>
        <button type="reset" className="rounded-xl border bg-red-500 p-2">
          Reset
        </button>
      </div>
    </form>
  );
};

export default Form;
