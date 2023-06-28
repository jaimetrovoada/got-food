"use client";
import authService from "@/lib/auth.service";
import userService from "@/lib/user.service";
import { LoginResponse } from "@/types";
import { signOut } from "next-auth/react";
import { useRouter } from "next/navigation";
import { Trash } from "react-feather";
import { SubmitHandler, useForm } from "react-hook-form";
import Button from "../Button";
import Form from "../Form";
import Input from "./Input";

type Inputs = {
  name?: string;
  email?: string;
  password?: string;
};
interface Props {
  user: LoginResponse;
}
const UserForm = ({ user }: Props) => {
  const router = useRouter();

  const { register, handleSubmit } = useForm<Inputs>({
    values: {
      name: user.name || "",
      email: user.email || "",
    },
  });

  const onSubmit: SubmitHandler<Inputs> = async (data) => {
    const [_, err] = await authService.updateUser(user.token, user.id, {
      name: data.name,
      email: data.email,
      password: data.password,
      role: user.role,
    });
    if (err) {
      console.log(err);
    }
  };

  const handleDelete = async () => {
    const [res, error] = await userService.deleteUser(user.token, user.id);
    if (res?.ok) {
      signOut();
      router.replace("/");
    }

    if (error) {
      console.log({ error });
    }
  };

  return (
    <Form onSubmit={handleSubmit(onSubmit)}>
      <Input name="name" label="Name" register={register} />
      <Input name="email" label="Email" register={register} />
      <Input
        name="password"
        label="Password"
        type="password"
        autoComplete="new-password"
        register={register}
      />
      <div className="flex gap-4">
        <Button type="submit">Submit</Button>
        <Button type="reset" variant="secondary">
          Reset
        </Button>
        <Button
          type="button"
          onClick={handleDelete}
          variant="custom"
          className="ml-auto"
        >
          <Trash className="stroke-red-600" />
        </Button>
      </div>
    </Form>
  );
};

export default UserForm;
