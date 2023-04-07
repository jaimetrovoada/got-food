import React, { useState } from "react";
import Form from "./Form";
import { Role } from "@/pages/auth";

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
      </div>
    );
  }
  return (
    <Form handleSubmit={handleSubmit}>
      {role ? (
        <>
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
