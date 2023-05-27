"use client";
import LoginForm from "@/components/Forms/LoginForm";
import { useInput, useToasts } from "@/lib/hooks";
import { signIn } from "next-auth/react";
import { useSearchParams } from "next/navigation";

const Page = () => {
  const { setSuccessMsg, setErrorMsg } = useToasts();
  const [email, setEmail] = useInput("");
  const [password, setPassword] = useInput("");

  const searchParams = useSearchParams();

  const loginFormHandlers = {
    handleSubmit: async (e: React.FormEvent<HTMLFormElement>) => {
      e.preventDefault();
      const res = await signIn("credentials", {
        email,
        password,
        redirect: true,
        callbackUrl: searchParams.get("callbackUrl") || "/",
      });

      if (res.ok) {
        setSuccessMsg("Logged in");
      } else {
        setErrorMsg("something went wrong");
      }
    },
    handleEmailInput: setEmail,
    handlePasswordInput: setPassword,
  };
  return <LoginForm {...loginFormHandlers} />;
};

export default Page;
