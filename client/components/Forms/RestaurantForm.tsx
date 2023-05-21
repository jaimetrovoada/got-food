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
      <Form.Input
        onChange={handleNameInput}
        name="name"
        id="name"
        labelText="Name"
      />
      <Form.Input
        onChange={handleDescInput}
        name="description"
        id="description"
        labelText="Description"
      />
      <Form.Input
        onChange={handleAddrInput}
        name="address"
        id="address"
        labelText="Address"
      />
      <Form.ImageInput
        onChange={handleLogoUpload}
        name="logo"
        id="logo"
        labelText="Logo"
      />
    </Form>
  );
};

export default RestaurantForm;
