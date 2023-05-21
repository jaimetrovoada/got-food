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
    <Form onSubmit={handleSubmit}>
      <Form.Input
        name="name"
        id="name"
        onChange={handleNameChange}
        labelText="Name"
      />

      <Form.Input
        name="description"
        id="description"
        onChange={handleDescriptionChange}
        labelText="Description"
      />

      <Form.Input
        type="number"
        name="price"
        id="price"
        onChange={handlePriceChange}
        labelText="Price"
      />
      <Form.Input
        name="category"
        id="category"
        onChange={handleCategoryChange}
        labelText="Category"
      />

      <Form.ImageInput
        name="image"
        id="image"
        onChange={handleImageChange}
        labelText="Image"
      />
    </Form>
  );
};

export default MenuForm;
