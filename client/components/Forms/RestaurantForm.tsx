import React from "react";
import Form from "./Form";

interface FormProps {
  handleSubmit: (e: React.FormEvent<HTMLFormElement>) => void;
  handleNameInput: (e: React.ChangeEvent<HTMLInputElement>) => void;
  handleDescInput: (e: React.ChangeEvent<HTMLInputElement>) => void;
  handleAddrInput: (e: React.ChangeEvent<HTMLInputElement>) => void;
  handleLogoUpload: (e: React.ChangeEvent<HTMLInputElement>) => void;
  handleReset: () => void;
  nameValue: string;
  descriptionValue: string;
  addressValue: string;
  logoValue: string;
}
const RestaurantForm: React.FC<FormProps> = ({
  handleSubmit,
  handleAddrInput,
  handleDescInput,
  handleLogoUpload,
  handleNameInput,
  handleReset,
  nameValue,
  descriptionValue,
  addressValue,
  logoValue,
}) => {
  return (
    <Form onSubmit={handleSubmit} onReset={handleReset}>
      <p className="text-2xl font-bold">Add New Restaurant</p>
      <Form.Input
        onChange={handleNameInput}
        name="name"
        id="name"
        labelText="Name"
        value={nameValue}
      />
      <Form.Input
        onChange={handleDescInput}
        name="description"
        id="description"
        labelText="Description"
        value={descriptionValue}
      />
      <Form.Input
        onChange={handleAddrInput}
        name="address"
        id="address"
        labelText="Address"
        value={addressValue}
      />
      <Form.ImageInput
        onChange={handleLogoUpload}
        name="logo"
        id="logo"
        labelText="Upload Logo"
        value={logoValue}
      />
    </Form>
  );
};

export default RestaurantForm;
