import React from "react";
import Form, { FormInput, FormImageInput } from "./Form";

interface FormProps {
  handleSubmit: (e: React.FormEvent<HTMLFormElement>) => void;
  handleNameInput: (e: React.ChangeEvent<HTMLInputElement>) => void;
  handleDescInput: (e: React.ChangeEvent<HTMLInputElement>) => void;
  handleAddrInput: (e: React.ChangeEvent<HTMLInputElement>) => void;
  handleLogoUpload: (e: React.ChangeEvent<HTMLInputElement>) => void;
}
const RestaurantForm: React.FC<FormProps> = ({
  handleSubmit,
  handleAddrInput,
  handleDescInput,
  handleLogoUpload,
  handleNameInput,
}) => {
  return (
    <Form handleSubmit={handleSubmit}>
      <p className="text-2xl font-bold">Add New Restaurant</p>
      <FormInput handleChange={handleNameInput} name="name" id="name" />
      <FormInput
        handleChange={handleDescInput}
        name="description"
        id="description"
      />
      <FormInput handleChange={handleAddrInput} name="address" id="address" />
      <FormImageInput handleChange={handleLogoUpload} name="logo" id="logo" />
    </Form>
  );
};

export default RestaurantForm;
