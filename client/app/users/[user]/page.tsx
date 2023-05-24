"use client";

import React from "react";
import { RootState } from "@/reducers/store";
import { useSelector } from "react-redux";
import { useToasts } from "@/hooks";
import Form from "@/components/Forms/Form";
import { useInput } from "@/hooks";
import authService from "@/services/authService";

const UserPage = () => {
  const user = useSelector((state: RootState) => state.user);

  const [nameValue, handleNameChange] = useInput(user.name);
  const [emailValue, handleEmailChange] = useInput(user.email);
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

  return (
    <section className="mx-auto w-full max-w-screen-md">
      <p className="mb-4 text-3xl font-bold">Hi {user.name}</p>
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
    </section>
  );
};

export default UserPage;
