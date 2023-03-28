import React, { useState } from "react";
import authService from "@/services/authService";

interface RegisterFormProps {
  handleSubmit: (e: React.FormEvent<HTMLFormElement>) => void;
  handleNameInput: (e: React.ChangeEvent<HTMLInputElement>) => void;
  handleEmailInput: (e: React.ChangeEvent<HTMLInputElement>) => void;
  handlePasswordInput: (e: React.ChangeEvent<HTMLInputElement>) => void;
  handleRoleInput: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

interface LoginFormProps {
  handleSubmit: (e: React.FormEvent<HTMLFormElement>) => void;
  handleEmailInput: (e: React.ChangeEvent<HTMLInputElement>) => void;
  handlePasswordInput: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

const RegisterForm: React.FC<RegisterFormProps> = ({
  handleSubmit,
  handleNameInput,
  handleEmailInput,
  handlePasswordInput,
  handleRoleInput,
}) => {
  return (
    <form onSubmit={handleSubmit}>
      <div>
        name:{" "}
        <input
          type="text"
          name="name"
          className="border"
          onChange={handleNameInput}
        />
      </div>
      <div>
        email:{" "}
        <input
          type="email"
          name="email"
          className="border"
          onChange={handleEmailInput}
        />
      </div>
      <div>
        password:{" "}
        <input
          type="password"
          name="password"
          className="border"
          onChange={handlePasswordInput}
        />
      </div>
      <div>
        business: yes{" "}
        <input
          type="radio"
          name="role"
          value="yes"
          onChange={handleRoleInput}
        />
        no{" "}
        <input
          type="radio"
          name="role"
          value="no"
          defaultChecked
          onChange={handleRoleInput}
        />
      </div>

      <button type="submit" className="rounded-xl border bg-slate-500 p-2">
        submit
      </button>
    </form>
  );
};

const LoginForm: React.FC<LoginFormProps> = ({
  handleEmailInput,
  handlePasswordInput,
  handleSubmit,
}) => {
  return (
    <form onSubmit={handleSubmit}>
      <div>
        email:{" "}
        <input
          type="email"
          name="email"
          className="border"
          onChange={handleEmailInput}
        />
      </div>
      <div>
        password:{" "}
        <input
          type="password"
          name="password"
          className="border"
          onChange={handlePasswordInput}
        />
      </div>

      <button type="submit" className="rounded-xl border bg-slate-500 p-2">
        submit
      </button>
    </form>
  );
};

const Auth = () => {
  const [view, setView] = useState<"login" | "register">("login");

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

  const registerFormHandlers = {
    handleSubmit: (e: React.FormEvent<HTMLFormElement>) => {
      e.preventDefault();

      console.log({ registerFormState });
      // authService.register(registerFormState);
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
      setRegisterFormState((prev) => {
        return { ...prev, role: "business" };
      });
    },
  };

  const loginFormHandlers = {
    handleSubmit: (e: React.FormEvent<HTMLFormElement>) => {
      e.preventDefault();

      console.log({ loginFormState });
      // authService.login(loginFormState);
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
