import React from "react";
import Form, { FormImageInput, FormInput } from "./Form";

interface MenuFormProps {
  handleSubmit: (event: React.FormEvent<HTMLFormElement>) => void;
  handleNameChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  handleDescriptionChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  handlePriceChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  handleImageChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  handleCategoryChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
}

const MenuForm = ({
  handleSubmit,
  handleCategoryChange,
  handleDescriptionChange,
  handleImageChange,
  handleNameChange,
  handlePriceChange,
}: MenuFormProps) => {
  return (
    <Form handleSubmit={handleSubmit}>
      <FormInput name="name" id="name" handleChange={handleNameChange} />

      <FormInput
        name="description"
        id="description"
        handleChange={handleDescriptionChange}
      />

      <FormInput
        type="number"
        name="price"
        id="price"
        handleChange={handlePriceChange}
      />
      <FormInput
        name="category"
        id="category"
        handleChange={handleCategoryChange}
      />

      <FormImageInput
        name="image"
        id="image"
        handleChange={handleImageChange}
      />
    </Form>
  );
};

export default MenuForm;
