"use client";
import Button from "../Button";
import Link from "next/link";
import { useForm } from "react-hook-form";
import { signIn } from "next-auth/react";
import { useSearchParams } from "next/navigation";
import { useToasts } from "@/lib/hooks";

interface Props {}

interface Inputs {
  email: string;
  password: string;
}

const LoginForm = ({}: Props) => {
  const searchParams = useSearchParams();
  const { setSuccessMsg, setErrorMsg } = useToasts();

  const { register, handleSubmit, watch, reset } = useForm<Inputs>();

  const email = watch("email");
  const password = watch("password");

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
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="flex flex-col gap-4 rounded-2xl border border-gray-200 bg-white p-4 shadow-lg"
      onReset={() => reset()}
    >
      <div className="flex flex-col">
        <label htmlFor="email">Email</label>
        <input
          type="email"
          id="email"
          className="rounded-xl border p-2 focus:outline-none"
          {...register("email", {
            required: true,
          })}
        />
      </div>
      <div className="flex flex-col">
        <label htmlFor="password">Password</label>
        <input
          type="password"
          id="password"
          className="rounded-xl border p-2 focus:outline-none"
          {...register("password", { required: true })}
        />
      </div>
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
    </form>
  );
};

export default LoginForm;
