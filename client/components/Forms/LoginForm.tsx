"use client";
import Button from "../Button";
import Link from "next/link";
import { useForm } from "react-hook-form";
import { signIn } from "next-auth/react";
import { useRouter, useSearchParams } from "next/navigation";
import Form from "../Form";
import Input from "./Input";
import { useState } from "react";

interface Props {}

export type Inputs = {
  email: string;
  password: string;
};

const LoginForm = ({}: Props) => {
  const searchParams = useSearchParams();
  const [error, setError] = useState<string>(undefined);

  const router = useRouter();

  const { register, handleSubmit, watch, reset } = useForm<Inputs>();

  const email = watch("email");
  const password = watch("password");

  const onSubmit = async (data: Inputs) => {
    try {
      const res = await signIn("credentials", {
        email: data.email,
        password: data.password,
        redirect: false,
        callbackUrl: searchParams.get("callbackUrl") || "/",
      });
      console.log({ res });
      if (res?.error) {
        setError(res.error);
        setTimeout(() => {
          setError(undefined);
        }, 5000);
      }

      if (!res.error) {
        router.replace(res.url || "/");
      }
    } catch (error) {
      console.log({ error });
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
      {error && <p className="text-xs capitalize text-red-500">{error}</p>}
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
