import React, { useState } from "react";
import authService from "@/services/authService";
import { useToasts } from "@/hooks";
import { AxiosError } from "axios";
import { useRouter } from "next/router";
import RegisterForm from "@/components/Forms/RegisterForm";
import LoginForm from "@/components/Forms/LoginForm";

const Auth = () => {
  const [view, setView] = useState<"login" | "register">("login");
  const { setSuccessMsg, setErrorMsg } = useToasts();

  const router = useRouter();

  const [registerFormState, setRegisterFormState] = useState<{
    name: string;
    email: string;
    password: string;
    role: "business" | "customer";
  }>({
    name: "",
    email: "",
    password: "",
    role: "customer",
  });
  const [loginFormState, setLoginFormState] = useState<{
    email: string;
    password: string;
  }>({
    email: "",
    password: "",
  });

  console.log({ registerFormState });

  const registerFormHandlers = {
    handleSubmit: async (e: React.FormEvent<HTMLFormElement>) => {
      e.preventDefault();

      try {
        const res = await authService.register(registerFormState);
        console.log({ res });
        if (res.status === 201) {
          setSuccessMsg("Registration Complete");
          setView("login");
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

    handleNameInput: (e: React.ChangeEvent<HTMLInputElement>) => {
      const name = e.target.value;
      setRegisterFormState((prev) => {
        return { ...prev, name };
      });
    },
    handleEmailInput: (e: React.ChangeEvent<HTMLInputElement>) => {
      const email = e.target.value;
      setRegisterFormState((prev) => {
        return { ...prev, email };
      });
    },
    handlePasswordInput: (e: React.ChangeEvent<HTMLInputElement>) => {
      const password = e.target.value;
      setRegisterFormState((prev) => {
        return { ...prev, password };
      });
    },
    handleRoleInput: (e: React.ChangeEvent<HTMLInputElement>) => {
      const checked = e.target.checked;
      setRegisterFormState((prev) => {
        return { ...prev, role: checked ? "business" : "customer" };
      });
    },
  };

  const loginFormHandlers = {
    handleSubmit: async (e: React.FormEvent<HTMLFormElement>) => {
      e.preventDefault();

      console.log({ loginFormState });
      try {
        const res = await authService.login(loginFormState);
        console.log({ res });
        if (res.status === 200) {
          setSuccessMsg("Login Complete");
          localStorage.setItem("user", JSON.stringify(res.data.user));
          localStorage.setItem("token", JSON.stringify(res.data.token));
          router.push("/users/" + res.data.user.id);
        }
      } catch (err) {
        console.log({ err });
        if (err instanceof AxiosError) setErrorMsg(err.response?.data?.error);
      }
    },
    handleEmailInput: (e: React.ChangeEvent<HTMLInputElement>) => {
      const email = e.target.value;
      setLoginFormState((prev) => {
        return { ...prev, email };
      });
    },
    handlePasswordInput: (e: React.ChangeEvent<HTMLInputElement>) => {
      const password = e.target.value;
      setLoginFormState((prev) => {
        return { ...prev, password };
      });
    },
  };

  return (
    <div className="rounded-2xl border">
      <div className="">
        <button
          onClick={() => setView("login")}
          className="w-1/2 rounded-tl-2xl border bg-slate-500 p-2"
          type="button"
        >
          {"login"}
        </button>
        <button
          onClick={() => setView("register")}
          className="w-1/2 rounded-tr-2xl border bg-slate-500 p-2"
          type="button"
        >
          {"register"}
        </button>
      </div>
      <div className="p-4">
        {view === "register" ? (
          <RegisterForm {...registerFormHandlers} />
        ) : (
          <LoginForm {...loginFormHandlers} />
        )}
      </div>
    </div>
  );
};

export default Auth;
