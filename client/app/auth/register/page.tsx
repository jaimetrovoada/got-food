"use client";

import RegisterForm, { Role } from "@/components/Forms/RegisterForm";
import { useInput, useToasts } from "@/hooks";
import authService from "@/services/authService";
import { AxiosError } from "axios";
import { useRouter } from "next/navigation";
import React, { useState } from "react";

const Page = () => {
  const { setSuccessMsg, setErrorMsg } = useToasts();

  const router = useRouter();

  const [name, setName] = useInput("");
  const [email, setEmail] = useInput("");
  const [password, setPassword] = useInput("");
  const [role, setRole] = useState<Role | undefined>();

  const registerFormHandlers = {
    handleSubmit: async (e: React.FormEvent<HTMLFormElement>) => {
      e.preventDefault();

      try {
        const res = await authService.register({ role, name, email, password });
        console.log({ res });
        if (res.status === 201) {
          setSuccessMsg("Registration Complete");
          router.replace("/auth/login");
        }
      } catch (err) {
        console.log({ err });
        if (err instanceof AxiosError) {
          if (err.response?.status === 409) {
            return setErrorMsg(err.response?.data?.error);
          }
        }
        setErrorMsg("Something went wrong, please try again");
      }
    },

    handleNameInput: setName,
    handleEmailInput: setEmail,
    handlePasswordInput: setPassword,
    handleRoleInput: (role: Role) => setRole(role),
  };

  return <RegisterForm {...registerFormHandlers} />;
};

export default Page;
