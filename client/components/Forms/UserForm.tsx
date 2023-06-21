"use client";
import authService from "@/lib/authService";
import { IUser } from "@/types";
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
  user: IUser;
}
const UserForm = ({ user }: Props) => {
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
  return (
    <Form onSubmit={handleSubmit(onSubmit)}>
      <Input name="name" label="Name" register={register} />
      <Input name="email" label="Email" register={register} />
      <Input
        name="password"
        label="Password"
        type="password"
        register={register}
      />
      <div className="flex gap-4">
        <Button type="submit">Submit</Button>
        <Button type="reset" variant="secondary">
          Reset
        </Button>
        <Button onClick={null} variant="custom" className="ml-auto">
          <Trash className="stroke-red-600" />
        </Button>
      </div>
    </Form>
  );
};

export default UserForm;
