"use client";

import React from "react";
import { RootState } from "@/reducers/store";
import { useSelector } from "react-redux";
import { useToasts, useUserDetails } from "@/hooks";
import { useParams } from "next/navigation";
import Form from "@/components/Forms/Form";
import { useInput } from "@/hooks";
import authService from "@/services/authService";

const UserPage = () => {
  const user = useSelector((state: RootState) => state.user);
  const { user: userinfo } = useUserDetails(user.id);
  const slug = useParams().user;
  console.log({ slug });
  if (!user || user.id !== slug) {
    throw new Error("NotLoggedIn");
  }

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
          handleChange={handleNameChange}
          value={nameValue}
          disabled
        />
        <Form.Input
          name="email"
          id="email"
          type="text"
          handleChange={handleEmailChange}
          value={emailValue}
          disabled
        />
        <Form.Input
          name="password"
          id="password"
          type="password"
          handleChange={handlePasswordChange}
          value={passwordValue}
          disabled
        />
      </Form>
    </section>
  );
};

export default UserPage;
