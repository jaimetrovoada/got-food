import React from "react";
import Form from "./Form";
import Button from "../Button";
import Link from "next/link";

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
    <Form onSubmit={handleSubmit}>
      <Form.Input
        type="email"
        name="email"
        id="email"
        onChange={handleEmailInput}
        labelText="Email"
      />
      <Form.Input
        type="password"
        name="password"
        id="password"
        onChange={handlePasswordInput}
        labelText="Password"
      />
      <Button
        as={Link}
        href="/auth/register"
        variant="tertiary"
        className="font-normal"
      >
        Create Account
      </Button>
    </Form>
  );
};

export default LoginForm;
