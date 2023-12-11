"use client";
import Button from "../Button";
import Link from "next/link";
import { useForm } from "react-hook-form";
import { signIn } from "next-auth/react";
import { useRouter, useSearchParams } from "next/navigation";
import Form from "../Form";
import Input from "./Input";
import { useState } from "react";
import { wait } from "@/lib/utils";
import { useToast } from "../ui/use-toast";
import { Loader } from "lucide-react";

interface Props {}

export type Inputs = {
  email: string;
  password: string;
};

const LoginForm = ({}: Props) => {
  const searchParams = useSearchParams();

  const router = useRouter();

  const { register, handleSubmit, watch, reset, formState} = useForm<Inputs>();

  const email = watch("email");
  const password = watch("password");

  const { toast } = useToast()

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
      toast({
        title: "Error",
        description: "Something went wrong",
        variant: "destructive",
      });
      }

      if (!res.error) {
        toast({
          title: "Success",
          description: "Logged in successfully",
        });
        router.push(res.url || "/");
      }
    } catch (error) {
      console.log({ error });
      toast({
        title: "Error",
        description: "Something went wrong",
        variant: "destructive",
      });
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
        autoComplete="password"
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
        <Button type="submit" disabled={!email || !password || formState.isSubmitting}>
          {
            formState.isSubmitting ? <Loader className="mr-2 h-4 w-4 animate-spin"/> : "Login"
          }
        </Button>
      </div>
    </Form>
  );
};

export default LoginForm;
