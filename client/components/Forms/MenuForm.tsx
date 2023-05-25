import React from "react";
import Form from "./Form";

interface MenuFormProps {
  handleSubmit: (event: React.FormEvent<HTMLFormElement>) => void;
  handleNameChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  handleDescriptionChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  handlePriceChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  handleImageChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  handleCategoryChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  nameValue: string;
  descriptionValue: string;
  priceValue: string;
  categoryValue: string;
}

const MenuForm = ({
  handleSubmit,
  handleCategoryChange,
  handleDescriptionChange,
  handleImageChange,
  handleNameChange,
  handlePriceChange,
  nameValue,
  descriptionValue,
  priceValue,
  categoryValue,
}: MenuFormProps) => {
  return (
    <Form onSubmit={handleSubmit}>
      <Form.Input
        name="name"
        id="name"
        onChange={handleNameChange}
        labelText="Name"
        value={nameValue}
        disabled
      />

      <Form.Input
        name="description"
        id="description"
        onChange={handleDescriptionChange}
        labelText="Description"
        value={descriptionValue}
        disabled
      />

      <Form.Input
        type="number"
        name="price"
        id="price"
        min={0}
        onChange={handlePriceChange}
        labelText="Price"
        value={priceValue}
        disabled
      />
      <Form.Input
        name="category"
        id="category"
        onChange={handleCategoryChange}
        labelText="Category"
        value={categoryValue}
        disabled
      />

      <Form.ImageInput
        name="image"
        id="image"
        onChange={handleImageChange}
        labelText="Image"
        disabled
      />
    </Form>
  );
};

export default MenuForm;
