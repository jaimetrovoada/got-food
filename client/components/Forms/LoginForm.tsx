"use client";
import Button from "../Button";
import Link from "next/link";
import { useForm } from "react-hook-form";
import { signIn } from "next-auth/react";
import { useSearchParams } from "next/navigation";
import { useToasts } from "@/lib/hooks";
import Form from "../Form";
import Input from "./Input";

interface Props {}

export type Inputs = {
  email: string;
  password: string;
};

const LoginForm = ({}: Props) => {
  const searchParams = useSearchParams();
  const { setSuccessMsg, setErrorMsg } = useToasts();

  const { register, handleSubmit, watch, reset } = useForm<Inputs>();

  const email = watch("email");
  const password = watch("password");
  console.log({ email, password });

  const onSubmit = async (data: Inputs) => {
    const res = await signIn("credentials", {
      email: data.email,
      password: data.password,
      redirect: true,
      callbackUrl: searchParams.get("callbackUrl") || "/",
    });

    if (res.ok) {
      setSuccessMsg("Logged in");
    } else {
      setErrorMsg("something went wrong");
    }
  };

  return (
    <Form onSubmit={handleSubmit(onSubmit)} onReset={() => reset()}>
      <Input
        label="Email"
        type="email"
        name="email"
        register={register}
        rules={{ required: true }}
      />
      <Input
        label="Password"
        type="password"
        name="password"
        register={register}
        rules={{ required: true }}
      />
      <Button
        as={Link}
        href="/auth/register"
        variant="tertiary"
        className="font-normal"
      >
        Create Account
      </Button>
      <div className="flex gap-4">
        <Button type="submit" disabled={!email || !password}>
          Submit
        </Button>
        <Button type="reset" variant="secondary">
          Reset
        </Button>
      </div>
    </Form>
  );
};

export default LoginForm;
