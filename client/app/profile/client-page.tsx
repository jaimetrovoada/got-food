"use client";
import Form from "@/components/Forms/Form";
import { useInput, useToasts } from "@/hooks";
import authService from "@/services/authService";
import React from "react";

interface Props {
  user: {
    name: string;
    email: string;
    role: "customer" | "business";
    restaurants: string[];
    orders: string[];
    id: string;
    token: string;
  };
}

const ClientForm = ({ user }: Props) => {
  const [nameValue, handleNameChange] = useInput(user?.name);
  const [emailValue, handleEmailChange] = useInput(user?.email);
  const [passwordValue, handlePasswordChange] = useInput(null);
  const { setSuccessMsg, setErrorMsg } = useToasts();

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      const res = await authService.updateUser(user.token, user.id, {
        name: nameValue,
        email: emailValue,
        password: passwordValue,
        role: user.role,
      });
      if (res.status === 200) {
        setSuccessMsg("User Updated");
      }
      console.log({ res });
    } catch (err) {
      console.log(err);
      setErrorMsg(err.message);
    }
  };
  /* if (status === "loading") {
    return <>loaading</>;
  } */

  return (
    <>
      <Form onSubmit={handleSubmit}>
        <Form.Input
          name="name"
          id="name"
          type="text"
          onChange={handleNameChange}
          labelText="Name"
          value={nameValue}
          disabled
        />
        <Form.Input
          name="email"
          id="email"
          type="text"
          onChange={handleEmailChange}
          labelText="Email"
          value={emailValue}
          disabled
        />
        <Form.Input
          name="password"
          id="password"
          type="password"
          onChange={handlePasswordChange}
          labelText="Password"
          value={passwordValue}
          disabled
        />
      </Form>
    </>
  );
};

export default ClientForm;
