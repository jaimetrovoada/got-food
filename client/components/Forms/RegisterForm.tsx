import React from "react";
import Form from "./Form";

interface RegisterFormProps {
  handleSubmit: (e: React.FormEvent<HTMLFormElement>) => void;
  handleNameInput: (e: React.ChangeEvent<HTMLInputElement>) => void;
  handleEmailInput: (e: React.ChangeEvent<HTMLInputElement>) => void;
  handlePasswordInput: (e: React.ChangeEvent<HTMLInputElement>) => void;
  handleRoleInput: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

const RegisterForm: React.FC<RegisterFormProps> = ({
  handleSubmit,
  handleNameInput,
  handleEmailInput,
  handlePasswordInput,
  handleRoleInput,
}) => {
  return (
    <Form handleSubmit={handleSubmit}>
      <Form.Input name="name" id="name" handleChange={handleNameInput} />

      <Form.Input
        type="email"
        name="email"
        id="email"
        handleChange={handleEmailInput}
      />

      <Form.Input
        type="password"
        name="password"
        id="password"
        handleChange={handlePasswordInput}
      />

      <div>
        <label htmlFor="role">I want to add my restaurant(s)</label>
        <input
          type="checkbox"
          name="role"
          id="role"
          onChange={handleRoleInput}
        />
      </div>
    </Form>
  );
};

export default RegisterForm;
