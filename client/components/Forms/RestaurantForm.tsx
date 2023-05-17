import React from "react";
import Form from "./Form";

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
    <Form onSubmit={handleSubmit}>
      <p className="text-2xl font-bold">Add New Restaurant</p>
      <Form.Input handleChange={handleNameInput} name="name" id="name" />
      <Form.Input
        handleChange={handleDescInput}
        name="description"
        id="description"
      />
      <Form.Input handleChange={handleAddrInput} name="address" id="address" />
      <Form.ImageInput handleChange={handleLogoUpload} name="logo" id="logo" />
    </Form>
  );
};

export default RestaurantForm;
