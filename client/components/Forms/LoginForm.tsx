import React from "react";
import Form from "./Form";

interface LoginFormProps {
  handleSubmit: (e: React.FormEvent<HTMLFormElement>) => void;
  handleEmailInput: (e: React.ChangeEvent<HTMLInputElement>) => void;
  handlePasswordInput: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

const LoginForm: React.FC<LoginFormProps> = ({
  handleEmailInput,
  handlePasswordInput,
  handleSubmit,
}) => {
  return (
    <Form handleSubmit={handleSubmit}>
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
    </Form>
  );
};

export default LoginForm;