import React from "react";
import Form from "./Form";

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
      <Form.Input name="name" id="name" handleChange={handleNameChange} />

      <Form.Input
        name="description"
        id="description"
        handleChange={handleDescriptionChange}
      />

      <Form.Input
        type="number"
        name="price"
        id="price"
        handleChange={handlePriceChange}
      />
      <Form.Input
        name="category"
        id="category"
        handleChange={handleCategoryChange}
      />

      <Form.ImageInput
        name="image"
        id="image"
        handleChange={handleImageChange}
      />
    </Form>
  );
};

export default MenuForm;
