import React, { useState } from "react";
import Form from "./Form";
import Button from "../Button";

export enum Role {
  BUSINESS = "business",
  CUSTOMER = "customer",
}

interface RegisterFormProps {
  handleSubmit: (e: React.FormEvent<HTMLFormElement>) => void;
  handleNameInput: (e: React.ChangeEvent<HTMLInputElement>) => void;
  handleEmailInput: (e: React.ChangeEvent<HTMLInputElement>) => void;
  handlePasswordInput: (e: React.ChangeEvent<HTMLInputElement>) => void;
  handleRoleInput: (role: Role) => void;
}

const RegisterForm: React.FC<RegisterFormProps> = ({
  handleSubmit,
  handleNameInput,
  handleEmailInput,
  handlePasswordInput,
  handleRoleInput,
}) => {
  const [role, setRole] = useState<Role | undefined>(undefined);
  const setRoleBusiness = (e: React.MouseEvent<HTMLButtonElement>) => {
    setRole(Role.BUSINESS);
    handleRoleInput(Role.BUSINESS);
  };
  const setRoleCustomer = (e: React.MouseEvent<HTMLButtonElement>) => {
    setRole(Role.CUSTOMER);
    handleRoleInput(Role.CUSTOMER);
  };

  if (role === undefined) {
    return (
      <div className="flex flex-col gap-2">
        <Button onClick={setRoleBusiness}>Sign up to add my restuarants</Button>
        <Button onClick={setRoleCustomer}>Create a costumer account</Button>
      </div>
    );
  }
  return (
    <Form onSubmit={handleSubmit}>
      {role ? (
        <>
          <Form.Input
            name="name"
            id="name"
            onChange={handleNameInput}
            labelText="Name"
          />
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
        </>
      ) : (
        <>
          <button
            onClick={setRoleBusiness}
            className="rounded-xl border p-2 shadow-md"
          >
            Sign up to add my restuarants
          </button>
          <button
            onClick={setRoleCustomer}
            className="rounded-xl border p-2 shadow-md"
          >
            Create a costumer account
          </button>
        </>
      )}
    </Form>
  );
};

export default RegisterForm;
