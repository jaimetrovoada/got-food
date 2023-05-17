"use client";

import LoginForm from "@/components/Forms/LoginForm";
import { useInput, useToasts } from "@/hooks";
import { setAuth } from "@/reducers/authReducers";
import authService from "@/services/authService";
import { AxiosError } from "axios";
import { useRouter } from "next/navigation";
import { useDispatch } from "react-redux";

const Page = () => {
  const { setSuccessMsg, setErrorMsg } = useToasts();

  const dispatch = useDispatch();

  const [email, setEmail] = useInput("");
  const [password, setPassword] = useInput("");

  const router = useRouter();

  const loginFormHandlers = {
    handleSubmit: async (e: React.FormEvent<HTMLFormElement>) => {
      e.preventDefault();

      try {
        const res = await authService.login({ email, password });
        console.log({ res });
        if (res.status === 200) {
          setSuccessMsg("Login Complete");
          localStorage.setItem(
            "user",
            JSON.stringify({ ...res.data.user, token: res.data.token })
          );
          dispatch(
            setAuth({
              id: res.data.user.id,
              name: res.data.user.name,
              email: res.data.user.email,
              token: res.data.token,
              role: res.data.user.role,
            })
          );
          router.push(`/`);
        }
      } catch (err) {
        console.log({ err });
        if (err instanceof AxiosError) setErrorMsg(err.response?.data?.error);
      }
    },
    handleEmailInput: setEmail,
    handlePasswordInput: setPassword,
  };
  return <LoginForm {...loginFormHandlers} />;
};

export default Page;
